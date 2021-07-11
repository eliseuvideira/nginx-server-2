const { exec } = require("./exec");

exports.certbot = (domain, email, staging) => {
  exec(`
    echo docker-compose run --rm --entrypoint "\\
      certbot certonly --webroot -w /var/www/certbot \\
        ${staging ? "--staging" : ""} \\
        --email "${email}" \\
        -d "${domain}" \\
        --rsa-key-size $rsa_key_size \\
        --agree-tos \\
        --force-renewal" certbot
  `);
};
