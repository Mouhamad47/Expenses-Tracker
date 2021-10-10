$(document).ready(function () {
    var $email = $('#email');
    var $password = $('#password');

    function logIn(info) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/expensestrackerapi/login.php',
            data: JSON.stringify(info),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                window.location.href = 'adminpage.html';
                localStorage.setItem('id', data[0]['id']);
                localStorage.setItem('firstname', data[0]['first_name']);
                localStorage.setItem('lastname', data[0]['last_name']);

            }
        })
    }

    $('#loginbtn').on('click', function () {
        var info = {
            email: $email.val(),
            password: $password.val()
        };
        logIn(info);

    });





});