# Récupération de l'mage node
FROM node:19.7-alpine3.16

# Déplacement dans le répertoire /usr/src/app
WORKDIR /usr/src/app

# Copie de package.json et package-lock.json
COPY app/package.json ./
COPY app/package-lock.json ./

# Installation des modules
RUN npm install