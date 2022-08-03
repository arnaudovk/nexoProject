# EthWatcher

A simple app that monitors all Ehereum transactions and stores them based on a dynamic configuration. 

You can test the app by sending your requests to http://46.101.209.21

## Prerequisites
1. docker cli
3. node.js
4. npm

## Quick Start
1. 
```bash
npm install
```
2. create a .env file in the root directory with: 

```
MONGODB_URL=mongodb://localhost:27017
PORT=3000
INFURA_KEY=<YOUR-INFURA-KEY>
```
3. start the database
```bash
docker-compose start mongodb
```
4. start the application
```bash
npm run dev
```
### OR


2.  set your infura key in the environment variables in the docker-compose.yaml file

3.
```bash
docker-compose up
```

### Warning

If starting the app for the first time (DB is empty), at least one configuration has to be set. Only then can the application start monitoring the Eth network.



### List of available routes 
`GET /transaction` - get all the transactions; filter by query parameters: [configuration, value...]\
`GET /transaction/:id` - get transaction by id\
`GET /configurations` - get all the configurations; filter by query parameter: `current`\
`GET /configurations/:id` - get configuration by id\
`POST /configurations` - set new configuration\

**Data schemas**

You can set a new configuration by passing an object with any or all of the parameters in the request body:

```JSON
{
    "from": " 42-character hexadecimal address",
    "to": "42-character hexadecimal address",
    "gas": "Integer",
    "value": "Integer(in Eth)",
    "valueAbove": "Integer(in Eth) - will store all transactions with value above this",
    "valueBelow": "Integer(in Eth) - will store all transactionswith value below this",
    "type": "Integer"
}
```

Transactions are stored as an object and could be filtered by any of the properties:

```JSON
{
    "blockHash": "0xf60adc710707fddfde8cffe313301dbced59e108e45b2e4204086ff208b8ae4d",
    "blockNumber": "0xe8e6ca",
    "from": "0xdfd5293d8e347dfe59e90efd55b2956a1343963d",
    "gas": "0x32918",
    "gasPrice": "0x4707f9422",
    "hash": "0x3bd6534362035a538e698d36ab4b7e8abf3fde5e7952830bf8e77a2861926fa7",
    "input": "0x",
    "nonce": "0x3bd07f",
    "r": "0x3e914c65f1e9731e04d6362294faf38a728cb8191306d97b1bde2ba98e4637db",
    "s": "0xfd75f3c5de9b3fd4689c4bcc836d7329dd9f92c46a4554dc35cff89ae79ce36",
    "to": "0x9754c9553b975b24a1a67a45522c88b93771cbe5",
    "transactionIndex": "0xc3",
    "type": "0x2",
    "v": "0x1",
    "value": "0x70c1b5f2959ea2800",
    "configuration": "62e9297f57dfbf1380db29fd",
    "id": "The id of the transaction which triggered it"
}
```



