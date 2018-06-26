$('#trans_button').click(function(){
	var recipient=$('#rec_address').val();
	var amount=$('#trans_amount').val();
	
		 contract_instance.transfers(recipient,amount,{from: account, gas: 95000}).sendTransaction(function(err, transactionHash) {
				  if (!err)
				    console.log(transactionHash); 
			});

 });

	


$('#buy_token_button').click(function(){
	
	var amount=$('#buy_token_amount').val();
	$.getJSON('build/contracts/HToken.json',function(data){
	HTokenDeployed=TruffleContract(data);
	console.log(data);
	alert(account);
	HTokenDeployed.setProvider(web3.currentProvider);
	HTokenDeployed.deployed().then(function(instance){
	return instance.buyTokens(amount).sendTransaction(({from:account}), function(error,reciept) {
    if (err) { 
        console.log(error); 
    } else {
        console.log(reciept);
   	 }
    });
});
	
});
});
$('#sell_token_button').click(function(){
	
	var amount=$('#sell_token_amount').val();
	$.getJSON('build/contracts/HToken.json',function(data){
	HTokenDeployed=TruffleContract(data);
	console.log(data);
	alert(account);
	HTokenDeployed.setProvider(web3.currentProvider);
	HTokenDeployed.deployed().then(function(instance){
	return instance.sellTokens(amount).sendTransaction(({from:account}), function(error,reciept) {
    if (err) { 
        console.log(error); 
    } else {
        console.log(reciept);
   	 }
    });
});
	
});
});