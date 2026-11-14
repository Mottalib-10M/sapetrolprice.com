# Test naïf du 2026-11-14, testeur 1 : sapetrolprice.com

**Persona :** Sud-Africain(e) de 45 ans, salarié(e), à l'aise avec son téléphone, aucune connaissance particulière du sujet, ne lit pas les longs paragraphes. Il/elle a tapé sa question dans Google et a cliqué sur le résultat « Petrol Price South Africa: December 2026 Estimates » parce qu'il/elle veut vraiment savoir si l'essence va monter ou baisser en décembre.

---

## 1. Concept

**Après 5 secondes (01-accueil-1) :** « C'est le prix de l'essence le mois prochain. » Le titre « Petrol price in South Africa next month » et la phrase « 95 about R27.92 in Gauteng (-R2.32), diesel +R1.28 as the levy relief ends » répondent tout de suite à ma question : l'essence 95 baisse d'environ 2,32 R, le diesel monte. C'est exactement ce que je cherchais, et ça correspond au résultat Google. La mention « Independent site, not the Central Energy Fund or a government department. Nothing sold. » me rassure.

Petit accroc dès le titre : « worked out from CEF data ». Je ne sais pas ce qu'est le « CEF ». Je comprends que c'est une source officielle, sans plus.

**Après 2 minutes :** c'est un site qui **estime** le prix de l'essence et du diesel du mois suivant, montre ce que coûte un plein, et explique pourquoi le prix bouge. Il y a aussi des pages sur le taux directeur et le crédit immobilier (« Repo rate », « Bond repayment »). Ça m'a surpris sur un site qui s'appelle « SA Petrol Price ».

- **Clair ?** Oui pour le message principal (le prix de décembre et le plein). Non dès qu'on descend : le site parle la langue de la CEF (« over-recovery », « BFP », « window average », « slate levy », « 500 ppm »).
- **Pour qui ?** Tous les automobilistes sud-africains qui veulent savoir s'il faut faire le plein avant le premier mercredi. Les pages détaillées visent plutôt quelqu'un qui suit l'actualité économique de près.
- **Bénéfice concret :** savoir avant tout le monde si ça monte ou baisse, combien coûtera mon plein (« R1,512 now, R1,396 then ») et donc si j'ai intérêt à faire le plein avant ou après le 2 décembre.

## 2. « Tout le monde peut-il comprendre ? »

**Verdict : le premier écran et le grand chiffre, oui. Presque tout le reste, non, sans effort.**

Où ça décroche :
- **Dans le bloc résultat de l'accueil (01-accueil-suite1/suite2)**, juste sous le grand chiffre : « Over-recovery so far … +312c a litre », « Window average projected to the close +382c over ». Je ne sais pas ce qu'est une « over-recovery » ni une « window ». Et surtout, **le signe me trompe** : +312c, +438c, +382c en gros… alors que le prix **baisse**. Je lis « plus » donc « hausse ».
- **Les signes « + » partout, même sur des prix ou des taxes** : « +1,406c a litre », « +279c a litre », « an under-recovery of +1,013c », et pire, sur la page levy : « an over-recovery that pulls petrol down by about +382c ». « Baisser de plus 382 », je ne comprends plus rien.
- **Le résumé « More details (optional) »** se lit comme un texte cassé : « Already filled in: oil and rand No change (latest day holds) · days to come At the latest daily figure (closer in 2026) · slate levy Unchanged ». Il manque des deux-points, je ne sais pas ce qui est la question et ce qui est la réponse.
- **Le diesel « wholesale »** : je comprends que ce n'est pas le prix à la pompe, mais je ne sais pas combien j'aurai réellement à payer.
- **Deux chiffres différents pour la même chose** : l'accueil annonce -232c pour la 95, la page Basic Fuel Price donne « -162c once the +150c levy relief ends ». Laquelle croire ?

## 3. Parcours écran par écran

| Écran | Compris / coince |
|---|---|
| 01-accueil-1 | **Compris.** Titre et phrase d'accroche parfaits. Les 4 boutons « Start from your question » (« Diesel next month », « What a full tank costs now »…) sont très bien. Le calculateur commence ; « Diesel, paraffin: wholesale price » sous « Petrol 95 » m'intrigue sans m'arrêter. |
| 01-accueil-suite1 | **Compris en partie.** « Litres in a tank » 50, avec l'aide « a small car tank holds about 40 litres, a bakkie about 80 » : excellent. Le grand **R27.92** est clair, « -R2.32 a litre (-232c) on today's R30.24 » aussi. **Coince** sur « · coast R27.05 » (côte = Durban, Le Cap ? pas dit) et sur le pavé « More details » illisible. |
| 01-accueil-suite2 | **Coince.** « Over-recovery so far +312c », « Latest day +438c over », « Window average projected to the close +382c over » : jargon et signes « + » alors que ça baisse. « A 50-litre tank R1,512 now, R1,396 then » : là je comprends tout de suite, c'est la ligne la plus utile, mais elle est noyée en bas. La phrase « every station in the zone charges the same » me rassure. |
| 01-accueil-suite3 | **Compris en partie.** « How to read the estimate for December » m'explique enfin l'over-recovery (« When it is positive… the price comes down next month »). Utile, mais c'est **après** les chiffres, et en paragraphe long. « from +429c to +279c » : pourquoi un « + » devant une taxe ? |
| 01-accueil-suite4/suite5 | **Je décroche.** Texte long sur la formule, BFP, « Minister of Mineral and Petroleum Resources », « slate levy that clears past under-recoveries ». Le lien « Show the whole paragraph » est bien. Je saute. |
| 01-accueil-suite6/suite7 | **Compris en partie.** Le tableau par carburant (Now / Estimated change / From 2 December 2026) est lisible. Mais « Over-recovery to date +312c » puis « Estimated change -232c » : le même mot donne un signe inverse, je ne fais pas le lien. Pour le diesel « +97c » d'over-recovery mais « +128c » de hausse : là je suis perdu(e). Le paragraphe sur la presse (« -382c », « R28.62 ») ajoute deux autres chiffres. |
| 01-accueil-suite8/suite9 | **Compris.** « What your tank costs now and in December » : R1,512 → R1,396, « Difference per tank -R116 ». Très clair. « Four tanks a month R6,048 » : au prix actuel ou de décembre ? Pas dit. |
| 01-accueil-suite9/10 | **Compris.** Accordéons (« Petrol price history since April 2024 »…) et FAQ « Questions drivers ask » : bonnes questions, notamment « Is the diesel price on this site what I pay at the pump? ». Le « + » de l'accordéon « Petrol price history since April 2024 » est tombé sur une ligne à part, ça fait brouillon. |
| 01-accueil-suite11/12 | **Compris.** « Compiled by Radif Partners… Paid by no oil company » : rassurant. Le disclaimer final est clair. |
| 02-menu-1 | **Compris en partie.** Menu bien rangé (« Next month and history », « Price by fuel », « What driving costs you »…). Mais certaines rubriques sont ouvertes, d'autres fermées, sans raison apparente ; le **diesel** est caché sous « Price by fuel » fermé. « MPC dates » : je ne sais pas ce que c'est. Le bas du menu laisse voir la page derrière (« Ends as announced (levy back to »), un peu brouillon. |
| 03-en-about-1 à suite4 | **Compris.** Page « About » honnête : « We sell no fuel, no loan and no insurance ». Mais l'adresse « 49 rue du Ressort, 63000 Clermont-Ferrand, France » me surprend : un site sud-africain édité en France ? Ça me fait douter un instant. |
| 04-en-basic-fuel-price-1 | **Coince.** Titre « Basic Fuel Price: how over- and under-recovery set the change » : pour spécialiste. « Enter a window average » : je ne sais pas ce que je devrais entrer. Le champ « Average gap over the window 312 c/l » ne me parle pas. |
| 04-…-suite1 | **Coince.** « -312c » en grand puis « -162c once the +150c levy relief ends » : chiffre différent de l'accueil (-232c). « A 50-litre tank, gap alone -R156 » : « gap alone » = ? |
| 04-…-suite2/suite3 | **Je décroche.** Tableau « BFP that day +1,406c / In the price +1,844c / Gap that day +438c » : pour moi, illisible. |
| 04-…-suite4 | **Coince.** « that gives +382c, rounded to +382c » : arrondi qui ne change rien, phrase étrange. |
| 04-…-suite5/suite6 | **Compris.** « What a move in the rand does to the BFP » : « Weaker by 5% → +70c a litre, +R35 on 50 litres » : ça, je comprends et c'est intéressant. |
| 05-en-bond-repayment-1 à suite6 | **Compris.** Calculateur de crédit immobilier clair : R1,500,000 sur 20 ans = R15,228, « If the MPC hikes 0.25% R15,483 (+R254) ». Le tableau par montant est lisible. Mais je me demande ce que ça fait sur un site d'essence ; « MPC » n'est pas expliqué ; la FAQ s'appelle « Questions drivers ask » alors qu'elle parle de crédit. |
| 06-en-diesel-price-1 à suite2 | **Compris en partie.** Titre clair : « why it should rise in December », « +128c on 500 ppm ». Mais « Diesel 0.05% (500 ppm) » dans la liste : je ne sais pas lequel est le mien à la pompe. R32.14 « Gauteng wholesale price » : ce n'est pas ce que je paierai, et le site ne me dit pas combien en plus. |
| 06-…-suite3/suite4 | **Compris.** « the figures above are lower than any pump price you will see. The change, on the other hand, is the same » : enfin la phrase qui m'aide. Elle devrait être tout en haut. |
| 06-…-suite5/suite6 | **Coince.** « Diesel car saves a month R827 » alors qu'on vient de me dire que le diesel est plus cher au litre et que le chiffre est « at the wholesale price ». Je ne peux pas me fier à cette économie. « an under-recovery of +1,013c » : under avec un plus. |
| 07-en-diesel-vs-petrol-price-1 à suite2 | **Coince.** Même problème : « Diesel car saves a month R620 », puis plus bas le site avoue « The comparison is not quite fair to petrol ». Le résultat principal est donc biaisé. Exemple à 1 500 km ici, 2 000 km sur la page diesel : incohérent. |
| 07-…-suite3/suite4 | **Compris.** Tableau « Diesel minus petrol » avec « A negative gap means diesel was cheaper » : bien expliqué. |
| 07-…-suite5/suite6 | **Compris en partie.** « Why the two moved apart in 2026 » : trop long pour moi. Le mini-calculateur rand (+106c a litre) est clair. |
| 08-en-fuel-cost-per-km-1 à suite6 | **Compris.** La meilleure page pour moi : « R2.42 » par km, aide « On your car's trip computer; a small car uses 6 to 7, a bakkie 9 to 12 », tableau par type de voiture, « Your monthly fuel bill » R2,129 → R1,966. Seule hésitation : « Other towns pay their own zone price, between the two » — entre quels deux ? et « zone 9C » ne me dit rien. |
| 09-en-fuel-levy-1 à suite6 | **Compris en partie.** Le calculateur est clair (« Fuel levy and RAF levy in a year R11,772 », « Saved this month by the relief R225 »), « RAF » expliqué juste après (Road Accident Fund). Le tableau 2026 est long mais lisible. **Coince** sur « an over-recovery that pulls petrol down by about +382c » : contradiction. Le mini-calcul « All the taxes in your litres R322, 21% of R1,512 » est très parlant. |

## 4. Chaque fonction

| Fonction | Trouvée ? | Comprise ? | Utile ? | Évidence /5 |
|---|---|---|---|---|
| Estimation du prix de décembre (accueil, grand chiffre) | Oui, tout de suite | Oui pour R27.92 et -R2.32 ; non pour les lignes en dessous | Très | 4/5 |
| Raccourcis « Start from your question » | Oui | Oui | Oui | 5/5 |
| Choix « Fuel levy relief after 1 December » | Oui | À moitié (je ne sais pas pourquoi je changerais) | Moyen | 3/5 |
| « More details (optional) » | Oui | Non (texte en bloc illisible) | Je n'ose pas y toucher | 1/5 |
| Coût d'un plein maintenant / en décembre | Oui | Oui | Très | 5/5 |
| Tableau tous carburants (accueil) | Oui | En partie (signes contradictoires) | Oui | 3/5 |
| Basic Fuel Price / over-recovery | Via le menu | Non | Pas pour moi | 1/5 |
| Effet du rand sur le prix | Oui (sur 2 pages) | Oui | Curieux, moyen | 4/5 |
| Diesel : prix de décembre | Oui (bouton « Diesel next month ») | En partie (wholesale) | Oui si j'ai un diesel | 3/5 |
| Diesel ou essence : quelle voiture | Oui | Oui, mais le résultat est biaisé (wholesale) | Douteux | 2/5 |
| Coût au kilomètre / budget mensuel | Oui | Oui | Très | 5/5 |
| Taxes dans mes litres / levy à l'année | Oui | Oui | Oui | 4/5 |
| Crédit immobilier et taux | Oui | Oui | Oui, mais inattendu ici | 4/5 |
| FAQ « Questions drivers ask » | Oui | Oui | Oui | 4/5 |
| Copy share link / Print | Oui | Oui | Un peu | 4/5 |

## 5. Enchaînement et navigation

- Le haut de l'accueil enchaîne parfaitement : réponse → raccourcis → calculateur → plein. Ensuite, la page devient un long article technique avant de revenir à un outil simple (« What your tank costs now and in December ») : je risque de ne jamais arriver à ce deuxième outil, pourtant le plus parlant.
- Le menu ☰ est bien organisé par thème, mais l'ouverture/fermeture des rubriques paraît aléatoire ; le diesel, l'une des deux grandes questions, est caché.
- Le fil d'Ariane (« Home / Price by fuel / Diesel ») aide à se repérer.
- Les liens « Full calculator: … → » en bas des mini-outils sont une bonne idée.
- Incohérences d'une page à l'autre : -232c (accueil) contre -162c (BFP) pour la 95 ; exemple 2 000 km (diesel) contre 1 500 km (diesel vs petrol) ; « +382c » présenté tantôt comme un gain, tantôt comme une baisse.
- La partie « Repo, prime and your bond » donne l'impression d'un deuxième site greffé ; la FAQ y garde le titre « Questions drivers ask ».

## 6. Difficultés classées

1. **Signes « + » contradictoires partout** (01-accueil-suite2, 04-…-suite2, 06-…-suite6, 09-…-suite6). Vécu : je vois « +312c », « +382c over » alors que le prix baisse ; « under-recovery of +1,013c » ; « pulls petrol down by about +382c ». Je ne sais plus si ça monte ou si ça baisse. **Recommandation :** ne jamais mettre de « + » devant un prix, une taxe ou un montant absolu (« 1,406c », « 279c ») ; réserver « + / - » aux variations du prix à la pompe, et traduire l'over-recovery en sens du prix. Texte : « Petrol is overpriced by 3.12 R a litre so far → price should drop » au lieu de « Over-recovery so far +312c a litre » ; « pulls petrol down by about 382c » au lieu de « by about +382c » ; « an under-recovery of 1,013c » au lieu de « +1,013c ».
2. **Jargon CEF dans le bloc résultat** (01-accueil-suite2). « Over-recovery », « Latest day … over », « Window average projected to the close » arrivent avant l'explication. **Recommandation :** sous le grand chiffre, garder seulement le plein et la date d'annonce ; déplacer les trois lignes techniques dans un repli « Why this figure ». Texte : « Fuel cost lower than in today's price: about R3.82 a litre by the end of the month » au lieu de « Window average projected to the close +382c over ».
3. **Résumé « More details (optional) » illisible** (01-accueil-suite1, 06-…-suite1). **Recommandation :** une ligne par réglage, avec deux-points. Texte : « Already set: Oil and rand: no change · Days still to come: same as the latest day · Slate levy: unchanged ».
4. **Le diesel n'est qu'un prix de gros, et les comparaisons diesel/essence sont biaisées** (06-…-suite1, 06-…-suite6, 07-…-1). Le résultat « Diesel car saves a month R620/R827 » compare un diesel sans marge à une essence avec marge, ce que le site avoue plus bas. **Recommandation :** ajouter une marge station moyenne indicative (et le dire), ou titrer le résultat « Difference before the station's diesel margin ». Placer en haut de la page diesel : « Your pump price will be higher, but it will move by the same +R1.28. »
5. **Deux estimations différentes pour la 95** (-232c accueil, -162c sur 04-…-suite1, plus -382c et R28.62 cités dans 01-accueil-suite7). **Recommandation :** dans l'outil BFP, préremplir 382 (la moyenne projetée, celle de l'accueil) ou écrire en clair « This uses the average so far (312c); our December estimate uses 382c → -232c ».
6. **Sigles non expliqués au premier passage** : « CEF » (titre de l'accueil), « BFP », « MPC », « 500 ppm / 0.05% », « zone 9C », « coast ». **Recommandation :** écrire en toutes lettres la première fois : « worked out from Central Energy Fund (CEF) data » ; « Diesel 500 ppm (the usual pump diesel) » / « Diesel 50 ppm (cleaner, premium) » ; « coast (Durban, Cape Town, Gqeberha) R27.05 » ; « Reserve Bank rate committee (MPC) dates ».
7. **Le deuxième calculateur de l'accueil arrive trop bas** (01-accueil-suite8), après un long article. **Recommandation :** remonter la ligne « A 50-litre tank R1,512 now, R1,396 then » juste sous le grand chiffre, et préciser « Four tanks a month at today's price R6,048 ».
8. **Crédit immobilier et adresse française surprennent** (05-…, 03-en-about-suite2). **Recommandation :** sur les pages crédit, renommer la FAQ « Questions homeowners ask » et ajouter une phrase d'entrée « Fuel and your bond are the two monthly costs set by others: this page covers the bond. » ; sur About, ajouter une phrase qui explique pourquoi l'éditeur est en France.

## 7. À garder

- La phrase d'accroche de l'accueil : « 95 about R27.92 in Gauteng (-R2.32), diesel +R1.28 as the levy relief ends ». Elle répond à ma question en une ligne.
- Les raccourcis « Start from your question ».
- Le plein concret : « A 50-litre tank R1,512 now, R1,396 then », « Difference per tank -R116 ».
- Les aides sous les champs : « A small car tank holds about 40 litres, a bakkie about 80 », « On your car's trip computer; a small car uses 6 to 7, a bakkie 9 to 12 ».
- Les bandeaux jaunes « Example: … · change a figure to see yours » : je sais que c'est un exemple.
- « Petrol pump prices are regulated: every station in the zone charges the same » : rassurant.
- La transparence : « Independent site… Nothing sold », « Paid by no oil company, bank or lender », dates de mise à jour.
- La page coût au kilomètre, la plus simple et la plus utile au quotidien.
- Les liens « Show the whole paragraph » qui raccourcissent les pavés.

## 8. Notes

Clarté : 6/10
Facilité : 7/10
Utilité : 8/10
