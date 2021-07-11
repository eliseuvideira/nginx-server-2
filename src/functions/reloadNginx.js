const { exec } = require("./exec");

exports.reloadNginx = () => {
  exec(`
    docker-compose exec nginx nginx -s reload
  `);
};
