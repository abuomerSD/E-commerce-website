
// handle search product 
const searchProductInput = document.getElementById('serach-product-input');
const searchProductButton = document.getElementById('serach-product-button');
const paginationLink = document.getElementById('pagination-link');
const deleteButton = document.getElementById('deleteAlertButton');

// delete product by id
async function showDeleteAlert(id, name) {
    document.getElementById('deleteAlertBody').innerHTML = `Are you sure you want to delete: ${name} ?`;

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
    document.getElementById('editAlertBody').innerHTML = `Are you sure you want to edit ${productName} ?`
    document.getElementById('edit-product-name-input').value = productName;
    document.getElementById('edit-product-cost-input').value = productCost;
    document.getElementById('edit-product-price-input').value = productPrice;
    document.getElementById('edit-product-quantity-input').value = productQuantity;
    document.getElementById('editProductImage').src = `/products-images/${productImage}`;

    // to select the current category name 
    const categorySelect = document.getElementById('edit-productCategory-select');
    const categoriesArray = Array.from(categorySelect.options);

    categoriesArray.forEach(element => {
        if (element.innerHTML === categoryName) {
            categorySelect.selectedIndex = categoriesArray.indexOf(element);
        }
    });

    // add event listener to edit product button 

    document.getElementById('editAlertButton').addEventListener('click', async (e)=> {
        const product  = {
            name: document.getElementById('edit-product-name-input').value,
            // categoryId ,
            categoryId: document.getElementById('edit-productCategory-select').value,
            quantity: document.getElementById('edit-product-quantity-input').value,
            cost: document.getElementById('edit-product-cost-input').value,
            price: document.getElementById('edit-product-price-input').value,
            image: document.getElementById('edit-formFile').value,
        }

        // console.log(product);

        // console.log('edit clicked');

        // sending the put request using form data , because we are using multer package
        const updateForm = document.getElementById('updateProductForm');
        const formData = new FormData(updateForm);

        // formData.append('name',product.name)
        // formData.append('categoryId',product.categoryId)
        // formData.append('quantity',product.quantity)
        // formData.append('cost',product.cost)
        // formData.append('price',product.price)
        // formData.append('image', product.image)
        
        // console.log(document.getElementById('edit-formFile').value);
        // for(const value of formData.values()){
        //     console.log(value);

        // }
        // console.log(window.location.href);
        
        const reloadUrl = window.location.href;
        // console.log(`/admin/products/${productId}`);
        await fetch(`/admin/products/${productId}`, {
            method: 'PUT',
            body: formData,
        }).then((response => {
            // window.location.href = reloadUrl;
            window.location.replace(reloadUrl);
            // window.location.reload();
        }))
        

        // const result = await response.json();
        // console.log(result);
    })
}


// to change the image on the edit modal
function changeImage() {
    const imageSelect = document.getElementById("edit-formFile");
    imageSelect.click();
    imageSelect.addEventListener('change', (e)=> {

        const preview = document.getElementById('editProductImage');
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



