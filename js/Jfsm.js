
$card =         $("#card");
$atmDisplay =   $("#atmDisplay");
$imgIdle =      $("#idle");
$imgActive =    $("#active");
$imgWithdraw =  $("#withdrawScreen");
$imgDeposit =   $("#depositScreen");

$userInterface =$(".userInterface");
$acctBalance =  $("#acctBalance");
$deposit =      $("#deposit");
$withdraw =     $("#withdraw");
$cash =         $("#cash");
$output =       $("#output");
$time =         $("#time");
$finish =       $("#finish");


var atm = {
  state: {
    idle: 0,
    activated: 1
  },
  acctBalance: 2,
  withdraw: 3,
  deposit: 4,
  cash: 10000
}

var user = {
  balance: 3000
}

function activateATM(){
  //change atm display
        $imgIdle.css({"display": "none"});
        $imgWithdraw.css({"display":"none"});
        $imgDeposit.css({"display":"none"});
        $imgActive.css({"display": "block"});

        $card.css({"display": "none"}); //hide card button
        $userInterface.css({"display": "block"}); //display options to interact with atm
}

function interactWithATM(userInput){
  switch (userInput) {
    case 1:
      $imgActive.css({"display": "block"});
      $imgIdle.css({"display": "none"});
      $imgWithdraw.css({"display":"none"});
      $imgDeposit.css({"display":"none"});
    case 2:
      $output.text("Your account balance is: $"+user.balance);
      $imgActive.css({"display": "block"});
      $imgIdle.css({"display": "none"});
      $imgWithdraw.css({"display":"none"});
      $imgDeposit.css({"display":"none"});
      break;
    case 3:
      if ($cash.val()){
        var money = parseInt($cash.val());
        console.log("amount of variable money is: "+ money);
        console.log("amount of money in the atm is: "+atm.cash);
        if (money <= user.balance){
          if (money <= atm.cash){
            user.balance -= money;
            atm.cash -= money;
            //Need to change screen image
            $output.text("Please take your $"+money+". Your account balance is now $"+user.balance);
            $imgWithdraw.css({"display":"block"});
            $imgActive.css({"display": "none"});
            $imgIdle.css({"display": "none"});
            $imgDeposit.css({"display":"none"});
          }
          else{
            $output.text("Sorry, this atm does not have enough cash. Please try again later.");
            $imgActive.css({"display": "block"});
            $imgIdle.css({"display": "none"});
            $imgWithdraw.css({"display":"none"});
            $imgDeposit.css({"display":"none"});
          }
        }
        else{
            $output.text("You cannot withdraw more money than you have in your account balance.");
            $imgActive.css({"display": "block"});
            $imgIdle.css({"display": "none"});
            $imgWithdraw.css({"display":"none"});
            $imgDeposit.css({"display":"none"});
        }
      }
      break;
    case 4:
      if ($cash.val()){
        money = parseInt($cash.val());
        user.balance += money;
        atm.cash += money;
        $output.text("You have successfully deposited $"+money+" dollars. Your balance now is: $"+user.balance);
        $imgDeposit.css({"display":"block"});
        $imgWithdraw.css({"display":"none"});
        $imgActive.css({"display": "none"});
        $imgIdle.css({"display": "none"});
      }
      break;
    default: break;
  }
}

function deactivateATM(){
  $imgIdle.css({"display": "block"});
  $imgActive.css({"display": "none"});
  $userInterface.css({"display":"none"});
  $output.text("");
  user.balance = 3000;
}
$card.on("click", activateATM);
$time.on("click", function(){interactWithATM(1)});
$acctBalance.on("click", function(){interactWithATM(2)});
$withdraw.on("click", function(){interactWithATM(3)});
$deposit.on("click", function(){interactWithATM(4)});
$finish.on("click", deactivateATM);
