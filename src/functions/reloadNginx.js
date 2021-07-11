const { exec } = require("./exec");

exports.reloadNginx = () => {
  exec(`
    echo docker-compose exec nginx nginx -s reload
  `);
};
