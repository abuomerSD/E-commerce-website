const productName = document.getElementById('productName');
const productQty = document.getElementById('productQty');
const productPrice = document.getElementById('productPrice');
const productTotal = document.getElementById('productTotal');
const table = document.querySelector('.table');
const tableBody = document.createElement('tbody');
const invoiceTotal = document.querySelector('#total');
const saveInvoiceBtn = document.querySelector('#saveInvoiceBtn');
const supplierName = document.querySelector('#supplierName');
const navLink = document.querySelector('#purchase-nav-link');

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

    let previousTotal = Number(invoiceTotal.innerText);
    invoiceTotal.innerText = previousTotal + total;

    // activate save invoice button
    if (saveInvoiceBtn.disabled === true) {
        saveInvoiceBtn.disabled = false;
    }

    // adding item to products Array
    let product =  {
        productName: name,
        productQuantity: qty,
        productCost: price,
        productTotal: total,
    }

    products.push(product);

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
    const url = '/admin/add-purchase-invoice';
    const total = invoiceTotal.innerText;

    if (supplierName.value === '') {
        alert('Please Enter the Supplier Name');
        supplierName.focus();
        return;
    }

    // confirmation
    const isOk = confirm('Save the invoice ?');

    if (!isOk) {
        return;
    }

    let data = {
        supplierName: supplierName.value,
        total,
        products,
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // reloading the page 
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

function disableSaveInvoiceBtn() {
    saveInvoiceBtn.disabled = true;
}
function enableSaveInvoiceBtn() {
    saveInvoiceBtn.disabled = false;
}

window.onload = (e) => {
    // disable save button
    if (products.length === 0) {
        disableSaveInvoiceBtn();
    }

    // set nav link active
    navLink.classList.add('active');

}