/* ==========================================================================
   LE MOTEUR : une scène fixe plein écran, que le défilement fait avancer
   pas à pas. Chaque pas déclenche un mouvement de caméra, des étiquettes,
   une légende ou un défi. Le défilement déclenche, il ne pilote pas image
   par image : chaque mouvement va à son terme et garde son dernier état.
   ========================================================================== */
(function () {
  'use strict';
  var C = window.CONTENU, MES = window.MISE_EN_SCENE, SC = window.SCENES, O = window.Outils, D = window.Dessins;
  var el = O.el, fmt = O.fmt, Progres = O.Progres;
  var gsap = window.gsap, ScrollTrigger = window.ScrollTrigger, SplitText = window.SplitText;
  var reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var T = function (s) { return reduit ? 0 : s; };
  var $ = function (s) { return document.querySelector(s); };
  var borne = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (SplitText) gsap.registerPlugin(SplitText);

  var scene = $('#scene'), couchesEl = $('#couches'), titreEl = $('#titre'), legende = $('#legende'), defisEl = $('#defis'),
      parcours = $('#parcours'), roueEl = $('#roue'), barreSceaux = $('#sceaux'), bSuivant = $('#suivant');

  /* ---------- 1. La liste des pas ---------- */
  var revision = window.location.hash === '#revision';
  if (revision) document.documentElement.classList.add('revision');
  var PAS = [], debutChapitre = {};
  C.chapitres.forEach(function (ch, ci) {
    debutChapitre[ch.id] = PAS.length;
    PAS.push({ id: ch.id + '-titre', type: 'titre', ch: ch, ci: ci });
    ch.pas.forEach(function (p) {
      if (p.bilan) return;
      PAS.push({ id: p.id, type: p.defi ? 'defi' : 'texte', t: p.t, defi: p.defi, ch: ch, ci: ci });
    });
  });
  PAS.forEach(function (p, i) {
    var d = el('div', 'pas pas--' + p.type); d.id = 'pas-' + p.id; d.setAttribute('data-i', i);
    parcours.appendChild(d); p.el = d;
    if (!MES[p.id]) console.warn('Mise en scène manquante pour', p.id);
  });

  /* ---------- 2. Les décors ---------- */
  var couches = {};
  function couche(id) {
    if (couches[id]) return couches[id];
    var s = SC[id];
    var c = el('div', 'couche couche--' + s.type + (s.classe ? ' couche--' + s.classe : '')); c.setAttribute('data-scene', id);
    var monde = el('div', 'monde');
    if (s.type === 'image') {
      var img = new Image(); img.alt = C.alts[s.alt || id] || ''; img.decoding = 'async';
      img.onload = function () { img.classList.add('charge'); };
      img.src = s.src; monde.appendChild(img);
      if (img.decode) img.decode().then(function () { img.classList.add('charge'); }, function () {});
      if (img.complete) img.classList.add('charge');
    } else {
      monde.innerHTML = D[s.dessin](C);
      var sv = monde.querySelector('svg'); sv.setAttribute('aria-label', C.alts[id] || ''); sv.removeAttribute('aria-hidden');
    }
    var pts = el('div', 'points'); monde.appendChild(pts); c.appendChild(monde);
    var ombre = el('div', 'couche__ombre'); c.appendChild(ombre); couchesEl.appendChild(c);
    var o = couches[id] = { id: id, s: s, c: c, monde: monde, ombre: ombre, pts: pts, etq: {}, cam: null };
    var noms = C.etiquettes[id] || {};
    Object.keys(s.points || {}).forEach(function (k) {
      if (!noms[k]) return;
      var pos = s.points[k];
      var e = el('div', 'etq' + (pos[2] === 'bas' ? ' etq--bas' : ''));
      e.style.left = pos[0] + '%'; e.style.top = pos[1] + '%';
      e.innerHTML = '<span class="etq__nom">' + fmt(noms[k]) + '</span><i class="etq__pied"></i>';
      pts.appendChild(e); o.etq[k] = e;
    });
    return o;
  }

  /* ---------- 3. La caméra ----------
     cam = [x, y, zoom, ancreX, ancreY] : le point (x, y) de l'image vient se
     placer à l'ancre (par défaut un peu au-dessus du centre, pour laisser la
     place à la légende). cam = { fit, bas } : image entière au-dessus d'un panneau. */
  function cadrer(o, cam, tout_de_suite) {
    o.cam = cam;
    var vw = scene.clientWidth, vh = scene.clientHeight, W = vw, H = vw * 9 / 16;
    o.monde.style.width = W + 'px'; o.monde.style.height = H + 'px';
    var z, tx, ty, haut = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--barre')) || 58;
    if (cam.fit) {
      var dispo = vh * (1 - cam.bas) - haut - 8;
      z = borne(dispo / H, 0.3, 1);
      tx = (vw - W * z) / 2; ty = haut + 4;
    } else {
      var couvre = o.s.type === 'image' ? Math.max(1, vh / H) : 1;      // une image couvre toujours l'écran
      z = cam[2] * couvre;
      var ax = cam[3] == null ? 0.5 : cam[3], ay = cam[4] == null ? 0.42 : cam[4];
      tx = vw * ax - cam[0] / 100 * W * z; ty = vh * ay - cam[1] / 100 * H * z;
      tx = W * z >= vw ? borne(tx, vw - W * z, 0) : (vw - W * z) / 2;
      ty = H * z >= vh ? borne(ty, vh - H * z, 0) : Math.max(haut * 0.6, (vh - H * z) * 0.3);
    }
    o.vue = { ty: ty, z: z, H: H, haut: haut };
    var but = [tx, ty, z];
    if (tout_de_suite || reduit || !o.pos) { o.pos = but.slice(); o.lisse = but.slice(); o.vit = [0, 0, 0]; o.but = but; poser(o, false); return; }
    o.but = but; o.bouge = true;
  }

  /* La caméra suit sa cible comme un ressort amorti : si un nouveau pas arrive
     pendant un mouvement, elle infléchit sa course sans s'arrêter net. */
  function poser(o, enMouvement) {
    var p = o.pos, r = Math.round(p[0] * 10) / 10, s = Math.round(p[1] * 10) / 10;
    o.monde.style.transform = enMouvement
      ? 'translate3d(' + r + 'px,' + s + 'px,0) scale(' + p[2].toFixed(4) + ')'
      : 'translate(' + r + 'px,' + s + 'px) scale(' + p[2].toFixed(4) + ')';
    o.monde.style.setProperty('--inv', (1 / p[2]).toFixed(4));
  }
  var W0 = 4.2, TAU = 0.22;      // raideur du ressort, et lissage de la cible (en secondes)
  gsap.ticker.add(function (t, dtms) {
    var dt = Math.min(dtms / 1000, 1 / 20);
    Object.keys(couches).forEach(function (k) {
      var o = couches[k];
      if (!o.bouge) return;
      var a = 1 - Math.exp(-dt / TAU), fini = true;
      for (var n = 0; n < 3; n++) {
        o.lisse[n] += (o.but[n] - o.lisse[n]) * a;
        var acc = W0 * W0 * (o.lisse[n] - o.pos[n]) - 2 * W0 * o.vit[n];
        o.vit[n] += acc * dt; o.pos[n] += o.vit[n] * dt;
        var seuil = n === 2 ? 0.0005 : 0.3;
        if (Math.abs(o.but[n] - o.pos[n]) > seuil || Math.abs(o.vit[n]) > seuil) fini = false;
      }
      if (fini) { o.pos = o.but.slice(); o.lisse = o.but.slice(); o.vit = [0, 0, 0]; o.bouge = false; }
      poser(o, !fini);
    });
  });

  /* ---------- 4. Passer d'un décor à l'autre : un volet qui suit le sens du défilement ---------- */
  var actuelle = null, volet = null, etage = 2;
  // Quand on défile vite, un volet peut arriver pendant le précédent : le nouveau
  // passe par-dessus, sans couper l'autre net, puis on range tout ce qui est dessous.
  function ranger() {
    Object.keys(couches).forEach(function (k) {
      var x = couches[k];
      if (x === actuelle) return;
      x.c.classList.remove('on'); gsap.set(x.c, { clearProps: 'clipPath' }); gsap.set(x.ombre, { opacity: 0 });
    });
    gsap.set(actuelle.c, { clearProps: 'clipPath' });
  }
  function changerScene(o, sens) {
    if (actuelle === o) return false;
    var avant = actuelle; actuelle = o;
    if (volet) { volet.kill(); volet = null; }
    gsap.killTweensOf(o.c); gsap.killTweensOf(o.ombre); gsap.set(o.ombre, { opacity: 0 });
    o.c.classList.add('on'); o.c.style.zIndex = ++etage;
    if (avant && avant.s.dessin) D.vivre(avant.s.dessin, avant.monde, false);
    if (o.s.dessin) D.vivre(o.s.dessin, o.monde, true);
    if (!avant || reduit) { ranger(); return true; }
    var depart = sens >= 0 ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)';
    volet = gsap.timeline({ onComplete: function () { volet = null; ranger(); } });
    volet.fromTo(o.c, { clipPath: depart }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.15, ease: 'power3.inOut' }, 0)
         .to(avant.ombre, { opacity: 0.45, duration: 1.15, ease: 'power2.in' }, 0);
    return true;
  }

  function etiquettes(o, liste) {
    Object.keys(o.etq).forEach(function (k) {
      var e = o.etq[k], pos = o.s.points[k], vu = liste.indexOf(k) >= 0;
      // une étiquette trop près du haut de l'écran se pose sous son point plutôt qu'au-dessus
      if (vu && pos[2] !== 'bas' && o.vue) e.classList.toggle('etq--bas', o.vue.ty + pos[1] / 100 * o.vue.H * o.vue.z < o.vue.haut + 92);
      e.classList.toggle('on', vu);
    });
  }

  /* ---------- 5. Le texte : titres et légendes ---------- */
  var decoupes = [], animsTexte = [];
  function nettoyerTexte() {
    animsTexte.forEach(function (a) { a.kill(); }); animsTexte = [];
    decoupes.forEach(function (d) { d.revert(); }); decoupes = [];
  }
  /* Le texte monte ligne par ligne, puis redevient du texte normal. Pour que rien ne bouge
     à ce moment-là, les lignes découpées doivent tomber exactement comme celles du navigateur.
     On compte donc les mots de chaque ligne avant et après la découpe ; s'ils diffèrent,
     on ne découpe pas et le paragraphe monte d'un bloc. (Un « mot » s'arrête à une espace
     ordinaire : une espace insécable, devant « ? » par exemple, ne coupe pas.) */
  var ESPACE = /[ \t\n\r]/;
  function motsParLigne(t) { return t.split(/[ \t\n\r]+/).filter(Boolean).length; }
  function lignesDuNavigateur(cible) {
    var w = document.createTreeWalker(cible, NodeFilter.SHOW_TEXT), n, r = document.createRange();
    var lignes = [], ligne = -1, x = -Infinity, dansMot = false, ligneDuMot = -1;
    while ((n = w.nextNode())) {
      for (var k = 0; k < n.data.length; k++) {
        if (ESPACE.test(n.data[k])) { dansMot = false; continue; }
        r.setStart(n, k); r.setEnd(n, k + 1);
        var b = r.getClientRects()[0]; if (!b) continue;
        if (b.left < x - 1) ligne++;          // on revient à gauche : nouvelle ligne
        if (ligne < 0) ligne = 0;
        x = b.left;
        if (!dansMot) { dansMot = true; ligneDuMot = ligne; lignes[ligne] = (lignes[ligne] || 0) + 1; }
        else if (ligne !== ligneDuMot) return null;   // un mot coupé sur deux lignes : on ne découpe pas
      }
    }
    return lignes;
  }
  function reveler(cibles, delai) {
    if (reduit || !SplitText) return;
    var d = delai || 0.15;
    [].forEach.call(cibles.nodeType ? [cibles] : cibles, function (cible) {
      var avant = lignesDuNavigateur(cible);
      var s = SplitText.create(cible, { type: 'lines', mask: 'lines', reduceWhiteSpace: false });
      var apres = s.lines.map(function (l) { return motsParLigne(l.textContent); });
      if (avant && avant.join() === apres.join()) {
        decoupes.push(s);
        animsTexte.push(gsap.from(s.lines, { yPercent: 115, duration: 0.85, ease: 'power3.out', stagger: 0.08, delay: d,
          onComplete: function () { s.revert(); var j = decoupes.indexOf(s); if (j > -1) decoupes.splice(j, 1); } }));
        d += s.lines.length * 0.08;
      } else {
        s.revert();
        animsTexte.push(gsap.from(cible, { y: 28, opacity: 0, duration: 0.85, ease: 'power3.out', delay: d, clearProps: 'transform,opacity' }));
        d += 0.08;
      }
    });
  }
  function afficherTexte(p, m, i) {
    nettoyerTexte();
    if (p.type === 'titre') {
      var h = '';
      if (p.ch.numero) h += '<p class="titre__sur">' + C.ui.chapitre + ' ' + p.ch.numero + '</p>';
      h += '<h2 class="titre__h">' + fmt(p.ch.titre) + '</h2><p class="titre__acc">' + fmt(p.ch.accroche) + '</p>';
      if (i === 0) {
        h += '<p class="titre__inv">' + C.meta.invitation + '</p><div class="titre__geste" aria-hidden="true">' + (tactile ? dessinDoigt() : dessinSouris()) + '</div>';
        var dernier = Progres.dernierPas(), rang = PAS.findIndex(function (x) { return x.id === dernier; });
        h += '<div class="titre__actions">';
        if (rang > 3) h += '<button type="button" class="titre__reprendre" data-rang="' + rang + '">' + C.ui.reprendre + '</button>';
        h += '<button type="button" class="titre__reviser">' + C.ui.reviser + '</button></div>';
        h += '<div class="titre__liens">';
        if (O.Enfant.prenom()) h += '<button type="button" class="titre__pasToi" data-pas-toi>' + fmt(C.ui.pasToi) + '</button>';
        h += '<button type="button" class="titre__pasToi" data-aide>' + C.tuto.aide + '</button></div>';
      }
      titreEl.innerHTML = h;
      var b = titreEl.querySelector('.titre__reprendre'); if (b) b.onclick = function () { allerA(+b.getAttribute('data-rang'), true); };
      var bp = titreEl.querySelector('[data-pas-toi]'); if (bp) bp.onclick = ouvrirAccueil;
      var ba = titreEl.querySelector('[data-aide]'); if (ba) ba.onclick = function () { ouvrirTuto(false); };
      var br = titreEl.querySelector('.titre__reviser'); if (br) br.onclick = entrerRevision;
      reveler(titreEl.querySelectorAll('.titre__h, .titre__acc'), 0.35);
      dire(O.Voix.titre(p.ch));
      if (!reduit) gsap.from(titreEl.querySelectorAll('.titre__sur, .titre__inv, .titre__geste, .titre__actions, .titre__liens'), { opacity: 0, y: 14, duration: 0.8, delay: 0.25, stagger: 0.25 });
    } else if (p.type === 'texte') {
      var t = fmt(p.t).replace(/^Œil de lynx : /, '<span class="lynx">Œil de lynx</span>');
      legende.innerHTML = '<p>' + t + '</p>' + (m.note ? '<p class="legende__note">' + fmt(C.ui[m.note]) + '</p>' : '');
      reveler(legende.querySelector('p'), 0.2);
      dire(O.Voix.texte(p.t));
      if (m.note && !reduit) gsap.from(legende.querySelector('.legende__note'), { opacity: 0, duration: 0.8, delay: 1.1 });
    }
  }

  /* ---------- 6. Les défis ---------- */
  var defis = {}, defiOuvert = null;
  var defisDuChapitre = {};
  C.chapitres.forEach(function (ch) { defisDuChapitre[ch.id] = ch.pas.filter(function (p) { return p.defi; }).map(function (p) { return p.defi; }); });
  function chapitreGagne(ch) { var l = defisDuChapitre[ch.id]; return l.length > 0 && l.every(Progres.a); }
  var avaitDejaUnSceau = Object.keys(C.defis).some(Progres.a);
  function afficherDefi(p, o) {
    if (defiOuvert && (!p.defi || defiOuvert !== defis[p.defi])) { defiOuvert.fermer(); defiOuvert = null; }
    if (!p.defi) return;
    if (!defis[p.defi]) {
      var premier = true;
      defis[p.defi] = window.Defis.creer(p.defi, C.defis[p.defi], {
        C: C, couche: o, numero: p.ch.numero, reduit: reduit, dire: dire, reagir: reagir,
        fini: function (id) { Progres.gagner(id); },
        premierSceau: function () { var r = premier && !avaitDejaUnSceau; premier = false; avaitDejaUnSceau = true; return r; }
      });
      defisEl.appendChild(defis[p.defi].el);
    }
    if (defiOuvert !== defis[p.defi]) {
      defiOuvert = defis[p.defi]; defiOuvert.ouvrir();
      dire(defiOuvert.aLire());
      if (!reduit) gsap.fromTo(defiOuvert.el, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.35 });
    }
  }

  /* ---------- 7. La roue des saisons ---------- */
  var SAISONS = ['printemps', 'ete', 'automne', 'hiver'], COUL = ['#8fbf5a', '#e8b93c', '#d9772b', '#a9cbe6'];
  (function () {
    var s = '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="48" fill="#f8efdb"/>';
    var arcs = ['M50 50 L50 6 A44 44 0 0 1 94 50 Z', 'M50 50 L94 50 A44 44 0 0 1 50 94 Z', 'M50 50 L50 94 A44 44 0 0 1 6 50 Z', 'M50 50 L6 50 A44 44 0 0 1 50 6 Z'];
    arcs.forEach(function (a, k) { s += '<path class="roue__quart" data-s="' + SAISONS[k] + '" d="' + a + '" fill="' + COUL[k] + '" stroke="#f8efdb" stroke-width="2"/>'; });
    s += '<g class="roue__aiguille"><path d="M50 50 L47 22 L50 12 L53 22 Z" fill="#1c1510"/></g><circle cx="50" cy="50" r="6" fill="#1c1510"/></svg><div class="roue__nom"></div>';
    roueEl.innerHTML = s;
  })();
  function roue(saison) {
    roueEl.classList.toggle('on', !!saison);
    if (!saison) return;
    var k = SAISONS.indexOf(saison);
    roueEl.querySelectorAll('.roue__quart').forEach(function (q) { q.classList.toggle('on', k < 0 || q.getAttribute('data-s') === saison); });
    roueEl.querySelector('.roue__aiguille').style.transform = 'rotate(' + (k < 0 ? 0 : 45 + 90 * k) + 'deg)';
    roueEl.querySelector('.roue__nom').textContent = k < 0 ? '' : C.etiquettes.saisons[saison];
  }

  /* ---------- 8. La barre : un sceau par chapitre ---------- */
  var boutonsSceau = [];
  C.chapitres.forEach(function (ch) {
    if (!ch.numero) return;
    var b = el('button', 'sceau-btn'); b.type = 'button'; b.textContent = ch.numero;
    b.setAttribute('data-nom', O.nu(ch.titre)); b.setAttribute('aria-label', C.ui.menu + ' ' + ch.numero + ' : ' + O.nu(ch.titre));
    b.onclick = function () { allerA(debutChapitre[ch.id], true); };
    barreSceaux.appendChild(b); boutonsSceau.push({ ch: ch, b: b });
  });
  function majBarre(ci) {
    boutonsSceau.forEach(function (x) {
      x.b.classList.toggle('ici', C.chapitres[ci] === x.ch);
      var g = chapitreGagne(x.ch);
      if (g && !x.b.classList.contains('gagne') && !reduit && pret) gsap.fromTo(x.b, { scale: 1.9 }, { scale: 1, duration: 0.7, ease: 'back.out(2)' });
      x.b.classList.toggle('gagne', g);
    });
  }
  Progres.quand(function () { majBarre(courant >= 0 ? PAS[courant].ci : 0); majBilan(); });

  /* ---------- 9. Activer un pas ---------- */
  var courant = -1, pret = false;
  function activer(i, sens) {
    if (i === courant) return;
    var avant = courant; courant = i;
    var p = PAS[i], m = MES[p.id] || { s: 'ouverture', cam: [50, 50, 1] };
    sens = sens || (i > avant ? 1 : -1);
    var o = couche(m.s);
    for (var j = i + 1; j <= Math.min(PAS.length - 1, i + 6); j++) { var mm = MES[PAS[j].id]; if (mm) couche(mm.s); }   // on charge un peu d'avance
    var nouvelle = changerScene(o, sens);
    cadrer(o, m.cam || [50, 50, 1], nouvelle);
    if (o.s.dessin) D.etat(o.s.dessin, o.monde, m.f, C);
    etiquettes(o, m.et || []);
    scene.classList.toggle('scene--papier', o.s.type === 'planche');
    scene.setAttribute('data-mode', p.type);
    afficherTexte(p, m, i);
    afficherDefi(p, o);
    roue(m.roue);
    majBarre(p.ci);
    bSuivant.hidden = i === PAS.length - 1;
    if (pret && !revision) Progres.pas(p.id);
  }

  /* ---------- 10. Le défilement ---------- */
  var lenis = null;
  if (!reduit && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.11, wheelMultiplier: 0.9 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }
  function hautDe(i) { return PAS[i].el.getBoundingClientRect().top + window.scrollY; }
  function allerA(i, vite) {
    i = borne(i, 0, PAS.length - 1);
    var y = Math.max(0, hautDe(i) - window.innerHeight * 0.5 + 6);
    if (lenis) lenis.scrollTo(y, { duration: vite ? 1.6 : 1.1, easing: function (t) { return 1 - Math.pow(1 - t, 3); } });
    else window.scrollTo(0, y);
  }
  bSuivant.onclick = function () { allerA(courant + 1); };
  document.addEventListener('keydown', function (e) {
    var t = e.target, saisie = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA');
    if (tutoOuvert) { gererClavierTuto(e); return; }
    if (saisie || e.metaKey || e.ctrlKey || e.altKey) return;
    if (document.body.classList.contains('au-bilan') || !accueilEl.hidden) return;
    var sur = t && t.tagName === 'BUTTON';
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown' || (e.key === ' ' && !sur)) { e.preventDefault(); allerA(courant + 1); }
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); allerA(courant - 1); }
  });

  /* ---------- 11. Le bilan final (dans le flux, au bout du parcours) ---------- */
  var bilan = $('#bilan');
  /* Le diplôme : le fond peint, puis le prénom, la date et les sceaux, dessinés dans un canevas */
  var fondDiplome = null, diplomeEnAttente = false;
  function dessinerDiplome() {
    if (diplomeEnAttente) return; diplomeEnAttente = true;
    var DIP = C.diplome;
    var pret1 = fondDiplome ? Promise.resolve(fondDiplome) : new Promise(function (ok, ko) {
      var im = new Image(); im.onload = function () { fondDiplome = im; ok(im); }; im.onerror = ko; im.src = 'medias/diplome.webp';
    });
    var polices = document.fonts && document.fonts.load ? Promise.all([document.fonts.load('64px Fondamento'), document.fonts.load('24px Andika'), document.fonts.load('italic 24px Andika')]) : Promise.resolve();
    Promise.all([pret1, polices]).then(function (r) {
      diplomeEnAttente = false;
      var im = r[0], k = 2, W = im.naturalWidth, H = im.naturalHeight;
      var cv = document.createElement('canvas'); cv.width = W * k; cv.height = H * k;
      var g = cv.getContext('2d'); g.scale(k, k); g.drawImage(im, 0, 0, W, H);
      var cx = 548, TITRE = 'Fondamento, Georgia, serif', TEXTE = 'Andika, system-ui, sans-serif';
      g.textAlign = 'center'; g.textBaseline = 'alphabetic';
      function ecrire(t, y, police, couleur, max) { g.font = police; g.fillStyle = couleur; g.fillText(t, cx, y, max || 560); }
      ecrire(DIP.titre, 310, '68px ' + TITRE, '#c1272d');
      ecrire(DIP.sousTitre, 364, '30px ' + TITRE, '#3a2a1d');
      ecrire(DIP.decerne, 404, 'italic 21px ' + TEXTE, '#6b4a2f');
      var prenom = O.Enfant.prenom();
      if (prenom) ecrire(prenom, 462, '56px ' + TITRE, '#1c1510', 520);
      else { g.strokeStyle = '#6b4a2f'; g.setLineDash([3, 6]); g.lineWidth = 2; g.beginPath(); g.moveTo(cx - 180, 458); g.lineTo(cx + 180, 458); g.stroke(); g.setLineDash([]); }
      ecrire(DIP.motif[0], 504, '21px ' + TEXTE, '#3a2a1d');
      ecrire(DIP.motif[1], 532, '21px ' + TEXTE, '#3a2a1d');
      // les sceaux, un par chapitre
      var chs = C.chapitres.filter(function (c) { return c.numero; }), pas = 60, x0 = cx - (chs.length - 1) * pas / 2;
      chs.forEach(function (ch, n) {
        var x = x0 + n * pas, y = 584, gagne = chapitreGagne(ch);
        g.save(); g.translate(x, y); g.rotate((n % 2 ? 1 : -1) * 0.08);
        g.beginPath(); g.arc(0, 0, 24, 0, Math.PI * 2);
        if (gagne) {
          var dg = g.createRadialGradient(-8, -9, 2, 0, 0, 26); dg.addColorStop(0, '#ee5b4f'); dg.addColorStop(0.55, '#c1272d'); dg.addColorStop(1, '#86171c');
          g.fillStyle = dg; g.shadowColor = 'rgba(120,20,20,.45)'; g.shadowBlur = 6; g.shadowOffsetY = 2; g.fill();
          g.shadowColor = 'transparent'; g.lineWidth = 2.5; g.strokeStyle = 'rgba(255,255,255,.18)'; g.beginPath(); g.arc(0, 0, 19, 0, Math.PI * 2); g.stroke();
          g.fillStyle = '#ffe9df';
        } else {
          g.setLineDash([4, 4]); g.lineWidth = 2; g.strokeStyle = 'rgba(107,74,47,.55)'; g.stroke(); g.setLineDash([]);
          g.fillStyle = 'rgba(107,74,47,.55)';
        }
        g.font = '24px ' + TITRE; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(ch.numero, 0, 1);
        g.restore();
      });
      g.textBaseline = 'alphabetic';
      var d = new Date(), date = d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
      ecrire(O.gabarit(DIP.date, { date: date }), 636, 'italic 19px ' + TEXTE, '#6b4a2f');
      var img = bilan.querySelector('.diplome__img'), lien = $('#enregistrerDiplome');
      cv.toBlob(function (blob) {
        if (!blob) return;
        if (img.dataset.url) URL.revokeObjectURL(img.dataset.url);
        var url = URL.createObjectURL(blob); img.dataset.url = url; img.src = url;
        lien.href = url;
        lien.download = DIP.fichier + (prenom ? '-' + O.norm(prenom) : '') + '.png';
      }, 'image/png');
    }, function () { diplomeEnAttente = false; bilan.querySelector('.diplome').hidden = true; });
  }
  function majBilan() {
    if (bilan.querySelector('.diplome__img')) dessinerDiplome();
    bilan.querySelectorAll('.bilan__sceau').forEach(function (s) {
      var ch = C.chapitres.find(function (c) { return c.id === s.getAttribute('data-ch'); });
      var g = chapitreGagne(ch), manque = g ? -1 : defiManquant(ch);
      s.classList.toggle('gagne', g);
      // un sceau gris emmène au premier défi qui manque dans ce chapitre
      var titre = manque > -1 ? O.gabarit(C.bilan.allerDefi, { titre: O.nu(C.defis[PAS[manque].defi].titre) })
        : O.gabarit(C.bilan.allerChapitre, { numero: ch.numero, titre: O.nu(ch.titre) });
      s.title = titre; s.setAttribute('aria-label', titre);
      s.onclick = function () { allerA(manque > -1 ? manque : debutChapitre[ch.id], true); };
    });
  }
  function defiManquant(ch) {
    return PAS.findIndex(function (p) { return p.type === 'defi' && p.ch.id === ch.id && !Progres.a(p.defi); });
  }
  (function () {
    var B = C.bilan, h = '<div class="bilan__image"><img src="medias/seigneurie.webp" alt="' + C.alts.soir + '" loading="lazy"></div><div class="bilan__corps">';
    h += '<h2 class="bilan__titre">' + fmt(B.titre) + '</h2><p class="bilan__intro">' + fmt(B.intro) + '</p><ul class="bilan__points">';
    B.points.forEach(function (x) { h += '<li>' + fmt(x) + '</li>'; });
    h += '</ul><p class="bilan__idee">' + fmt(B.idee) + '</p><p class="bilan__sceaux-titre">' + fmt(B.sceaux) + '</p><div class="bilan__sceaux">';
    var DIP = C.diplome;
    C.chapitres.forEach(function (ch) {
      if (ch.numero) h += '<button type="button" class="bilan__sceau" data-ch="' + ch.id + '"><span class="cire" aria-hidden="true">' + ch.numero + '</span><span>' + fmt(ch.titre) + '</span></button>';
    });
    h += '</div><p class="bilan__sceaux-titre">' + DIP.section + '</p><div class="diplome"><img class="diplome__img" alt="' + DIP.alt + '">' +
      '<div class="diplome__pied"><p class="diplome__note">' + DIP.note + '</p><a class="btn" id="enregistrerDiplome" href="#">' + DIP.enregistrer + '</a></div></div>';
    h += '<div class="bilan__bas"><p class="bilan__credits">' + fmt(B.credits) + '</p><span class="bilan__boutons"><button type="button" class="btn" id="reviserBilan">' + C.ui.reviser + '</button> <button type="button" class="btn" id="recommencer">' + fmt(B.recommencer) + '</button></span></div></div>';
    bilan.innerHTML = h;
    $('#reviserBilan').onclick = entrerRevision;
    $('#recommencer').onclick = function () { Progres.effacer(); window.scrollTo(0, 0); window.location.reload(); };
    ScrollTrigger.create({ trigger: bilan, start: 'top 60%', onToggle: function (s) { document.body.classList.toggle('au-bilan', s.isActive); } });
  })();

  /* ---------- 12. L'accueil : le prénom et l'année de naissance ----------
     Demandés une seule fois, gardés dans ce navigateur (localStorage, pas de cookie). */
  var accueilEl = $('#accueil');
  function ouvrirAccueil() {
    var A = C.accueil, an = new Date().getFullYear(), opts = '<option value="">' + A.choisir + '</option>';
    for (var y = an - 4; y >= an - 16; y--) opts += '<option' + (y === O.Enfant.annee() ? ' selected' : '') + '>' + y + '</option>';
    accueilEl.innerHTML = '<form class="accueil__carte" novalidate><h2 class="accueil__titre">' + fmt(A.titre) + '</h2>' +
      '<label class="accueil__champ">' + A.prenom + '<input class="defi__champ" name="prenom" maxlength="30" autocomplete="off" autocapitalize="words" spellcheck="false"></label>' +
      '<label class="accueil__champ">' + A.annee + '<select class="defi__champ" name="annee">' + opts + '</select></label>' +
      '<div class="accueil__bas"><button type="button" class="btn btn--lien" data-passer>' + A.passer + '</button><button class="btn">' + A.partir + '</button></div>' +
      '<p class="accueil__note">' + A.note + '</p></form>';
    var f = accueilEl.querySelector('form');
    f.prenom.value = O.Enfant.prenom();
    accueilEl.hidden = false;
    if (lenis) lenis.stop();
    if (!reduit) gsap.fromTo(f, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.2 });
    setTimeout(function () { try { f.prenom.focus({ preventScroll: true }); } catch (e) { /* rien */ } }, 300);
    function fermer(prenom, annee) {
      // on ne garde que des lettres, espaces, tirets et apostrophes, et une majuscule au début
      prenom = String(prenom || '').replace(/[^A-Za-zÀ-ÖØ-öø-ÿŒœ' \-]/g, '').replace(/\s+/g, ' ').trim();
      if (prenom) prenom = prenom.charAt(0).toUpperCase() + prenom.slice(1);
      O.Enfant.garder(prenom, annee);
      window.scrollTo(0, 0);
      window.location.reload();   // tout le texte se refait avec le prénom
    }
    f.onsubmit = function (e) { e.preventDefault(); fermer(f.prenom.value, f.annee.value); };
    f.querySelector('[data-passer]').onclick = function () { fermer('', 0); };
  }

  /* ---------- 12 bis. Le mode d'emploi ----------
     Une carte, montrée une fois (puis rouverte par « Comment ça marche ? ») :
     souris et clavier sur ordinateur, doigt et flèche sur tablette, puis le choix de la voix.
     Ce choix est un clic : il autorise aussi le navigateur à jouer le son. */
  var tutoEl = $('#tuto'), tutoOuvert = false;
  var tactile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  var HP = '<path class="voix__hp" d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path class="voix__onde" d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>';
  function dessinSouris() {
    return '<svg class="geste" viewBox="0 0 40 54"><path d="M20 8c0-4 5-4 5-7"/><rect x="8" y="8" width="24" height="34" rx="12"/>' +
      '<path class="geste__raie" d="M20 8v12"/><path class="geste__molette" d="M20 13v4"/><path class="geste__chevron" d="M15 47l5 4 5-4"/></svg>';
  }
  function dessinDoigt() {
    // une main qui pointe vers le haut (index tendu, pouce à gauche), et la flèche du geste
    return '<svg class="geste" viewBox="0 0 40 54"><g class="geste__main"><path d="M14 6l6-5 6 5"/>' +
      '<path d="M15 32V14a5 5 0 0 1 10 0v12c0-2.5 5-2.5 5 0v1c0-2.5 5-2.5 5 0v8c0 8-5 13-12 13h-2c-5 0-8-3-10-7l-4-7c-1.5-2.5 2-5 4.5-3z"/>' +
      '<path class="geste__ongle" d="M17.5 15.5a2.5 2.5 0 0 1 5 0"/></g></svg>';
  }
  function ligneTuto(dessin, texte) {
    return '<div class="tuto__ligne"><div class="tuto__dessin" aria-hidden="true">' + dessin + '</div><p>' + fmt(texte) + '</p></div>';
  }
  function tutoVu() { try { return localStorage.getItem('moyen-age-tuto') === '1'; } catch (e) { return false; } }
  function ouvrirTuto(premiere) {
    var U = C.tuto, avecVoix = !bVoix.hidden;
    var h = '<div class="accueil__carte tuto__carte" role="dialog" aria-modal="true" aria-labelledby="tutoTitre">' +
      (premiere ? '<p class="tuto__avant">' + U.avant + '</p>' : '') +
      '<h2 class="accueil__titre" id="tutoTitre">' + U.titre + '</h2>';
    if (tactile) {
      h += ligneTuto(dessinDoigt(), U.doigt) +
        ligneTuto('<span class="geste-rond"><svg viewBox="0 0 24 24"><path d="M5 9l7 7 7-7"/></svg></span>', U.fleche);
    } else {
      h += ligneTuto(dessinSouris(), U.souris) +
        ligneTuto('<span class="touche">↑</span><span class="touche touche--appui">↓</span>', U.clavier);
    }
    if (avecVoix) {
      h += '<hr class="tuto__sep">' + ligneTuto('<svg class="tuto__hp" viewBox="0 0 24 24">' + HP + '</svg>', U.voix) +
        '<div class="tuto__choix"><button type="button" class="btn tuto__ecouter" data-voix="1"><svg viewBox="0 0 24 24" aria-hidden="true">' + HP + '</svg>' + U.ecouter + '</button>' +
        '<button type="button" class="btn btn--lien" data-voix="0">' + U.lire + '</button></div>';
    } else {
      h += '<div class="tuto__choix"><button type="button" class="btn" data-voix="">' + U.partir + '</button></div>';
    }
    tutoEl.innerHTML = h + '</div>';
    tutoEl.hidden = false; tutoOuvert = true;
    if (avecVoix) bVoix.classList.add('voix--montre');
    if (lenis) lenis.stop();
    tutoEl.querySelectorAll('[data-voix]').forEach(function (b) {
      b.onclick = function () { var v = b.getAttribute('data-voix'); fermerTuto(v === '' ? null : v === '1'); };
    });
    var carte = tutoEl.firstChild;
    if (!reduit) gsap.fromTo(carte, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: premiere ? 0.6 : 0.1 });
    setTimeout(function () { var p = tutoEl.querySelector('.tuto__choix .btn'); try { p.focus({ preventScroll: true }); } catch (e) { /* rien */ } }, 350);
  }
  // choix : true = avec la voix, false = sans, null = on garde le réglage actuel
  function fermerTuto(choix) {
    if (!tutoOuvert) return;
    tutoOuvert = false;
    try { localStorage.setItem('moyen-age-tuto', '1'); } catch (e) { /* tant pis */ }
    bVoix.classList.remove('voix--montre');
    tutoEl.hidden = true; tutoEl.innerHTML = '';
    if (lenis) lenis.start();
    if (choix === true || choix === false) reglerVoix(choix);
  }
  function gererClavierTuto(e) {
    if (e.key === 'Escape') { e.preventDefault(); fermerTuto(null); return; }
    if (e.key !== 'Tab') return;
    // le focus reste dans la carte
    var l = tutoEl.querySelectorAll('button'), a = l[0], z = l[l.length - 1];
    if (!tutoEl.contains(document.activeElement)) { e.preventDefault(); a.focus(); }
    else if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
    else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
  }

  /* ---------- 13. Lecture à voix haute ----------
     Un seul bouton : allumé, il lit le passage en cours, puis chaque nouveau passage.
     Chaque texte a son enregistrement (medias/voix/<clé>.mp3, liste dans js/voix.js).
     Un texte sans enregistrement est lu par la voix de l'appareil. */
  var bVoix = $('#voix'), synth = window.speechSynthesis, voixFr = null, voixOn = false;
  var FICHIERS = window.VOIX_FICHIERS || {}, lecteur = new Audio(), file = [], tour = 0;
  lecteur.preload = 'auto';
  function choisirVoix() {
    var l = synth.getVoices().filter(function (v) { return /^fr([-_]|$)/i.test(v.lang); });
    // les voix les plus naturelles d'abord : neuronales (Edge), premium ou améliorées (Apple), Google (Chrome)
    function note(v) {
      var n = v.name, s = /fr[-_]FR/i.test(v.lang) ? 1 : 0;
      if (/Natural|Neural|Online/i.test(n)) s += 50;
      else if (/Premium/i.test(n)) s += 40;
      else if (/Enhanced|Amélioré/i.test(n)) s += 30;
      else if (/Google/i.test(n)) s += 20;
      if (/Compact|eSpeak/i.test(n)) s -= 10;
      return s;
    }
    l.sort(function (a, b) { return note(b) - note(a); });
    voixFr = l[0] || null;
  }
  function taire() {
    tour++; file = [];
    try { lecteur.pause(); } catch (e) { /* rien */ }
    if (synth) synth.cancel();
    bVoix.classList.remove('parle');
  }
  // morceaux : une liste de textes, lus l'un après l'autre
  function dire(morceaux) {
    if (!voixOn) return;
    taire();
    file = [].concat(morceaux || []).filter(Boolean);
    suivant(tour);
  }
  function suivant(t) {
    if (t !== tour) return;
    if (!file.length) { bVoix.classList.remove('parle'); return; }
    var texte = file.shift(), cle = O.Voix.cle(texte);
    bVoix.classList.add('parle');
    if (FICHIERS[cle]) {
      lecteur.onended = function () { suivant(t); };
      lecteur.onerror = function () { parlerAppareil(texte, t); };
      lecteur.src = 'medias/voix/' + cle + '.mp3';
      var pr = lecteur.play();
      if (pr && pr.catch) pr.catch(function (err) {
        if (t !== tour) return;
        bVoix.classList.remove('parle');
        if (err && err.name === 'NotAllowedError') bloque();
      });
    } else parlerAppareil(texte, t);
  }
  function parlerAppareil(texte, t) {
    if (!synth || !window.SpeechSynthesisUtterance) { suivant(t); return; }
    var u = new window.SpeechSynthesisUtterance(String(texte).replace(/[«»]/g, ''));
    u.lang = 'fr-FR'; if (voixFr) u.voice = voixFr; u.rate = 0.92;
    u.onend = function () { suivant(t); };
    u.onerror = function (ev) {
      if (ev && ev.error === 'not-allowed') { if (t === tour) { bVoix.classList.remove('parle'); bloque(); } return; }
      suivant(t);
    };
    synth.speak(u);
  }
  /* Le navigateur refuse le son tant qu'on n'a ni cliqué ni appuyé sur une touche
     (la molette et le doigt qui glisse ne comptent pas). Si la voix était restée allumée
     d'une visite à l'autre, une bulle invite à toucher le bouton ; le premier clic ou
     la première touche relance la lecture. */
  var attenteGeste = false, bulle = null;
  function bloque() {
    attenteGeste = true;
    if (!bulle) { bulle = el('div', 'voix-bulle'); bulle.setAttribute('role', 'status'); bulle.textContent = C.tuto.bulle; scene.appendChild(bulle); }
    var r = bVoix.getBoundingClientRect(), s = scene.getBoundingClientRect();
    bulle.style.right = Math.round(s.right - r.left + 14) + 'px';
    bulle.style.top = Math.round(r.top - s.top + r.height / 2) + 'px';
    bulle.hidden = false; bVoix.classList.add('voix--attend');
  }
  function finAttente() {
    attenteGeste = false;
    if (bulle) bulle.hidden = true;
    bVoix.classList.remove('voix--attend');
  }
  function reprendre() { finAttente(); dire(texteEnCours()); }
  ['pointerdown', 'keydown'].forEach(function (type) {
    document.addEventListener(type, function (e) { if (attenteGeste && !bVoix.contains(e.target)) reprendre(); }, true);
  });
  // Les réactions dans les défis : « Bravo ! », « Presque ! », « Dommage, essaie encore ! »…
  var rangBravo = 0;
  function reagir(sorte) {
    var l = (C.reactions || {})[sorte];
    if (!voixOn || !l || !l.length) return;
    dire([sorte === 'bravo' ? l[rangBravo++ % l.length] : l[0]]);
  }
  function reglerVoix(on) {
    voixOn = on; majVoix();
    try { localStorage.setItem('moyen-age-voix', on ? '1' : '0'); } catch (e) { /* rien */ }
    finAttente();
    if (on) dire(texteEnCours()); else taire();
  }
  function texteEnCours() {
    if (courant < 0) return [];
    var p = PAS[courant];
    if (p.type === 'texte') return O.Voix.texte(p.t);
    if (p.type === 'titre') return O.Voix.titre(p.ch);
    return defiOuvert ? defiOuvert.aLire() : [];
  }
  function majVoix() {
    bVoix.setAttribute('aria-pressed', String(voixOn));
    bVoix.setAttribute('aria-label', voixOn ? C.ui.voixOff : C.ui.voix);
    bVoix.title = voixOn ? C.ui.voixOff : C.ui.voix;
  }
  if (synth && window.SpeechSynthesisUtterance) { choisirVoix(); if (synth.addEventListener) synth.addEventListener('voiceschanged', choisirVoix); }
  if (Object.keys(FICHIERS).length || (synth && window.SpeechSynthesisUtterance)) {
    try { voixOn = localStorage.getItem('moyen-age-voix') === '1'; } catch (e) { /* rien */ }
    bVoix.hidden = false; majVoix();
    bVoix.onclick = function () {
      if (tutoOuvert) { fermerTuto(true); return; }      // le bouton qui brille pendant le mode d'emploi : « avec la voix »
      if (attenteGeste) { reprendre(); return; }         // la voix attendait ce clic pour parler
      reglerVoix(!voixOn);
    };
    window.addEventListener('pagehide', taire);
  }

  /* ---------- 14. Mode révision : les défis seulement ---------- */
  function entrerRevision() { window.location.hash = 'revision'; window.scrollTo(0, 0); window.location.reload(); }
  if (revision) {
    var bandeau = $('#bandeauRevision');
    bandeau.innerHTML = '<span>' + C.ui.revision + '</span><button type="button">' + C.ui.quitterRevision + '</button>';
    bandeau.hidden = false;
    bandeau.querySelector('button').onclick = function () { history.replaceState(null, '', window.location.pathname + window.location.search); window.scrollTo(0, 0); window.location.reload(); };
  }

  /* ---------- 15. Départ ---------- */
  function demarrer() {
    PAS.forEach(function (p, i) {
      ScrollTrigger.create({ trigger: p.el, start: 'top 55%', end: 'bottom 55%', onToggle: function (s) { if (s.isActive) activer(i, s.direction); } });
    });
    if (courant < 0) activer(0, 1);
    majBilan();
    pret = true;
    var largeur = window.innerWidth, hauteur = window.innerHeight;
    window.addEventListener('resize', function () {
      // sur téléphone, la barre d'adresse qui apparaît ou disparaît change un peu la hauteur : on ne bouge pas l'image pour ça
      var w = window.innerWidth, h = window.innerHeight;
      if (w === largeur && Math.abs(h - hauteur) < 160) return;
      largeur = w; hauteur = h;
      if (actuelle) cadrer(actuelle, actuelle.cam, true);
    });
    document.documentElement.classList.add('pret');
    if (!O.Enfant.connu() && !revision) ouvrirAccueil();
    else if (!revision && !tutoVu()) ouvrirTuto(!Progres.dernierPas());
  }
  var titreSite = O.nu(C.meta.titre);
  document.title = titreSite; $('#haut').textContent = titreSite;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  var polices = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  Promise.race([polices, new Promise(function (r) { setTimeout(r, 1500); })]).then(demarrer);

  /* Pour les contrôles automatiques (voir outils/controle.md) */
  window.__site = { lenis: function () { return lenis; }, PAS: PAS, allerA: allerA, activer: activer, courant: function () { return courant; } };
})();
