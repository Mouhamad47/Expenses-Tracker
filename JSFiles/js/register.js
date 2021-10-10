var $first_name         = $('#first_name');
var $last_name          = $('#last_name');
var $email              = $('#email');
var $password           = $('#password');

function clear(){
    document.getElementById("registration").reset();
}
$('#register').on('click',register);

async function postData(forminfo){
    try{
        result = await $.ajax({
            type : "POST",
            url  : "http://localhost:8080/expensestrackerapi/register.php",
            data : forminfo,
            dataType:"json",
            contentType:"application/json",

        })
    }
    catch (error){
        console.log(error);
    }    
}
function register(){
    var info = {
        first_name  : $first_name.val(),
        last_name   : $last_name.val(),
        email       : $email.val(),
        password    : $password.val(),
    };
    data = JSON.stringify(info);
    postData(data).then(results=>{
        alert("You have successfully registered");
        clear();
    })
}


