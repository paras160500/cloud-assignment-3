const reqq = require('request');
const port = 3000;
const express = require('express');
const NodeRSA = require('node-rsa');
const app = express();
app.use(express.json())
const key = new NodeRSA({b:1024})

var public_key = key.exportKey('public')
var private_key = key.exportKey('private')

public_key = '-----BEGIN PUBLIC KEY-----\n' +
'MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFc195HM14tqVl8TnkuwaQ/f1spM\n' +
'usqf0E5p9RHevAGNpsKa1sILTOJBH3IdUVLEFsMZ2e7kd8sDKVVWKWdD83amp9Em\n' +
'LAvgK5U6lcF/hRWGyP5hcjfjfuXeKgpgPIxF+c/3oIjHbwKFIoOBexTvOBTrzIYY\n' +
'P9vD1fYnLpgp46k/AgMBAAE=\n' +
'-----END PUBLIC KEY-----';

private_key = '-----BEGIN RSA PRIVATE KEY-----\n'+
'MIICWgIBAAKBgFc195HM14tqVl8TnkuwaQ/f1spMusqf0E5p9RHevAGNpsKa1sIL\n'+
'TOJBH3IdUVLEFsMZ2e7kd8sDKVVWKWdD83amp9EmLAvgK5U6lcF/hRWGyP5hcjfj\n'+
'fuXeKgpgPIxF+c/3oIjHbwKFIoOBexTvOBTrzIYYP9vD1fYnLpgp46k/AgMBAAEC\n'+
'gYAXYhzzNt1EQErQS05SNQa2fun0bAZZdehAXiCbngEC2Zww6ZtTg/wlXhi0XDAF\n'+
'5RXFUhUg/JkyEbLvcp6/VXTdtwYZkKqAHtYHNztgGdkFR6k7a/KjWSEqRi76RKuB\n'+
'qhINg1zIxywFNJ+ansM4ONhhEHolDbv4AL3vIL3+ENIaIQJBAKIBkp8a0f5Czm2h\n'+
'hoIJ94PArxIrt3bApLkLWozyUEUDc5m+1fBzA/8n3tON0oHqT7WbXnFMtX07it/h\n'+
'iF/D2bMCQQCJzzPhn/y7pl86eO5mTOsR6gU5vfmFyzM6FJlHOv2ghan3wE4kXH3J\n'+
'GXtFH1UD/jKjhsvQMXpbB4LITfQCiBRFAkB2JVN6OKMAHFRS20MuvnoFWZXTWJJZ\n'+
'RjBayo7kzyn+yn+ZlfSLgDVf9QGponnsSKaMuJvtYJXSmIO0tdMwk7HFAkBrb1Gv\n'+
'EB7j2+xZlXWl40lPifXQ8j3ZBHVHTk/ArEiWIB5Fu3Iv/rtBT9A+LxMELeQkgC3c\n'+
'fPY6iTx4E+2rG5NRAkAB4ErpaUKxLGbAnYUMY1CxNPnv70pgAbzti4IQX3SE2Fbc\n'+
'xIeigsElUR8+RPyna56gFNTTnFRS9c1BFRAXhMrg\n'+
'-----END RSA PRIVATE KEY-----';

let finalPrivateKey = new NodeRSA(private_key);
let finalPublicKey = new NodeRSA(public_key)


app.post('/decrypt' , async (req,res) => {
    return res.send({
      "response" : finalPrivateKey.decrypt(req.body.message , 'utf8')
    })
})

app.post('/encrypt' , async (req,res) => {
    return res.send({
      "response" : finalPublicKey.encrypt(req.body.message , 'base64')
    })
})

app.listen(port , () => console.log("Listening on port", port))