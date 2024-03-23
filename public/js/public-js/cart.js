async function addToCart(productId, userId) {
    try {
        // fetching product data
        const product = await getProductById(productId);
        console.log(product);
        // fetching the previous cart total
        const cart = await getPreviousCart(userId);
        console.log('total', cart.total);
        let total = cart.total;
        let cartHeadId = cart.id;
        if (!cart) {
            total = 0;
            cartHeadId = 0;
        }
        // saving data to cart
        const data = {
            CartHead: {
                userId,
                total,
            },
            CartDetails: {
                cartHeadId: cartHeadId + 1,
                productId: product.id,
                productName: product.name,
                productQty: 1,
                productPrice: product.price,
                productTotal: productQty * productPrice,
            }
        }
        console.log(data);
    } catch (error) {
        console.log(error);   
    }
}

async function getPreviousCart(userId) {
    try {
        const response = await fetch(`/shop/cart/cart-details/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'GET',
        });
        const cart = await response.json();
        return cart;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function getProductById(productId) {
    try {
        const response = await fetch(`/shop/product/${productId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'GET',
        });
        const product = await response.json();
        return product;
    } catch (error) {
        console.log(error);
        return null;
    }
}