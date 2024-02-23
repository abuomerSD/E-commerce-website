

// handle search product 
const searchProductInput = document.getElementById('serach-product-input');
const searchProductButton = document.getElementById('serach-product-button');
const paginationLink = document.getElementById('pagination-link');

// delete product by id
function showDeleteAlert(id, name) {
    document.getElementById('deleteAlertBody').innerHTML = `Are you sure you want to delete: ${name} ?`;
    document.getElementById('deleteAlertButton').addEventListener('click', deleteProduct(id));
}

async function deleteProduct(id) {
    const response = await fetch(`/admin/products/${id}`, {
        method: 'DELETE',
    });
    const res = await response.json();
    console.log(res);
}
// fires on load
const onLoadFuntion = ()=> {
    document.getElementById('products-nav-link').classList.add('active');

    // to add active class to current page 
    setPaginationLinkActive();
}

function setPaginationLinkActive() {
    const searchParams = new URLSearchParams(window.location.search);
    let pageNumber = searchParams.get('pageNumber');
    if(pageNumber === null) {
        pageNumber = 1;
        return;
    }  
    const currentPageLink = document.getElementById('pagination-link-' + pageNumber);
    currentPageLink.classList.add('active');
}


window.addEventListener('load', onLoadFuntion);



