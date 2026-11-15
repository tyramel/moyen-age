/* ==========================================================================
   LE MOYEN ÂGE : TOUT LE TEXTE DU SITE
   --------------------------------------------------------------------------
   Ce fichier ne contient que du texte. Pour corriger une phrase, on la change
   ici et nulle part ailleurs. Le fichier script.md est fabriqué à partir de
   celui-ci (commande : node outils/generer-script.js).

   Deux marques dans les phrases :
     [[mot]]  = mot essentiel, à savoir par cœur (affiché en rouge)
     {{mot}}  = autre mot de la leçon à retenir (affiché en gras)
   Chaque phrase a une source dans verification.md, retrouvée par son code
   (ouv-1, tps-2, sgn-5...).
   ========================================================================== */
window.CONTENU = {

  meta: {
    titre: "Le Moyen Âge{dePrenom}",
    sousTitre: "La vie dans une seigneurie, au temps des châteaux forts",
    invitation: "Fais défiler pour commencer"
  },

  /* ------------------------------------------------------------------ */
  chapitres: [

    /* ============================ OUVERTURE ========================== */
    {
      id: "ouverture", numero: "", titre: "Le Moyen Âge{dePrenom}",
      accroche: "La vie dans une seigneurie, au temps des châteaux forts",
      pas: [
        { id: "ouv-1", t: "Imagine la scène. Une famille se dépêche de monter vers le château." },
        { id: "ouv-2", t: "Là-bas, à l'horizon, des cavaliers armés arrivent." },
        { id: "ouv-3", t: "Au village, on a peur d'eux. Alors tout le monde court se mettre à l'abri derrière les murs du château." },
        { id: "ouv-4", t: "Qui sont ces cavaliers ? Qui habite ce château ? Et pourquoi l'avoir construit en haut d'une colline ?" },
        { id: "ouv-5", t: "Pour répondre, il faut remonter le temps." }
      ]
    },

    /* ============================ 1. LE TEMPS ======================== */
    {
      id: "temps", numero: "1", titre: "Remonter le temps",
      accroche: "D'abord, où sommes-nous dans le temps ?",
      pas: [
        { id: "tps-1", t: "Voici une flèche du temps. Tout au bout, à droite, c'est aujourd'hui. {naissance}" },
        { id: "tps-2", t: "Les historiens découpent le passé en grandes périodes. L'une d'elles s'appelle le {{Moyen Âge}}. Elle commence en 476 et se termine en 1492." },
        { id: "tps-3", t: "476, c'est la fin de l'Empire romain d'Occident. 1492, c'est l'arrivée de Christophe Colomb en Amérique." },
        { id: "tps-4", t: "« Moyen » veut dire « du milieu ». Le Moyen Âge est la période du milieu, entre l'Antiquité et les Temps modernes. Il dure environ mille ans." },
        { id: "tps-5", t: "Pour se repérer, on compte en siècles. Un {{siècle}}, c'est cent ans. Les siècles s'écrivent en chiffres romains : X, c'est 10. XI, c'est 11. XII, c'est 12. XIII, c'est 13." },
        { id: "tps-6", t: "Le tout premier siècle va de l'an 1 à l'an 100. En comptant de cent en cent, le XIe siècle va de 1001 à 1100, le XIIe de 1101 à 1200, et le XIIIe de 1201 à 1300." },
        { id: "tps-7", t: "Ici, on va découvrir ces trois siècles : le XIe, le XIIe et le XIIIe. Entre un enfant de l'an 1100 et toi, il y a plus de neuf cents ans." },
        { id: "tps-defi", defi: "temps" },
        { id: "tps-8", t: "Et juste avant ? Au Xe siècle, le roi a de moins en moins de pouvoir. Des hommes puissants, qui possèdent des terres, se font la guerre : ce sont les {{seigneurs}}." },
        { id: "tps-9", t: "Pour se défendre, les seigneurs construisent des {{châteaux forts}} sur une hauteur, c'est-à-dire en haut d'une colline." },
        { id: "tps-10", t: "Tu te souviens du début ? Le château est celui d'un seigneur. Les cavaliers sont les guerriers d'un autre seigneur, son ennemi." }
      ]
    },

    /* ============================ 2. LA SEIGNEURIE =================== */
    {
      id: "seigneurie", numero: "2", titre: "La seigneurie",
      accroche: "Tout un paysage pour un seul homme",
      pas: [
        { id: "sgn-1", t: "Voici le paysage, vu d'en haut. Presque tout ce que tu vois appartient à un seul homme : le seigneur." },
        { id: "sgn-2", t: "[[Tout ce qui appartient]] au seigneur s'appelle la [[seigneurie]]." },
        { id: "sgn-3", t: "En haut de la colline, le [[château]]. C'est là que vit le seigneur." },
        { id: "sgn-4", t: "À gauche, les bois. Ils font partie de la seigneurie, eux aussi." },
        { id: "sgn-5", t: "Au pied du château, de grands champs : les [[réserves]]. Ce sont les terres cultivées pour le seigneur." },
        { id: "sgn-6", t: "Qui les cultive ? Les paysans, et sans être payés. Ce travail gratuit que le paysan doit au seigneur s'appelle la [[corvée]]." },
        { id: "sgn-7", t: "Plus loin, des champs plus étroits : les [[tenures]]. Ce sont les terres occupées par les paysans. Ils y habitent et les cultivent." },
        { id: "sgn-8", t: "Mais la terre reste au seigneur. Pour habiter là et cultiver la terre, les paysans doivent lui payer un [[loyer]]." },
        { id: "sgn-defi-champs", defi: "champs" },
        { id: "sgn-9", t: "Descendons au village." },
        { id: "sgn-10", t: "Pour transformer son grain en farine, le paysan va au [[moulin]]." },
        { id: "sgn-11", t: "Pour cuire son pain, il va au [[four]]." },
        { id: "sgn-12", t: "Pour écraser son raisin et en tirer le jus, il va au [[pressoir]]." },
        { id: "sgn-13", t: "Le moulin, le four et le pressoir appartiennent au seigneur. Les habitants sont obligés de s'en servir." },
        { id: "sgn-13b", t: "Et pour s'en servir, ils doivent payer. Ce que l'on est obligé de payer ainsi s'appelle un {{impôt}}. Ce droit du seigneur d'obliger les habitants à utiliser son moulin, son four et son pressoir s'appelle la {{banalité}}." },
        { id: "sgn-14", t: "Au milieu du village, l'église. Les paysans paient aussi un impôt à l'Église : la {{dîme}}." },
        { id: "sgn-14b", t: "La dîme, c'est souvent un dixième des récoltes : un sac de grain sur dix. Elle fait vivre le prêtre et sert à entretenir l'église." },
        { id: "sgn-15", t: "Et pour passer le pont ? Il faut encore payer. C'est le {{péage}}." },
        { id: "sgn-16", t: "Un loyer, des corvées, des impôts pour le four, le moulin et le pressoir, la dîme, le péage : le paysan doit beaucoup." },
        { id: "sgn-17", t: "En échange, le seigneur protège les habitants." },
        { id: "sgn-defi", defi: "seigneurie" }
      ]
    },

    /* ============================ 3. LES PAYSANS ===================== */
    {
      id: "paysans", numero: "3", titre: "Les paysans",
      accroche: "Ceux qui travaillent la terre",
      pas: [
        { id: "pay-1", t: "Entrons chez une famille de paysans. Leur maison est une pauvre {{chaumière}} : une petite maison au toit de paille." },
        { id: "pay-2", t: "Au repas, il y a de la {{bouillie}}, des céréales cuites, et du {{pain noir}}, un pain très sombre." },
        { id: "pay-3", t: "Les paysans fabriquent eux-mêmes leurs vêtements, dans une {{toile grossière}} : un tissu épais, qui gratte." },
        { id: "pay-4", t: "Ils vivent dans des conditions misérables. Si la récolte est mauvaise, la nourriture manque, et ils peuvent mourir de faim." },
        { id: "pay-5", t: "Il existe deux sortes de paysans : les {{serfs}} et les {{vilains}}. Attention : au Moyen Âge, « vilain » ne veut pas dire « méchant ». C'est le nom d'un paysan libre. Et « serf » s'écrit avec un s : rien à voir avec le cerf de la forêt." },
        { id: "pay-6", t: "Les serfs appartiennent au seigneur, comme la terre qu'ils travaillent. Ils n'ont aucune liberté : ils n'ont pas le droit de partir." },
        { id: "pay-6b", t: "Si le seigneur vend son domaine, c'est-à-dire ses terres, les serfs sont vendus avec : ils restent sur la terre et changent de seigneur. Et la plus grosse partie de leur récolte va au seigneur." },
        { id: "pay-7", t: "Les vilains, eux, sont libres : ils peuvent changer de domaine. Mais ils doivent, eux aussi, payer des impôts au seigneur." },
        { id: "pay-defi-tri", defi: "tri" },
        { id: "pay-8", t: "Serfs ou vilains, tous travaillent la terre. Et le travail change avec les saisons." },
        { id: "pay-9", t: "Au printemps, c'est le labour et les semailles. Labourer, c'est retourner la terre. Semer, c'est y jeter les graines." },
        { id: "pay-10", t: "En été, on entretient les cultures. Puis vient la {{moisson}} : on coupe les céréales mûres, comme le blé." },
        { id: "pay-11", t: "En automne, ce sont les {{vendanges}}, la cueillette du raisin, et les autres récoltes." },
        { id: "pay-12", t: "En hiver, on soigne les animaux et on répare les outils." },
        { id: "pay-defi-saisons", defi: "saisons" }
      ]
    },

    /* ============================ 4. L'AGRICULTURE =================== */
    {
      id: "agriculture", numero: "4", titre: "L'agriculture",
      accroche: "Des outils simples, une charrue et une bonne idée",
      pas: [
        { id: "agr-1", t: "Pour tous ces travaux, les paysans ont des outils. Ils utilisent la {{houe}} pour remuer la terre à la main, la {{charrue}} de bois pour labourer et la {{faucille}} pour couper les épis." },
        { id: "agr-2", t: "Ces outils sont très simples. On dit que les techniques des paysans sont « rudimentaires » : elles restent simples, sans machines." },
        { id: "agr-3", t: "Peu à peu, le fer devient plus courant. À la fin du Moyen Âge, les paysans ont des outils en métal très efficaces, comme la {{faux}} et la {{hache}}." },
        { id: "agr-4", t: "Une invention aide beaucoup les paysans : la charrue à roues et à versoir. Elle permet de labourer plus profondément et d'aérer la terre." },
        { id: "agr-5", t: "Regarde-la avancer. À l'avant, deux {{roues}} la portent." },
        { id: "agr-6", t: "Puis vient le {{coutre}} : un fer tranchant, comme un couteau. Il fend la terre." },
        { id: "agr-7", t: "Juste derrière le coutre, le {{soc}} : une lame de fer. Il passe sous la terre et la découpe par en dessous." },
        { id: "agr-8", t: "Derrière le soc, le {{versoir}} retourne la terre sur le côté." },
        { id: "agr-9", t: "Tout à l'arrière, le {{mancheron}} : la poignée que tient le paysan pour guider la charrue." },
        { id: "agr-defi-charrue", defi: "charrue" },
        { id: "agr-10", t: "Il reste un problème. Si on cultive la même terre sans arrêt, elle s'épuise : elle donne de moins en moins." },
        { id: "agr-11", t: "Alors les paysans partagent leurs champs en trois parties." },
        { id: "agr-11b", t: "Sur la première, ils sèment du blé. Sur la deuxième, une autre culture, comme l'avoine. La troisième reste au repos : elle est en {{jachère}}." },
        { id: "agr-12", t: "L'année suivante, tout tourne. L'avoine prend la place du blé. La terre qui portait l'avoine se repose. Et la terre reposée reçoit le blé." },
        { id: "agr-13", t: "Chaque partie se repose donc une année sur trois. Partager les champs et faire tourner les cultures, cela s'appelle l'{{assolement}}. Comme il dure trois ans, on dit : assolement {{triennal}}." },
        { id: "agr-defi-assolement", defi: "assolement" },
        { id: "agr-14", t: "Œil de lynx : si tu vois du maïs sur un dessin de champ du Moyen Âge, c'est une erreur ! Au Moyen Âge, personne en Europe ne connaît le maïs. Il vient d'Amérique, et Christophe Colomb n'y arrive qu'en 1492, tout à la fin du Moyen Âge." }
      ]
    },

    /* ============================ 5. LE CHÂTEAU FORT ================= */
    {
      id: "chateau", numero: "5", titre: "Le château fort",
      accroche: "Une forteresse difficile à prendre",
      pas: [
        { id: "cht-1", t: "Retournons au château. Un {{château fort}} est une forteresse : tout y est fait pour se défendre." },
        { id: "cht-2", t: "Imagine que tu es un ennemi et que tu veux y entrer. Bon courage." },
        { id: "cht-3", t: "D'abord, le château est construit sur une hauteur. Tu te demandais pourquoi, au début ? C'est pour se défendre : d'en haut, on voit les ennemis arriver." },
        { id: "cht-4", t: "Ensuite, il est entouré d'un {{fossé}} rempli d'eau." },
        { id: "cht-5", t: "Pour entrer, il faut passer par le {{pont-levis}}. On entre quand il est baissé. Mais ses chaînes permettent de le lever, et alors il n'y a plus de pont." },
        { id: "cht-6", t: "Derrière le pont-levis, la {{herse}} : une lourde grille qui descend pour fermer la porte." },
        { id: "cht-7", t: "Tout autour, de hautes {{murailles}} de pierre. On les appelle aussi les {{remparts}}, ou le {{mur d'enceinte}}. Ce sont trois noms pour le grand mur qui entoure le château." },
        { id: "cht-8", t: "En haut des remparts, les gardes font le tour par le {{chemin de ronde}}. Le haut du mur est découpé en {{créneaux}}, comme des dents. Les gardes s'abritent derrière la pierre et lancent des projectiles par les ouvertures." },
        { id: "cht-9", t: "Aux angles se dressent des {{tours}}. Dans leurs murs, il y a des fentes étroites : les {{meurtrières}}. Par ces fentes, on tire sur l'ennemi en restant à l'abri." },
        { id: "cht-defi-defenses", defi: "defenses" },
        { id: "cht-10", t: "Il y a aussi une petite porte discrète dans la muraille, pour sortir sans être vu : la {{poterne}}. La voici, au pied du mur. Elle est bien plus petite que la grande porte du pont-levis." },
        { id: "cht-11", t: "Tu as réussi à entrer ? Voici la {{basse-cour}} : la première cour, celle d'en bas. On y trouve les écuries pour les chevaux, les ateliers et les provisions." },
        { id: "cht-12", t: "Plus haut, derrière un autre mur, la {{haute-cour}} et sa {{chapelle}}, où l'on prie." },
        { id: "cht-13", t: "Et voici le {{donjon}}, une grande tour au milieu du château. Le seigneur y vit. En cas d'attaque, c'est son refuge." },
        { id: "cht-defi", defi: "chateau" }
      ]
    },

    /* ============================ 6. LE SEIGNEUR ET SES VASSAUX ====== */
    {
      id: "seigneurs", numero: "6", titre: "Le seigneur et ses vassaux",
      accroche: "Celui qui commande, et ceux qui lui promettent fidélité",
      pas: [
        { id: "sei-1", t: "Dans le donjon vit le seigneur. C'est une personne qui possède des terres, et il est très puissant." },
        { id: "sei-2", t: "Les paysans habitent sur sa terre et la cultivent pour vivre. Voilà pourquoi posséder la terre lui donne du pouvoir sur eux." },
        { id: "sei-2b", t: "Il rend la justice sur son territoire : c'est lui qui juge." },
        { id: "sei-3", t: "Il récolte des impôts, en argent et en nature. « En nature » : avec une part de la récolte, par exemple." },
        { id: "sei-4", t: "Et il peut réquisitionner des guerriers pour partir en guerre. « Réquisitionner », c'est obliger à venir." },
        { id: "sei-5", t: "En principe, le seigneur est au service du roi. Sur ses terres, il domine les paysans : ils travaillent et paient pour lui. En échange, il les protège." },
        { id: "sei-6", t: "Le seigneur a des {{vassaux}}. Un {{vassal}} est une personne liée au seigneur par un serment de fidélité : il lui a promis d'être fidèle." },
        { id: "sei-7", t: "Le vassal reçoit un morceau de terre : le {{fief}}. En échange, il s'engage à obéir au seigneur et à l'aider." },
        { id: "sei-8", t: "Attention à l'orthographe : un vassal, des vassaux. Comme un cheval, des chevaux." },
        { id: "sei-defi-vassal", defi: "vassal" },
        { id: "sei-9", t: "Le vassal fait sa promesse pendant une cérémonie : l'{{hommage}}. Au XIIe siècle, Galbert de Bruges en a raconté une. Dans son récit, le seigneur est un comte." },
        { id: "sei-10", t: "Le comte demande au futur vassal s'il veut devenir « son homme », c'est-à-dire son vassal. Le futur vassal répond : « Je le veux. »" },
        { id: "sei-11", t: "Le vassal joint les mains, et le comte les serre dans les siennes. Puis ils échangent un baiser." },
        { id: "sei-12", t: "Le vassal promet d'être fidèle au comte. Il le jure sur des reliques : les restes d'un saint, que les chrétiens tiennent pour sacrés. C'est une promesse très sérieuse." },
        { id: "sei-13", t: "Ensuite, le comte lui donne l'{{investiture}} : il lui remet son fief." },
        { id: "sei-defi-hommage", defi: "hommage" }
      ]
    },

    /* ============================ 7. LES CHEVALIERS ================== */
    {
      id: "chevaliers", numero: "7", titre: "Les chevaliers",
      accroche: "Ceux qui combattent",
      pas: [
        { id: "che-1", t: "Au château vivent aussi des {{chevaliers}}. Le seigneur les loge. En échange, ils le suivent à la guerre." },
        { id: "che-2", t: "Un chevalier est un noble qui combat pour le seigneur. Il possède un cheval, une épée et une armure." },
        { id: "che-3", t: "Il faut de longues années pour devenir chevalier. Dès l'âge de 7 ans, le jeune noble devient {{page}}. Il va vivre chez un seigneur, un ami de sa famille." },
        { id: "che-4", t: "Là, il apprend la politesse et les règles de la vie au château. Parfois aussi un peu de lecture et d'écriture." },
        { id: "che-5", t: "À 14 ans, il devient {{écuyer}}. Il apprend à monter à cheval et à manier les armes. Il s'occupe de l'équipement d'un chevalier." },
        { id: "che-6", t: "Plus tard, son seigneur le fait chevalier au cours d'une cérémonie religieuse : l'{{adoubement}}. On dit qu'il est « adoubé »." },
        { id: "che-defi-chevalier", defi: "chevalier" },
        { id: "che-7", t: "Le seigneur fait la guerre aux autres seigneurs pour les piller, c'est-à-dire voler leurs richesses, et s'enrichir. Et en période de paix ? Il organise des {{tournois}}." },
        { id: "che-8", t: "Le tournoi est une fête, et aussi un entraînement au combat. Les chevaliers désarment leur adversaire à coups de lance." },
        { id: "che-9", t: "Le seigneur organise aussi des chasses et des {{banquets}}, de grands repas. Montrer sa richesse et sa puissance compte beaucoup pour lui." },
        { id: "che-10", t: "Pendant les banquets, des {{troubadours}} et des {{ménestrels}} chantent et racontent des histoires. Ce sont des artistes, pas des guerriers." },
        { id: "che-11", t: "Pour ne pas s'ennuyer, les seigneurs jouent aux échecs. Plus tard, à la fin du Moyen Âge, on joue aussi aux dames, et un « fou », un amuseur, fait rire le seigneur." },
        { id: "che-12", t: "Quelles histoires écoute-t-on ? Des poèmes et des romans. Certains racontent des guerres, comme la {{Chanson de Roland}}." },
        { id: "che-13", t: "D'autres racontent des légendes, des histoires en grande partie inventées : les exploits du roi Arthur et des chevaliers de la Table ronde, comme Perceval et Lancelot." },
        { id: "che-14", t: "Attention, ne te trompe pas : Perceval n'a pas vraiment existé. C'est un chevalier de légende, le héros d'un roman. Il n'a donc jamais été un seigneur." },
        { id: "che-defi-vraifaux", defi: "vraifaux" }
      ]
    },

    /* ============================ 8. LA VILLE ======================== */
    {
      id: "ville", numero: "8", titre: "La ville",
      accroche: "Remparts, échoppes et jours de marché",
      pas: [
        { id: "vil-1", t: "Jusqu'ici, nous sommes restés à la campagne. Au Moyen Âge, c'est là que vivent environ neuf personnes sur dix. Mais un jour de marché, suivons les paysans qui partent vendre leurs produits en ville." },
        { id: "vil-2", t: "À partir du XIe siècle, les villes grandissent. Tu te souviens de la charrue à versoir et de l'assolement ? Les récoltes sont meilleures, il y a plus d'habitants, et le commerce se développe. Beaucoup viennent en ville pour travailler et commercer." },
        { id: "vil-3", t: "Comme le château, la ville se protège. Elle est entourée de {{remparts}}, avec des tours. On y entre par une {{porte fortifiée}}, surveillée par des gardes. La nuit, on la ferme." },
        { id: "vil-4", t: "Au-dessus des toits se dresse la [[cathédrale]] : la grande église de la ville, où siège l'{{évêque}}, le chef des prêtres de la région." },
        { id: "vil-5", t: "Voici l'[[abbaye]] : un monastère où vivent des {{moines}} ou des {{moniales}}, des religieuses. Ils y prient et y travaillent, autour d'un jardin entouré d'une galerie : le cloître." },
        { id: "vil-6", t: "Tout en haut, un {{château}}. Beaucoup de villes en ont un : celui d'un seigneur, d'un comte ou du roi." },
        { id: "vil-7", t: "La ville grandit tellement qu'elle déborde de ses murs. Les maisons construites dehors, le long des routes, forment les {{faubourgs}}." },
        { id: "vil-defi-lieux", defi: "villeLieux" },
        { id: "vil-8", t: "Entrons dans une rue. Elle est étroite, et les maisons à pans de bois se serrent les unes contre les autres. En bas, les {{échoppes}} : de petites boutiques ouvertes sur la rue." },
        { id: "vil-9", t: "Dans son échoppe, l'[[artisan]] fabrique des objets à la main, puis il les vend. Il travaille et il vend au même endroit." },
        { id: "vil-10", t: "Voici le {{barbier}} : il rase les barbes, et il soigne aussi ses clients. À côté, le {{tailleur}} coud des vêtements." },
        { id: "vil-11", t: "Le {{cordonnier}} fabrique et répare les chaussures en cuir. En face, l'{{apothicaire}} prépare et vend des médicaments, souvent avec des plantes." },
        { id: "vil-12", t: "Les femmes travaillent aussi. La {{bouchère}} vend de la viande de bœuf, de porc ou de mouton. Plus loin, une {{marchande}} vend toutes sortes de marchandises. À Paris, certains métiers sont tenus par des femmes, comme celui de fileuse de soie." },
        { id: "vil-13", t: "Le {{tavernier}} sert à boire, surtout du vin. Ailleurs en ville, le {{relieur}} relie les livres avec du cuir, et l'{{orfèvre}} fabrique des objets en or et en argent." },
        { id: "vil-defi-metiers", defi: "metiers" },
        { id: "vil-14", t: "Au bout de la rue, la place du [[marché]]. Chaque semaine, les habitants y achètent et y vendent des produits. Les paysans des environs y apportent leurs œufs et leurs légumes." },
        { id: "vil-15", t: "Quelques fois dans l'année, il y a une [[foire]] : un très grand marché. Des marchands viennent de régions lointaines, avec des tissus et des épices. Les plus célèbres sont les foires de Champagne." },
        { id: "vil-defi-marche", defi: "marcheFoire" }
      ]
    },

    /* ============================ 9. LE GRAND DÉFI =================== */
    {
      id: "final", numero: "9", titre: "Le grand défi",
      accroche: "Tout ce que tu sais maintenant",
      pas: [
        { id: "fin-1", t: "Tu as fait le tour de la seigneurie, puis de la ville. Voyons ce que tu as retenu. Si tu fais une petite faute en écrivant, je te montrerai la bonne orthographe." },
        { id: "fin-defi", defi: "final" },
        { id: "fin-bilan", bilan: true }
      ]
    }
  ],

  /* ------------------------------------------------------------------
     ÉTIQUETTES posées sur les images et les schémas
     ------------------------------------------------------------------ */
  etiquettes: {
    ouverture: { cavaliers: "des cavaliers armés", chateau: "le château", famille: "une famille de paysans" },
    chaumiere: { bouillie: "de la bouillie", pain: "du pain noir", toile: "une toile grossière" },
    frise: {
      auj: "aujourd'hui", naissance: "{annee} : ta naissance", ma: "Moyen Âge",
      d476: "476", d1492: "1492", d476txt: "fin de l'Empire romain d'Occident", d1492txt: "Christophe Colomb en Amérique",
      antiquite: "Antiquité", modernes: "Temps modernes",
      s10: "Xe siècle", s11: "XIe siècle", s12: "XIIe siècle", s13: "XIIIe siècle",
      lecon: "nos trois siècles", roi: "le roi perd du pouvoir", milleAns: "environ mille ans", neufCents: "plus de 900 ans"
    },
    seigneurie: {
      chateau: "[[le château]]", bois: "les bois", reserves: "[[les réserves]]", tenures: "[[les tenures]]",
      eglise: "l'église", moulin: "[[le moulin]]", peage: "le péage", village: "le village"
    },
    village: { moulin: "[[le moulin]]", four: "[[le four]]", pressoir: "[[le pressoir]]" },
    outils: { houe: "la houe", charrue: "la charrue de bois", faucille: "la faucille", faux: "la faux", hache: "la hache" },
    charrue: { roues: "les roues", coutre: "le coutre", soc: "le soc", versoir: "le versoir", mancheron: "le mancheron" },
    assolement: { ble: "blé", avoine: "avoine", jachere: "jachère", an1: "1re année", an2: "2e année", an3: "3e année", partieA: "A", partieB: "B", partieC: "C" },
    saisons: { printemps: "printemps", ete: "été", automne: "automne", hiver: "hiver" },
    chateau: {
      hauteur: "une hauteur", fosse: "le fossé", pontlevis: "le pont-levis", herse: "la herse",
      remparts: "les remparts", creneaux: "les créneaux", ronde: "le chemin de ronde", tour: "une tour",
      meurtrieres: "une meurtrière", poterne: "la poterne", bassecour: "la basse-cour", hautecour: "la haute-cour",
      chapelle: "la chapelle", donjon: "le donjon"
    },
    hommage: { mains: "les mains jointes", reliques: "les reliques", comte: "le comte", vassal: "le vassal" },
    ecuyer: { page: "le page", ecuyer: "l'écuyer", armes: "l'équipement du chevalier" },
    adoubement: { epee: "l'épée", chevalier: "le nouveau chevalier" },
    tournoi: { lance: "la lance" },
    banquet: { troubadour: "un troubadour", fou: "le « fou »", echecs: "les échecs", seigneur: "le seigneur" },
    ville: {
      remparts: "les remparts", porte: "la porte fortifiée", cathedrale: "[[la cathédrale]]", abbaye: "[[l'abbaye]]",
      chateau: "le château", faubourgs: "les faubourgs", foire: "[[la foire]]", paysans: "des paysans"
    },
    rue: {
      echoppe: "une échoppe", barbier: "le barbier", tailleur: "le tailleur", cordonnier: "le cordonnier",
      apothicaire: "l'apothicaire", bouchere: "la bouchère", tavernier: "le tavernier", marche: "[[le marché]]", marchande: "une marchande"
    }
  },

  /* ------------------------------------------------------------------
     DESCRIPTIONS DES IMAGES (lues par les lecteurs d'écran)
     ------------------------------------------------------------------ */
  alts: {
    ouverture: "Une famille de paysans monte en courant vers un château fort bâti sur une colline. Au loin, des cavaliers armés de lances arrivent. En bas, un village aux toits de paille et une église.",
    frise: "Une flèche du temps qui va de l'Antiquité à aujourd'hui, avec le Moyen Âge entre 476 et 1492.",
    seigneurie: "Une seigneurie vue d'en haut : un château sur une colline, des bois, de grands champs de blé, des champs étroits, un village autour de son église, un moulin sur la rivière et un pont avec une cabane de péage.",
    village: "Un village : des chaumières, un pressoir sous un abri, un four à pain et un moulin à eau.",
    chaumiere: "Une famille de paysans mange de la bouillie dans des bols de bois, devant le feu, dans une chaumière. Un pain sombre est posé sur la table.",
    printemps: "Au printemps, un paysan sème des graines à la main dans un champ labouré. Au loin, deux bœufs tirent une charrue.",
    ete: "En été, des paysans coupent le blé avec des faucilles et lient les gerbes.",
    automne: "En automne, des paysans cueillent le raisin et le versent dans une cuve posée sur une charrette.",
    hiver: "En hiver, dans une grange, un paysan donne du foin aux moutons et un autre répare un outil. Dehors, le village est sous la neige.",
    outils: "Les outils des paysans : la houe, la charrue de bois, la faucille, la faux et la hache.",
    charrue: "Schéma d'une charrue à roues et à versoir : de l'avant vers l'arrière, les roues, le coutre, le soc, le versoir et le mancheron.",
    assolement: "Schéma de l'assolement triennal : un champ rond partagé en trois parties, blé, avoine et jachère, qui tournent chaque année.",
    chateau: "Un château fort vu d'en haut : un fossé rempli d'eau, un pont-levis, une herse, des remparts à créneaux, des tours, une basse-cour avec des écuries, une haute-cour avec une chapelle, et un grand donjon.",
    hommage: "Dans la grande salle d'un château, un vassal à genoux place ses mains jointes dans celles de son seigneur. Sur une table, un coffret doré contient des reliques.",
    ecuyer: "Dans la cour d'un château, un écuyer brosse le cheval d'un chevalier près de son armure, de son épée et de son bouclier. Un jeune page porte une cruche.",
    adoubement: "Dans une chapelle, un seigneur remet une épée à un jeune homme agenouillé. Un prêtre le bénit.",
    tournoi: "Un tournoi : deux chevaliers à cheval foncent l'un vers l'autre, la lance en avant, devant une tribune de spectateurs.",
    banquet: "Un banquet : le seigneur et ses invités à table, un troubadour qui chante en jouant de la harpe, un « fou » qui jongle et un jeu d'échecs.",
    ville: "Une ville du Moyen Âge vue d'en haut : des remparts avec des tours, une porte fortifiée, une grande cathédrale à deux tours, une abbaye avec son cloître, un château sur la colline, des maisons hors des murs et une foire sous des tentes dans un pré.",
    rue: "Une rue étroite aux maisons à pans de bois. Dans les échoppes : un barbier qui rase un client, un tailleur qui coud, un cordonnier, un apothicaire et ses pots, une bouchère et un tavernier. Au bout de la rue, le marché et les tours de la cathédrale.",
    soir: "La seigneurie au coucher du soleil."
  },

  /* ------------------------------------------------------------------
     DÉFIS
     ------------------------------------------------------------------ */
  defis: {

    champs: {
      type: "choix", titre: "Petit défi : les terres du seigneur",
      consigne: "Quatre questions rapides avant de descendre au village.",
      questions: [
        { q: "Les terres cultivées pour le seigneur, ce sont…", choix: ["les réserves", "les tenures"], bon: 0, ok: "Oui ! Les réserves sont cultivées pour le seigneur.", indices: ["Ce sont les grands champs, au pied du château."] },
        { q: "Les terres occupées par les paysans, ce sont…", choix: ["les réserves", "les tenures"], bon: 1, ok: "Oui ! Les paysans habitent et cultivent les tenures.", indices: ["Ce sont les champs étroits."] },
        { q: "Le travail gratuit que le paysan doit au seigneur, c'est…", choix: ["le loyer", "la corvée"], bon: 1, ok: "Oui ! La corvée est un travail gratuit.", indices: ["Un loyer se paie. Ici, on travaille."] },
        { q: "Pour habiter là et cultiver la terre, le paysan paie…", choix: ["un loyer", "une corvée"], bon: 0, ok: "Oui ! Il paie un loyer au seigneur.", indices: ["Une corvée ne se paie pas : c'est un travail."] }
      ],
      bravo: "Tu ne confonds plus les réserves et les tenures."
    },

    defenses: {
      type: "choix", titre: "Petit défi : les défenses du château",
      consigne: "Quatre questions avant d'entrer dans la cour.",
      questions: [
        { q: "Qu'est-ce qui entoure le château, rempli d'eau ?", choix: ["le fossé", "la herse", "le chemin de ronde"], bon: 0, ok: "Oui ! Le fossé entoure le château.", indices: ["C'est le premier obstacle, avant le pont."] },
        { q: "Quelle lourde grille descend pour fermer la porte ?", choix: ["le pont-levis", "la herse", "la meurtrière"], bon: 1, ok: "Oui ! La herse ferme la porte.", indices: ["Elle est juste derrière le pont-levis."] },
        { q: "Par où les gardes font-ils le tour des remparts ?", choix: ["par le fossé", "par le pont-levis", "par le chemin de ronde"], bon: 2, ok: "Oui ! Par le chemin de ronde, en haut des remparts.", indices: ["Faire une ronde, c'est faire le tour."] },
        { q: "Comment s'appelle une fente étroite, pour tirer en restant à l'abri ?", choix: ["un créneau", "une meurtrière", "une tour"], bon: 1, ok: "Oui ! Une meurtrière.", indices: ["On la trouve dans les murs des tours."] }
      ],
      bravo: "Tu connais les défenses du château."
    },

    vassal: {
      type: "choix", titre: "Petit défi : le seigneur et son vassal",
      consigne: "Trois questions avant la cérémonie.",
      questions: [
        { q: "Qui rend la justice sur le territoire ?", choix: ["le seigneur", "le vassal", "le paysan"], bon: 0, ok: "Oui ! Le seigneur rend la justice sur son territoire.", indices: ["C'est celui qui possède les terres."] },
        { q: "Que promet le vassal au seigneur ?", choix: ["de payer la dîme", "d'être fidèle", "de cultiver les réserves"], bon: 1, ok: "Oui ! Le vassal est lié au seigneur par un serment de fidélité.", indices: ["La dîme se paie à l'Église.", "Pense au mot « fidélité »."] },
        { q: "Comment s'appelle le morceau de terre que reçoit le vassal ?", choix: ["la tenure", "la réserve", "le fief"], bon: 2, ok: "Oui ! Le fief.", indices: ["La tenure est occupée par les paysans.", "Un tout petit mot, qui commence par un f."] }
      ],
      bravo: "Tu sais ce qui lie un vassal à son seigneur."
    },

    temps: {
      type: "choix", titre: "Défi : la machine à remonter le temps",
      consigne: "Trois questions pour vérifier que tu sais te repérer.",
      questions: [
        { q: "L'an 1150, c'est dans quel siècle ?", choix: ["le XIe siècle", "le XIIe siècle", "le XIIIe siècle"], bon: 1,
          ok: "Oui ! De 1101 à 1200, c'est le XIIe siècle.",
          indices: ["Regarde bien : le XIe siècle s'arrête en 1100.", "Le XIIe siècle va de 1101 à 1200. Et 1150 ?"] },
        { q: "« Moyen Âge », qu'est-ce que ça veut dire ?", choix: ["l'âge des châteaux", "la période du milieu", "l'âge moyen des chevaliers"], bon: 1,
          ok: "Oui ! C'est la période du milieu, entre l'Antiquité et les Temps modernes.",
          indices: ["Pense au mot « moyen » : ni au début, ni à la fin.", "« Moyen » veut dire « du milieu »."] },
        { q: "Quels siècles découvres-tu dans ce parcours ?", choix: ["le tout début, vers 476", "les XIe, XIIe et XIIIe siècles", "la toute fin, vers 1492"], bon: 1,
          ok: "Oui ! Les XIe, XIIe et XIIIe siècles : les années 1001 à 1300.",
          indices: ["Ce sont trois siècles qui se suivent.", "Leurs numéros : 11, 12 et 13, en chiffres romains."] }
      ],
      bravo: "Tu sais te repérer dans le temps."
    },

    seigneurie: {
      type: "lieux", titre: "Défi : où doit aller le paysan ?",
      consigne: "Lis la question, puis touche le bon endroit sur l'image.",
      lieux: {
        chateau: "Ici, c'est le château.", bois: "Ici, ce sont les bois.", reserves: "Ici, ce sont les réserves.",
        tenures: "Ici, ce sont les tenures.", eglise: "Ici, c'est l'église.", moulin: "Ici, c'est le moulin.", peage: "Ici, c'est le pont et son péage."
      },
      questions: [
        { q: "C'est le jour de la corvée. Où le paysan va-t-il travailler pour le seigneur ?", bon: "reserves",
          ok: "Oui ! Sur les réserves, les terres cultivées pour le seigneur.", indice: "Cherche les grands champs, au pied du château." },
        { q: "Maintenant, il cultive la terre pour laquelle il paie un loyer. Où est-elle ?", bon: "tenures",
          ok: "Oui ! Ce sont les tenures, les terres occupées par les paysans.", indice: "Cherche les champs étroits, serrés les uns contre les autres." },
        { q: "Il porte un sac de grain pour en faire de la farine. Où va-t-il ?", bon: "moulin",
          ok: "Oui ! Au moulin du seigneur. Et il paie un impôt pour s'en servir.", indice: "Cherche la grande roue qui tourne dans l'eau." },
        { q: "Il doit payer la dîme, souvent un dixième de sa récolte. À qui la doit-il ?", bon: "eglise",
          ok: "Oui ! La dîme est l'impôt payé à l'Église.", indice: "Cherche le bâtiment avec un clocher." },
        { q: "Il veut traverser la rivière avec sa charrette. Où doit-il payer ?", bon: "peage",
          ok: "Oui ! Au péage, à l'entrée du pont.", indice: "Cherche le pont, et la petite cabane à côté." },
        { q: "Des cavaliers ennemis arrivent ! Où trouver la protection du seigneur ?", bon: "chateau",
          ok: "Oui ! Au château. Le seigneur protège les habitants.", indice: "Lève les yeux vers la colline." }
      ],
      bravo: "Tu connais la seigneurie par cœur."
    },

    tri: {
      type: "choix", titre: "Défi : serf ou vilain ?",
      consigne: "Lis chaque phrase et choisis de qui elle parle.",
      choixCommuns: ["un serf", "un vilain"],
      questions: [
        { q: "Il peut changer de domaine.", bon: 1, ok: "Oui, c'est un vilain. Il est libre de partir.", indices: ["Pour partir, il faut être libre."] },
        { q: "Il appartient au seigneur.", bon: 0, ok: "Oui, c'est un serf.", indices: ["L'un des deux n'a aucune liberté. C'est lui."] },
        { q: "Il peut être vendu avec le domaine.", bon: 0, ok: "Oui, c'est un serf. Il appartient au seigneur, comme la terre.", indices: ["Le seigneur ne peut vendre que ce qui lui appartient."] },
        { q: "Il est libre, mais il doit payer des impôts au seigneur.", bon: 1, ok: "Oui, c'est un vilain.", indices: ["Le serf n'a aucune liberté. Alors, qui est libre ?"] },
        { q: "Il n'a pas le droit de partir.", bon: 0, ok: "Oui, c'est un serf. Il n'a aucune liberté.", indices: ["Lequel des deux n'est pas libre ?"] }
      ],
      bravo: "Tu ne confondras plus les serfs et les vilains."
    },

    saisons: {
      type: "choix", titre: "Défi : la roue des saisons",
      consigne: "À quelle saison fait-on ce travail ?",
      choixCommuns: ["au printemps", "en été", "en automne", "en hiver"],
      questions: [
        { q: "Les vendanges", bon: 2, ok: "Oui ! On cueille le raisin en automne.", indices: ["Les vendanges, c'est la cueillette du raisin. Les feuilles sont déjà rouges et jaunes."] },
        { q: "Les semailles", bon: 0, ok: "Oui ! On sème au printemps.", indices: ["Semer, c'est jeter les graines. On le fait juste après le labour."] },
        { q: "La moisson", bon: 1, ok: "Oui ! On coupe les céréales mûres en été.", indices: ["Les céréales sont mûres quand il fait le plus chaud."] },
        { q: "Réparer les outils", bon: 3, ok: "Oui ! En hiver, on répare les outils et on soigne les animaux.", indices: ["C'est la saison la plus froide."] },
        { q: "Le labour", bon: 0, ok: "Oui ! Labour et semailles, c'est au printemps.", indices: ["On retourne la terre juste avant de semer."] }
      ],
      bravo: "Tu connais le travail des quatre saisons."
    },

    charrue: {
      type: "lieux", titre: "Défi : les cinq pièces de la charrue",
      consigne: "Touche la bonne pièce sur la charrue.",
      lieux: { roues: "Ça, ce sont les roues.", coutre: "Ça, c'est le coutre.", soc: "Ça, c'est le soc.", versoir: "Ça, c'est le versoir.", mancheron: "Ça, c'est le mancheron." },
      questions: [
        { q: "Où est le coutre, le fer qui fend la terre ?", bon: "coutre", ok: "Oui ! Le coutre fend la terre, juste devant le soc.", indice: "Il ressemble à un couteau. Il est juste derrière les roues." },
        { q: "Où est le versoir, qui retourne la terre sur le côté ?", bon: "versoir", ok: "Oui ! Le versoir est derrière le soc.", indice: "C'est une grande planche." },
        { q: "Où est le soc, qui découpe la terre par en dessous ?", bon: "soc", ok: "Oui ! Le soc travaille sous la terre.", indice: "Il est tout en bas, sous la terre, juste devant le versoir." },
        { q: "Où est le mancheron, que tient le paysan ?", bon: "mancheron", ok: "Oui ! Le mancheron sert à guider la charrue.", indice: "Cherche la poignée, tout à l'arrière." },
        { q: "Où sont les roues ?", bon: "roues", ok: "Oui ! Les deux roues portent l'avant de la charrue.", indice: "Facile : elles sont rondes." }
      ],
      bravo: "Tu connais la charrue à roues et à versoir pièce par pièce."
    },

    assolement: {
      type: "choix", titre: "Défi : fais tourner les cultures",
      consigne: "Trois questions pour faire tourner les cultures dans ta tête.",
      questions: [
        { q: "Cette année, une partie du champ porte du blé. Que portera-t-elle l'an prochain ?", choix: ["encore du blé", "de l'avoine", "rien : elle sera en jachère"], bon: 1,
          ok: "Oui ! Après le blé vient l'autre culture, l'avoine.", indices: ["Après le blé, on change de culture.", "L'ordre est : blé, avoine, repos."] },
        { q: "Cette année, une partie porte de l'avoine. Et l'an prochain ?", choix: ["du blé", "encore de l'avoine", "rien : elle sera en jachère"], bon: 2,
          ok: "Oui ! Après deux années de culture, la terre se repose.", indices: ["La terre a déjà donné deux récoltes. Elle est fatiguée.", "L'ordre est : blé, avoine, repos."] },
        { q: "Sur trois ans, combien d'années une partie du champ se repose-t-elle ?", choix: ["une année", "deux années", "trois années"], bon: 0,
          ok: "Oui ! Une année sur trois : c'est l'assolement triennal.", indices: ["Sur les trois années, deux servent à cultiver.", "Blé, avoine, repos : compte les années de repos."] }
      ],
      bravo: "Tu as compris l'assolement triennal."
    },

    chateau: {
      type: "nommer", titre: "Défi : nomme les parties du château",
      consigne: "Touche un numéro, puis écris le nom de cette partie, avec ou sans « le » ou « la ». Si tu fais une petite faute, je te montre la bonne orthographe.",
      objectif: 8,
      objectifTexte: "Trouve au moins 8 noms sur 12 pour gagner le sceau du château.",
      items: [
        { lieu: "fosse", reponses: ["le fossé", "fossé", "fossés", "fossé d'eau", "douves", "douve"], indice: "Il entoure le château et il est rempli d'eau." },
        { lieu: "pontlevis", reponses: ["le pont-levis", "pont-levis", "pont levis", "pontlevis"], indice: "On peut le lever avec ses chaînes." },
        { lieu: "herse", reponses: ["la herse", "herse"], indice: "C'est une lourde grille qui descend devant la porte." },
        { lieu: "remparts", reponses: ["les remparts", "remparts", "rempart", "murailles", "muraille", "mur d'enceinte", "le mur d'enceinte", "enceinte"], indice: "C'est le grand mur qui entoure le château. Il a trois noms." },
        { lieu: "creneaux", reponses: ["les créneaux", "créneaux", "créneau"], indice: "Le haut du mur, découpé comme des dents." },
        { lieu: "ronde", reponses: ["le chemin de ronde", "chemin de ronde"], indice: "Les gardes y marchent pour faire le tour des remparts." },
        { lieu: "tour", reponses: ["une tour", "tour", "tours"], indice: "Il y en a une à chaque angle." },
        { lieu: "meurtrieres", reponses: ["une meurtrière", "meurtrière", "meurtrières"], indice: "Une fente étroite dans le mur, pour tirer sur l'ennemi." },
        { lieu: "bassecour", reponses: ["la basse-cour", "basse-cour", "basse cour", "bassecour"], indice: "La première cour, celle d'en bas, avec les écuries et les ateliers." },
        { lieu: "hautecour", reponses: ["la haute-cour", "haute-cour", "haute cour", "hautecour"], indice: "La cour d'en haut, près de la chapelle." },
        { lieu: "chapelle", reponses: ["la chapelle", "chapelle"], indice: "On y prie. Regarde la croix sur son toit." },
        { lieu: "donjon", reponses: ["le donjon", "donjon"], indice: "Une grande tour au milieu du château, le refuge du seigneur." }
      ],
      bravo: "Tu peux nommer un château fort, du fossé au donjon."
    },

    hommage: {
      type: "ordre", titre: "Défi : la cérémonie de l'hommage",
      consigne: "Remets les quatre moments dans l'ordre. Touche d'abord ce qui se passe en premier.",
      etapes: [
        "Le futur vassal répond : « Je le veux. »",
        "Mains jointes dans celles du comte, puis un baiser.",
        "Le vassal jure fidélité sur les reliques.",
        "Le comte lui donne l'investiture : il reçoit son fief."
      ],
      ok: "Oui ! C'est bien l'ordre de la cérémonie.",
      indices: ["Pas encore. Tout commence par une question du comte, et par une réponse.", "Au milieu : d'abord les mains et le baiser, ensuite le serment.", "Le fief arrive tout à la fin."],
      bravo: "Tu connais la cérémonie de l'hommage."
    },

    chevalier: {
      type: "choix", titre: "Défi : devenir chevalier",
      consigne: "Trois questions sur le long chemin du chevalier.",
      questions: [
        { q: "Au Moyen Âge, à 9 ans, un garçon noble est…", choix: ["page", "écuyer", "chevalier"], bon: 0,
          ok: "Oui ! On est page dès 7 ans, et on devient écuyer à 14 ans.", indices: ["On entre comme page à 7 ans.", "On devient écuyer seulement à 14 ans."] },
        { q: "Qui s'occupe de l'équipement d'un chevalier ?", choix: ["le page", "l'écuyer", "le vassal"], bon: 1,
          ok: "Oui ! C'est l'écuyer. Il apprend aussi à monter à cheval et à manier les armes.", indices: ["Il a au moins 14 ans.", "Ce n'est pas celui qui reçoit un fief."] },
        { q: "Comment s'appelle la cérémonie où l'on devient chevalier ?", choix: ["l'hommage", "l'investiture", "l'adoubement"], bon: 2,
          ok: "Oui ! L'adoubement. On dit que le chevalier est « adoubé ».", indices: ["L'hommage, c'est la promesse du vassal.", "L'investiture, c'est quand le vassal reçoit son fief."] }
      ],
      bravo: "Tu sais comment on devient chevalier."
    },

    vraifaux: {
      type: "choix", titre: "Défi : vrai ou faux ?",
      consigne: "Lis chaque phrase. Vrai ou faux ? À toi de juger.",
      choixCommuns: ["vrai", "faux"],
      questions: [
        { q: "Le château fort est situé sur une hauteur.", bon: 0, ok: "Vrai ! Les seigneurs construisent leurs châteaux sur une hauteur.", indices: ["Souviens-toi de la colline du début."] },
        { q: "Un seigneur n'attaque jamais les autres seigneurs.", bon: 1, ok: "Faux ! Les seigneurs se font la guerre, pour piller et s'enrichir.", indices: ["Rappelle-toi les cavaliers du début."] },
        { q: "Les tournois sont un entraînement au combat.", bon: 0, ok: "Vrai ! Le tournoi est une fête et un entraînement au combat.", indices: ["À quoi sert de s'affronter à coups de lance en temps de paix ?"] },
        { q: "Les troubadours sont des guerriers.", bon: 1, ok: "Faux ! Les troubadours chantent et racontent des histoires.", indices: ["Que font les troubadours pendant les banquets ?"] },
        { q: "Perceval était un seigneur célèbre.", bon: 1, ok: "Faux ! Perceval est un chevalier de légende, de la Table ronde. C'est le héros d'un roman, il n'a pas vraiment existé.", indices: ["Perceval est le héros d'un roman."] }
      ],
      suite: {
        type: "saisie",
        items: [
          { q: "Dernière épreuve, attention à l'orthographe. Un vassal, des…", reponses: ["vassaux"],
            pieges: { vasseaux: "Presque ! Regarde bien : il n'y a pas de e. On écrit « vassaux », comme « chevaux ».", vassals: "Presque ! Au pluriel, « al » devient « aux » : un vassal, des vassaux." },
            indice: "Pense à : un cheval, des chevaux.", strict: true, leurres: ["vasseaux", "vassals"] }
        ]
      },
      bravo: "Tu ne tomberas plus dans les pièges."
    },

    villeLieux: {
      type: "nommer", titre: "Défi : nomme les lieux de la ville",
      consigne: "Touche un numéro, puis écris le nom de ce lieu, avec ou sans « le » ou « la ».",
      objectif: 4,
      objectifTexte: "Trouve au moins 4 noms sur 6 pour gagner le sceau de la ville.",
      items: [
        { lieu: "cathedrale", reponses: ["la cathédrale", "cathédrale"], indice: "La grande église de la ville, où siège l'évêque." },
        { lieu: "chateau", reponses: ["le château", "château", "château fort", "le château fort", "chateau fort"], indice: "Il se dresse tout en haut, sur la colline." },
        { lieu: "abbaye", reponses: ["l'abbaye", "abbaye", "monastère", "le monastère"], indice: "Des moines ou des moniales y vivent, autour d'un cloître." },
        { lieu: "porte", reponses: ["la porte fortifiée", "porte fortifiée", "la porte", "porte"], indice: "On entre dans la ville par là, entre deux tours." },
        { lieu: "remparts", reponses: ["les remparts", "remparts", "rempart", "murailles", "muraille", "mur d'enceinte", "le mur d'enceinte", "enceinte"], indice: "Le grand mur qui entoure la ville, comme au château." },
        { lieu: "faubourgs", reponses: ["les faubourgs", "faubourgs", "faubourg"], indice: "Les maisons construites hors des murs. Le mot commence par « fau »." }
      ],
      bravo: "Tu sais lire le plan d'une ville du Moyen Âge."
    },

    metiers: {
      type: "choix", titre: "Défi : qui fait quoi ?",
      consigne: "Lis ce que fait chaque personne et trouve son métier.",
      questions: [
        { q: "Il fabrique et répare les chaussures en cuir.", choix: ["le cordonnier", "le tailleur", "l'orfèvre"], bon: 0,
          ok: "Oui, c'est le cordonnier.", indices: ["Le tailleur coud des vêtements. Et les chaussures ?"] },
        { q: "Il prépare et vend des médicaments.", choix: ["le barbier", "l'apothicaire", "le tavernier"], bon: 1,
          ok: "Oui, l'apothicaire. Il utilise souvent des plantes.", indices: ["Le barbier soigne aussi, mais ce n'est pas lui qui prépare les médicaments."] },
        { q: "Il rase les barbes et soigne ses clients.", choix: ["le tailleur", "le barbier", "le relieur"], bon: 1,
          ok: "Oui, le barbier. Son nom vient de « barbe ».", indices: ["Écoute bien le nom des métiers : l'un d'eux ressemble à « barbe »."] },
        { q: "Elle vend de la viande de bœuf, de porc ou de mouton.", choix: ["la marchande", "la bouchère", "l'apothicaire"], bon: 1,
          ok: "Oui, la bouchère.", indices: ["La marchande vend toutes sortes de choses. Laquelle vend seulement de la viande ?"] },
        { q: "Il fabrique des objets en or et en argent.", choix: ["le cordonnier", "le relieur", "l'orfèvre"], bon: 2,
          ok: "Oui, l'orfèvre. Il travaille les métaux précieux.", indices: ["Le cordonnier et le relieur travaillent le cuir."] },
        { q: "Il sert à boire, surtout du vin.", choix: ["le tavernier", "le barbier", "le tailleur"], bon: 0,
          ok: "Oui, le tavernier, dans sa taverne.", indices: ["Il travaille dans une taverne."] }
      ],
      bravo: "Tu connais les métiers de la ville."
    },

    marcheFoire: {
      type: "choix", titre: "Défi : marché ou foire ?",
      consigne: "Lis chaque phrase et choisis de quoi elle parle.",
      choixCommuns: ["le marché", "la foire"],
      questions: [
        { q: "Il a lieu chaque semaine.", bon: 0, ok: "Oui, c'est le marché.", indices: ["La foire n'a lieu que quelques fois dans l'année."] },
        { q: "Des marchands viennent de régions lointaines.", bon: 1, ok: "Oui, c'est la foire.", indices: ["Lequel des deux est un très grand marché ?"] },
        { q: "C'est un très grand marché, quelques fois dans l'année.", bon: 1, ok: "Oui, c'est la foire.", indices: ["Le marché, lui, a lieu chaque semaine."] },
        { q: "Les paysans des environs y vendent leurs œufs et leurs légumes.", bon: 0, ok: "Oui, c'est le marché, chaque semaine.", indices: ["Pas besoin de venir de loin pour vendre quelques œufs."] }
      ],
      bravo: "Tu ne confondras plus le marché et la foire."
    },

    final: {
      type: "saisie", titre: "Le grand défi",
      consigne: "Dix-huit questions sur toute la leçon. Écris le mot qui manque. Prends ton temps.",
      objectif: 14,
      items: [
        { q: "Tout ce qui appartient au seigneur, c'est la…", reponses: ["seigneurie"], rouge: true, indice: "Le mot ressemble à « seigneur »." },
        { q: "Les terres cultivées pour le seigneur, ce sont les…", reponses: ["réserves", "réserve"], rouge: true, indice: "Ce sont les grands champs au pied du château." },
        { q: "Les terres occupées par les paysans, ce sont les…", reponses: ["tenures", "tenure"], rouge: true, indice: "Ce sont les champs étroits, près du village. Le mot commence par « ten »." },
        { q: "Pour habiter là et cultiver la terre, le paysan paie un…", reponses: ["loyer"], rouge: true, indice: "Aujourd'hui encore, on en paie un pour habiter un appartement." },
        { q: "Le travail gratuit que le paysan doit au seigneur, c'est la…", reponses: ["corvée", "corvées"], rouge: true, indice: "Aujourd'hui, on dit ce mot pour un travail pénible." },
        { q: "Le paysan paie un impôt pour utiliser trois choses qui appartiennent au seigneur. Écris-en une.", reponses: ["four", "moulin", "pressoir"], rouge: true, complet: "Le four, le moulin et le pressoir.", indice: "On y cuit le pain, on y fait la farine, on y écrase le raisin." },
        { q: "L'impôt payé à l'Église, c'est la…", reponses: ["dîme", "dime"], indice: "Le mot ressemble à « dix » : c'est souvent un dixième des récoltes." },
        { q: "Le paysan libre de changer de domaine, c'est le…", reponses: ["vilain"], indice: "Ce mot ne veut pas dire « méchant »." },
        { q: "L'instrument de culture qui a un versoir et deux roues, c'est la…", reponses: ["charrue"], indice: "Elle sert à labourer." },
        { q: "La méthode de culture qui laisse la terre au repos un an sur trois, en deux mots, c'est l'…", reponses: ["assolement triennal", "assolement"], indice: "Deux mots. Le premier commence par « asso ». Le deuxième veut dire « sur trois ans »." },
        { q: "La grande tour qui sert de refuge au seigneur, c'est le…", reponses: ["donjon"], indice: "Elle se dresse au milieu du château." },
        { q: "La personne liée au seigneur par un serment de fidélité, c'est le…", reponses: ["vassal"], indice: "Au pluriel : des vassaux." },
        { q: "Le morceau de terre que reçoit le vassal, c'est le…", reponses: ["fief"], indice: "Un tout petit mot de quatre lettres, qui commence et finit par un f." },
        { q: "On devient chevalier par la cérémonie de l'…", reponses: ["adoubement"], indice: "On dit que le chevalier est « adoubé »." },
        { q: "La grande église de la ville, où siège l'évêque, c'est la…", reponses: ["cathédrale"], rouge: true, indice: "Elle se dresse au-dessus des toits de la ville." },
        { q: "Une personne qui fabrique des objets à la main et les vend dans son échoppe, c'est un…", reponses: ["artisan"], rouge: true, indice: "Le cordonnier et l'orfèvre en sont." },
        { q: "Un très grand marché, quelques fois dans l'année, avec des marchands venus de loin, c'est une…", reponses: ["foire"], rouge: true, indice: "Les plus célèbres sont en Champagne." },
        { q: "Le Moyen Âge commence en 476. En quelle année se termine-t-il ?", reponses: ["1492"], nombre: true, leurres: ["1453", "1789"], indice: "C'est l'année où Christophe Colomb arrive en Amérique." }
      ],
      bravo: "Tu as relevé le grand défi."
    }
  },

  /* ------------------------------------------------------------------
     BILAN FINAL
     ------------------------------------------------------------------ */
  bilan: {
    titre: "Bravo{virgulePrenom} !",
    intro: "Voici ce que tu sais maintenant.",
    points: [
      "Le Moyen Âge va de 476 à 1492. Ce parcours raconte les XIe, XIIe et XIIIe siècles.",
      "La [[seigneurie]] est [[tout ce qui appartient]] au seigneur. Cela comprend le [[château]], les [[réserves]] et les [[tenures]].",
      "Les paysans, serfs ou vilains, paient un [[loyer]] et des impôts pour utiliser le [[four]], le [[moulin]] ou le [[pressoir]]. Ils doivent aussi des [[corvées]].",
      "La charrue à roues et à versoir et l'assolement triennal aident à mieux cultiver la terre.",
      "Le château fort est une forteresse, du fossé jusqu'au donjon.",
      "Le seigneur a des vassaux, qui reçoivent un fief. Les chevaliers combattent pour lui. On devient chevalier par l'adoubement.",
      "En ville, protégée par ses remparts, s'élèvent la [[cathédrale]] et l'[[abbaye]]. Les [[artisans]] travaillent dans leurs échoppes. On achète au [[marché]] chaque semaine, et à la [[foire]] quelques fois par an."
    ],
    idee: "Et garde une dernière idée, elle te servira souvent en histoire : celui qui possède la terre a du pouvoir sur ceux qui y vivent.",
    sceaux: "Tes sceaux",
    allerDefi: "Il manque un défi pour ce sceau : « {titre} ». Touche pour y aller.",
    allerChapitre: "Revoir le chapitre {numero} : {titre}",
    recommencer: "Tout recommencer",
    credits: "Textes d'après le programme d'histoire de CM1. Images créées avec une intelligence artificielle (Krea), puis vérifiées une à une."
  },

  /* ------------------------------------------------------------------
     DIPLÔME (fond peint avec Krea, texte écrit par le site)
     ------------------------------------------------------------------ */
  diplome: {
    section: "Ton diplôme",
    titre: "Diplôme",
    sousTitre: "du Moyen Âge",
    decerne: "décerné à",
    motif: ["pour avoir découvert la vie dans une seigneurie,", "au temps des châteaux forts"],
    date: "le {date}",
    enregistrer: "Enregistrer le diplôme",
    alt: "Ton diplôme du Moyen Âge, avec ton prénom et les sceaux que tu as gagnés.",
    note: "Les sceaux gagnés s'impriment en rouge. Il en manque ? Touche un sceau gris, plus haut : il t'emmène au défi qui manque.",
    fichier: "diplome-moyen-age"
  },

  /* ------------------------------------------------------------------
     ACCUEIL : le prénom et l'année de naissance (demandés une seule fois)
     ------------------------------------------------------------------ */
  accueil: {
    titre: "Avant de partir au Moyen Âge",
    prenom: "Ton prénom",
    annee: "Ton année de naissance",
    choisir: "Choisis",
    partir: "C'est parti",
    passer: "Passer",
    note: "Tes réponses restent dans ce navigateur. Elles ne sont envoyées nulle part."
  },
  perso: {
    naissance: "Toi, tu as vu le jour en {annee} : tu es presque au bout de la flèche.",
    naissanceSans: "Toi, tu vis aujourd'hui : tu es tout au bout de la flèche."
  },

  /* ------------------------------------------------------------------
     MODE D'EMPLOI : la carte montrée une fois, au tout début
     (souris et clavier sur ordinateur, doigt et flèche sur tablette)
     ------------------------------------------------------------------ */
  tuto: {
    avant: "Dernière chose avant de partir",
    titre: "Comment voyager dans le temps",
    souris: "Fais rouler la {{molette}} de ta souris pour avancer dans l'histoire.",
    clavier: "Ou utilise les {{flèches}} du clavier : ↓ pour avancer, ↑ pour revenir.",
    doigt: "Fais glisser ton {{doigt}} vers le haut pour avancer dans l'histoire.",
    fleche: "Ou touche la {{flèche}}, en bas à droite de l'écran.",
    voix: "Une {{voix}} peut te raconter l'histoire. Tu pourras l'allumer ou l'éteindre avec le bouton qui brille, en bas à droite.",
    ecouter: "Écouter la voix",
    lire: "Lire sans la voix",
    partir: "C'est parti",
    aide: "Comment ça marche ?",
    bulle: "Touche-moi pour entendre la voix"
  },

  /* ------------------------------------------------------------------
     RÉACTIONS DE LA VOIX dans les défis (enregistrées, jamais affichées).
     bravo : bonne réponse (on alterne les trois) ; presque : première erreur
     sur une question ; dommage : erreurs suivantes ; sceau : défi terminé.
     ------------------------------------------------------------------ */
  reactions: {
    bravo: ["Bravo !", "Bien joué !", "Exactement !"],
    presque: ["Presque !"],
    dommage: ["Dommage, essaie encore !"],
    sceau: ["Tu as gagné le sceau !"]
  },

  /* ------------------------------------------------------------------
     PETITS TEXTES DE L'INTERFACE
     ------------------------------------------------------------------ */
  ui: {
    chapitre: "Chapitre",
    defiler: "Fais défiler",
    valider: "Valider",
    suivante: "Question suivante",
    question: "Question",
    sur: "sur",
    continuer: "Défi réussi. Fais défiler pour continuer.",
    passer: "Tu peux aussi continuer à défiler et revenir plus tard.",
    reprendre: "Reprendre là où tu en étais",
    pasToi: "Tu n'es pas {prenom} ?",
    voix: "Lire à voix haute",
    voixOff: "Arrêter la lecture à voix haute",
    reviser: "Réviser uniquement les défis",
    revision: "Révision : les défis seulement",
    quitterRevision: "Quitter la révision",
    ecris: "Écris ta réponse ici",
    exact: "Exact !",
    presque: "Oui ! Et voici la bonne orthographe : « {forme} ».",
    autres: "On peut dire aussi : {formes}.",
    pasTout: "Pas tout à fait.",
    indice1: "Un indice : {indice}",
    indice2: "Le mot commence par « {debut} » et compte {n} lettres.",
    indice3: "Voici trois propositions. Laquelle est la bonne ?",
    solution: "La réponse était « {forme} ». Tu la retrouveras plus haut dans le parcours.",
    choisis: "Touche un numéro sur l'image.",
    numero: "Numéro {n} : comment s'appelle cette partie ?",
    trouves: "{n} sur {total}",
    dejaTrouve: "Déjà trouvé : {forme}.",
    essaieEncore: "Essaie encore.",
    ordreOk: "Bien ! Et ensuite ?",
    sceau: "Sceau gagné",
    menu: "Aller au chapitre",
    lexiqueRouge: "En rouge : les mots essentiels, à savoir par cœur. En gras : les autres mots à retenir.",
    sceauPremier: "Un sceau est une marque imprimée dans de la cire. Tu en gagnes un à chaque chapitre réussi.",
    autreLieu: "« {forme} », c'est une autre partie du château. Essaie encore.",
    termine: "Terminer",
    trouveAussi: "Tu as gagné le sceau. Tu peux chercher les noms qui restent, ou continuer à défiler."
  }
};
