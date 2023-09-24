const pwd1 = document.getElementById('pwd1');
const pwd2 = document.getElementById('pwd2');

console.log("called PasswordValidator")

pwd1.addEventListener('input',pwdvalidator);
pwd2.addEventListener('input',pwdvalidator);

function pwdvalidator(){
    console.log(pwd1.value);
    console.log(pwd2.value)
    if(pwd1.value.length<8){
        document.getElementById("pvalid1").innerHTML = "*Your password must be longer than 8!";
        document.getElementById("submitbutton").disabled = true;

    }
    if(pwd1.value.length>=8){
        document.getElementById("pvalid1").innerHTML = "";
        document.getElementById("submitbutton").disabled = false;

    }
    if(pwd1.value!=pwd2.value){
        document.getElementById("pvalid2").innerHTML = "Your password does not match!";
        document.getElementById("submitbutton").disabled = true;


    }
    else if(pwd1.value==pwd2.value){
        document.getElementById("pvalid2").innerHTML = "";
        document.getElementById("submitbutton").disabled = false;

    }
}

function registerValidate(){
	console.log("clicked");
	var pwd1 = document.getElementById("pwd1").value;
	console.log(pwd1)
	var pwd2 = document.getElementById("pwd2").value;
	console.log(pwd2)
	if(pwd1.length<=7 || pwd2.length<=7 ){
		document.getElementById("pvalid").innerHTML = "*Your password is too short!";
		return false;  
		
	}
	if(pwd1!=pwd2){
		console.log("false")
		document.getElementById("pvalid").innerHTML = "*The password is not match";  
    	return false;  
		
	}
	
}