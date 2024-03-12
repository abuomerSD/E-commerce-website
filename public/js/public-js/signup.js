// getting all form element

const form = document.getElementById('signupForm');
const firstNameInput = form.firstName;
const lastNameInput = form.lastName;
const emailInput = form.email;
const usernameInput = form.username;
const checkUserNameOnDbPraghraph = document.getElementById('checkUserNameOnDbPraghraph');
const passwordInput = form.password;
const passwordRepeatInput = form.passwordRepeat;
const checkPasswordRepeatPraghraph = document.getElementById('checkPasswordRepeatPraghraph');
const checkEmailPraghraph = document.getElementById('checkEmailPraghraph');
const submitButton = form.submit;

// icons for form validation
const errorIcon = '<i class="fa-solid fa-xmark"></i>';
const correctIcon = '<i class="fa-solid fa-check"></i>';

// helper funtions

/**
 * to disable the submit button
 */
function disableSubmitButton() {
    submitButton.disabled = true;
}

/**
 * to enable the submit button
 */
function enableSubmitButton() {
    submitButton.disabled = false;
}

// form validation

/**
 * password and password repeat must be the same
*/
passwordRepeatInput.addEventListener('keyup', (e)=> {
    if (passwordInput.value === '') {
        checkPasswordRepeatPraghraph.style = 'display: block; color: red; margin: 0';
        checkPasswordRepeatPraghraph.innerHTML = `${errorIcon} please enter the password above first`;
        disableSubmitButton();
        return;
    }

    if (passwordInput.value !== passwordRepeatInput.value) {
        checkPasswordRepeatPraghraph.style = 'display: block; color: red';
        checkPasswordRepeatPraghraph.innerHTML = `${errorIcon} password not matching the password above`;
        disableSubmitButton();
    }
    else {
        checkPasswordRepeatPraghraph.style = 'display: block; color: green';
        checkPasswordRepeatPraghraph.innerHTML = `${correctIcon} passwords matched`;
        enableSubmitButton();
    }
})

// check for email validation on the database

emailInput.addEventListener('keyup', async(e)=> {
    try {
        const response = await fetch('/shop/users', {
            headers: {
                'accept': 'application/json'
            },
            method: 'GET',
        })
        const users = await response.json();
        users.forEach(user => {
            if (emailInput.value === user.email) {
                checkEmailPraghraph.style = 'display: block; color: red;';
                checkEmailPraghraph.innerHTML = `${errorIcon} email already registered, choose another one`;
                disableSubmitButton();
            }
            else if (emailInput.value === ''){
                checkEmailPraghraph.style = 'display: block; color: red;';
                checkEmailPraghraph.innerHTML = `${errorIcon} please enter the email`;
                disableSubmitButton();
            }
            else {
                checkEmailPraghraph.style = 'display: block; color: green;';
                checkEmailPraghraph.innerHTML = `${correctIcon} email is available`;
                enableSubmitButton();
            }
        });
    } catch (error) {
        console.log(error);
    }
})

// check for username validation on database
usernameInput.addEventListener('keyup', async (e)=> {
    try {
        const response = await fetch('/shop/users', {
            headers: {
                // 'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            method: 'GET',
        })
        const users = await response.json();
        users.forEach(user => {
            if (usernameInput.value === user.username) {
                checkUserNameOnDbPraghraph.style = 'display: block; color: red;';
                checkUserNameOnDbPraghraph.innerHTML = `${errorIcon} username already registered, choose another one`;
                disableSubmitButton();
            }
            else if (usernameInput.value === ''){
                checkUserNameOnDbPraghraph.style = 'display: block; color: red;';
                checkUserNameOnDbPraghraph.innerHTML = `${errorIcon} please enter the username`;
                disableSubmitButton();
            }
            else {
                checkUserNameOnDbPraghraph.style = 'display: block; color: green;';
                checkUserNameOnDbPraghraph.innerHTML = `${correctIcon} username is available`;
                enableSubmitButton();
            }
        });
    } catch (error) {
        console.log(error);
    }

})


// save user
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = {
        firstName :firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        username: usernameInput.value,
        password: passwordInput.value,
    }
    try {
        const response = await fetch('/shop/signup', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(user),
        });
        // redirect to confirmation page
        // const userCreated = await response.json();
        window.location.replace(`/shop/signup/confirmation`);
        // console.log(userCreated);
    } catch (error) {
        console.log(error);
    }
});


