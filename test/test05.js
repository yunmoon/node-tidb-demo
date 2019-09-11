let arguments = require('minimist')(process.argv.splice(2));
const axios = require("axios");
const _ = require("lodash");
const cluster = require('cluster');
const userCardNos = require("./userCardNo");
const processNum = arguments.process || 1;
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.startTime = Date.now();
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  response.takingTime = Date.now() - response.config.startTime;
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

if (cluster.isMaster) {
  for (let i = 0; i < parseInt(processNum); i++) {
    const worker = cluster.fork();
    worker.send(arguments);
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else if (cluster.isWorker) {
  process.on('message', (msg) => {
    arguments = msg
    const limit = arguments.limit || 200;
    const url = arguments.url;
    const times = arguments.times || 2;
    if (!url) {
      console.log("argv url is required");
      process.exit();
    }
    const start = Date.now();
    async function test() {
      for (let index = 0; index < times; index++) {
        const requests = [];
        for (let index = 0; index < limit; index++) {
          const userCardNo = userCardNos[_.random(userCardNos.length)];
          requests.push(axios.get(url, { params: { userCardNo } }))
        }
        const results = await Promise.all(requests);
        const takingTimes = _.map(results, "takingTime");
        const avgTakingTime = _.sum(takingTimes) / (takingTimes.length * 1000);
        const tps = limit / avgTakingTime;
        console.log(`并发${limit}，单次请求平均耗时：${avgTakingTime}s`)
        console.log(`并发${limit}，TPS：${tps}`)
      }
      const end = Date.now();
      console.log(`测试结束，耗时：${(end - start) / 1000}s`)
    }

    (async () => {
      await test();
    })()
  })
}