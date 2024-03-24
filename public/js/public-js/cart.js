async function addToCart(productId, userId) {
    try {
        // fetching product data
        const product = await getProductById(productId);
        console.log(product);
        // fetching the previous cart total
        const cart = await getPreviousCart(userId);
        let total ;
        let cartHeadId ;
        if (!cart) {
            total = 0;
            cartHeadId = 0;
        }
        else {
            total = cart.total;
            cartHeadId = cart.id;
        }
        // console.log('total', cart.total);

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
                // productPrice: product.price,
                // productTotal: 1 * productPrice,
            }
        }

        await saveCartItem(userId, product);

        console.log(data);
    } catch (error) {
        console.log(error);   
    }
}

async function getPreviousCart(userId) {
    try {
        const response = await fetch(`/shop/cart/${userId}`, {
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

async function saveCartItem(userId , product) {
    try {
        const response = await fetch(`/shop/cart/${userId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(product),
        });
    } catch (error) {
        console.log(error);
    }

} 