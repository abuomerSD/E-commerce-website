const total = document.getElementById('txt-total');
const table = document.getElementsByTagName('table')[0];
const userId = document.getElementById('userId').innerText;



async function changeTotal(productId) {
    const qty = document.getElementById(`input-product-qty-${productId}`);
    const price = document.getElementById(`txt-price-${productId}`);
    const rowTotal = document.getElementById(`txt-total-${productId}`)

    if (qty.value < 1) {
        alert('enter quantity greater than 0');
        qty.value = 1;
    }

    const productQty = await getProductQty(productId);
    if (qty.value > productQty) {
        alert('we dont have this quantity now, Please choose less quantity');
        qty.value = productQty;
    }
    // change row total
    rowTotal.innerHTML = `$${qty.value * price.innerHTML}` ;

    updateCartItem(productId, +qty.value, +(qty.value * price.innerHTML));

    const rows = table.rows;

    // change the overall total 
    let t = 0;
    for (let i = 1; i < rows.length; i++) {
        t += Number(rows[i].cells[4].innerHTML.substring(1));
    }

    total.innerHTML = `total : $<span id="total-number">${t}</span>`;
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
}

async function showPaymentModal() {
    const totalPaymentAmount = document.getElementById('total-number');
    const amount = totalPaymentAmount.innerText * 100;

    const description = `Step Shop Order`;
    try {
        Moyasar.init({
            element: '.payment-modal-body',
            // Amount in the smallest currency unit.
            // For example:
            // 10 SAR = 10 * 100 Halalas
            // 10 KWD = 10 * 1000 Fils
            // 10 JPY = 10 JPY (Japanese Yen does not have fractions)
            amount,
            currency: 'USD',
            description,
            publishable_api_key: 'pk_test_Rtub55HSgYSAtsemHMLTVgc2edNrt5NQYEoQzLdB',
            callback_url: 'https://moyasar.com/thanks',
            methods: ['creditcard'],
            fixed_width: false, // optional, only for demo purposes
            on_completed: saveSalesInvoice,    
          })

    } catch (error) {
        console.log(error);
    }
}


/**
 * this fuction fires after payment success to save the sales invoice to the database
 */
async function saveSalesInvoice() {
    try {
        const cart = await getCartByUserId(userId);
        const response = await fetch(`/shop/cart/cart-details/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(cart),
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * get product quantity
 * @param productId : the product id
 * @returns products quantity : number
 */

async function getProductQty(productId) {
    let qty = 0;
    let product;
    try {
        const response = await fetch(`/shop/product/${productId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
        product = await response.json();
    } catch (error) {
        console.log(error);
    }


    qty = product.quantity;
    return qty;
}

/**
 * update cart item qty and total
 */
async function updateCartItem(productId, productQty, productTotal) {
    try {
        const response = await fetch(`/shop/cart/cart-details-update/${productId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify({
                productQty,
                productTotal,
            }),
        })
    } catch (error) {
        console.log(error);
    }
}

async function getCartByUserId(userId) {
    try {
        const response = await fetch(`/shop/cart/${userId}`, {
        headers: {
            'Accept': 'application/json',
        },
        method: "GET",
        });
        const cart = await response.json();
        console.log(cart);
        return cart;
    } catch (error) {
        console.log(error);
    }
}