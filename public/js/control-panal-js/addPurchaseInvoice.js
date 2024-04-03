const productName = document.getElementById('productName');
const productQty = document.getElementById('productQty');
const productPrice = document.getElementById('productPrice');
const productTotal = document.getElementById('productTotal');

// input validation 
productQty.addEventListener('change', (e) => {
    if (productQty.value < 1) {
        alert('Product Quantity Cant be less than 1');
        productQty.value = 1;
        return;
    }

    // set total 
    productTotal.value = productQty.value * productPrice.value;
});

productPrice.addEventListener('change', (e) => {
    if (productQty.value === '') {
        alert('Enter the product quantity first');
        productQty.focus();
        return;
    }

    if (productPrice.value < 1) {
        alert('Product Price Cant be less than 1');
        productPrice.value = 1;
        return;
    }

    // set total 
    productTotal.value = productQty.value * productPrice.value;
});


productName.addEventListener('change', async (e) => {
    const response = await fetch('/shop/get-products-json', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    });
    const products = await response.json();

    products.forEach(product => {
        if (productName.value === product.name) {
            productQty.disabled = false;
            productPrice.disabled = false;
            return;
        }
        
    });
})
