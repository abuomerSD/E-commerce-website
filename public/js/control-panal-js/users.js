const navLink = document.querySelector('#users-nav-link'); 
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');
const role = document.getElementById('role');
const status = document.getElementById('status');

async function addUser(){
    const user = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        username: username.value,
        password: password.value,
        role: role.value,
    }

    try {
        const response = await fetch(`/admin/users`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(user),
        })
    } catch (error) {
        console.log(error);
    }
}
    
window.onload = () => {
    navLink.classList.add('active');
}