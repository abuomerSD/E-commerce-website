

// handle search product 
const searchProductInput = document.getElementById('serach-product-input');
const searchProductButton = document.getElementById('serach-product-button');

// searchProductButton.addEventListener('click', async function () {
//     console.log('search button:', searchProductInput.value);
//     const data = {"name": searchProductInput.value,}
//     console.log(JSON.stringify(data));

//     try {
//         const response = await fetch('/admin/products/search',{
//             method: 'post',
//             headers: {
//                 'Content-Type': 'application/json',
//                 // "Accept": "application/json"
//             },
//             body: JSON.stringify(data)
//         });
    
//         const filteredProducts = await response.json();
//         console.log(filteredProducts);
//     } catch (error) {
//         console.log(error.message);
//         console.log(error.stack);
//     }

    
// })


// fires on load
const onLoadFuntion = ()=> {
    document.getElementById('products-nav-link').classList.add('active');
    console.log('test');
    const data = {"name": "searchProductInput.value,"}
    console.log(JSON.stringify(data));
    // getAllCategories();
}


window.addEventListener('load', onLoadFuntion);



