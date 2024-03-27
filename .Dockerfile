# Imagem base do Node.js
FROM node:18.16.0-buster-slim

USER node

RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

# Copia o restante dos arquivos para o diretório do app
COPY . .

#RUN chmod +x /home/node/app/wait-for-it.sh

# Expõe a porta 3333
EXPOSE 3333
