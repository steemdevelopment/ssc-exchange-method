Script to allow a single endpoint for exchanges

## Prerequisites

### ssc-proxie-script
``` Download ssc-proxie-script if your using the more advanced method```

``` Follow setup guide for ssc-proxie-script ```

### steemsmartcontracts
``` Download steem smartcontracts if you wish to run your own node.```

``` If you do not wish to run your own node you will need to use a public node. ```

## Basic methods with out ssc-exchange-proxie

#### Deposit and withdraw history
```curl -XPOST -H "Content-type: application/json" -d '{"method": "GET", "params": {"symbol": "TOKENNAME"}}' 'http://localhost:5000'```

#### Withdraw method
```curl -XPOST -H "Content-type: application/json" -d '{"method":"withdraw", "params": {"wif": "activekey", "symbol":"TOKENNAME", "to": "username", "quantity": "0.001", "memo": "Exchange Testing"}}' 'http://localhost:5000'```




## Advanced methods using ssc-exchange-proxie

#### Get balance for specific coin rpc method
```curl -XPOST -H "Content-type: application/json" -d '{ "jsonrpc": "2.0", "method": "contracts.findOne", "params": { "contract": "tokens", "table": "balances", "query": { "account": "username", "symbol": "COINNAME" } }, "id": 1 }' 'http://localhost:3000/rpc'```

#### Get all account balances
```curl -XPOST -H "Content-type: application/json" -d '{ "jsonrpc": "2.0", "method": "contracts.find", "params": { "contract": "tokens", "table": "balances", "query": { "account": "username" } }, "id": 1 }' 'http://localhost:3000/rpc'```

#### Account history by id rpc method
```curl -XPOST -H "Content-type: application/json" -d '{ "jsonrpc": "2.0", "method": "blockchain.getTransactionInfo", "params": { "txid": “taxid” }, "id": 1 }' 'http://localhost:3000/rpc'```

#### Withdraw and Deposit history rpc method
```curl -XPOST -H "Content-type: application/json" -d '{"method": "exchange.GET", "params": {"symbol": "COINNAME"}}' 'http://localhost:3000/rpc'```

#### Withdraw rpc method
```curl -XPOST -H "Content-type: application/json" -d '{"method":"exchange.withdraw", "params": {"wif": "activekey", "symbol":"FREEX", "to": "freedomex", "quantity": "0.001", "memo": "Exchange Testing"}}' 'http://localhost:3000/rpc'```
