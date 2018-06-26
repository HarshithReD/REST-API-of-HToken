
$('#deposit_ether_button').click(function(){
	
	var amount=web3.toBigNumber($('#deposit_ether_amount').val());
	var weiValue = web3.toWei(amount,'ether');
	alert(weiValue);
	$.getJSON('build/contracts/HToken.json',function(data){
	HTokenDeployed=TruffleContract(data);
	console.log(data);
	alert(account);
	HTokenDeployed.setProvider(web3.currentProvider);
	HTokenDeployed.deployed().then(function(instance){
		web3.personal.unlockAccount(account,'foolproof',function() {
			instance.depositEther({from:account,value:weiValue,gas:600000}, function(err,res) {
		    if (err) { 
		        console.log(err); 
		    } else {
		        console.log(res);
		   	 }
		    });
		});

});
	
});
});
$('#withdraw_ether_button').click(function(){
	
	var amount=$('#withdraw_ether_amount').val();
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