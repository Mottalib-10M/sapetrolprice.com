# Test naïf du 2026-11-14 (tour2), testeur 2 : sapetrolprice.com
**Persona :** Sud-Africaine de 24 ans, très à l'aise avec les apps, impatiente : si elle ne comprend pas en quelques secondes ce que la page lui apporte, elle ferme et retourne sur Google. Elle a cliqué sur « Petrol Price South Africa: December 2026 Estimates » parce qu'elle veut savoir si l'essence monte ou baisse en décembre. Sur son téléphone.

## 1. Concept

**Après 5 s :** « C'est un site qui me dit le prix de l'essence le mois prochain. » Le chapeau répond tout de suite : « Petrol price in South Africa on 2 December 2026: 95 about R27.92 in Gauteng (-R2.32), diesel +R1.28 as a tax cut ends. » En une phrase, j'ai ma réponse : le 95 baisse de R2.32, le diesel monte. C'est exactement ce que promettait Google. La ligne « Independent site, not the Central Energy Fund or a government department. Nothing sold. » rassure : ce n'est pas une arnaque, ni un site officiel déguisé.

**Après 2 min :** « C'est un site d'estimation qui refait le calcul du gouvernement à partir des chiffres quotidiens du CEF, avec des calculateurs : plein, coût au km, diesel ou essence, taxes. Et bizarrement, aussi des pages sur les taux d'intérêt et les crédits immobiliers. » Le cœur (prix de décembre + coût du plein) est clair. Ce qui l'entoure (« over-recovery », « BFP », « slate levy », « window », les centimes) devient vite une leçon d'économie que je ne lis pas.

**Pour qui :** tout automobiliste sud-africain qui veut savoir s'il faut faire le plein avant ou après le premier mercredi du mois. Les pages de détail visent plutôt quelqu'un qui suit l'actualité des carburants de près.

**Bénéfice concret :** savoir que mon plein de 50 litres passe de « R1,512 now, R1,396 then » et que, pour le diesel, « Filling up before 2 December 2026 costs less ». C'est utile et ça se décide en 10 secondes.

## 2. « Tout le monde peut-il comprendre ? »

**Verdict : oui pour la réponse principale, non pour tout le reste.** Le chapeau et le grand chiffre « R27.92 » se comprennent sans effort. Je décroche à trois endroits :
- **Dans le bloc de résultat de l'accueil**, le paragraphe « The CEF's 312c over-recovery (average so far) and 438c over-recovery (latest day) are steps towards the 382c over-recovery expected by 26 November 2026 » : trois chiffres en centimes, un mot technique, je ne sais pas lequel retenir (le site dit lui-même « The figure to keep is the change of -232c », mais m'en donne trois autres juste après).
- **Le mélange rands / centimes** : « -R2.32 » dans le chapeau, « -232c » dans le résultat, « lowers it by 382c », « raises it by 150c ». Je dois convertir de tête.
- **La page Basic Fuel Price** : le calculateur me demande « Average gap over the month, cents a litre » = 382. Je n'ai aucune idée du chiffre à mettre : c'est un outil pour analystes, pas pour moi.

## 3. Parcours écran par écran

- **01-accueil-1** : compris. Titre clair, réponse dans le chapeau, quatre boutons « Start from your question » (« Diesel next month », « What a full tank costs now »…) très bien vus. Petite gêne : le titre dit « from Central Energy Fund data », je ne sais pas ce que c'est, mais ça ne bloque pas. Le formulaire commence en bas de l'écran : je ne vois pas encore de résultat, seulement des menus déroulants.
- **01-accueil-suite1** : compris pour l'essentiel. Le grand « R27.92 » apparaît enfin. « Fuel levy relief after 1 December — Ends as announced (levy back to full) » : je comprends à moitié (une baisse de taxe qui s'arrête ?). Le bloc « More details (optional) — Already filled in. Oil and rand: No change (latest day holds) · Days still to come: At the latest daily figure (closer in 2026) · Slate levy: Unchanged » : je ne comprends rien, et « (closer in 2026) » ne veut rien dire pour moi. Heureusement, c'est marqué « optional ».
- **01-accueil-suite2** : moitié compris. « A 50-litre tank R1,512 now, R1,396 then » : parfait. « Why: fuel cheaper to import than today's price assumes » : OK. Puis le long paragraphe en centimes avec « over-recovery » trois fois : je décroche. « a move of -382c quoted in the press leaves out the fuel tax cut ending » : intéressant mais trop long à lire sur téléphone.
- **01-accueil-suite3** : « Last updated 13 November 2026: Central Energy Fund figures to 11 November 2026 » rassure (c'est récent). La section « How to read the estimate for December » arrive APRÈS le résultat : je l'aurais voulue plus courte.
- **01-accueil-suite4 à suite6** : texte explicatif long (Minister, BFP, slate levy, margins). Je fais défiler sans lire. Les liens « fuel levy page », « Basic Fuel Price page », « litre breakdown » sont bien placés pour qui veut creuser.
- **01-accueil-suite7 et suite8** : le tableau par carburant (« Petrol 95 (pump) Now R30.24 / Fuel cost gap -382c / Tax cut ends +150c / Change -232c / From 2 December 2026 R27.92 ») est lisible et cohérent avec le haut. Utile de voir les 5 carburants d'un coup. « Fuel cost gap » est un nouveau nom pour ce qui s'appelait « Why: fuel cheaper to import… » dans le résultat : même chose, deux étiquettes.
- **01-accueil-suite9 et suite10** : le mini-calculateur « What your tank costs now and in December » répète le calcul du haut (R1,512, R1,396, « Difference per tank -R116 », « Four tanks a month at today's price R6,048 »). Clair, mais doublon de ce que j'ai déjà vu. Puis les accordéons (« How close a mid-month estimate came in 2026 », « Repo rate, prime and your bond »…). « Repo rate, prime and your bond » sur un site d'essence : surprise.
- **01-accueil-suite11 et suite12** : FAQ « Questions drivers ask » excellente. « When is the next petrol price change? » ouverte par défaut, réponse claire. « Is the diesel price on this site what I pay at the pump? » est LA question que je me posais. Encadré « Compiled by Radif Partners… Paid by no oil company… » rassurant.
- **02-menu-1** : compris. Rubriques claires (« Next month and history », « Price by fuel », « What driving costs you »). « Also: interest rates and your bond » avec 5 entrées (Repo rate, Prime, Bond repayment, MPC dates, Interest rates today) : je me demande si je suis toujours sur un site d'essence. « Coast against Gauteng » : je comprends, c'est bien.
- **03-en-about-1 à suite5** : compris. Qui, quoi, pourquoi, sources, ce qui manque. L'adresse à Clermont-Ferrand (France) surprend, mais c'est expliqué (« which is why its address below is French »). Honnête. Une page que je ne lirais pas, mais elle répond aux doutes.
- **04-en-basic-fuel-price-1** : coince. Titre « Basic Fuel Price: how the gap between cost and pump price sets the change » : abstrait. Le chapeau est dense (1,406c, 1,844c, 382c, R2.32). Le calculateur demande un « Average gap over the month, cents a litre » : je ne saurais pas quoi saisir.
- **04-en-basic-fuel-price-suite1** : résultat « -232c a litre » cohérent avec l'accueil. « A 50-litre tank, with the tax cut ending -R116 » : OK.
- **04-en-basic-fuel-price-suite2 à suite4** : tableaux « BFP that day / In the price / Gap that day / Window average » : jargon pur. La phrase « "Over" means the pump price is above cost, so the price comes down » est utile, mais arrive tard.
- **04-en-basic-fuel-price-suite5 et suite6** : « What a move in the rand does to the BFP » : le résultat « +70c a litre, +R35 on 50 litres » est concret et parlant. Bon outil, mal titré (« BFP »).
- **05-en-bond-repayment-1 à suite6** : la page en soi est claire (R1,500,000 sur 20 ans = « R15,228 » par mois, +R254 si hausse), mais je ne suis pas venue pour ça. Je ne comprends pas pourquoi un site « SA Petrol Price » m'emmène sur mon crédit immobilier. Petit détail : « R15,483 (+R254) » alors que 15,483 − 15,228 = 255, et « R14,976 (-R253) » alors que l'écart fait 252. Arrondis, mais visibles. Le lien avec l'essence (« about R163 less a month for a 880 km commute, while a 0.25% hike would add R254 ») est malin.
- **06-en-diesel-price-1 à suite6** : compris. Titre direct « why it should rise in December », chapeau clair : « Your pump price is higher than this wholesale figure, but it moves by the same amount. » Le conseil « Filling up before 2 December 2026 costs less » est parfait. Je regrette de n'avoir AUCUNE idée de mon vrai prix à la pompe pour le diesel : le site me donne R32.14 « wholesale », mais ne m'aide pas à estimer le montant réel (combien ajoute une station, en gros ?). « 500 ppm (0.05% sulphur) » : je ne sais pas lequel est le mien.
- **07-en-diesel-vs-petrol-price-1 et suite1** : compris. « A diesel car saves a month, before the station's diesel margin R620 ». Mais « before the station's diesel margin » veut dire que le vrai chiffre est plus petit, de combien ? Je ne sais pas.
- **07-en-diesel-vs-petrol-price-suite2 à suite4** : **coince, erreur visible.** Le texte dit « A negative gap means diesel was cheaper », et en avril 2024 le diesel (R22.45) était moins cher que l'essence (R25.12). Pourtant la ligne « Diesel minus petrol » affiche « 267c », sans signe moins. Idem pour août 2024 (273c), décembre 2024 (226c), avril 2025 (230c), etc. Puis en 2026 (diesel plus cher) : « 255c », « 59c », « 62c », aussi sans signe. Toutes les lignes sont positives : le tableau contredit sa propre légende, je ne peux pas savoir qui était moins cher sans refaire la soustraction.
- **07-en-diesel-vs-petrol-price-suite5 et suite6** : texte « Why the two moved apart in 2026 » compréhensible. L'outil « How a weaker rand moves each fuel » (+106c pour le diesel) est clair.
- **08-en-fuel-cost-per-km-1 à suite6** : très bien compris. « R2.42 » par km, « R242 per 100 km », aide pour la conso (« On your car's trip computer; a small car uses 6 to 7, a bakkie 9 to 12 »). Le tableau par type de voiture (hatchback, sedan, bakkie) est parlant. Le mini-calculateur mensuel (40 km × 22 jours → « R2,129 », « R1,966 a month from 2 December 2026 (estimate, -R163) ») est la meilleure page pour moi.
- **09-en-fuel-levy-1 à suite6** : compris en gros. « R11,772 » par an de taxes pour 150 L/mois, c'est frappant. Le tableau 2026 mois par mois est lisible. Deux accrocs : (1) en haut le calcul est « at the full rates (429c… ) », puis l'outil « All the taxes in your litres » plus bas affiche « General fuel levy R140 » pour 50 L, soit le taux réduit de 279c, sans le dire ; (2) les lignes affichées font 140 + 113 + 68 = R321, mais le total annoncé est « R322 ». Je me demande ce qui manque.

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Prix estimé de décembre (accueil, chapeau + grand chiffre) | Oui, immédiatement | Oui | Très | 5 |
| Choix du carburant + plein en litres (accueil) | Oui | Oui | Oui | 4 |
| « Fuel levy relief after 1 December » (menu déroulant) | Oui | À moitié | Moyen | 3 |
| « More details (optional) » (hypothèses) | Oui | Non | Faible pour moi | 1 |
| Tableau 5 carburants (accueil) | Oui, en défilant | Oui | Oui | 4 |
| « What your tank costs now and in December » | Oui | Oui | Doublon du haut | 3 |
| FAQ « Questions drivers ask » | Oui | Oui | Très | 5 |
| « Copy share link / Print / How this is computed » | Oui | Oui | Moyen (partager à un proche : bien) | 4 |
| Menu ☰ | Oui | Oui | Oui | 4 |
| Calculateur Basic Fuel Price (« Average gap… cents ») | Oui | Non | Non pour moi | 1 |
| Rand contre dollar (+70c / +106c) | Oui | Oui | Curiosité | 3 |
| Crédit immobilier (bond repayment) | Par le menu | Oui | Hors sujet pour ma question | 3 |
| Diesel : prix de gros + conseil « before/after » | Oui | Oui | Oui, mais il manque le prix pompe | 4 |
| Diesel ou essence (R620 d'économie) | Oui | Oui | Oui, mais « before the margin » laisse un flou | 3 |
| Tableau diesel/essence depuis 2024 | Oui | Non (signes absents) | Annulé par l'erreur | 1 |
| Coût au km + facture mensuelle | Oui | Oui | Très | 5 |
| Taxes sur le carburant (an, plein) | Oui | Oui | Oui | 3 |

## 5. Enchaînement et navigation

- L'entrée est excellente : réponse dans le chapeau, puis quatre boutons « Start from your question » qui mènent exactement où je voudrais aller.
- Le fil d'Ariane (« Home / What driving costs you / Cost per kilometre ») me situe toujours.
- Chaque page suit le même plan : chapeau avec chiffre, calculateur pré-rempli, bandeau jaune « Example… change a figure to see yours », puis texte, tableau, mini-outil, FAQ. Une fois compris, c'est rassurant et prévisible.
- Les « Show the whole paragraph » allègent le texte : bien.
- Le menu mélange deux sites : l'essence et « Also: interest rates and your bond » (5 pages). Pour quelqu'un venu de Google pour l'essence, ce bloc brouille l'identité du site.
- Les pages « Why the price moves » (Basic Fuel Price, levy) sont des pages d'expert : bonnes pour la crédibilité, lourdes pour moi.
- Les mêmes choses portent des noms différents d'un écran à l'autre : « Why: fuel cheaper to import than today's price assumes » / « Fuel cost gap » / « From the gap alone » / « over-recovery » / « Gap that day ». Et « Temporary fuel tax cut » / « Fuel levy relief » / « Tax cut ends » / « levy relief ». Je dois deviner que c'est la même chose.

## 6. Difficultés classées

1. **07-en-diesel-vs-petrol-price-suite2 à suite4, tableau « Diesel minus petrol » sans signe.**
   Vécu : la légende dit « A negative gap means diesel was cheaper », mais toutes les lignes sont positives (« 267c » en avril 2024, alors que le diesel était à R22.45 contre R25.12). Je ne fais plus confiance au tableau.
   Reco : afficher le signe (« -267c » … « +255c », « +59c », « +62c ») ou reformuler la ligne en clair.
   Texte de remplacement : ligne « Diesel against petrol », valeurs « 267c cheaper » / « 62c dearer ».

2. **01-accueil-suite2, paragraphe du résultat en centimes et « over-recovery ».**
   Vécu : après le bon chiffre, je reçois 312c, 438c, 382c et trois fois « over-recovery ». Je ne sais plus quel chiffre compte.
   Reco : dans le bloc résultat, garder deux phrases en rands, renvoyer le détail technique plus bas.
   Texte de remplacement : « Filling up after 2 December 2026 costs less: about R2.32 a litre less on 95. Some news sites quote a R3.82 cut: that leaves out the R1.50 tax cut ending. The official price comes a few days before 2 December. »

3. **Toutes les pages, rands et centimes mélangés.**
   Vécu : « -R2.32 » en haut, « -232c » au milieu, « lowers it by 382c »… Je convertis sans arrêt.
   Reco : afficher partout les rands en premier, les centimes entre parenthèses.
   Texte de remplacement : « lowers it by R3.82 (382c) », « raises it by R1.50 (150c) », « Change on 2 December 2026: -R2.32 a litre (-232c) ».

4. **01-accueil-suite1 / 06-en-diesel-price-suite1, « More details (optional) ».**
   Vécu : « Days still to come: At the latest daily figure (closer in 2026) · Slate levy: Unchanged » est incompréhensible.
   Reco : réécrire le résumé en langage courant.
   Texte de remplacement : « Already filled in: oil price and rand stay as on the latest day · the rest of the month follows the latest day (this came closest in 2026) · no change to other levies. »

5. **06-en-diesel-price, pas de prix pompe estimé pour le diesel.**
   Vécu : le site me donne R32.14 « wholesale » et me dit que la pompe est plus chère, sans dire de combien. Je ne sais toujours pas ce que je paierai.
   Reco : ajouter une ligne indicative.
   Texte de remplacement : « At the pump, expect roughly R32.14 plus your station's margin, often around R1 to R3 a litre: compare with today's price at your station and add +R1.28. »
   (Ou plus simple : « Your pump price today + R1.28 = your price from 2 December. »)

6. **02-menu-1 et 05-en-bond-repayment, pages taux d'intérêt / crédit immobilier.**
   Vécu : sur un site « SA Petrol Price », 5 pages sur le repo rate et mon crédit immobilier. Je me demande si je suis encore sur le bon site.
   Reco : relier le bloc au thème dès son titre dans le menu.
   Texte de remplacement : « Your other monthly bill: bond and interest rates ».

7. **09-en-fuel-levy-suite5 et suite6, outil « All the taxes in your litres ».**
   Vécu : en haut, la taxe est calculée au taux plein (429c), ici au taux réduit (R140 pour 50 L = 279c) sans le dire, et les lignes (140 + 113 + 68 = 321) ne font pas le total « R322 ».
   Reco : préciser le taux utilisé et afficher toutes les lignes qui composent le total.
   Texte de remplacement : « General fuel levy (279c, relief rate until 1 December) R140 » + une ligne « Other levies R1 » si elle existe.

8. **04-en-basic-fuel-price-1, calculateur « Average gap over the month, cents a litre ».**
   Vécu : je ne sais pas quoi saisir, je ne connais pas ce chiffre.
   Reco : dire d'où vient le chiffre pré-rempli et à quoi sert l'outil.
   Texte de remplacement (sous le champ) : « Already set to this month's expected figure (382c). Change it if the news quotes another over-recovery. »

## 7. À garder

- Le chapeau de l'accueil : « 95 about R27.92 in Gauteng (-R2.32), diesel +R1.28 as a tax cut ends. » Réponse en une phrase.
- « Independent site, not the Central Energy Fund or a government department. Nothing sold. »
- Les quatre boutons « Start from your question ».
- « A 50-litre tank R1,512 now, R1,396 then » et le conseil « Filling up before/after 2 December 2026 costs less ».
- L'explication des écarts avec la presse (« a move of -382c quoted in the press leaves out the fuel tax cut ending ») : elle répond à un vrai doute.
- La FAQ, surtout « Is the diesel price on this site what I pay at the pump? ».
- La page coût au km (aide sur la consommation, tableau par type de voiture, facture mensuelle).
- Les bandeaux jaunes « Example… change a figure to see yours » : on comprend que c'est un exemple.
- « Last updated 13 November 2026 » et l'encadré « Compiled by Radif Partners… Paid by no oil company ».

## 8. Notes

Clarté : 7/10
Facilité : 7/10
Utilité : 8/10
