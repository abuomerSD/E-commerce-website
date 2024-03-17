const form = document.getElementById("email-form");
const email = form.email;
const paragraph = document.getElementById('paragraph');

form.addEventListener('submit', async (e)=> {
    paragraph.style = 'display: block; color: red;'
    paragraph.innerHTML = 'Please wait ...'
    e.preventDefault();
    const data = {email: email.value}
    await fetch('/shop/users/password-reset/enter-your-email', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
    })

    paragraph.style = 'display: block; color: green;';
    paragraph.innerHTML = 'Please check your email and click on the confirmation link';
})