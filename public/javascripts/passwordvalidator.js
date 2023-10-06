
const pwd1 = document.getElementById('pwd1');
const pwd2 = document.getElementById('pwd2');
const email = document.getElementById('emailinput')
const url = "http://localhost:3000/api/usedEmail"
let usedEmail

async function getUsedEmail() {
    const mail = [];
    const response = await fetch(url);
    usedEmail = await response.json();
    usedEmail.forEach(function (item, index) {
        mail.push(item.email)

    })
    return mail;

}
async function main() {
    const mail = await getUsedEmail();
    
    pwd1.addEventListener('input', pwdvalidator);
    pwd2.addEventListener('input', pwdvalidator);
    email.addEventListener('input', emailvalidation);
    var isLongerthan8 = false;
    var isTheSame = false;
    var isNotUsed = false;

    function buttonchanger() {
        // console.log("Longer :" + isLongerthan8 + " Same :" + isTheSame + " Used : " + isNotUsed)
        // console.log(isLongerthan8 && isTheSame && isNotUsed)
        if (isLongerthan8 == true && isTheSame == true && isNotUsed == true) {
            document.getElementById("submitbutton").disabled = false;

        } else {
            document.getElementById("submitbutton").disabled = true;
        }

    }

    function pwdvalidator() {
        if (pwd1.value.length < 8) {
            document.getElementById("pvalid1").innerHTML = "*Your password must be longer than 8!";
            isLongerthan8 = false;

        }
        else {
            document.getElementById("pvalid1").innerHTML = "";
            isLongerthan8 = true;

        }
        if (pwd1.value != pwd2.value) {
            document.getElementById("pvalid2").innerHTML = "Your password does not match!";
            isTheSame = false;
        }
        else {
            isTheSame = true;
            document.getElementById("pvalid2").innerHTML = "";
        }

        buttonchanger()

    }

    function emailvalidation() {
        if (mail.includes(email.value)) {
            isNotUsed = false;
            document.getElementById("evalid").innerHTML = "The email has already been used!";
        }
        else {
            isNotUsed = true;
            document.getElementById("evalid").innerHTML = "";
        }
        buttonchanger();
    }
    
}



main();
