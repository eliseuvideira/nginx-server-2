const { exec } = require("./exec");

exports.recreateNginx = () => {
  exec(`
    echo docker-compose up --force-recreate -d nginx
  `);
};
