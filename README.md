# Mini Projet

Une brève description de ce que fait ton projet.

## 🚀 Installation

```bash
git clone https://github.com/ahmedMahouachi/Mini-projet-api.git

cd Mini-projet-api

npm install


# Génération des modèles Sequelize

npx sequelize-cli model:generate --name Project --attributes nom:string,description:text,dateCreation:date

npx sequelize-cli model:generate --name Tache --attributes titre:string,statut:string,project_id:integer

# Création de la base de données et exécution des migrations
npx sequelize-cli db:create

npx sequelize-cli db:migrate

# Démarrage du serveur
npm run dev

```
### ⚠️ Note importante :

> Avant d’exécuter db:create ou de lancer le projet, assure-toi que ton serveur de base de données est bien démarré. Sinon, la connexion échouera.