
# Fonctionnalités à développer :

## Utilisateurs :
- Inscription
- Connexion
- Modification de son profil : nom, prénom, adresse mail et mot de passe
- rôles utilisateur:
    - si admin d'un projet : édition et suppression de projets, création et suppression de tâches
    - si contributeur : création et suprresion de tâches
    - sinon pas d'accès au projet

## Gestion de projets
- Création de projet si administrateur : nom, description + contributeurs. Le créateur est par défaut administrateur du projet
- Visualisation de projets : liste des projets auxquels l'utilisateur est propriétaire (administrateur) ou contributeur
- Modification/Suppression de projet : administrateur seulement : modification détails et suppression projets, ajout/suppression de contributeurs

## Gestion de tâches
- Création de tâche d'un projet : titre, description, date échéance, statut, assignation
- Assignation de tâche : à un ou plusieurs utilisateurs
- Statut de tâche : A faire, En cours, Terminée
- Commentaire de tâche : utilisateurs peuvent ajouter des commentaires

## Tableau de bord et vues
- Tableau de bord personnel : liste de tâches assignées (plus urgentes en premier) [Nom | Description | Nom projet | échéance | Nb commentaires | statut], kanban des tâches du mois par statut [Nom | Description | Nom projet | échéance | Nb commentaires | statut], liste des projets comportant des tâches assignées les plus urgents en premier [Nom | Descrption | Progression | Nb tâches terminées | Nb membres équipe | Nom propriétaire | Noms contributeurs]
- Liste détaillée de toutes les tâches d'un projet [Nom projet | Descriptif projet | Noms propriétaires et contributeurs  + Tâches Nom | Statut | Description | échéance | Assigné à | Nb commentaires]
- Option : Recherche et filtrage de sprojets et tâches selon assignation, échéance, statut, ...

# Contraintes :
- Next.js
- WCAG 2.1 niveau AA minimum
- Utilisation de Git
- Application responsive
- librairies externes dans package.json à justifier en soutenance


# Dette technique :
- loginPage : 
    label des inputs à aligner à gauche
    liens vers pages : forgotPassword et register
- page 404 :
    format d'affichage
- Layout :
    titre de la page à remonter des pages enfants
- header : 
    responsive à 950px
- footer :
    responsive
- dashboard :
    recherche