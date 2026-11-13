/* ==========================================================================
   LES DÉFIS : quatre mécaniques, toutes tolérantes.
     choix   : une question, des boutons
     lieux   : toucher le bon endroit sur l'image ou le schéma
     nommer  : toucher un numéro puis écrire le nom
     saisie  : écrire le mot qui manque
     ordre   : remettre des moments dans l'ordre
   Règle commune : une erreur donne un indice, jamais une faute sèche.
   ========================================================================== */
(function () {
  'use strict';
  var O = window.Outils, el = O.el, fmt = O.fmt, gabarit = O.gabarit;

  function creer(id, d, ctx) {
    var U = ctx.C.ui;
    var box = el('section', 'defi'); box.setAttribute('data-defi', id); box.setAttribute('aria-label', O.nu(d.titre));
    box.innerHTML = '<div class="defi__tete"><h3 class="defi__titre"></h3><span class="defi__compte"></span></div>' +
      '<p class="defi__consigne"></p><p class="defi__q"></p><div class="defi__corps"></div>' +
      '<p class="defi__retour" aria-live="polite"></p>' +
      '<div class="defi__pied"><p class="defi__passer"></p><button type="button" class="btn defi__suite" hidden></button></div>';
    var q = function (s) { return box.querySelector(s); };
    var qBrute = '', choixBruts = null;   // la question telle qu'écrite dans contenu.js, pour retrouver son enregistrement
    q('.defi__titre').textContent = O.nu(d.titre);
    q('.defi__consigne').innerHTML = fmt(d.consigne) + (d.objectifTexte ? ' ' + fmt(d.objectifTexte) : '');
    q('.defi__passer').textContent = U.passer;
    var bSuite = q('.defi__suite');
    var ui = {
      corps: q('.defi__corps'),
      q: function (t, choix) { qBrute = t || ''; choixBruts = choix || null; q('.defi__q').innerHTML = t ? fmt(t) : ''; if (t && ctx.dire && box.classList.contains('on')) setTimeout(function () { ctx.dire(aLire(false)); }, 60); },
      retour: function (t, classe) { var r = q('.defi__retour'); r.className = 'defi__retour' + (classe ? ' ' + classe : ''); r.innerHTML = t ? fmt(t) : ''; },
      compte: function (t) { q('.defi__compte').textContent = t || ''; },
      suite: function (label, fn) { bSuite.hidden = false; bSuite.textContent = label; bSuite.onclick = function () { bSuite.hidden = true; fn(); }; setTimeout(function () { try { bSuite.focus({ preventScroll: true }); } catch (e) { /* rien */ } }, 30); },
      cacherSuite: function () { bSuite.hidden = true; }
    };

    var gagne = false;
    function gagner() { if (!gagne) { gagne = true; ctx.fini(id); } }
    function finir() {
      gagner();
      ui.q(''); ui.retour(''); ui.compte(''); ui.cacherSuite();
      q('.defi__consigne').hidden = true; q('.defi__passer').hidden = true;
      ui.corps.innerHTML = '<div class="reussite"><div class="cire" aria-hidden="true">' + (ctx.numero || '★') + '</div><div>' +
        '<p class="reussite__titre">' + U.sceau + '</p><p class="reussite__txt">' + fmt(d.bravo) + '</p>' +
        (ctx.premierSceau() ? '<p class="reussite__suite">' + fmt(U.sceauPremier) + '</p>' : '') +
        '<p class="reussite__suite">' + fmt(U.continuer) + '</p></div></div>';
      if (window.gsap && !ctx.reduit) {
        window.gsap.fromTo(ui.corps.querySelector('.cire'), { scale: 2.6, rotation: -28, opacity: 0 }, { scale: 1, rotation: -6, opacity: 1, duration: 0.7, ease: 'back.out(1.6)' });
        window.gsap.from(ui.corps.querySelectorAll('.reussite p'), { y: 16, opacity: 0, duration: 0.6, stagger: 0.09, delay: 0.25, ease: 'power3.out' });
      }
    }

    var jeu = TYPES[d.type](d, ui, finir, { U: U, couche: ctx.couche, gagner: gagner }) || {};
    // Pour la lecture à voix haute : la consigne (à l'ouverture), la question et les propositions
    function aLire(avecConsigne) {
      var t = [];
      if (avecConsigne && !q('.defi__consigne').hidden) t = t.concat(O.Voix.introDefi(d));
      return t.concat(O.Voix.question(qBrute, choixBruts));
    }
    return {
      el: box,
      ouvrir: function () { box.classList.add('on'); if (jeu.ouvrir) jeu.ouvrir(); },
      fermer: function () { box.classList.remove('on'); if (jeu.fermer) jeu.fermer(); },
      aLire: function () { return aLire(true); }
    };
  }

  /* ---------- Le champ de saisie tolérant, avec ses trois niveaux d'indices ---------- */
  function champ(it, ui, U, quandJuste, opts) {
    opts = opts || {};
    var essais = 0;
    ui.corps.innerHTML = '';
    var zone = el('div', 'defi__saisie');
    var inp = el('input', 'defi__champ');
    inp.type = 'text'; inp.autocomplete = 'off'; inp.spellcheck = false; inp.setAttribute('autocapitalize', 'off'); inp.setAttribute('autocorrect', 'off');
    inp.placeholder = U.ecris; inp.setAttribute('aria-label', U.ecris);
    if (it.nombre) inp.inputMode = 'numeric';
    var b = el('button', 'btn'); b.type = 'button'; b.textContent = U.valider;
    zone.appendChild(inp); zone.appendChild(b); ui.corps.appendChild(zone);
    var canon = it.reponses[0];
    var nuCanon = canon.replace(/^(le|la|les|une|un|des) |^l'/i, '');

    function juste(etat, forme) {
      inp.disabled = true; b.disabled = true;
      var msg = etat === 'exact' ? U.exact : gabarit(U.presque, { forme: forme });
      if (it.complet) msg += ' ' + it.complet;
      ui.retour(msg, 'ok');
      quandJuste(forme);
    }
    function qcm() {
      ui.retour(U.indice3, 'indice');
      var props = [canon].concat((it.leurres || opts.leurres || []).slice(0, 2));
      // ordre stable mais pas toujours la bonne en premier
      var dec = canon.length % props.length; props = props.slice(dec).concat(props.slice(0, dec));
      var z = el('div', 'defi__choix');
      props.forEach(function (p) {
        var c = el('button', 'btn btn--choix'); c.type = 'button'; c.textContent = p;
        c.onclick = function () {
          if (p === canon) { z.querySelectorAll('button').forEach(function (x) { x.disabled = true; }); c.classList.add('juste'); juste('presque', canon); }
          else { c.disabled = true; c.classList.add('faux'); }
        };
        z.appendChild(c);
      });
      ui.corps.innerHTML = ''; ui.corps.appendChild(z);
    }
    function valider() {
      var r = O.juger(inp.value, it);
      if (r.etat === 'vide') { inp.focus({ preventScroll: true }); return; }
      if (r.etat === 'exact' || r.etat === 'presque') { juste(r.etat, r.forme); return; }
      if (r.etat === 'piege') { ui.retour(r.message, 'indice'); inp.select(); return; }
      if (opts.autre) { var a = opts.autre(inp.value); if (a) { ui.retour(gabarit(U.autreLieu, { forme: a }), 'indice'); inp.select(); return; } }
      essais++;
      if (essais === 1) { ui.retour(U.pasTout + ' ' + gabarit(U.indice1, { indice: it.indice }), 'indice'); }
      else if (essais === 2 && !it.nombre) {
        ui.retour(gabarit(U.indice2, { debut: nuCanon.slice(0, nuCanon.length > 5 ? 2 : 1), n: nuCanon.replace(/[^a-zA-Zà-ÿœ]/g, '').length }), 'indice');
      } else { qcm(); return; }
      inp.select();
    }
    b.onclick = valider;
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); valider(); } e.stopPropagation(); });
    setTimeout(function () { try { inp.focus({ preventScroll: true }); } catch (e) { /* rien */ } }, 60);
  }

  var TYPES = {};

  /* ---------- CHOIX ---------- */
  TYPES.choix = function (d, ui, finir, x) {
    var U = x.U, i = 0, n = d.questions.length;
    function poser() {
      var qn = d.questions[i], ch = qn.choix || d.choixCommuns, essais = 0;
      ui.compte(U.question + ' ' + (i + 1) + ' ' + U.sur + ' ' + n);
      ui.q(qn.q, ch); ui.retour(''); ui.cacherSuite();
      var zone = el('div', 'defi__choix');
      ui.corps.innerHTML = ''; ui.corps.appendChild(zone);
      ch.forEach(function (c, k) {
        var b = el('button', 'btn btn--choix'); b.type = 'button'; b.textContent = c;
        b.onclick = function () {
          if (k === qn.bon) {
            zone.querySelectorAll('button').forEach(function (y) { y.disabled = true; });
            b.classList.add('juste'); ui.retour(qn.ok, 'ok');
            var dernier = i === n - 1 && !d.suite;
            ui.suite(dernier ? U.termine : U.suivante, function () {
              i++;
              if (i < n) poser(); else if (d.suite) TYPES.saisie(d.suite, ui, finir, x); else finir();
            });
          } else {
            b.disabled = true; b.classList.add('faux');
            var ind = qn.indices || [];
            ui.retour(U.pasTout + ' ' + (ind[Math.min(essais, ind.length - 1)] || U.essaieEncore), 'indice');
            essais++;
          }
        };
        zone.appendChild(b);
      });
    }
    poser();
  };

  /* ---------- LIEUX : toucher le bon endroit ---------- */
  TYPES.lieux = function (d, ui, finir, x) {
    var U = x.U, o = x.couche, pos = o.s.cibles || o.s.points, btns = {}, i = 0, n = d.questions.length, essais = 0, verrou = false, qn;
    Object.keys(d.lieux).forEach(function (k, num) {
      var b = el('button', 'cible cible--vide'); b.type = 'button';
      b.style.left = pos[k][0] + '%'; b.style.top = pos[k][1] + '%';
      b.setAttribute('aria-label', 'Endroit ' + (num + 1));
      b.onclick = function () { toucher(k, b); };
      o.pts.appendChild(b); btns[k] = b;
    });
    function nettoyer() {
      Object.keys(btns).forEach(function (k) { btns[k].classList.remove('juste', 'aide', 'non'); if (o.etq[k]) o.etq[k].classList.remove('on'); });
    }
    function poser() {
      qn = d.questions[i]; essais = 0; verrou = false; nettoyer();
      ui.compte(U.question + ' ' + (i + 1) + ' ' + U.sur + ' ' + n);
      ui.q(qn.q); ui.retour(''); ui.cacherSuite(); ui.corps.innerHTML = '';
    }
    function toucher(k, b) {
      if (verrou) return;
      if (k === qn.bon) {
        verrou = true; b.classList.remove('aide'); b.classList.add('juste');
        if (o.etq[k]) o.etq[k].classList.add('on');
        ui.retour(qn.ok, 'ok');
        ui.suite(i === n - 1 ? U.termine : U.suivante, function () { i++; if (i < n) poser(); else { nettoyer(); finir(); } });
      } else {
        essais++;
        b.classList.remove('non'); void b.offsetWidth; b.classList.add('non');
        ui.retour(d.lieux[k] + ' ' + gabarit(U.indice1, { indice: qn.indice }), 'indice');
        if (essais >= 3) btns[qn.bon].classList.add('aide');
      }
    }
    poser();
    return { ouvrir: function () { o.pts.classList.add('jeu'); }, fermer: function () { o.pts.classList.remove('jeu'); } };
  };

  /* ---------- NOMMER : toucher un numéro, écrire le nom ---------- */
  TYPES.nommer = function (d, ui, finir, x) {
    var U = x.U, o = x.couche, pos = o.s.cibles || o.s.points, n = d.items.length, trouves = 0, btns = [], ok = [];
    function compte() { ui.compte(gabarit(U.trouves, { n: trouves, total: n })); }
    function autre(k) {
      return function (saisie) {
        var s = O.norm(saisie), trouve = null;
        d.items.forEach(function (it, j) { if (j !== k) it.reponses.forEach(function (r) { if (O.norm(r) === s) trouve = it.reponses[0]; }); });
        return trouve;
      };
    }
    function choisir(k) {
      var it = d.items[k];
      if (ok[k]) { ui.retour(gabarit(U.dejaTrouve, { forme: it.reponses[0] }), 'info'); return; }
      btns.forEach(function (b) { b.classList.remove('choisi'); }); btns[k].classList.add('choisi');
      ui.q(gabarit(U.numero, { n: k + 1 })); ui.retour('');
      var leurres = [d.items[(k + 3) % n].reponses[0], d.items[(k + 7) % n].reponses[0]];
      champ(it, ui, U, function () {
        ok[k] = true; trouves++; compte();
        btns[k].classList.remove('choisi'); btns[k].classList.add('juste');
        if (o.etq[it.lieu]) o.etq[it.lieu].classList.add('on');
        if (trouves === n) { setTimeout(function () { fermerEtiquettes(); finir(); }, 1600); return; }
        if (trouves === d.objectif) { x.gagner(); setTimeout(function () { ui.retour(U.trouveAussi, 'ok'); }, 1800); }
        setTimeout(function () { if (!ui.corps.querySelector('.defi__champ:not(:disabled)')) { ui.q(U.choisis); ui.corps.innerHTML = ''; } }, 1700);
      }, { autre: autre(k), leurres: leurres });
    }
    function fermerEtiquettes() { d.items.forEach(function (it) { if (o.etq[it.lieu]) o.etq[it.lieu].classList.remove('on'); }); }
    d.items.forEach(function (it, k) {
      var b = el('button', 'cible'); b.type = 'button'; b.textContent = k + 1;
      b.style.left = pos[it.lieu][0] + '%'; b.style.top = pos[it.lieu][1] + '%';
      b.setAttribute('aria-label', gabarit(U.numero, { n: k + 1 }));
      b.onclick = function () { choisir(k); };
      o.pts.appendChild(b); btns.push(b);
    });
    compte(); ui.q(U.choisis);
    return {
      ouvrir: function () { o.pts.classList.add('jeu'); d.items.forEach(function (it, k) { if (ok[k] && o.etq[it.lieu]) o.etq[it.lieu].classList.add('on'); }); },
      fermer: function () { o.pts.classList.remove('jeu'); fermerEtiquettes(); }
    };
  };

  /* ---------- SAISIE : écrire le mot qui manque ---------- */
  TYPES.saisie = function (d, ui, finir, x) {
    var U = x.U, i = 0, n = d.items.length;
    function poser() {
      var it = d.items[i];
      ui.compte(n > 1 ? U.question + ' ' + (i + 1) + ' ' + U.sur + ' ' + n : '');
      ui.q(it.q); ui.retour(''); ui.cacherSuite();
      var leurres = n > 2 ? [d.items[(i + 2) % n].reponses[0], d.items[(i + 5) % n].reponses[0]] : [];
      champ(it, ui, U, function () {
        ui.suite(i === n - 1 ? U.termine : U.suivante, function () { i++; if (i < n) poser(); else finir(); });
      }, { leurres: leurres });
    }
    poser();
  };

  /* ---------- ORDRE : remettre des moments dans l'ordre ---------- */
  TYPES.ordre = function (d, ui, finir, x) {
    var U = x.U, melange = [2, 0, 3, 1], prochain = 0, essais = 0, n = d.etapes.length;
    var zone = el('div', 'defi__ordre');
    ui.corps.appendChild(zone);
    melange.forEach(function (k, rang) {
      var b = el('button', 'carte-ordre'); b.type = 'button'; b.style.order = 10 + rang;
      b.innerHTML = '<span class="carte-ordre__n">?</span><span>' + fmt(d.etapes[k]) + '</span>';
      b.onclick = function () {
        if (k === prochain) {
          b.classList.add('juste'); b.disabled = true; b.firstChild.textContent = prochain + 1; b.style.order = prochain;
          prochain++;
          if (prochain === n) { ui.retour(d.ok, 'ok'); ui.suite(U.termine, finir); }
          else ui.retour(U.ordreOk, 'ok');
        } else {
          b.classList.remove('non'); void b.offsetWidth; b.classList.add('non');
          ui.retour(d.indices[Math.min(essais, d.indices.length - 1)], 'indice'); essais++;
        }
      };
      zone.appendChild(b);
    });
  };

  window.Defis = { creer: creer };
})();
