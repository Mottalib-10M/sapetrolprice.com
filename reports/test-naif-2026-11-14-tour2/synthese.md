# Synthèse du test naïf du 2026-11-14 (tour 2) : sapetrolprice.com

Notes : testeur 1 6/7/8, testeur 2 7/7/8, testeur 3 6/7/8. 3e et dernier tour de corrections : seule la correction
validée par l'éditeur (vraie erreur de chiffre) est faite ; le reste est consigné, non retenu à ce tour.

| # | Difficulté relevée (testeurs) | Décision | Raison / correction |
|---|---|---|---|
| 1 | Tableau « Diesel vs petrol price since 2024 » : la ligne « Diesel minus petrol » n'a jamais de signe (« 267c » au 3 avril 2024 alors que le diesel coûtait R2.67 de moins), contre la légende « A negative gap means diesel was cheaper » (1, 2, 3) | **corrigé** | Cause : au tour 1, les montants sont passés au formateur `cents` (K.c), qui prend la valeur absolue par conception ; l'écart signé diesel − essence y était passé aussi. Il passe maintenant par `dc` (signé) : « -267c » … « -162c », puis « +255c », « +59c », « +62c ». Même défaut trouvé et corrigé dans la colonne « Change » du tableau de la slate levy (baisse de juillet et d'août affichées « 44c », « 53c » → « -44c », « -53c »). Les autres K.c sur une différence sont dans des phrases qui portent le sens en mots (« more », « below », « rose by ») ou sur des écarts toujours positifs (95 − 93, intérieur − côte) : inchangés. Test ajouté (`tests/engine.test.ts`, « a signed gap keeps its minus ») : `dc(-267)`, `dc(-44)`, et présence de « -267c » et « -44c » dans les pages construites. |
| 2 | Jargon (over-recovery, 312c / 438c / 382c) dans le bloc résultat de l'accueil (1, 2, 3) | **non retenu** | Hors de la seule correction validée pour ce dernier tour. |
| 3 | Rands et cents mélangés (1, 2, 3) | **non retenu** | Idem. |
| 4 | « More details (optional) » encore peu lisible (1, 2, 3) | **non retenu** | Idem ; composant de trame. |
| 5 | Diesel affiché en prix de gros, pas de prix pompe estimé (1, 2, 3) | **non retenu** | Idem ; aucune source citée ne donne la marge de détail du diesel. |
| 6 | Pages crédit immobilier / décision du 19 novembre lue comme acquise (1, 2, 3) | **non retenu** | Hors de la correction validée. |
| 7 | Pas de choix de région autre que Gauteng / côte sur l'accueil (1) | **non retenu** | Idem. |
| 8 | Mini-calculateur coût au km sans choix de carburant (1) | **non retenu** | Idem. |
| 9 | Deux résultats pour la même question (-R116 / -R191 ; R28.62 / R27.92) (3) | **non retenu** | Idem. |
| 10 | Adresse française sur About (3) | **non retenu** | Idem ; l'explication existe depuis le tour 1. |
| 11 | Outil « All the taxes in your litres » : taux réduit non dit, lignes qui ne font pas le total (2) | **non retenu** | Idem (à reprendre hors test si l'éditeur le valide). |
| 12 | Calculateur BFP : champ « Average gap » sans explication (2) | **non retenu** | Idem. |

`npm run check` : code de sortie 0 (186 tests, check-layout 24 pages × 4 largeurs, 0 défaut), journal `reports/sap-t3-check.log`. Capture relue : `reports/sap-t3-captures/03-en-diesel-vs-petrol-price-suite3.png` (« -267c », « -273c »…).
