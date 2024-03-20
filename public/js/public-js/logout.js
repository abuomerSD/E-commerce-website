async function logout() {
    try {
        await fetch('/shop/logout', {
            method: 'GET'
        })
        // window.location.href = '/shop'
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}