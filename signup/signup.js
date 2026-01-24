function signUpValidation() {
    var pass = document.getElementById("pass").value.trim();
    var repass = document.getElementById("repass").value.trim();

    if(pass === repass) {
        alert("Passwords matched");
    } else {
        alert("The passwords do not match!")
    }

    return "Registration Successful"
}