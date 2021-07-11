const { exec } = require("./exec");

exports.certbot = (domain, email, staging) => {
  exec(`
    docker-compose run --rm --entrypoint "\\
      certbot certonly --webroot -w /var/www/certbot \\
        ${staging ? "--staging" : ""} \\
        --email "${email}" \\
        -d "${domain}" \\
        --rsa-key-size 4096 \\
        --agree-tos \\
        --force-renewal" certbot
  `);
};
