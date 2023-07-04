# SurfNews

This application is a news aggregator. Unregistered users can read the news feed and perform searches by date, keywords, categories, authors, and sources. After registration, users have the ability to save filters and will receive recommendations in their feed based on their preferences. 
Let's get started!

# Docker

This template has been designed to meet the following requirements:

- A backend container with the official Docker Hub image `php:7.4-fpm` for PHP version 7.4 and Supervisor with `php artisan queue:work` command.
- A frontend container with the official Docker Hub image `node:latest` and React.js.
- A MySQL container with the official Docker Hub image `mysql:latest`.
- A phpMyAdmin container with the official Docker Hub image `phpmyadmin/phpmyadmin`, linked to the MySQL container for accessing the database.
- A web server container with the official Docker Hub image `nginx:alpine`.

## Getting Started

1. The `/docker/backend/supervisor/supervisord.conf` file is linked in the backend container. Editing that file is instantly replicated to the container

2. Copy the `.env.example` file and rename it to `.env`:
```
cp .env.example .env
```

3. Build the Docker images:
```
docker-compose build
```

4. Start the Docker containers:
```
docker-compose up -d
```

5. Once all the containers are initialized, you need to connect to the backend container:
```
docker exec -t -i local_backend /bin/bash
```
This command will take you to the `/var/www/backend` folder.

6. Copy the `.env.example` file and rename it to `.env` for the backend:
`cp .env.example .env`

and paste here your keys:
```
API_GUARDIAN_KEY="key"
API_NEWSAPI_KEY="key"
API_NYT_KEY="key"
JWT_SECRET=key
```

run the command:
```
php artisan jwt:secret
```
and your JWT_SECRET will appear automaticly

7. Install all the dependencies for the backend:
```
composer install
```
For the backend it is not necessary to execute the command php artisan because the nginx container is linked on the public laraver folder.

8. For the backend, no need to execute `php artisan` command as the nginx container is linked to the public Laravel folder.

9. Run in your docker backend terninal following commands to fill your database (otherwise you need to wait 15 minutes):
```
php artisan fetch-news-nyt
php artisan fetch-news-guard
php artisan fetch-news-newsapi`
```

Then run this command to start all the commands automaticly (they will fetch the news every 15 minutes):
```
while [ true ]; do (php artisan schedule:run --verbose --no-interaction &); sleep 60; done
```

10. Access the frontend container at `localhost:3000` for development.

11. Access the following links:

- Backend: `localhost:8000`
- Frontend: `localhost:3000`
- phpMyAdmin: `localhost:7001`
