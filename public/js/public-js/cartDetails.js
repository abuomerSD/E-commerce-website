const total = document.getElementById('txt-total');
const table = document.getElementsByTagName('table')[0];

function changeTotal(productId) {
    const qty = document.getElementById(`input-product-qty-${productId}`);
    const price = document.getElementById(`txt-price-${productId}`);
    const rowTotal = document.getElementById(`txt-total-${productId}`)

    if (qty.value < 1) {
        alert('enter quantity greater than 0');
        qty.value = 1;
    }

    // change row total
    rowTotal.innerHTML = `$${qty.value * price.innerHTML}` ;

    const rows = table.rows;

    // change the overall total 
    let t = 0;
    for (let i = 1; i < rows.length; i++) {
        t += Number(rows[i].cells[4].innerHTML.substring(1));
    }

    total.innerHTML = `total : $${t}`;
}

async function deleteCartItem(productId) {
    // delete the item from database 
    const result = confirm('Are You sure you want to delete this item?');
    if (!result) {
        return
    }

    try {
        const response = await fetch('/shop/cart/cart-details/', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            body: JSON.stringify({productId})
        });
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
    // delete the item from frontend table
}