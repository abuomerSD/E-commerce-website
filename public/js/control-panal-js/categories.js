const navbarCategoryLink = document.getElementById('categories-nav-link');
const editCategoryInput = document.getElementById('editCategoryInput');
const editCategoryModalBody = document.getElementById('editCategoryModalBody');
const saveEditCategoryButton = document.getElementById('saveEditCategoryButton');

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

function onloadFunction(){
    navbarCategoryLink.classList.add('active');
}

window.addEventListener('load', ()=> {
    onloadFunction();
})