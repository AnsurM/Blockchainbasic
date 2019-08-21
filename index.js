var exp = require("express");
var app = exp();
var mongoose = require("mongoose");
// var store = require('store');
var bodyParser = require('body-parser')
// var blo = require("./Chain");
var ip = require('ip');
// var blo1 = blo.d;
const {getUsers, addUser} = require('./store');

const Blockchain = require('./Blockchain');

app.use(bodyParser.json())


var Port=8080;
// var IP = "10.0.12.45"; // Change it to your Local IP. 

// Remove the comment to save the data to database

//mongoose.connect("mongodb+srv://Auction:model@auction-ujxcw.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });

var test = new mongoose.Schema({
    text: String
    });

var block = mongoose.model("Blockchain", test);

// For Testing to check wheather the database was working or not.

// block.create({
//     text: "sss"
//    }, function(err, block){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("new schema");
//         console.log(block);
//     }
// });

// Testing, will send Hi to the Client side socket. 
// sock.on("connection", function(socket){
//     console.log("connected", socket.client.id);
//     sock.send("hi");
// })

function isIPregistered(ip) {
    var totalUsers = getUsers();
    if(totalUsers.length)
    {
        for(let i = 0; i < totalUsers.length; i++) {
            const user = totalUsers[i];
            if(user.ip === ip) {
                return true;
            }
        }
        return false;
    }
    return false;
}

function getIp(req) {
    return req.ip.split("f:")[1] ? req.ip.split("f:")[1] : req.ip;
}

app.get("/", function(req,res){
    const reqIp = getIp(req);
    if(!isIPregistered(reqIp))
    {
        return res.json(addUser(reqIp));        
    }
    return res.json(getUsers());
});

app.post('/addBlock', (req,res) => {
    const reqIp = getIp(req);
    console.log("Req ip:  ", reqIp);
    // var blockchain = store.get('blockchain') ? store.get('blockchain') : []; 
    if(isIPregistered(reqIp))
    {
        console.log("Payload: ", req.body);
        // blockchain.push({id: blockchain.length, ...req.body});
        // store.set('blockchain', blockchain);
        // res.json(store.get('blockchain'));
        res.json(Blockchain.addBlock(req.body));
    }
    else {
        res.json({status: 400, message: "Please get your IP registered first.."});
    }
})

app.get('/addTempBlock', (req,res) => {
    const reqIp = getIp(req);
    console.log("Req ip:  ", reqIp);
    if(isIPregistered(reqIp))
    {
        // console.log("IP: ", reqIp);
        const data = {ip: reqIp, coins: 5};
        if(data)
        {
            res.json(Blockchain.addBlock({ip: reqIp, coins: 5}));
        }
        else
        {
            res.json({status: 400, message: "Please send valid data.."});
        }
    }
    else {
        res.json({status: 400, message: "Please get your IP registered first.."});
    }
})

app.get('/getBlockchain', (req, res) => {
    if(!isIPregistered(getIp(req))) {
        return res.json({status: 400, message: "Please get your IP registered first.."});
    }
    else {
        return res.json(Blockchain.getBlockchain());
    }
})

app.listen(Port, ip.address(), function(){
    console.log("Server started - ", ip.address(), ':', Port);
});