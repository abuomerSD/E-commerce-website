async function logout() {
    try {
        await fetch('/shop/logout', {
            method: 'GET'
        })
        window.location.href = '/shop'
    } catch (error) {
        console.log(error);
    }
}