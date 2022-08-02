const config = require("../config/config");
const WebSocket = require("ws");
const { transService } = require("../services");
const logger = require("../config/logger");
const web3 = require("web3");

const url = `wss://mainnet.infura.io/ws/v3/${config.infuraKey}`;

const watchEth = () => {
  const ws = new WebSocket(url);

  ws.on("open", function open() {
    logger.info("Watching transactions!");
    ws.send(
      '{"jsonrpc":"2.0","method":"eth_subscribe","params":["newHeads"], "id":1}'
    );
  });

  ws.on("message", async function incoming(data) {
    const obj = JSON.parse(data);
    if (obj?.params?.result?.hash) {
      setTimeout(async () => {
        const blockHash = obj.params.result.hash;
        logger.info(
          `Block ${web3.utils.hexToNumber(obj.params.result.number)} received!`
        );
        ws.send(
          `{"jsonrpc":"2.0","method":"eth_getBlockByHash","params": ["${blockHash}",true],"id":1}`
        );
      }, 3000);
    } else if (obj?.result?.transactions) {
      const blockNumber = web3.utils.hexToNumber(obj.result.number);
      await transService.handleTransactions(
        obj.result.transactions,
        blockNumber
      );
    }
  });

  ws.on("error", (error) => {
    logger.error(error);
    ws.close();
  });
};

module.exports = watchEth;
