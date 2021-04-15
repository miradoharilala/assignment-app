# assignment-app
Liste des assignments - Groupe 29

C'est une web app qui permet de gérer les assignments.

Liste des fonctionnalités:

Login
    Authentification par email et mot de passe
    Création de token valable pendant 24 heures
    Les utilisateurs non authentifiés ne peuvent pas accéder à la liste des assignments

Logout
    Suppression de token

Assignments
    Liste des assignments: scroll infini
    Notation des assignments avec la Fonctionalité Drag and Drop
    Ajout d'un assignment
    Modification d'un assignment
    Suppression d'un assignment
        On a implémenté des input qui s'autocomplètent avec la liste des matières et professeurs dans la base de données

Sécurisation des URLs

API REST
    Liste des assignments
    Ajout d'un assignment
    Modification d'un assignment
    Suppression d'un assignment
    Création d'un utilisateur 
    Login d'un utilisateur
    Déconnexion d'un utilisateur
    Détail d'un assignment

Base de données: Nous avons utilisé MongoDB pour la gestion des données. Nous avons utilisé les services de mongodb.com

Cette plateforme est déployée sur heroku et est accessible à partir des liens suivants: 
Informations de base pour le login:
    email: diamondraratovondrainy@gmail.com
    motdepasse : diamondra
    
Front end:
    https://assignment-app-front.herokuapp.com/

Back end (API Rest):
    http://assignment-app-api.herokuapp.com/api/assignments
    http://assignment-app-api.herokuapp.com/api/utilisateurs
    http://assignment-app-api.herokuapp.com/api/matieres
    http://assignment-app-api.herokuapp.com/api/eleves
    http://assignment-app-api.herokuapp.com/api/assignments/{id}

Pour une utilisation locale, voici les instructions:

Il faut installer au préalable:
    Télecharger https://nodejs.org/en/download/ et installer
    Installer angular: ouvrir l'invite de commandes et lancer npm install -g @angular/cli

Back end (node): 
    Cloner ce repository : https://github.com/miradoharilala/assignment-api.git
    Aller vers le dossier pour lancer l'invite de commande 
    Prendre les dernières modifications en faisant un pull request: git pull
    Installer les modules dont on a besoin en lançant: npm install
    Lancer le serveur: node server.js

Front end (angular): 
    Cloner ce repository : https://github.com/miradoharilala/assignment-app.git
    Aller vers le dossier pour lancer l'invite de commande 
    Prendre les dernières modifications en faisant un pull request: git pull
    Installer les modules dont on a besoin en lançant: npm install
    Lancer le serveur: ng serve --open

La plateforme s'ouvrira dans le navigateur: http://localhost/4200/

Les webservices:
    http://localhost/8010/api/assignments
    http://localhost/8010/utilisateurs
    http://localhost/8010/matieres
    http://localhost/8010/api/eleves
    http://localhost/8010/api/assignments/{id}
    http://localhost/8010/api/authentification

Améliorations qu'on pourrait ajouter à l'avenir: 
- Gestion des matières, des professeurs et des élèves
- Recherche dynamique des assignments
- Rôle admin
 
