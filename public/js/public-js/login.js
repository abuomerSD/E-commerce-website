const loginForm = document.getElementById('loginForm');
const username = loginForm.username;
const password = loginForm.password;
const submitButton = loginForm.submit;
const checkUserEmailParaghraph = document.getElementById('checkUserEmail');
const checkUserPasswordParaghraph = document.getElementById('checkUserPassword');

// icons for form validation
const errorIcon = '<i class="fa-solid fa-xmark"></i>';
const correctIcon = '<i class="fa-solid fa-check"></i>';

function enableSubmitButton() {
    submitButton.disabled = false;
}
function disableSubmitButton() {
    submitButton.disabled = true;
}

username.addEventListener('keyup', async (e) => {
    try {
        const response = await fetch('/shop/users', {
            headers: {
                'accept': 'application/json'
            },
            method: 'GET',
        })
        const users = await response.json();
        users.forEach(user => {
            if (user.username === username.value || user.email === username.value) {
                checkUserEmailParaghraph.style = 'display: block; color: green';
                checkUserEmailParaghraph.innerHTML = `${correctIcon} user exist please enter the correct password`;
                password.disabled = false;                 
            }
            else {
                checkUserEmailParaghraph.style = 'display: block ; color: red';
                checkUserEmailParaghraph.innerHTML = `${errorIcon} Please enter correct username or email`
            }
        });
    } catch (error) {
        console.log(error);
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
})

window.onload = (e) => {
    password.disabled = true;
}