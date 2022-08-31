#!/bin/sh

if [ -f .env ]; then
  export $(cat .env | xargs)
fi

if [ $(command -v docker) ]; then
    docker rm -f wdib-db
    docker run --name wdib-db -it -d -p 5432:5432 -e POSTGRES_PASSWORD=$DB_PASSWORD -e POSTGRES_USER=$DB_USER postgres:14.5-alpine
    echo "...waiting until db up..."
    sleep 10
else
    echo "docker not installed, attempting to run migrations anyway"
fi

echo "...creating database..."
# If $1 is present, that environment is used, otherwise the default environment is used.
yarn knex:migrate
echo "...good to go..."