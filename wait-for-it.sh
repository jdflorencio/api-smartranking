#!/bin/bash

# Exibe uma mensagem indicando que o script está sendo iniciado
echo ">>>Iniciando script para configurar o banco de dados MongoDB..."



# Exibe uma mensagem indicando que o banco de dados está disponível e o script começará a criar o usuário root
echo ">>>Banco de dados MongoDB está disponível. Criando usuário root..."

# a default non-root role
MONGO_NON_ROOT_ROLE="${MONGO_NON_ROOT_ROLE:-readWrite}"

if [ -n "${MONGO_INITDB_ROOT_USERNAME:-}" ] && [ -n "${MONGO_INITDB_ROOT_PASSWORD:-}" ]; then
	mongo "$MONGO_INITDB_DATABASE" <<-EOJS
		db.createUser({
			user: "$MONGO_INITDB_ROOT_USERNAME",
			pwd: "$MONGO_INITDB_ROOT_PASSWORD",
			roles: [ { role: "root", db: "admin" } ]
		})
	EOJS
else
	true # print warning or kill temporary mongo and exit non-zero
fi
