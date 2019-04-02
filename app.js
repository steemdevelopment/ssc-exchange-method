const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const port = 5000;
const app = express();
const dsteem = require('dsteem');
const client = new dsteem.Client('https://api.steemit.com');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('trust proxy', true);
app.disable('x-powered-by');


app.post('/', function(req, res) {
    try {
        const body = req.body;

        if (body.method !== undefined && body.method === "POST") {
            let options = {
                url: body.url,
                method: body.method,
                headers: body.headers,
                params: body.params
            };
            request(options, (error, response, params) => {
                if (error) {
                    console.error("An error has occurred: ", error);
                    res.send(error);
                } else {
                    let responseData = JSON.parse(params);

                    res.send(responseData);
                }
            });
        } else if (body.method != undefined && body.method == "GET") {
            let options = {
                //   url: body.url+'?account='+body.body.params.account+'&limit='+body.body.params.limit+
                //   '&offset='+body.body.params.offset+'&&symbol='+body.body.params.symbol,
                url: 'https://api.steem-engine.com/accounts/history?account=freedomex&limit=1000&offset=0&&symbol=' + body.params.symbol,
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                },
                params: body.params.symbol
            };
            request(options, (error, response, params) => {
                if (error) {
                    console.error("An error has occurred: ", error);
                    res.send(error);
                } else {
                    const withdraw = [],
                        deposit = [];
                    params = JSON.parse(params);
                    params.forEach(el => {
                        if (el.from === "freedomex") {
                            delete el.block;
                            delete el.symbol;
                            delete el.from_type;
                            delete el.to_type;
                            withdraw.push(el);
                        } else {
                            delete el.block;
                            delete el.symbol;
                            delete el.from_type;
                            delete el.to_type;
                            deposit.push(el);
                        }

                    });
                    res.json([{
                        "WITHDRAWS": withdraw
                    }, {
                        "DEPOSITS": deposit
                    }]);
                }
            });
        } else {

            const active_key = body.params.wif;
            const key = dsteem.PrivateKey.fromString(active_key);
            const account = "freedomex";
            const my_id = "ssc-mainnet1";
            const my_data = {
                "contractName": "tokens",
                "contractAction": "transfer",
                "contractPayload": {
                    "symbol": body.params.symbol,
                    "to": body.params.to,
                    "quantity": parseFloat(body.params.quantity),
                    "memo": body.params.memo
                }
            };
            client.broadcast.json({
                required_auths: [account],
                required_posting_auths: [],
                id: my_id,
                json: JSON.stringify(my_data),
            }, key).then(
                result => {
                    res.send(result)
                },
                error => {
                    res.send({
                        msg: 'Something went wrong',
                        error: error
                    })
                }
            )
        }
    } catch (err) {
        res.send({ msg: 'invalid command', error: err });
    }
    //ends else
});

app.listen(port, function() {
    console.log("Server listening on port: " + port);
});
