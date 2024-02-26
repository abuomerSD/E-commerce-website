const navbarCategoryLink = document.getElementById('categories-nav-link');

function onloadFunction(){
    navbarCategoryLink.classList.add('active');
}

window.addEventListener('load', ()=> {
    onloadFunction();
})