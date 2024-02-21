// window.onload(e => {
//     document.getElementById('products-nav-link').style = 'color: red;';
//     console.log('test');
// })

// get all categories to fill the categories selector
async function getAllCategories() {
    const response = await fetch('/admin/categories',{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        },
    })
    const categories = await response.json()
    console.log(categories.data);
}
// fires on load
const onLoadFuntion = ()=> {
    document.getElementById('products-nav-link').classList.add('active');
    console.log('test');
    // getAllCategories();
}


window.addEventListener('load', onLoadFuntion);



