# Test naïf du 2026-11-14, testeur 3 : sapetrolprice.com
**Persona :** Sud-Africain(e) de 61 ans, se sert de son téléphone pour WhatsApp et la météo, lit lentement, se méfie des sites qui demandent des données, ne comprend pas les sigles. A cliqué sur le résultat Google « Petrol Price South Africa: December 2026 Estimates » parce qu'il/elle a cette question pour lui/elle-même ou un proche.

## 1. Concept

**Après 5 secondes :** « C'est le prix de l'essence le mois prochain. » Le titre « Petrol price in South Africa next month » et la phrase « 95 about R27.92 in Gauteng (-R2.32), diesel +R1.28 » répondent tout de suite. Elle retient : l'essence 95 baisse d'environ 2 rands, le diesel monte. C'est exactement ce que promettait Google. Mais le titre se termine par « worked out from CEF data » : elle ne sait pas ce qu'est le « CEF ». La ligne « Independent site, not the Central Energy Fund or a government department. Nothing sold. » la rassure à moitié : elle comprend « rien à vendre », mais découvre qu'il existe un « Central Energy Fund » sans savoir ce que c'est.

**Après 2 minutes :** elle a compris que c'est un site d'estimation, pas le prix officiel (« The official figure comes with the Department's statement a few days before 2 December 2026 »), et qu'on peut calculer le coût d'un plein (« A 50-litre tank R1,512 now, R1,396 then »). En revanche elle s'est perdue dans les lignes « Over-recovery so far », « Window average projected to the close », « +312c », « +438c over », « +382c over », puis dans le menu qui parle de « Repo rate », « Prime lending rate », « Bond repayment », « MPC dates ». Elle se demande pourquoi un site sur l'essence lui parle de prêt immobilier.

**Clair ?** Le message principal oui ; tout le reste non. **Pour qui ?** Pour un automobiliste qui veut savoir si l'essence monte ou baisse, mais le vocabulaire vise quelqu'un qui suit l'actualité économique. **Bénéfice concret :** savoir s'il vaut mieux faire le plein avant ou après le 2 décembre (ici : attendre pour l'essence, se dépêcher pour le diesel). Le site ne le lui dit jamais en ces mots ; elle doit le déduire.

## 2. « Tout le monde peut-il comprendre ? »

**Verdict : non, seulement le haut de l'accueil.** Le gros chiffre R27.92, le « -R2.32 » et le plein de 50 litres sont compris par tout le monde. Ça décroche :
- dès la carte de résultat de l'accueil (`01-accueil-suite1`, `-suite2`) : « Over-recovery », « coast R27.05 », « Window average projected to the close », « -232c » (elle ne sait pas que « c » = cents et qu'il y a 100 cents dans un rand) ;
- dans le bloc replié « More details (optional) » : « Already filled in: oil and rand No change (latest day holds) · days to come At the latest daily figure (closer in 2026) · slate levy Unchanged », une phrase qu'elle ne peut pas lire (majuscules au milieu, pas de ponctuation, « slate levy » inconnu) ;
- partout dans les sigles : CEF, BFP, RAF, MPC, ppm, c/l, « bakkie » (ça, elle le comprend, c'est sud-africain), « repo », « prime » ;
- dans les signes : « over-recovery +312c » fait baisser le prix, « under-recovery of +1,013c » le fait monter ; « pulls petrol down by about +382c ». Un « + » pour une baisse, elle ne suit plus.

## 3. Parcours écran par écran

- **01-accueil-1** : compris. Titre, chiffre du 95, diesel en hausse, « Nothing sold ». Les 4 boutons « Start from your question » sont clairs (« Diesel next month », « What a full tank costs now »), sauf « Repo rate decision of 19 November 2026 » : qu'est-ce que le « repo rate » vient faire ici ? Le formulaire « Fuel / Petrol 95 » est clair ; « Diesel, paraffin: wholesale price » l'intrigue (que veut dire « wholesale » pour elle qui paie à la pompe ?).
- **01-accueil-suite1** : coince. « Fuel levy relief after 1 December — Ends as announced (levy back to full) » : elle ne sait pas ce qu'est la « levy relief » à ce stade. « Litres in a tank 50 » + l'aide « A small car tank holds about 40 litres, a bakkie about 80 » : très bien. « More details (optional) » : illisible (voir §2). Le gros « R27.92 » : compris. « -R2.32 a litre (-232c) on today's R30.24 · coast R27.05 » : « coast » ne lui dit rien (prix à la côte ? Durban ?).
- **01-accueil-suite2** : coince. Cinq lignes techniques (« +312c a litre », « +438c over », « +382c over », « +150c »). Elle voit trois chiffres différents pour la même chose et aucun n'est le -232 du dessus. La seule ligne utile pour elle : « A 50-litre tank R1,512 now, R1,396 then ». La phrase « every station in the zone charges the same » la rassure (elle n'a pas besoin de comparer les stations).
- **01-accueil-suite3** : partiellement compris. « How to read the estimate for December » est une bonne idée, mais l'explication dit « the price comes down next month by that amount » (l'over-recovery, donc 312c) alors que le gros chiffre annonce -232c. Elle ne fait pas le calcul « 382 − 150 ». « +429c to +279c » : en cents avec un signe +, pénible.
- **01-accueil-suite4 / suite5** : décroche. Texte long, « Minister of Mineral and Petroleum Resources », « Basic Fuel Price (BFP) », « +1,844c a litre for 95 », « slate levy that clears past under-recoveries ». Elle fait défiler sans lire.
- **01-accueil-suite6 / suite7** : compris en partie. Le tableau par carburant (Now / Estimated change / From 2 December 2026) est lisible : 95 → R27.92, 93 → R27.76, diesel 500 ppm → R32.14, paraffine → R24.41. Mais « Diesel 500 ppm » vs « Diesel 50 ppm » : elle ne sait pas lequel elle met. Diesel : « Over-recovery to date +97c » et pourtant « Estimated change +128c » : contradictoire pour elle (on vient de lui dire qu'une over-recovery fait baisser). Le paragraphe sur la presse (« -382c », « R28.62 ») ajoute deux autres chiffres : elle ne sait plus lequel croire.
- **01-accueil-suite8 / suite9** : compris. « What your tank costs now and in December » : 50 litres, R1,512 maintenant, R1,396 à partir du 2 décembre, « Difference per tank -R116 ». C'est le passage le plus utile pour elle. « Four tanks a month R6,048 » : pourquoi quatre ? Elle n'en fait pas quatre. Les accordéons (« Petrol price history since April 2024 », « What a litre of petrol 95 pays for »…) sont clairs comme titres.
- **01-accueil-suite10 / suite11** : compris. « Questions drivers ask » : la première réponse est dépliée et répond à « When is the next petrol price change? » → « Wednesday 2 December 2026 ». Très bien. « Does this site sell fuel, loans or cards? » rassure.
- **01-accueil-suite12** : compris. « Compiled by Radif Partners », « no commission, no affiliate link ». Rassurant, mais elle ne sait pas qui est Radif Partners.
- **02-menu-1** : coince. Cinq rubriques dont trois sur l'essence et une entière sur « Repo, prime and your bond » (Repo rate, Prime lending rate, Bond repayment, MPC dates, Interest rates today). Elle se demande si elle est toujours sur un site d'essence. « Coast against Gauteng » : énigmatique. « Why the price moves » et « Price by fuel » sont fermés : elle ne voit pas « Diesel » directement. Un bout du formulaire de l'accueil dépasse en bas du menu (« Ends as announced (levy back to »).
- **03-en-about-1 à suite4** : compris dans l'ensemble. « We sell no fuel, no loan and no insurance, and ask for no contact details » : très rassurant pour elle. Mais l'adresse « 49 rue du Ressort, 63000 Clermont-Ferrand, France » l'inquiète : pourquoi une société française donne-t-elle le prix de l'essence en Afrique du Sud ? Le jargon revient (« over- or under-recovery building up during the month », « pricing window »).
- **04-en-basic-fuel-price-1 à suite6** : ne comprend pas. Titre « Basic Fuel Price: how over- and under-recovery set the change » : rien que des mots inconnus. Le calculateur demande « Average gap over the window 312 c/l » : elle ne saurait pas quoi taper. Le résultat « -312c » puis « -162c once the +150c levy relief ends » contredit le -232c de l'accueil. La phrase « For petrol 95 now, that gives +382c, rounded to +382c » paraît être une erreur. Le tableau « BFP that day +1,406c / In the price +1,844c / Gap that day +438c » : opaque. Le second outil (« What a move in the rand does to the BFP », « +70c a litre », « +R35 on 50 litres ») est compréhensible : si le rand baisse, l'essence monte.
- **05-en-bond-repayment-1 à suite6** : compris, mais hors sujet pour elle. Le calcul du prêt immobilier est clair (R1,500,000, 20 ans, R15,228 par mois, « If the MPC hikes 0.25% R15,483 (+R254) »). « MPC » et « basis points » ne sont pas expliqués. La rubrique s'appelle « Questions drivers ask » alors qu'on parle de prêt immobilier. Le lien avec l'essence (« about R163 less a month for a 880 km commute ») est une bonne idée mais arrive tard.
- **06-en-diesel-price-1 à suite6** : compris en partie. Le titre « Diesel price in South Africa: why it should rise in December » est clair et répond à une vraie question. « Diesel 0.05% (500 ppm) » : elle ne sait pas lequel elle achète. Le résultat R32.14 « (+128c) » est clair. Le texte « What you pay at the pump adds the station's margin, so the figures above are lower than any pump price you will see. The change, on the other hand, is the same » est le message le plus utile de la page, mais il est loin en bas. « Farmers, miners… diesel refund scheme » : bon à savoir pour un proche agriculteur. Le mini-outil « Diesel car saves a month R827 » arrive alors qu'elle cherchait seulement le prix. « under-recovery of +1,013c » : signe + pour une hausse, elle ne suit plus.
- **07-en-diesel-vs-petrol-price-1 à suite6** : compris. Question claire (« which car costs less to run now »), réponse claire (« Diesel car saves a month R620 »). Mais elle remarque « (diesel at the wholesale price) » et, plus bas, « The comparison is not quite fair to petrol » : alors le R620 est-il juste ? Le tableau historique avec « Diesel minus petrol -267c » est lisible. Le bloc « How a weaker rand moves each fuel » répète celui de la page 04.
- **08-en-fuel-cost-per-km-1 à suite6** : compris, la meilleure page pour elle. « R2.42 » par kilomètre, « R242 per 100 km », l'aide « On your car's trip computer; a small car uses 6 to 7, a bakkie 9 to 12 », le tableau « Small hatchback / Family sedan / Petrol bakkie », le mini-calculateur « 40 km a day, 22 days a month → R2,129, R1,966 from 2 December ». « Gauteng (inland, zone 9C) » : « 9C » ne lui dit rien mais le choix reste clair. « Back to the full calculator at the top → » : pratique.
- **09-en-fuel-levy-1 à suite6** : coince. « Fuel levy and RAF levy in a year R11,772 » : « RAF » n'est développé que plus bas. Le résultat mélange une année (R11,772, R7,722, R4,050) et un mois (« Saved this month by the relief R225 ») sans le signaler. Le long tableau mois par mois de 2026 (tout en « +…c ») est fastidieux. L'outil « All the taxes in your litres » est parlant : « R322 », « 21% of R1,512 ». Mais il range « Fuel itself, landed (Basic Fuel Price) R922 » parmi les taxes, et R922 n'est pas compris dans les R322. « pulls petrol down by about +382c » : encore un + pour une baisse.

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Estimation du prix au 2 décembre (accueil, gros chiffre) | Oui, tout de suite | Oui pour le chiffre, non pour les lignes dessous | Très | 4 |
| Choix du carburant + litres du plein | Oui | Oui (aide 40 / 80 litres très bonne) | Très | 4 |
| Choix « Fuel levy relief after 1 December » | Oui | Non (ne sait pas ce qu'est la « levy relief ») | Moyen | 2 |
| « More details (optional) » | Oui | Non, phrase illisible | Faible pour elle | 1 |
| Coût du plein maintenant / en décembre | Oui (accueil suite8) | Oui | Très | 5 |
| Tableau tous carburants (95, 93, diesel, paraffine) | Oui | Oui pour « Now » et « From 2 December », non pour « Over-recovery » | Très | 3 |
| FAQ « Questions drivers ask » | Oui | Oui | Utile (date du changement) | 4 |
| Copy share link / Print | Oui | Oui | Moyen (WhatsApp, oui) | 3 |
| Menu ☰ | Oui | Partiellement (rubrique prêt immobilier déroutante) | Moyen | 2 |
| Basic Fuel Price + calcul du « gap » | Oui (menu) | Non | Aucune pour elle | 1 |
| Effet du rand sur le prix | Oui | Oui | Faible | 3 |
| Remboursement de prêt immobilier | Oui (menu) | Oui | Pas pour cette visite | 3 |
| Prix du diesel en décembre | Oui (bouton accueil) | Oui pour le gros chiffre, non pour « 500 ppm / 50 ppm » | Très | 3 |
| Diesel ou essence ? | Oui | Oui, avec un doute sur la comparaison « wholesale » | Moyen | 4 |
| Coût au kilomètre + facture mensuelle | Oui | Oui | Très | 5 |
| Taxe sur le carburant par an | Oui | Moyennement (année / mois mélangés, RAF) | Moyen | 2 |
| Taxes dans un plein (R322) | Oui | Oui, sauf la ligne R922 | Moyen | 3 |

## 5. Enchaînement et navigation

- Le haut de l'accueil enchaîne bien : question → réponse → formulaire → résultat → coût du plein. Les boutons « Start from your question » sont la meilleure porte d'entrée.
- Puis l'accueil s'allonge (13 écrans) avec des explications techniques avant de revenir à un outil simple (le plein, suite8). Elle risque de lâcher avant d'y arriver.
- Le fil d'Ariane (« Home / What driving costs you / Cost per kilometre ») est clair et rassurant.
- Les liens « Full calculator: … → » sous chaque mini-outil sont pratiques, mais à force il y a des calculateurs partout et elle ne sait plus lequel est « le vrai ».
- Le même bloc revient d'une page à l'autre (« How a weaker rand moves each fuel » en 04 et 07, « Compiled by Radif Partners » deux fois par page, le paragraphe « Next month figures are estimates… » en bas de chaque page) : impression de redite.
- Incohérence la plus gênante : la baisse de l'essence 95 vaut -232c à l'accueil, -312c et -162c sur la page Basic Fuel Price, et la presse dit -382c ou R28.62. Elle ne sait pas quel chiffre retenir.
- La rubrique « Repo, prime and your bond » brouille l'identité du site « SA Petrol Price ».

## 6. Difficultés classées

1. **Accueil (01-accueil-suite1 / suite2) et page Basic Fuel Price (04) : plusieurs baisses différentes pour l'essence 95.** Vécu : « 232 ? 312 ? 382 ? 162 ? Lequel est le bon ? » Recommandation : sous le gros chiffre, une seule phrase en rands, puis le détail replié. Texte de remplacement : « Petrol 95 should drop by about R2.32 a litre on 2 December. Why: fuel bought abroad got cheaper (–R3.82), but a temporary tax cut ends (+R1.50). » Sur la page 04, préremplir le calcul pour qu'il retombe sur le même -232c, ou écrire « -312c so far; -232c expected by the close, once the levy returns ».
2. **Partout : jargon et sigles non expliqués** (CEF, BFP, RAF, MPC, ppm, « over-recovery », « window », « slate levy », « coast », « c/l »). Vécu : elle saute les lignes et doute de tout le reste. Recommandation : développer chaque sigle à sa première apparition et remplacer les mots techniques dans les libellés. Ex. : « Over-recovery so far » → « How much too much you've been paying (so far) » ; « Window average projected to the close » → « Expected by the end of the month » ; « coast R27.05 » → « At the coast (Durban, Cape Town, PE): R27.05 ».
3. **Montants en cents avec un « + » (01, 04, 06, 09).** Vécu : « +382c » pour une baisse, « under-recovery of +1,013c » pour une hausse : contradictoire. Recommandation : afficher en rands, avec le signe qui suit le sens de la variation du prix. « pulls petrol down by about +382c » → « pulls petrol down by about R3.82 a litre ».
4. **« More details (optional) » (01-accueil-suite1, 06).** Vécu : phrase illisible. Recommandation : liste à puces lisible. Texte de remplacement : « Already assumed: • oil price and rand stay as they are today • remaining days follow the latest daily figure • no change to the slate levy ».
5. **Menu (02-menu-1) : une rubrique entière sur le prêt immobilier.** Vécu : « Je suis sur un site d'essence ou de banque ? » Recommandation : placer « Repo, prime and your bond » en dernier, sous un intitulé explicite, par ex. « Also: interest rates and home loans », et ouvrir par défaut « Price by fuel » (Diesel, Paraffin visibles).
6. **Diesel : « 500 ppm » / « 50 ppm » et prix « wholesale » (01, 06, 07).** Vécu : elle ne sait pas lequel elle achète, ni pourquoi le site n'affiche pas son prix à la pompe. Recommandation : sous le choix, écrire « Most pumps sell 50 ppm. Your pump price will be about R1–R2 more than this figure, but it will move by the same amount. » (n'écrire l'écart chiffré que s'il est sourcé).
7. **Taxe sur le carburant (09) : année et mois mélangés, et « Fuel itself R922 » rangé parmi les taxes.** Recommandation : « Saved this month by the relief R225 » → « Saved by the November tax cut (one month) R225 » ; sortir la ligne R922 du bloc taxes, ou l'intituler « Not a tax: the fuel itself R922 ».
8. **Adresse en France (03-en-about-suite2).** Vécu : méfiance (« pourquoi une société française ? »). Recommandation : ajouter une phrase qui l'assume. Ex. : « Radif Partners is a French company; every figure comes from South African public sources (Central Energy Fund, Reserve Bank) and is linked below. »

## 7. À garder

- Le titre et la phrase d'accroche de l'accueil : la réponse en une ligne, avec les rands et le sens de la variation (« 95 about R27.92 in Gauteng (-R2.32), diesel +R1.28 »).
- « Independent site… Nothing sold. » et, dans About, « We sell no fuel, no loan and no insurance, and ask for no contact details » : très rassurant pour une personne méfiante.
- Les boutons « Start from your question ».
- L'aide « A small car tank holds about 40 litres, a bakkie about 80 » et « On your car's trip computer; a small car uses 6 to 7, a bakkie 9 to 12 » : concrets et sud-africains.
- Le bloc « What your tank costs now and in December » (R1,512 → R1,396, -R116).
- La page « Fuel cost per km », la plus simple et la plus utile.
- Les encadrés jaunes « Example: … · change a figure to see yours » : elle comprend que les chiffres sont un exemple.
- La FAQ dont la première réponse est dépliée (date du 2 décembre).
- La phrase « every station in the zone charges the same » : elle n'a pas besoin de comparer les stations.

## 8. Notes

Clarté : 6/10
Facilité : 6/10
Utilité : 8/10
