const express = require('express');
const app = express();
const fs = require('fs');
var Web3 = require('web3');
const bodyParser=require('body-parser');
app.set('view engine','hbs');
app.use(bodyParser.json());
  var web3 = new Web3();
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));


var abi=
	[
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "payAllowances",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "destroyToken",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "buyTokens",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "amountInWei",
				"type": "uint256"
			}
		],
		"name": "withdrawEther",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfers",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "from",
				"type": "address"
			}
		],
		"name": "checkBalanceEther",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "sellTokens",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_to",
				"type": "address"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "createAllowance",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_of",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "depositEther",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "setCurPrice",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "total_tokens",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "checkBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "curprice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "value",
				"type": "uint256"
			},
			{
				"name": "price",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];
var contract_address="0xd5f963d07931208b75e1368c0d9789ea3cb795e3";
var contract_instance=web3.eth.contract(abi).at(contract_address);



	//token operations//////////////////////////////

app.get('/checkBalanceOf',(request,response)=>{
	res.render('checkBalanceOf.hbs');
});

app.post('/checkBalanceOf',(request,response)=>{
	var account=request.body.from;
	contract_instance.balanceOf(account,function(err,res){
		response.json({"amount":res});
	});
});
app.post('/transfers',(request,response)=>{
	var from_account=request.body.from;
	var to_account=request.body.to;
	var amount=request.body.amount;
	var pass = request.body.password;
	web3.personal.unlockAccount(from_account,pass);
	contract_instance.transfers(to_account,amount,{from:from_account,gas:95000},function(err,res){
		if(err) throw err;
		response.json({"message":"Amount transfered!!"});
	});
});

app.post('/buyTokens',(request,response)=>{
	var from_account=request.body.from;

	var amount=request.body.amount;
	var pass = request.body.password;
	web3.personal.unlockAccount(from_account,pass);
	contract_instance.buyTokens(amount,{from:from_account,gas:95000},function(err,res){
		if(err) throw err;
		response.json({"message":"Tokens bought!!"});
	});
});
app.post('/sellTokens',(request,response)=>{
	var from_account=request.body.from;

	var amount=request.body.amount;
	var pass = request.body.password;
	web3.personal.unlockAccount(from_account,pass);
	contract_instance.sellTokens(amount,{from:from_account,gas:95000},function(err,res){
		if(err) throw err;
		response.json({"message":"Tokens Sold!!"});
	});
});


//Allowance operations/////////////////////////////
app.post('/createAllowance',(request,response)=>{
	var from_account=request.body.from;
	var to_account=request.body.to;

	var amount=request.body.amount;
	var pass = request.body.password;
	web3.personal.unlockAccount(from_account,pass);
	contract_instance.createAllowance(to_account,amount,{from:from_account,gas:95000},function(err,res){
		if(err) throw err;
		response.json({"message":"Allowance created!!"});
	});
});
app.post('/payAllowances',(request,response)=>{
	var from_account=request.body.from;
	var to_account=request.body.to;

	var amount=request.body.amount;
	var pass = request.body.password;
	web3.personal.unlockAccount(from_account,pass);
	contract_instance.payAllowances(to_account,amount,{from:from_account,gas:95000},function(err,res){
		if(err) throw err;
		response.json({"message":"Allowance amount paid!!"});
	});
});




//Ether operations//////////////////////////////////


app.post('/depositEther',(request,response)=>{
	var from_account=request.body.from;
	var amount=request.body.amount;
	var weiValue = web3.toWei(amount,'ether');
	
	var pass = request.body.password;
	web3.personal.unlockAccount(from_account,pass);
	contract_instance.depositEther({from:from_account,gas:95000,value:weiValue},function(err,res){
		if(err) throw err;
		response.json({"message":"Ether deposited!!"});
	});
});
app.post('/checkBalanceEther',(request,response)=>{
	var account=request.body.from;
	contract_instance.checkBalanceEther(account,function(err,res){
		if(err) throw err;
		response.json({"amount":res});
	});
});
app.post('/withdrawEther',(request,response)=>{
	var from_account=request.body.from;


	var amount=request.body.amount;
	var pass = request.body.password;
	web3.personal.unlockAccount(from_account,pass);
	contract_instance.withdrawEther(amount,{from:from_account,gas:95000},function(err,res){
		if(err) throw err;
		response.json({"message":"Ether has been withdrawn!!"});
	});
});

//Admin operations///////////////////////////

app.post('/mint',(request,response)=>{
	var from_account=request.body.from;

	var amount=request.body.amount;
	var pass = request.body.password;
	web3.personal.unlockAccount(from_account,pass);
	contract_instance.mint(amount,{from:from_account,gas:95000},function(err,res){
		if(err) throw err;
		response.json({"message":"Tokens minted!!"});
	});
});
app.post('/burn',(request,response)=>{
	var from_account=request.body.from;

	var amount=request.body.amount;
	var pass = request.body.password;
	web3.personal.unlockAccount(from_account,pass);
	contract_instance.burn(amount,{from:from_account,gas:95000},function(err,res){
		if(err) throw err;
		response.json({"message":"Tokens burned!!"});
	});
});
app.post('/setCurPrice',(request,response)=>{
	var from_account=request.body.from;

	var amount=request.body.amount;
	var pass = request.body.password;
	web3.personal.unlockAccount(from_account,pass);
	contract_instance.setCurPrice(amount,{from:from_account,gas:95000},function(err,res){
		if(err) throw err;
		response.json({"message":"current price of tokens changed!!"});
	});
});
app.post('/destroyToken',(request,response)=>{
	var account=request.body.from;
	contract_instance.destroyToken(account,function(err,res){
		if(err) throw err;
		response.json({"message":"Token has been destroyed!!"});
	});
});
app.listen(8000);