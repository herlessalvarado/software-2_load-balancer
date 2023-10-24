import http from "http";
import httpProxy from "http-proxy";

const servers = [
  { target: "http://localhost:3000" },
  //   { target: "http://localhost:3001" },
];

const proxy = httpProxy.createProxyServer();

const server = http.createServer((req, res) => {
  const serverIndex =
    (req.socket.remoteAddress + req.url).length % servers.length;
  const target = servers[serverIndex];

  proxy.web(req, res, target);

  proxy.on("error", (err) => {
    console.error("Proxy error:", err);
    res.end();
  });
});

server.listen(4000, () => {
  console.log("Load balancer is running on port 4000");
});
