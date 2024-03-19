const form = document.getElementById('email-form');
const userId = document.getElementById('userId');
const password = form.password;
const passwordRepeat = form.passwordRepeat;
const checkPasswordParagraph = document.getElementById('checkPasswordParagraph');
const checkPasswordRepeatParagraph = document.getElementById('checkPasswordRepeatParagraph');
const submitButton = document.getElementById('submit');


// input validation
passwordRepeat.addEventListener('keyup', (e)=> {
    if (password.value === '') {
        checkPasswordRepeatParagraph.style = 'display: block; color: red;'
        password.style  = 'border: 1px solid red;'
        checkPasswordRepeatParagraph.innerHTML = 'please enter the above password first';
    }

    if (password.value !== passwordRepeat.value) {
        checkPasswordRepeatParagraph.style = 'display: block; color: red;'
        passwordRepeat.style  = 'border: 1px solid red;'
        checkPasswordRepeatParagraph.innerHTML = 'passwords are not matching';
    }

    else {
        checkPasswordRepeatParagraph.style = 'display: block; color: green;'
        passwordRepeat.style  = 'border: 1px solid green;'
        checkPasswordRepeatParagraph.innerHTML = 'passwords are matching';
        submitButton.disabled = false;
    }
})


// handle submit
form.addEventListener('submit', async(e) => {
    e.preventDefault();
    const id = userId.innerHTML;
    const user = {
        password: password.value,
    }
    await fetch(`/shop/users/password-reset/${id}`,{
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(user),
    })
    // loading the home page
    window.location.href = '/shop/login';

});

window.onload = ()=> {

}