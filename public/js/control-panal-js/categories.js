const navbarCategoryLink = document.getElementById('categories-nav-link');
const editCategoryInput = document.getElementById('editCategoryInput');
const editCategoryModalBody = document.getElementById('editCategoryModalBody');
const saveEditCategoryButton = document.getElementById('saveEditCategoryButton');
const deleteCategoryModalBodyText = document.getElementById('deleteCategoryModalBodyText');
const deleteCategoryModalButton = document.getElementById('deleteCategoryModalButton');

function showEditCategoryAlert(id, name) {
    editCategoryModalBody.innerHTML = `Are you sure you want to edit: ${name} ?`;
    editCategoryInput.value = name;
    saveEditCategoryButton.addEventListener('click', async (e)=> {
        const response = await fetch(`/admin/categories/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: editCategoryInput.value}),
        })
        // console.log(JSON.stringify({name: editCategoryInput.value}));
        // const json = await response.json();
        // console.log(json);
        window.location.replace('/admin/categories');
    })
}

function showDeleteCategoryModal(categoryName, categoryId) {
    deleteCategoryModalBodyText.innerHTML = `Are you sure you want to delete this category : ${categoryName} ?`;
    deleteCategoryModalButton.addEventListener('click', async () => {
        const response = await fetch(`/admin/categories/${categoryId}`, {
            headers: {'Content-Type': 'application/json'},
            method: 'DELETE',
        })
        const result = await response.json();
        if (result.status === 'success') {
            window.location.replace('/admin/categories/')
        }
        else{
            console.log(result);
        }
    })
}

function onloadFunction(){
    navbarCategoryLink.classList.add('active');
}

window.addEventListener('load', ()=> {
    onloadFunction();
})