$('#trans_button').click(function(){
	var recipient=$('#rec_address').val();
	var amount=$('#trans_amount').val();
	$.getJSON('build/contracts/HToken.json',function(data){
	HTokenDeployed=TruffleContract(data);
	console.log(data);
	alert(account);
	HTokenDeployed.setProvider(web3.currentProvider);
	HTokenDeployed.deployed().then(function(instance){
	return instance.transfer().sendTransaction(recipient,amount,({from:account}), function(error,reciept) {
    if (err) { 
        console.log(error); 
    } else {
        console.log(reciept);
   	 }
    });
});
	
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
	return instance.buyTokens().sendTransaction(amount,({from:account}), function(error,reciept) {
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
	return instance.sellTokens().sendTransaction(amount,({from:account}), function(error,reciept) {
    if (err) { 
        console.log(error); 
    } else {
        console.log(reciept);
   	 }
    });
});
	
});
});