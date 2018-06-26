pragma solidity ^0.4.11;
contract HToken{
    address public admin;
    uint256 public total_tokens;
    uint256 public curprice;
    mapping(address=>uint)balanceForEther;
    mapping(address=>uint) balances;
    struct Offer{
        address who;
        uint amount;
    }
    struct orderBook{
        mapping(uint=>Offer) offers;
        uint256 offerKey;
        uint256 offerLength;
    }
    struct Allowance{  
       
        
        address _from;
        uint256 _commonAmt;
        
    }
    mapping(uint=>orderBook) buyBook;
    
    mapping(uint=>orderBook) sellBook;
    mapping(address=>Allowance) allowances;
    string public name;
   function HToken(uint256 value,uint256 price){
        name="Htoken";
        total_tokens=value;
        admin=msg.sender;
        balances[admin]=value;
        curprice=price;
    }
    function transfers(address _to,uint256 _value) public{
        require(_to!=0x00);
        require(_value>0);
        require(balances[msg.sender]>_value);
        require(balances[_to]+_value>balances[_to]);
        balances[msg.sender]-=_value;
        balances[_to]+=_value;
        
        
    }
    function transferFrom(address _from,address _to,uint256 _value) private{
       require(balances[_from]>_value);
        require(balances[_to]+_value>balances[_to]);
        balances[_from]-=_value;
        balances[_to]+=_value;
    }
    function buyTokens(uint256 _amount) {
       var  real_amount=_amount*curprice;
        require(real_amount*1000000000000000000<=balanceForEther[msg.sender]);
        require(balanceForEther[msg.sender]-real_amount*1000000000000000000<balanceForEther[msg.sender]);
        balanceForEther[msg.sender]-=real_amount*1000000000000000000;
        balances[msg.sender]+=_amount;
        balances[admin]-=_amount;
        
           
    }
     function sellTokens(uint256 _amount) {
       var  real_amount=_amount*curprice;
        require(_amount<=balances[msg.sender]);
        require(balances[msg.sender]-_amount<balances[msg.sender]);
        balances[msg.sender]-=_amount;
        balances[admin]+=_amount;
        balanceForEther[msg.sender]+=real_amount*1000000000000000000;
       
        
           
    }
    function depositEther() public payable{
        require(balanceForEther[msg.sender]+msg.value>balanceForEther[msg.sender]);
        balanceForEther[msg.sender]+=msg.value;
        
        
    }
    
    function withdrawEther(uint256 amountInWei) public{
        uint256 amountInEther=amountInWei*1000000000000000000;
        require(balanceForEther[msg.sender]>=amountInEther);
        require(balanceForEther[msg.sender]-amountInEther<balanceForEther[msg.sender]);
        balanceForEther[msg.sender]-=amountInEther;
        msg.sender.transfer(amountInEther);
    }
    function checkBalanceEther(address from) constant public returns (uint){
        return balanceForEther[from];
    }
    // function transferEther(address _to,uint256 _value) payable{
    //     require(_value>0);
    //     require(_to!=0x00);
    //   _to.transfer(_value );
    // }
    
    
    function createAllowance(address _to,uint256 _value) public{
       require(_to!=0x00);
       require(_value>0);
       
        
        allowances[_to]._from=msg.sender;
        allowances[_to]._commonAmt=_value;
     
        
    }
    function payAllowances(address _to,uint256 _value) public{
        require(_to!=0x00);
        require(_value>0);
        address allower=allowances[msg.sender]._from;
        require(allower!=0x00);
        require(_value<=allowances[msg.sender]._commonAmt);
        allowances[msg.sender]._commonAmt-=_value;
        transferFrom(allowances[msg.sender]._from,_to,_value);
        
        
    }
    function mint(uint256 _value) public{
        require(_value>0);
        require(msg.sender==admin);
        balances[msg.sender]+=_value;
        total_tokens+=_value;
        
    }
     function burn(uint256 _value) public{
        require(_value>0);
        require(balances[msg.sender]>_value);
        require(msg.sender==admin);
        balances[msg.sender]-=_value;
        total_tokens-=_value;
        
    }
    function setCurPrice(uint256 price) public{
        require(msg.sender==admin);
        curprice=price;
        
    }
   
    function checkBalance() constant returns (uint256)  {
        return balances[msg.sender];
        
    }
     function balanceOf(address _of) constant returns (uint256)  {
        return balances[_of];
        
    }
    function destroyToken(){
        require(msg.sender==admin);
        suicide(admin);
    }
}