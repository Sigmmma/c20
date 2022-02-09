La **Halo 3 Editing Kit** (**H3EK**) est l’ensemble officiel d’outils permettant de créer du contenu personnalisé pour la version MCC de Halo 3. Il a été publié pour la première fois par 343 Industries aux côtés de la saison 8 de MCC.
Semblable aux outils de mod pour Halo 1 et 2, il est finalement basé sur les anciens outils internes utilisés par Bungie lors du développement de Halo 3, avec des modifications apportées lors du portage du jeu sur MCC et quelques modifications pour les rendre plus conviviaux.

Contrairement la [H1A-EK][] vous ***faire*** besoin de posséder [Halo 3 on Steam][steam_purchase] pour accéder à la boîte à outils.

# Commencer
![.figure sur la photo: Emplacement des outils mod dans la bibliothèque steam.](/general/tools/steam_tools.jpg)

0. Assurez-vous de posséder [Halo 3 on Steam][steam_purchase], les outils ne sont accessibles que si vous possédez la version Steam.
1. [Télécharger les outils à l’aide de Steam](steam://run/1695791), vous devrez peut-être [install Steam](https://store.steampowered.com/about/) premier.
2. Suivez les invites à l’écran pour télécharger les outils.
3. Une fois le téléchargement des outils terminé, vous pouvez les trouver dans votre bibliothèque dans la section des outils.
4. Cliquez avec le bouton droit de la souris sur l’entrée des outils de mod, sélectionnez le bouton "Manage" entrée du menu contextuel, puis sélectionnez le "Browse local files" sous-entrée.
5. Extraire **both** `tags.zip` and `data.zip` à la racine du dossier mod tools.
6. (Facultatif) Consultez le [guides hub][guides] pour en savoir plus sur le modding ou installer un lanceur comme [Osoyoos][] si vous n’aimez pas utiliser la ligne de commande.

# Quoi de neuf dans le correctif de la saison 8 v1

- Export-bitmap-DDS devrait maintenant exporter des données de pixels bitmap avec les valeurs gamma appropriées.
- Export-bitmap-TGA devrait maintenant exporter un fichier TGA réel.
- Standalone/Tag Test ne devrait plus s’affirmer lors du chargement de la mission solo "The Ark"
- Correction de la fenêtre des objectifs d’IA qui clignotait rapidement si l’utilisateur ouvrait et fermait des instances l’une après l’autre.
- Désactiver "Lock window aspect ratio" pendant que Sapien se charge pour empêcher une affirmation.
- Sapien affiche désormais des informations d’erreur de géométrie telles que degenerate triangles et overlapping faces.
- FBX-to-JMS écrit maintenant correctement toutes les régions utilisées dans le fichier FBX.
- Désactiver bitmap prévisualisation des tableaux bitmap pour éviter un plantage.

# Changements majeurs par rapport à H2
Naturellement, il y a une multitude de changements par rapport à H2 car le moteur a subi une révision majeure, ce document s’efforce d’énumérer les principaux.

* Les outils sont maintenant tous 64 bits, plus d’erreurs de mémoire insuffisantes, sauf si vous manquez réellement de mémoire.
* Les sous-systèmes graphiques et de balises ont subi des révisions majeures.
* Les structures ne peuvent plus être créées à l’aide de [JMS][] fichiers, vous devez utiliser [ASS][] Fichiers.
* Tag les informations d’importation ne sont pas stockées dans un bloc de balises, mais dans un flux de balises distinct
* Les journaux de débogage ne sont plus enregistrés dans un seul dossier, ce qui vous permet d’exécuter plusieurs outils à la fois sans confondre les journaux.
* Shader tag la création a été rationalisée, vous n’avez plus besoin de sélectionner un modèle.
* If a shader template n’existe pas alors il sera autogénéré dans Sapien. Cela ne s’applique pas aux cartes empaquetées ou au MCC actuellement, alors assurez-vous que vos shaders utilisent des modèles existants. Vous pouvez utiliser une solution de contournement fournie par la communauté pour permettre à Tool de générer correctement les types de shader non expédiés.
	* https://github.com/num0005/h3-shader-compiler-fix
* La cuisson Lightmap est généralement plus rapide.
* Plusieurs balises de structure peuvent être chargées à la fois, la subdivision de base d’un scénario est maintenant le *zone set*.
* Un nouvel écran de chargement vert sophistiqué.

# Problèmes connus

* Le partage des ressources n’est actuellement pas pris en charge.
* Les cartes personnalisées Halo 3 nécessitent que le CAE soit désactivé pour se charger.
* Les cartes personnalisées de Halo 3 nécessitent que les informations cartographiques correspondent à la carte qu’elles remplacent pour charger. Cela signifie avoir le même ID de campagne et de carte. Ces valeurs se trouvent en haut de la balise de scénario.
* Le lightmapping à thread unique n’est pas pris en charge, vous devez utiliser la solution multi-processus. Cela peut être exécuté avec un seul client si vous ne souhaitez utiliser qu’un seul cœur.
* La lecture du son ne fonctionne pas dans les outils. Chargez votre carte dans MCC si vous devez tester le son.
* L’importation de sons ne fonctionne pas dans la version actuelle, vous êtes donc limité aux sons fournis avec Halo 3 MCC.
* Un menu principal ne peut pas charger toutes les cartes, vous devrez donc utiliser `init.txt` ou la console du développeur pour charger des scénarios dans la version autonome.
* Guerilla utilise du texte rouge et des dossiers grisés pour toutes les balises - cela ne signifie pas qu’il y a quelque chose qui ne va pas avec vos balises, c’est juste un problème graphique.

[steam_purchase]: https://store.steampowered.com/app/1064271
