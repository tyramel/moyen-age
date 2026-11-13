/* ==========================================================================
   Schémas dessinés en SVG : la frise, les outils, la charrue, l'assolement.
   Tous dans un cadre 1600 x 900, comme les images, pour que la caméra et les
   étiquettes fonctionnent de la même façon. Aucun texte en dur : les mots
   viennent de contenu.js (CONTENU.etiquettes).
   Palette : celle des gouaches (voir charte-graphique.md).
   ========================================================================== */
(function () {
  'use strict';

  var ENCRE = '#2a1d14', BOIS = '#9a6a3c', BOIS_C = '#b98a55', BOIS_F = '#6f4726', FER = '#7d8a96', FER_C = '#aab6c0', FER_F = '#566270',
      TERRE = '#7a5535', TERRE_F = '#5a3d28', TERRE_C = '#a47b52', OR = '#e3b23c', OR_F = '#c8932a', ROUGE = '#c1272d', VERT = '#8fb85a', VERT_F = '#5f8a3a';

  var svg = function (nom, corps) {
    return '<svg class="dessin dessin--' + nom + '" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid meet">' + corps + '</svg>';
  };
  var echap = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); };

  /* ====================================================================
     LA FRISE : de l'Antiquité à aujourd'hui. Une année = une position exacte.
     ==================================================================== */
  var AY = 380;                                        // hauteur de la flèche
  var X = function (an) { return 80 + (an - 300) / 1750 * 1440; };
  var r1 = function (n) { return Math.round(n * 10) / 10; };

  function frise(C) {
    var E = C.etiquettes.frise, o = '';
    var annee = new Date().getFullYear();
    var xAuj = r1(X(Math.max(annee, 2026)));
    // la flèche et ses petits traits, un par siècle
    o += '<line x1="50" y1="' + AY + '" x2="1545" y2="' + AY + '" stroke="' + ENCRE + '" stroke-width="7" stroke-linecap="round"/>';
    o += '<path d="M1540 ' + (AY - 20) + ' L1578 ' + AY + ' L1540 ' + (AY + 20) + ' Z" fill="' + ENCRE + '"/>';
    for (var a = 400; a <= 2000; a += 100) {
      o += '<line x1="' + r1(X(a)) + '" y1="' + (AY - 13) + '" x2="' + r1(X(a)) + '" y2="' + (AY + 13) + '" stroke="' + ENCRE + '" stroke-width="2.5"/>';
    }
    // le Moyen Âge
    o += '<g data-f="2-9"><rect x="' + r1(X(476)) + '" y="' + (AY - 30) + '" width="' + r1(X(1492) - X(476)) + '" height="60" rx="5" fill="' + OR + '"/></g>';
    o += '<g data-f="2-4,7"><text class="t-titre" x="540" y="' + (AY - 62) + '" text-anchor="middle" font-size="62">' + echap(E.ma) + '</text>';
    o += '<line x1="' + r1(X(476)) + '" y1="' + (AY - 44) + '" x2="' + r1(X(476)) + '" y2="' + (AY + 46) + '" stroke="' + ENCRE + '" stroke-width="4"/>';
    o += '<line x1="' + r1(X(1492)) + '" y1="' + (AY - 44) + '" x2="' + r1(X(1492)) + '" y2="' + (AY + 46) + '" stroke="' + ENCRE + '" stroke-width="4"/>';
    o += '<text x="' + r1(X(476)) + '" y="' + (AY + 88) + '" text-anchor="middle" font-size="40" font-weight="700">' + E.d476 + '</text>';
    o += '<text x="' + r1(X(1492)) + '" y="' + (AY + 88) + '" text-anchor="middle" font-size="40" font-weight="700">' + E.d1492 + '</text></g>';
    o += '<g data-f="3-4"><text x="70" y="' + (AY + 128) + '" font-size="25">' + echap(E.d476txt) + '</text>';
    o += '<text x="' + r1(X(1492)) + '" y="' + (AY + 128) + '" text-anchor="middle" font-size="25">' + echap(E.d1492txt) + '</text></g>';
    // avant, après, et la durée
    o += '<g data-f="4"><text x="140" y="' + (AY - 52) + '" text-anchor="middle" font-size="30" font-style="italic">' + echap(E.antiquite) + '</text>';
    o += '<text x="1265" y="' + (AY - 52) + '" text-anchor="middle" font-size="30" font-style="italic">' + echap(E.modernes) + '</text>';
    o += '<path d="M' + r1(X(476)) + ' ' + (AY - 148) + ' v-14 H' + r1(X(1492)) + ' v14" fill="none" stroke="' + ENCRE + '" stroke-width="3"/>';
    o += '<text x="' + r1((X(476) + X(1492)) / 2) + '" y="' + (AY - 178) + '" text-anchor="middle" font-size="30" font-weight="700">' + echap(E.milleAns) + '</text></g>';
    // aujourd'hui et la naissance de l'enfant (si on la connaît)
    var nee = window.Outils.Enfant.annee();
    o += '<g data-f="1-4,7"><line x1="' + xAuj + '" y1="' + AY + '" x2="' + xAuj + '" y2="' + (AY - 112) + '" stroke="' + ENCRE + '" stroke-width="4"/>';
    o += '<path d="M' + xAuj + ' ' + (AY - 112) + ' l-54 16 l54 16 Z" fill="' + ROUGE + '"/>';
    if (nee) {
      o += '<circle cx="' + r1(X(nee)) + '" cy="' + AY + '" r="9" fill="' + ROUGE + '" stroke="#f8efdb" stroke-width="3"/>';
      o += '<text x="1535" y="' + (AY + 70) + '" text-anchor="end" font-size="27" font-weight="700" fill="' + ROUGE + '" style="fill:' + ROUGE + '">' + echap(window.Outils.perso(E.naissance)) + '</text>';
    }
    o += '</g>';
    o += '<g data-f="1-4"><text x="1535" y="' + (AY - 128) + '" text-anchor="end" font-size="30" font-weight="700">' + echap(E.auj) + '</text></g>';
    // la leçon, et la distance jusqu'à l'enfant
    var xEnfant = nee || Math.max(annee, 2026);
    o += '<g data-f="7"><rect x="' + r1(X(1000)) + '" y="' + (AY - 38) + '" width="' + r1(X(1300) - X(1000)) + '" height="76" rx="5" fill="' + ROUGE + '"/>';
    o += '<text x="' + r1((X(1000) + X(1300)) / 2) + '" y="' + (AY + 88) + '" text-anchor="middle" font-size="36" font-weight="700" style="fill:' + ROUGE + '">' + echap(E.lecon) + '</text>';
    o += '<path d="M' + r1(X(1100)) + ' ' + (AY - 46) + ' Q ' + r1((X(1100) + X(xEnfant)) / 2) + ' ' + (AY - 340) + ' ' + r1(X(xEnfant)) + ' ' + (AY - 20) + '" fill="none" stroke="' + ENCRE + '" stroke-width="3.5" stroke-dasharray="4 11" stroke-linecap="round"/>';
    o += '<text x="' + r1((X(1100) + X(xEnfant)) / 2) + '" y="' + (AY - 212) + '" text-anchor="middle" font-size="32" font-weight="700">' + echap(E.neufCents) + '</text></g>';
    // vue rapprochée : les siècles
    var siecles = [[1001, 1100, E.s11, '#edc65a'], [1101, 1200, E.s12, '#d9a03a'], [1201, 1300, E.s13, '#edc65a']];
    o += '<g data-f="5-6,8-9">';
    siecles.forEach(function (s) {
      var x0 = X(s[0] - 1), x1 = X(s[1]);
      o += '<rect x="' + r1(x0) + '" y="' + (AY - 30) + '" width="' + r1(x1 - x0) + '" height="60" fill="' + s[3] + '"/>';
      o += '<line x1="' + r1(x0) + '" y1="' + (AY - 36) + '" x2="' + r1(x0) + '" y2="' + (AY + 36) + '" stroke="' + ENCRE + '" stroke-width="1.6"/>';
      o += '<text class="t-titre" x="' + r1((x0 + x1) / 2) + '" y="' + (AY - 42) + '" text-anchor="middle" font-size="12">' + echap(s[2]) + '</text>';
    });
    o += '<line x1="' + r1(X(1300)) + '" y1="' + (AY - 36) + '" x2="' + r1(X(1300)) + '" y2="' + (AY + 36) + '" stroke="' + ENCRE + '" stroke-width="1.6"/></g>';
    o += '<g data-f="6">';
    siecles.forEach(function (s) {
      o += '<text x="' + r1((X(s[0] - 1) + X(s[1])) / 2) + '" y="' + (AY + 49) + '" text-anchor="middle" font-size="7.2" font-weight="700">' + s[0] + ' à ' + s[1] + '</text>';
    });
    o += '</g>';
    // le Xe siècle : le roi perd du pouvoir
    var xa = X(900), xb = X(1000), xm = r1((xa + xb) / 2);
    o += '<g data-f="8-9"><rect x="' + r1(xa) + '" y="' + (AY - 30) + '" width="' + r1(xb - xa) + '" height="60" fill="#c9b27a"/>';
    o += '<line x1="' + r1(xa) + '" y1="' + (AY - 36) + '" x2="' + r1(xa) + '" y2="' + (AY + 36) + '" stroke="' + ENCRE + '" stroke-width="1.6"/>';
    o += '<text class="t-titre" x="' + xm + '" y="' + (AY - 42) + '" text-anchor="middle" font-size="12">' + echap(E.s10) + '</text>';
    o += '<g transform="translate(' + (xm - 11) + ' ' + (AY - 84) + ') rotate(-14 11 8)"><path d="M0 14 L2 3 L7 9 L11 0 L15 9 L20 3 L22 14 Z" fill="' + OR_F + '" stroke="' + ENCRE + '" stroke-width="1"/></g>';
    o += '</g><g data-f="8"><text x="' + xm + '" y="' + (AY + 49) + '" text-anchor="middle" font-size="7" font-weight="700">' + echap(E.roi) + '</text></g>';
    // des châteaux poussent
    o += '<g data-f="9">';
    [1040, 1150, 1250].forEach(function (an) {
      o += '<g transform="translate(' + r1(X(an) - 12) + ' ' + (AY - 92) + ')"><path d="M0 26 V6 h4 v4 h4 V0 h3 v4 h2 V0 h3 v10 h4 V6 h4 v20 Z" fill="#d9c58a" stroke="' + ENCRE + '" stroke-width="1"/><path d="M10 26 v-8 a2.5 2.5 0 0 1 5 0 v8 Z" fill="' + ENCRE + '"/></g>';
    });
    o += '</g>';
    return svg('frise', o);
  }

  /* ====================================================================
     LES OUTILS
     ==================================================================== */
  function outils() {
    var o = '';
    var ombre = function (cx, w) { return '<ellipse cx="' + cx + '" cy="476" rx="' + w + '" ry="12" fill="#b9a273" opacity=".55"/>'; };
    var trait = function (d, coul, ep) { return '<path d="' + d + '" fill="none" stroke="' + coul + '" stroke-width="' + ep + '" stroke-linecap="round" stroke-linejoin="round"/>'; };
    // la houe
    o += '<g>' + ombre(215, 110) + trait('M150 110 L255 440', BOIS_F, 22) + trait('M150 110 L255 440', BOIS, 15);
    o += '<path d="M268 452 L242 424 L150 452 L140 486 Z" fill="' + FER + '"/><path d="M268 452 L242 424 L150 452 L156 462 Z" fill="' + FER_C + '"/><circle cx="254" cy="438" r="13" fill="' + FER_F + '"/></g>';
    // la charrue de bois
    o += '<g>' + ombre(520, 160) + trait('M446 318 L690 262', BOIS_F, 24) + trait('M446 318 L690 262', BOIS, 17);
    o += trait('M398 130 Q420 300 500 430', BOIS_F, 24) + trait('M398 130 Q420 300 500 430', BOIS_C, 16);
    o += '<path d="M476 410 L636 462 L476 462 Z" fill="' + BOIS_F + '"/>' + trait('M374 142 L424 120', BOIS_F, 16) + '</g>';
    // la faucille
    o += '<g>' + ombre(835, 110) + trait('M770 452 L792 384', BOIS_F, 26) + trait('M770 452 L792 384', BOIS, 18);
    o += '<path d="M786 392 C730 248 858 118 936 252 C872 176 792 262 812 390 Z" fill="' + FER + '"/><path d="M790 380 C742 256 852 142 924 240 C860 172 778 250 798 382 Z" fill="' + FER_C + '" opacity=".8"/></g>';
    // la faux
    o += '<g data-f="2">' + ombre(1150, 170) + trait('M1012 104 L1130 452', BOIS_F, 19) + trait('M1012 104 L1130 452', BOIS_C, 12);
    o += trait('M1040 196 L1076 184', BOIS_F, 13) + trait('M1076 300 L1112 288', BOIS_F, 13);
    o += '<path d="M1124 456 C1220 478 1304 444 1346 376 C1294 426 1216 444 1132 426 Z" fill="' + FER + '"/><path d="M1130 446 C1222 462 1296 434 1340 384" fill="none" stroke="' + FER_C + '" stroke-width="5" stroke-linecap="round"/></g>';
    // la hache
    o += '<g data-f="2">' + ombre(1400, 90) + trait('M1410 120 L1410 458', BOIS_F, 24) + trait('M1410 120 L1410 458', BOIS, 16);
    o += '<path d="M1398 146 L1398 236 C1360 242 1328 256 1304 274 C1316 222 1316 170 1298 116 C1326 134 1360 146 1398 146 Z" fill="' + FER + '"/>';
    o += '<path d="M1304 274 C1316 222 1316 170 1298 116 C1312 172 1314 224 1320 262 Z" fill="' + FER_C + '"/></g>';
    return svg('outils', o);
  }

  /* ====================================================================
     LA CHARRUE À ROUES ET À VERSOIR
     De l'avant (à droite) vers l'arrière : roues, coutre, soc, versoir, mancheron.
     Positions établies d'après le doc 6 de la fiche H4 et vérifiées
     (voir verification.md, « charrue »).
     ==================================================================== */
  var SOL = 520;
  function roue(cx, cy, r, fonce) {
    var o = '<g class="roue-tourne" data-cx="' + cx + '" data-cy="' + cy + '">';
    o += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="' + (fonce ? '#4b3a2c' : FER_F) + '" stroke-width="9"/>';
    o += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r - 10) + '" fill="none" stroke="' + (fonce ? BOIS_F : BOIS) + '" stroke-width="13"/>';
    for (var i = 0; i < 8; i++) {
      var a = i * Math.PI / 4;
      o += '<line x1="' + cx + '" y1="' + cy + '" x2="' + r1(cx + (r - 14) * Math.cos(a)) + '" y2="' + r1(cy + (r - 14) * Math.sin(a)) + '" stroke="' + (fonce ? BOIS_F : BOIS_C) + '" stroke-width="9" stroke-linecap="round"/>';
    }
    o += '<circle cx="' + cx + '" cy="' + cy + '" r="17" fill="' + (fonce ? '#4b3a2c' : BOIS_F) + '"/><circle cx="' + cx + '" cy="' + cy + '" r="6" fill="' + FER_C + '"/></g>';
    return o;
  }
  function fleche(d, pointe) {
    return '<path d="' + d + '" fill="none" stroke="' + ROUGE + '" stroke-width="6" stroke-linecap="round" class="trait-anime"/><path d="' + pointe + '" fill="' + ROUGE + '"/>';
  }
  function charrue() {
    var o = '<defs><clipPath id="c-devant"><rect x="992" y="430" width="620" height="100"/></clipPath><clipPath id="c-derriere"><rect x="-10" y="440" width="560" height="90"/></clipPath></defs>';
    // la terre : une bande, pas plus, pour laisser le papier à la légende
    o += '<path d="M0 ' + SOL + ' H1600 V596 C1400 606 1200 590 1000 600 C800 610 600 592 400 602 C250 608 100 596 0 602 Z" fill="' + TERRE + '"/>';
    o += '<path d="M0 ' + (SOL + 44) + ' C200 ' + (SOL + 54) + ' 400 ' + (SOL + 36) + ' 600 ' + (SOL + 48) + ' S1000 ' + (SOL + 40) + ' 1200 ' + (SOL + 50) + ' S1500 ' + (SOL + 42) + ' 1600 ' + (SOL + 48) + ' V602 H0 Z" fill="' + TERRE_F + '" opacity=".55"/>';
    // devant la charrue : le chaume, pas encore labouré (il défile)
    var chaume = '';
    for (var x = 980; x < 1760; x += 20) {
      var h = 12 + (x * 7 % 13);
      chaume += '<path d="M' + x + ' ' + SOL + ' l-4 -' + h + ' M' + (x + 7) + ' ' + SOL + ' l3 -' + (h - 4) + '" stroke="' + (x % 40 ? VERT_F : OR_F) + '" stroke-width="3.2" stroke-linecap="round" fill="none"/>';
    }
    o += '<g clip-path="url(#c-devant)"><g class="defile">' + chaume + '</g></g>';
    // derrière : la terre retournée, en mottes (elle défile aussi)
    var mottes = '';
    for (var m = -20; m < 740; m += 50) {
      mottes += '<path d="M' + m + ' ' + (SOL + 4) + ' q10 -34 27 -32 q20 2 28 32 Z" fill="' + (m % 100 ? TERRE_C : '#8d6742') + '"/>';
    }
    o += '<g clip-path="url(#c-derriere)"><g class="defile">' + mottes + '</g></g>';
    // le sillon ouvert par le coutre et le soc
    o += '<path d="M972 ' + SOL + ' L980 586 L650 592 L560 ' + SOL + ' Z" fill="' + TERRE_F + '" opacity=".5"/>';

    // la deuxième roue, derrière
    o += '<g class="piece" data-piece="roues">' + roue(1226, 408, 97, true) + '</g>';
    // le timon et l'age (la grande poutre)
    o += '<g class="piece" data-piece="bati"><path d="M386 312 L1440 388 L1440 414 L386 342 Z" fill="' + BOIS + '"/><path d="M386 312 L1440 388 L1440 396 L386 321 Z" fill="' + BOIS_C + '"/>';
    o += '<path d="M694 336 L724 338 L728 552 L700 552 Z" fill="' + BOIS_F + '"/></g>';
    // le versoir : la planche courbe qui retourne la terre
    o += '<g class="piece" data-piece="versoir"><path d="M776 548 C736 478 654 414 556 380 L512 428 C586 468 638 528 662 590 Z" fill="' + BOIS_C + '"/>';
    o += '<path d="M556 380 L512 428 C586 468 638 528 662 590 L690 584 C664 524 612 462 542 410 Z" fill="' + BOIS + '"/>';
    o += '<path d="M600 404 C664 446 716 500 748 556 M574 424 C636 464 686 516 714 574" fill="none" stroke="' + BOIS_F + '" stroke-width="3" opacity=".7"/></g>';
    // le soc : la lame de fer qui coupe la terre par en dessous
    o += '<g class="piece" data-piece="soc"><path d="M904 588 L772 538 L692 546 L652 592 L796 600 Z" fill="' + FER + '"/><path d="M904 588 L772 538 L762 548 L880 590 Z" fill="' + FER_C + '"/></g>';
    // le coutre : le couteau de fer qui fend la terre devant le soc
    o += '<g class="piece" data-piece="coutre"><path d="M910 338 L948 341 L990 ' + SOL + ' L982 588 L956 540 Z" fill="' + FER + '"/><path d="M938 341 L948 341 L990 ' + SOL + ' L982 588 Z" fill="' + FER_C + '"/>';
    o += '<rect x="902" y="330" width="56" height="34" rx="4" fill="' + BOIS_F + '"/></g>';
    // le mancheron : la poignée, à l'arrière
    o += '<g class="piece" data-piece="mancheron"><path d="M214 128 C292 200 362 282 424 352 S566 544 656 574" fill="none" stroke="' + BOIS_F + '" stroke-width="30" stroke-linecap="round"/>';
    o += '<path d="M214 128 C292 200 362 282 424 352 S566 544 656 574" fill="none" stroke="' + BOIS + '" stroke-width="21" stroke-linecap="round"/>';
    o += '<path d="M190 152 L242 106" fill="none" stroke="' + BOIS_F + '" stroke-width="24" stroke-linecap="round"/></g>';
    // la roue de devant
    o += '<g class="piece" data-piece="roues">' + roue(1190, 420, 100, false) + '</g>';

    // les gestes : ce que fait chaque pièce
    o += '<g class="geste" data-geste="coutre">' + fleche('M1024 370 V560', 'M1008 556 L1024 590 L1040 556 Z') + '</g>';
    o += '<g class="geste" data-geste="soc">' + fleche('M664 634 H872', 'M868 618 L902 634 L868 650 Z') + '</g>';
    o += '<g class="geste" data-geste="versoir">' + fleche('M700 470 C660 400 560 392 500 462', 'M486 440 L492 480 L524 462 Z') + '</g>';
    o += '<g class="geste" data-geste="roues">' + fleche('M1112 330 A118 118 0 0 1 1270 330', 'M1262 312 L1294 344 L1252 350 Z') + '</g>';
    return svg('charrue', o);
  }

  /* ====================================================================
     L'ASSOLEMENT TRIENNAL : un champ, trois parties, trois ans.
     Cultures attestées : blé (céréale d'hiver), avoine (céréale de printemps),
     jachère. Pas de maïs (voir verification.md).
     ==================================================================== */
  var CX = 800, CY = 312, R = 242;
  function part(a0, a1, motif) {
    var p = function (a) { var t = a * Math.PI / 180; return r1(CX + R * Math.cos(t)) + ' ' + r1(CY + R * Math.sin(t)); };
    return '<path d="M' + CX + ' ' + CY + ' L' + p(a0) + ' A' + R + ' ' + R + ' 0 0 1 ' + p(a1) + ' Z" fill="url(#' + motif + ')" stroke="' + ENCRE + '" stroke-width="3" stroke-linejoin="round"/>';
  }
  function assolement(C) {
    var E = C.etiquettes.assolement, o = '<defs>';
    o += '<pattern id="m-ble" width="34" height="34" patternUnits="userSpaceOnUse"><rect width="34" height="34" fill="' + OR + '"/><path d="M8 28 V10 M8 14 l-5 -5 M8 14 l5 -5 M8 20 l-5 -5 M8 20 l5 -5 M25 32 V16 M25 20 l-5 -5 M25 20 l5 -5" stroke="' + OR_F + '" stroke-width="2.4" stroke-linecap="round" fill="none"/></pattern>';
    o += '<pattern id="m-avoine" width="30" height="30" patternUnits="userSpaceOnUse"><rect width="30" height="30" fill="' + VERT + '"/><path d="M7 26 q2 -12 -2 -18 M7 26 q3 -10 8 -13 M22 28 q-2 -10 2 -16 M22 28 q-4 -8 -8 -10" stroke="' + VERT_F + '" stroke-width="2.3" stroke-linecap="round" fill="none"/></pattern>';
    o += '<pattern id="m-jachere" width="46" height="46" patternUnits="userSpaceOnUse"><rect width="46" height="46" fill="' + TERRE_C + '"/><path d="M4 12 h12 M26 30 h14 M10 38 h8 M30 8 h9" stroke="' + TERRE + '" stroke-width="2.6" stroke-linecap="round"/><path d="M22 22 l-3 -8 M22 22 l1 -9 M22 22 l5 -7" stroke="' + VERT_F + '" stroke-width="2.2" stroke-linecap="round" fill="none"/></pattern>';
    o += '</defs>';
    // la terre fatiguée, sous les cultures
    o += '<circle cx="' + CX + '" cy="' + (CY + 10) + '" r="' + (R + 6) + '" fill="#b9a273" opacity=".6"/>';
    o += '<circle cx="' + CX + '" cy="' + CY + '" r="' + R + '" fill="#c2a878" stroke="' + ENCRE + '" stroke-width="3"/>';
    o += '<path d="M690 200 l40 46 l-18 40 l44 30 M900 180 l-30 52 l36 44 M760 420 l50 -30 l40 44 l52 -20 M640 330 l52 16" stroke="#9c8358" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
    // les trois cultures (ce groupe tourne d'un tiers de tour par an)
    o += '<g data-f="1-4"><g class="cultures">' + part(150, 270, 'm-ble') + part(270, 390, 'm-avoine') + part(30, 150, 'm-jachere') + '</g>';
    // les lettres des trois parties, fixes
    [[670, 237, E.partieA], [930, 237, E.partieB], [800, 462, E.partieC]].forEach(function (l) {
      o += '<circle cx="' + l[0] + '" cy="' + l[1] + '" r="30" fill="#f8efdb" stroke="' + ENCRE + '" stroke-width="3"/><text x="' + l[0] + '" y="' + (l[1] + 13) + '" text-anchor="middle" font-size="36" font-weight="700">' + l[2] + '</text>';
    });
    // l'année
    o += '<text class="t-titre annee" x="330" y="330" text-anchor="middle" font-size="76">' + echap(E.an1) + '</text>';
    // la légende
    [['m-ble', E.ble, 236], ['m-avoine', E.avoine, 312], ['m-jachere', E.jachere, 388]].forEach(function (l) {
      o += '<rect x="1130" y="' + (l[2] - 26) + '" width="52" height="52" rx="8" fill="url(#' + l[0] + ')" stroke="' + ENCRE + '" stroke-width="2.5"/><text x="1200" y="' + (l[2] + 12) + '" font-size="36" font-weight="700">' + echap(l[1]) + '</text>';
    });
    o += '</g>';
    return svg('assolement', o);
  }

  /* ====================================================================
     ÉTATS : ce que chaque schéma montre à une étape donnée
     ==================================================================== */
  function visible(regle, f) {
    return String(regle).split(',').some(function (bout) {
      var b = bout.split('-'), min = +b[0], max = b.length > 1 ? +b[1] : +b[0];
      return f >= min && f <= max;
    });
  }
  function etat(nom, racine, f, C) {
    var s = racine.querySelector('svg'); if (!s) return;
    if (typeof f === 'number') {
      s.querySelectorAll('[data-f]').forEach(function (g) { g.classList.toggle('on', visible(g.getAttribute('data-f'), f)); });
    }
    if (nom === 'charrue') {
      var piece = typeof f === 'string' ? f : null;
      s.classList.toggle('focus', !!piece && piece !== 'tout');
      s.querySelectorAll('.piece').forEach(function (p) { p.classList.toggle('actif', p.getAttribute('data-piece') === piece); });
      s.querySelectorAll('.geste').forEach(function (g) { g.classList.toggle('on', g.getAttribute('data-geste') === piece); });
    }
    if (nom === 'assolement' && typeof f === 'number') {
      var an = Math.max(1, Math.min(3, f)), E = C.etiquettes.assolement;
      var t = s.querySelector('.annee'); if (t) t.textContent = [E.an1, E.an2, E.an3][an - 1];
      var g = s.querySelector('.cultures');
      if (window.gsap && g) window.gsap.to(g, { rotation: -120 * (an - 1), svgOrigin: CX + ' ' + CY, duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1.6, ease: 'power3.inOut' });
    }
  }

  /* La charrue avance : le sol défile et les roues tournent, seulement quand on la regarde */
  var vies = {};
  function vivre(nom, racine, actif) {
    if (nom !== 'charrue' || !window.gsap) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (actif && !vies[nom]) {
      var tl = window.gsap.timeline({ repeat: -1, defaults: { ease: 'none' } });
      tl.to(racine.querySelectorAll('.defile'), { x: -100, duration: 2.2 }, 0);
      racine.querySelectorAll('.roue-tourne').forEach(function (r) {
        tl.to(r, { rotation: 45, svgOrigin: r.getAttribute('data-cx') + ' ' + r.getAttribute('data-cy'), duration: 2.2 }, 0);
      });
      vies[nom] = tl;
    } else if (actif) { vies[nom].play(); }
    else if (vies[nom]) { vies[nom].pause(); }
  }

  window.Dessins = { frise: frise, outils: outils, charrue: charrue, assolement: assolement, etat: etat, vivre: vivre };
})();
