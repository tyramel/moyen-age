/* ==========================================================================
   Outils communs : mise en forme du texte, saisie tolérante, progression.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- L'enfant : prénom et année de naissance, gardés dans ce navigateur seulement ----------
     Pas de cookie, rien n'est envoyé : c'est le localStorage du navigateur. */
  var CLE_ENFANT = 'moyen-age-enfant';
  var enfant = null;
  try { enfant = JSON.parse(localStorage.getItem(CLE_ENFANT) || 'null'); } catch (e) { enfant = null; }
  var Enfant = {
    connu: function () { return !!enfant; },                       // la question a déjà été posée (même si on a passé)
    prenom: function () { return enfant && enfant.prenom ? enfant.prenom : ''; },
    annee: function () { return enfant && enfant.annee ? +enfant.annee : 0; },
    garder: function (prenom, annee) {
      enfant = { prenom: String(prenom || '').trim().slice(0, 30), annee: +annee || 0 };
      try { localStorage.setItem(CLE_ENFANT, JSON.stringify(enfant)); } catch (e) { /* tant pis : valable pour cette visite */ }
    }
  };
  /* Les mots qui changent selon l'enfant. {dePrenom} donne « de Léo » ou « d'Anna ». */
  function mots() {
    var p = Enfant.prenom(), a = Enfant.annee(), P = (window.CONTENU && window.CONTENU.perso) || {};
    var elision = /^[aeiouyhâàäéèêëîïôöûüœ]/i.test(p);
    return {
      prenom: p,
      dePrenom: p ? (elision ? " d'" : ' de ') + p : '',
      virgulePrenom: p ? ', ' + p : '',
      annee: a ? String(a) : '',
      naissance: a ? gabarit(P.naissance || '', { annee: a }) : (P.naissanceSans || '')
    };
  }
  function perso(s) {
    if (String(s).indexOf('{') < 0) return String(s);
    var m = mots();
    return String(s).replace(/\{(prenom|dePrenom|virgulePrenom|annee|naissance)\}/g, function (_, k) { return m[k]; });
  }

  /* ---------- Mise en forme : [[rouge du cahier]] et {{mot de la leçon}} ---------- */
  function fmt(s) {
    return perso(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/ ([?!:;»])/g, ' $1').replace(/« /g, '« ')
      .replace(/\[\[(.+?)\]\]/g, '<strong class="rouge">$1</strong>')
      .replace(/\{\{(.+?)\}\}/g, '<strong class="mot">$1</strong>')
      // un mot à trait d'union ne se coupe pas en fin de ligne (« haute-cour », « eux-mêmes »)
      .replace(/[A-Za-zÀ-ÖØ-öø-ÿŒœ]+(?:-[A-Za-zÀ-ÖØ-öø-ÿŒœ]+)+/g, '<span class="insecable">$&</span>');
  }
  /* Texte nu (sans marques), pour les attributs et les comparaisons */
  function nu(s) { return perso(s).replace(/\[\[|\]\]|\{\{|\}\}/g, ''); }
  function gabarit(s, o) { return String(s).replace(/\{(\w+)\}/g, function (_, k) { return o[k] != null ? o[k] : ''; }); }

  /* ---------- Saisie tolérante ----------
     On accepte : majuscules, accents, article devant le mot, espaces et tirets,
     et une ou deux lettres de travers selon la longueur du mot.
     On affiche toujours la bonne orthographe. */
  var ARTICLES = /^(le|la|les|l'|l’|un|une|des|du|de la|de l'|de l’)\s*/;
  function sansAccents(s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function norm(s) {
    return sansAccents(String(s).toLowerCase().trim()).replace(/œ/g, 'oe').replace(ARTICLES, '').replace(/[^a-z0-9]/g, '');
  }
  function sansArticle(s) { return String(s).toLowerCase().trim().replace(/’/g, "'").replace(ARTICLES, '').replace(/\s+/g, ' '); }

  /* Distance d'édition (une inversion de deux lettres voisines compte pour une faute) */
  function distance(a, b) {
    var d = [], i, j;
    for (i = 0; i <= a.length; i++) { d[i] = [i]; }
    for (j = 1; j <= b.length; j++) { d[0][j] = j; }
    for (i = 1; i <= a.length; i++) {
      for (j = 1; j <= b.length; j++) {
        var c = a[i - 1] === b[j - 1] ? 0 : 1;
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + c);
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
    return d[a.length][b.length];
  }
  function tolerance(n) { return n <= 4 ? 0 : n === 5 ? 1 : n <= 9 ? 2 : 3; }   // « dongeon » passe pour « donjon », « cour » ne passe pas pour « tour »

  /* Rend { etat: 'vide' | 'exact' | 'presque' | 'piege' | 'non', forme, message } */
  function juger(saisie, item) {
    var s = norm(saisie);
    if (!s) return { etat: 'vide' };
    if (item.nombre) {
      var chiffres = String(saisie).replace(/[^0-9]/g, '');
      return chiffres === item.reponses[0] ? { etat: 'exact', forme: item.reponses[0] } : { etat: 'non', forme: item.reponses[0] };
    }
    if (item.pieges) {
      for (var k in item.pieges) { if (norm(k) === s) return { etat: 'piege', message: item.pieges[k], forme: item.reponses[0] }; }
    }
    var mieux = Infinity, forme = item.reponses[0];
    item.reponses.forEach(function (r) {
      var cible = norm(r), dist = distance(s, cible);
      if (dist > 0 && /[sx]$/.test(s) && s.slice(0, -1) === cible) dist = 0.5;   // un pluriel en trop : on accepte et on montre la forme attendue
      if (dist < mieux) { mieux = dist; forme = r; }
    });
    var tol = item.strict ? 0 : tolerance(norm(forme).length);
    if (mieux === 0) {
      return { etat: sansArticle(saisie) === sansArticle(forme) ? 'exact' : 'presque', forme: forme };
    }
    if (mieux <= Math.max(tol, item.strict ? 0 : 0.5)) return { etat: 'presque', forme: forme };
    return { etat: 'non', forme: item.reponses[0] };
  }

  /* ---------- Progression gardée dans le navigateur (sans que le site en dépende) ---------- */
  var CLE = 'moyen-age-progres-v1';
  var etat = { defis: {}, pas: null };
  try { var lu = JSON.parse(localStorage.getItem(CLE) || 'null'); if (lu && lu.defis) etat = lu; } catch (e) { /* stockage indisponible */ }
  function garder() { try { localStorage.setItem(CLE, JSON.stringify(etat)); } catch (e) { /* tant pis */ } }
  var ecouteurs = [];
  var Progres = {
    a: function (id) { return !!etat.defis[id]; },
    gagner: function (id) { if (!etat.defis[id]) { etat.defis[id] = true; garder(); ecouteurs.forEach(function (f) { f(id); }); } },
    pas: function (id) { if (id) { etat.pas = id; garder(); } return etat.pas; },
    dernierPas: function () { return etat.pas; },
    quand: function (f) { ecouteurs.push(f); },
    effacer: function () { etat = { defis: {}, pas: null }; garder(); }
  };

  /* ---------- Petites aides DOM ---------- */
  function el(tag, classe, html) {
    var e = document.createElement(tag);
    if (classe) e.className = classe;
    if (html != null) e.innerHTML = html;
    return e;
  }

  /* ---------- La voix enregistrée : chaque texte lu a sa clé ----------
     Les mêmes fonctions servent au site (pour retrouver le fichier) et à
     outils/voix-liste.js (pour savoir quoi enregistrer). Le prénom n'est jamais lu. */
  function propre(s) { return String(s).replace(/\[\[|\]\]|\{\{|\}\}/g, '').replace(/\s+/g, ' ').trim(); }
  function sansPrenom(s) { return String(s).replace(/\{(prenom|dePrenom|virgulePrenom)\}/g, ''); }
  function cleVoix(s) {
    s = propre(s).normalize('NFC');
    var h = 5381; for (var i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
    return h.toString(36);
  }
  /* Un texte à lire, découpé là où il change selon l'enfant (l'année de naissance) */
  function decouperVoix(gab) {
    return sansPrenom(gab).split(/(\{naissance\})/).map(function (x) { return x === '{naissance}' ? perso(x) : x; })
      .map(propre).filter(function (x) { return x; });
  }
  var Voix = {
    cle: cleVoix, propre: propre,
    texte: function (t) { return decouperVoix(t); },
    titre: function (ch) { return decouperVoix(ch.titre + '. ' + ch.accroche); },
    introDefi: function (d) { return [propre(d.titre + '. ' + d.consigne + (d.objectifTexte ? ' ' + d.objectifTexte : ''))]; },
    question: function (q, choix) {
      if (!q) return [];
      q = propre(sansPrenom(q));
      if (!(choix && choix.length > 1)) return [q];
      var c = choix.map(function (x, i) { return i === 0 && !/[?…:]$/.test(q) ? x.charAt(0).toUpperCase() + x.slice(1) : x; });
      return [propre(q + (/[?…:.]$/.test(q) ? ' ' : '. ') + c.join(' ? ') + ' ?')];
    }
  };

  window.Outils = { fmt: fmt, perso: perso, Enfant: Enfant, Voix: Voix, nu: nu, gabarit: gabarit, norm: norm, juger: juger, distance: distance, Progres: Progres, el: el };
})();
