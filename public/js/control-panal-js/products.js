
// handle search product 
const searchProductInput = document.getElementById('serach-product-input');
const searchProductButton = document.getElementById('serach-product-button');
const paginationLink = document.getElementById('pagination-link');
const deleteButton = document.getElementById('deleteAlertButton');
const deleteAlertBody = document.getElementById('deleteAlertBody');
const editAlertBody = document.getElementById('editAlertBody');
const editProductNameInput = document.getElementById('edit-product-name-input');
const editProductCostInput = document.getElementById('edit-product-cost-input');
const editProductPriceInput = document.getElementById('edit-product-price-input');
const editProductQuantityInput = document.getElementById('edit-product-quantity-input');
const editProductImage = document.getElementById('editProductImage');
const editProductcategorySelect = document.getElementById('edit-productCategory-select');
const imageSelect = document.getElementById("edit-formFile");


// delete product by id
async function showDeleteAlert(id, name) {
    deleteAlertBody.innerHTML = `Are you sure you want to delete: ${name} ?`;

    deleteButton.addEventListener('click', async ()=> {
        const response = await fetch(`/admin/products/${id}`, {
            method: 'DELETE',
        });

        // to reload the page
        window.location.reload();

    })
}

// edit product

function showEditAlert(productId, productName, productCost, productPrice, categoryId, productQuantity, productImage, categoryName) {
    // console.log(productId, productName, productCost, productPrice, categoryId, productQuantity, productImage, categoryName);
    editAlertBody.innerHTML = `Are you sure you want to edit ${productName} ?`
    editProductNameInput.value = productName;
    editProductCostInput.value = productCost;
    editProductPriceInput.value = productPrice;
    editProductQuantityInput.value = productQuantity;
    editProductImage.src = `/products-images/${productImage}`;

    // to select the current category name 
    const categoriesArray = Array.from(editProductcategorySelect.options);

    categoriesArray.forEach(element => {
        if (element.innerHTML === categoryName) {
            editProductcategorySelect.selectedIndex = categoriesArray.indexOf(element);
        }
    });

    // add event listener to edit product button 

    document.getElementById('editAlertButton').addEventListener('click', async (e)=> {
        const product  = {
            name: editProductNameInput.value,
            // categoryId ,
            categoryId: editProductcategorySelect.value,
            quantity: editProductQuantityInput.value,
            cost: editProductCostInput.value,
            price: editProductPriceInput.value,
            image: editProductImage.value,
        }

        // sending the put request using form data , because we are using multer package
        const updateForm = document.getElementById('updateProductForm');
        const formData = new FormData(updateForm);
        
        const reloadUrl = window.location.href;

        await fetch(`/admin/products/${productId}`, {
            method: 'PUT',
            body: formData,
        }).then((response => {
            window.location.replace(reloadUrl);
        }))
        
    })
}


// to change the image on the edit modal
function changeImage() {
    imageSelect.click();
    imageSelect.addEventListener('change', (e)=> {

        const preview = editProductImage;
        const file = imageSelect.files[0];
        const reader = new FileReader();
    
        reader.addEventListener(
        "load",
        () => {
            // convert image file to base64 string
            preview.src = reader.result;
        },
        false,
        );
    
        if (file) {
        reader.readAsDataURL(file);
        }

        })
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