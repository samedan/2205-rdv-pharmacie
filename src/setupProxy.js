const proxy = require("http-proxy-middleware");
// const { createProxyMiddleware } = require("http-proxy-middleware");

// http://localhost:3000/api/v1/rentals ---> http://localhost:3001/api/v1/rentals
module.exports = function (app) {
  app.use(
    "/api",
    proxy({
      target: "http://localhost:3001",
      changeOrigin: true,
    })
  );
};

// module.exports = function (app) {
//   app.use(
//     "/api",
//     createProxyMiddleware({
//       target: "http://localhost:3001",
//       changeOrigin: true,
//     })
//   );
// };
