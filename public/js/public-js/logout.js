async function logout() {
    try {
        await fetch('/shop/logout', {
            method: 'GET'
        })
    } catch (error) {
        console.log(error);
    }
}