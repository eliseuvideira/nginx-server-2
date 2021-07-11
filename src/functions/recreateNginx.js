const { exec } = require("./exec");

exports.recreateNginx = () => {
  exec(`
    docker-compose up --force-recreate -d nginx
  `);
};
