fetch("products.json")
.then(response => response.json())
.then(data =>{


    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || []

    const swiper_item_sale = document.getElementById("swiper_item_sale")


    const swiper_item_sale_elec = document.getElementById("swiper_item_sale_elec")



    const swiper_item_sale_api = document.getElementById("swiper_item_sale_api")



    const swiper_item_sale_mob = document.getElementById("swiper_item_sale_mob")



    data.forEach(product => {
        if(product.old_price){

            const isInCart = cart.some(cartItem =>  cartItem.id === product.id)
            const isInWishlist = wishlist.includes(product.id)
            const heartClass = isInWishlist ? 'fa-solid' : 'fa-regular'
            const heartColor = isInWishlist ? 'style="color: #ef4444;"' : ''

            const percent_disc = Math.floor((product.old_price - product.price) / product.old_price * 100)
            
            swiper_item_sale.innerHTML += `<div class="swiper-slide product">

                        <span class="sale_present">%${percent_disc}</span>
                        <div class="img_product">
                            <a href=""><img src="${product.img}" alt=""></a>
                        </div>

                        <div class="stars">

                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>

                        <p class="name_product"><a href="">${product.name}</a></p>


                             <div class="price">
                                <p><span>$${product.price}</span></p>
                                <p class="old_price">$${product.old_price}</p>
                             </div>


                             <div class="icons">
                                <span class="btn_add_cart ${isInCart ? 'active' : " "}" data-id="${product.id}">
                                    <i class="fa-solid fa-cart-shopping"></i> ${isInCart ? 'item in cart' : "add to cart "}
                                </span>
                                <span class="icon_product" data-product-id="${product.id}"><i class="${heartClass} fa-heart" ${heartColor}></i></span>
                             </div>


                        
                    </div>
`


        }
    })



 
    data.forEach(product => {
        if(product.catetory == "electronics"){


            const isInCart = cart.some(cartItem =>  cartItem.id === product.id)
            const isInWishlist = wishlist.includes(product.id)
            const heartClass = isInWishlist ? 'fa-solid' : 'fa-regular'
            const heartColor = isInWishlist ? 'style="color: #ef4444;"' : ''


            const old_price_Paragraph = product.old_price ? `<p class="old_price">$${product.old_price}</p>` : ``;


            const ercent_dis = product.old_price ? `<span class="sale_present">%${Math.floor((product.old_price - product.price) / product.old_price * 100)}</span>` : ``;






                       swiper_item_sale_elec.innerHTML += `<div class="swiper-slide product">
                       
                       ${ercent_dis}
                       
                       <div class="img_product">
                            <a href=""><img src="${product.img}" alt=""></a>
                        </div>

                        <div class="stars">

                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>

                        <p class="name_product"><a href="">${product.name}</a></p>


                             <div class="price">
                                <p><span>$${product.price}</span></p>
                                ${old_price_Paragraph}
                             </div>
                             


                             <div class="icons">
                                <span class="btn_add_cart ${isInCart ? 'active' : " "}" data-id="${product.id}">
                                    <i class="fa-solid fa-cart-shopping"></i> ${isInCart ? 'item in cart' : "add to cart "}
                                </span>
                                <span class="icon_product" data-product-id="${product.id}"><i class="${heartClass} fa-heart" ${heartColor}></i></span>
                             </div>


                        
                    </div>
`


        }
    })




    data.forEach(product => {
        if(product.catetory == "appliances"){


            const isInCart = cart.some(cartItem =>  cartItem.id === product.id)
            const isInWishlist = wishlist.includes(product.id)
            const heartClass = isInWishlist ? 'fa-solid' : 'fa-regular'
            const heartColor = isInWishlist ? 'style="color: #ef4444;"' : ''


            const old_price_Paragraph = product.old_price ? `<p class="old_price">$${product.old_price}</p>` : ``;


            const ercent_dis = product.old_price ? `<span class="sale_present">%${Math.floor((product.old_price - product.price) / product.old_price * 100)}</span>` : ``;






                       swiper_item_sale_api.innerHTML += `<div class="swiper-slide product">
                       
                       ${ercent_dis}
                       
                       <div class="img_product">
                            <a href=""><img src="${product.img}" alt=""></a>
                        </div>

                        <div class="stars">

                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>

                        <p class="name_product"><a href="">${product.name}</a></p>


                             <div class="price">
                                <p><span>$${product.price}</span></p>
                                ${old_price_Paragraph}
                             </div>
                             


                             <div class="icons">
                               <span class="btn_add_cart ${isInCart ? 'active' : " "}" data-id="${product.id}">
                                    <i class="fa-solid fa-cart-shopping"></i> ${isInCart ? 'item in cart' : "add to cart "}
                                </span>
                                <span class="icon_product" data-product-id="${product.id}"><i class="${heartClass} fa-heart" ${heartColor}></i></span>
                             </div>


                        
                    </div>
`


        }
    })





    data.forEach(product => {
        if(product.catetory == "mobiles"){

                        const isInCart = cart.some(cartItem =>  cartItem.id === product.id)
                        const isInWishlist = wishlist.includes(product.id)
                        const heartClass = isInWishlist ? 'fa-solid' : 'fa-regular'
                        const heartColor = isInWishlist ? 'style="color: #ef4444;"' : ''


            const old_price_Paragraph = product.old_price ? `<p class="old_price">$${product.old_price}</p>` : ``;


            const ercent_dis = product.old_price ? `<span class="sale_present">%${Math.floor((product.old_price - product.price) / product.old_price * 100)}</span>` : ``;






                       swiper_item_sale_mob.innerHTML += `<div class="swiper-slide product">
                       
                       ${ercent_dis}
                       
                       <div class="img_product">
                            <a href=""><img src="${product.img}" alt=""></a>
                        </div>

                        <div class="stars">

                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>

                        <p class="name_product"><a href="">${product.name}</a></p>


                             <div class="price">
                                <p><span>$${product.price}</span></p>
                                ${old_price_Paragraph}
                             </div>
                             


                             <div class="icons">
                               <span class="btn_add_cart ${isInCart ? 'active' : " "}" data-id="${product.id}">
                                    <i class="fa-solid fa-cart-shopping"></i> ${isInCart ? 'item in cart' : "add to cart "}
                                </span>
                                <span class="icon_product" data-product-id="${product.id}"><i class="${heartClass} fa-heart" ${heartColor}></i></span>
                             </div>


                        
                    </div>
`


        }
    })
    



})

// Initialize wishlist icons after products are loaded
setTimeout(() => {
    if (typeof initializeWishlistIcons === 'function') {
        initializeWishlistIcons();
    }
}, 1000);
