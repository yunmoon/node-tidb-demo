module.exports = {
  apps: [
    {
      script: __dirname + "/../dist/index.js",
      instances: "6",
      exec_mode: "cluster",
      name: "node-tidb-demo-development",
      output: "/dev/null",
      env: {
        NODE_ENV: "development",
        PORT: 1337
      }
    }
  ]
};
