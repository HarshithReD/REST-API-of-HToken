$('#create_allow_button').click(function(){
	var recipient=$('#create_allow_address').val();
	var amount=$('#create_allow_amount').val();
	$.getJSON('build/contracts/HToken.json',function(data){
	HTokenDeployed=TruffleContract(data);
	console.log(data);
	alert(account);
	HTokenDeployed.setProvider(web3.currentProvider);
	HTokenDeployed.deployed().then(function(instance){
	return instance.createAllowance(recipient,amount).sendTransaction(({from:account,gas:300000}), function(error,reciept) {
    if (err) { 
        console.log(error); 
    } else {
        console.log(reciept);
   	 }
    });
});
	
});
});
$('#pay_allow_button').click(function(){
	var recipient=$('#pay_allow_address').val();
	var amount=$('#tpay_allow_amount').val();
	$.getJSON('build/contracts/HToken.json',function(data){
	HTokenDeployed=TruffleContract(data);
	console.log(data);
	alert(account);
	HTokenDeployed.setProvider(web3.currentProvider);
	HTokenDeployed.deployed().then(function(instance){
	return instance.payAllowances(recipient,amount).sendTransaction(({from:account,gas:300000}), function(error,reciept) {
    if (err) { 
        console.log(error); 
    } else {
        console.log(reciept);
   	 }
    });
});
	
});
});
