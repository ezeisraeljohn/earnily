module.exports = {
  apps: [
    {
      name: "earnily",
      script: "server.js",
      instances: "max",
      exec_mode: "cluster",
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
