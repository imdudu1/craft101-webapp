docker run --name test -p 4321:3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci

docker run --name test-redis -p 6379:6379 -d redis