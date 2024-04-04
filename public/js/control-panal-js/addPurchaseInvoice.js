const productName = document.getElementById('productName');
const productQty = document.getElementById('productQty');
const productPrice = document.getElementById('productPrice');
const productTotal = document.getElementById('productTotal');
const table = document.querySelector('.table');
const tableBody = document.createElement('tbody');
const invoiceTotal = document.querySelector('#total');
const saveInvoiceBtn = document.querySelector('#saveInvoiceBtn');

let productId = '';
let rowIndex = 0 ;
let products = [];

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
    productQty.disabled = true;
    productPrice.disabled = true;
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
            productId = product.id;
            return;
        }
        
    });
});

// when click enter on product price it add item to the table

productPrice.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        addPurchaseInvoiceItem();
    }
})


/**
 * adding item to products table 
 */

function addPurchaseInvoiceItem() {
    const url = '/admin/add-purchase-invoice';


    const name = productName.value;
    const qty = Number(productQty.value);
    const price = Number(productPrice.value);
    const total = Number(productTotal.value);

    // validation
    if (name === '') {
        alert('Please Enter the Product Name');
        productName.focus();
    }

    if (qty === '') {
        alert('Please Enter the Product Quantity');
        productQty.focus();
    }

    if (price === '') {
        alert('Please Enter the Product Price');
        productPrice.focus();
    }

    
    
    // creating table row
    const tr = document.createElement('tr');
    const tdRowIndex = document.createElement('td');
    const tdName = document.createElement('td');
    const tdQty = document.createElement('td');
    const tdPrice = document.createElement('td');
    const tdTotal = document.createElement('td');

    // assigning the table row values
    tdRowIndex.innerText = rowIndex + 1 ;
    tdName.innerText = name;
    tdQty.innerText = qty;
    tdPrice.innerText = `$${price}`;
    tdTotal.innerText = `$${total}`;
    rowIndex = rowIndex + 1;

    tr.append(tdRowIndex, tdName, tdQty, tdPrice, tdTotal);

    tableBody.append(tr);

    table.append(tableBody);

    clearInputs();

    let previousTotal = Number(total.innerText);
    total.innerText = previousTotal + total;

    // activate save invoice button
    if (saveInvoiceBtn.disabled === true) {
        saveInvoiceBtn.disabled = false;
    }

    // adding item to products Array
    let product =  {
        name,
        quantity: qty,
        price,
        total,
    }

    products.push(product);

    try {
        // const response = await fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // })


        console.log(productId, products);
    } catch (error) {
        console.log(error);
    }
}


function clearInputs() {
    productName.value = '';
    productPrice.value = '';
    productPrice.disabled = true;
    productQty.value = '';
    productQty.disabled = true;
    productTotal.value = '';
    productName.focus();
}


/**
 * save purchase invoice to the database
 */
async function saveInvoice() {

}

function disableSaveInvoiceBtn() {
    saveInvoiceBtn.disabled = true;
}
function enableSaveInvoiceBtn() {
    saveInvoiceBtn.disabled = false;
}

window.onload = (e) => {
    if (products.length === 0) {
        disableSaveInvoiceBtn();
    }
}