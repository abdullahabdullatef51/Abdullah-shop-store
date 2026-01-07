let category_nav_list = document.querySelector(".category_nav_list");


function Open_Catego_list(){
    category_nav_list.  classList.toggle("active")
}





var cart = document.querySelector('.cart');
var cartOverlay = document.querySelector('.cart-overlay');

function open_close_cart() {
  cart.classList.toggle("active");
  if(cartOverlay) {
    cartOverlay.classList.toggle("active");
  }
}

// Scroll to top function
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
  const scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('active');
    } else {
      scrollTopBtn.classList.remove('active');
    }
  }
});




fetch("products.json")
.then(response => response.json())
.then(data => {


  const addToCartButtons = document.querySelectorAll('.btn_add_cart')

  addToCartButtons.forEach(button =>{
    button.addEventListener('click', (event) =>{
        const productId = event.target.getAttribute('data-id')


    const selectProduct = data.find(product => product.id == productId)



    addToCart(selectProduct)
    

    const allMatchingButtons = document.querySelectorAll(`.btn_add_cart[data-id='${productId}']`)

    allMatchingButtons.forEach(btn =>{

      btn.classList.add("active")

      btn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> item in cart`
    })


    })


  


  })
  

})


function addToCart(product){
  console.log(product);

  let cart = JSON.parse(localStorage.getItem('cart')) || [] 

  cart.push({... product , quantity: 1})
  localStorage.setItem('cart' , JSON.stringify(cart))

  updateCart()

}


function updateCart() {


  const cartItemContieaner = document.getElementById('cart_item')

  const cart = JSON.parse(localStorage.getItem('cart')) || []



 var total_price = 0
 var total_count = 0

  
  cartItemContieaner.innerHTML = "" ;
  cart.forEach((item , index) => {

    let total_price_item = item.price * item.quantity;


    total_price += total_price_item

    total_count += item.quantity


    cartItemContieaner.innerHTML +=   `
    
    <div class="item_cart">
                <img src="${item.img}" alt="">

                <div class="content">
                    <h4>${item.name}</h4>
                    <p class="price_cart">$${total_price_item}</p>

                    <div class="qountity_control">
                        <button class="decrease_quantity" data-index="${index}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase_quantity" data-index="${index}">+</button>
                    </div>

                </div>


                <button class="delete_item" data-inex="${index}"><i class="fa-solid fa-trash-can"></i></button>
            </div>


    `

  })



 const price_item_cart = document.querySelector('.price_cart_total')
const count_item_cart = document.querySelector('.count_item_cart')
const count_item_header = document.querySelector('.ico-itemm')

if(price_item_cart) price_item_cart.innerHTML = `$ ${total_price}`
if(count_item_cart) count_item_cart.innerHTML = total_count
if(count_item_header) count_item_header.innerHTML = total_count




  const increaseButton = document.querySelectorAll('.increase_quantity')
  const decreaseButton = document.querySelectorAll('.decrease_quantity')



  increaseButton.forEach(button => {
    button.addEventListener('click' , (event) =>{
      const itemIndex = event.target.getAttribute('data-index')
      increaseQuantity(itemIndex)
    } )
  })

  decreaseButton.forEach(button =>{
    button.addEventListener('click' , (event) =>{
      const itemIndex = event.target.getAttribute('data-index')
      decreaseQuantity(itemIndex)
    } )
  })

  

  const delteButtons = document.querySelectorAll('.delete_item')

  delteButtons.forEach(button =>{
    button.addEventListener('click' , (event) =>{
      const itemIndex = event.target.closest('button').getAttribute(`data-inex`)

      removeFromCart(itemIndex) 


    })


  })



}




function increaseQuantity(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || []
  cart[index].quantity += 1
  localStorage.setItem('cart' , JSON.stringify(cart) )
  updateCart()
  
}




function decreaseQuantity(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || []

  if(cart[index].quantity > 1){
    cart[index].quantity -= 1
  }
  
  localStorage.setItem('cart' , JSON.stringify(cart) )
  updateCart()
  
}












function removeFromCart(index) {

    const cart = JSON.parse(localStorage.getItem('cart')) || []

      const removeProduct = cart.splice(index , 1)[0]
      localStorage.setItem('cart', JSON.stringify(cart))
      updateCart()

      updateBottonState(removeProduct.id)

}

function updateBottonState(productId) {
  const allMatchingButtons = document.querySelectorAll(`.btn_add_cart[data-id='${productId}']`)
  allMatchingButtons.forEach(button =>{
    button.classList.remove('active');
          button.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> add to cart `

  })

}












updateCart()

// Wishlist functionality
function updateWishlistCount() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const wishlistCountEl = document.querySelector('.ico-item');
  if (wishlistCountEl) {
    wishlistCountEl.textContent = wishlist.length;
  }
}

function addToWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    return true;
  }
  return false;
}

function removeFromWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlist = wishlist.filter(id => id != productId);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateWishlistCount();
}

function toggleWishlist(productId) {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const isInWishlist = wishlist.includes(Number(productId));
  
  const heartIcons = document.querySelectorAll(`.icon_product[data-product-id="${productId}"] i`);
  
  if (isInWishlist) {
    removeFromWishlist(productId);
    heartIcons.forEach(icon => {
      icon.classList.remove('fa-solid');
      icon.classList.add('fa-regular');
    });
  } else {
    addToWishlist(Number(productId));
    heartIcons.forEach(icon => {
      icon.classList.remove('fa-regular');
      icon.classList.add('fa-solid');
      icon.style.color = '#ef4444';
    });
  }
}

function initializeWishlistIcons() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const wishlistIcons = document.querySelectorAll('.icon_product');
  
  wishlistIcons.forEach(icon => {
    const productId = icon.getAttribute('data-product-id');
    if (productId && wishlist.includes(Number(productId))) {
      const heartIcon = icon.querySelector('i');
      if (heartIcon) {
        heartIcon.classList.remove('fa-regular');
        heartIcon.classList.add('fa-solid');
        heartIcon.style.color = '#ef4444';
      }
    }
    
    icon.addEventListener('click', function(e) {
      e.preventDefault();
      const productId = this.getAttribute('data-product-id');
      if (productId) {
        toggleWishlist(productId);
      }
    });
  });
}

// Initialize wishlist count on page load
updateWishlistCount();

// Initialize wishlist icons when page loads
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    initializeWishlistIcons();
  }, 1000);
});

// Search functionality
function handleSearch(event) {
  if (event) {
    event.preventDefault();
  }
  const searchInput = document.getElementById('searsh');
  const categorySelect = document.getElementById('category');
  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const selectedCategory = categorySelect ? categorySelect.value : 'All Categories';
  
  // Filter products based on search and category
  if (searchTerm || selectedCategory !== 'All Categories') {
    filterProducts(searchTerm, selectedCategory);
  }
}

function handleSearchInput() {
  const searchInput = document.getElementById('searsh');
  const categorySelect = document.getElementById('category');
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedCategory = categorySelect.value;
  
  // Real-time filtering as user types
  if (searchTerm.length > 2 || selectedCategory !== 'All Categories') {
    filterProducts(searchTerm, selectedCategory);
  } else if (searchTerm.length === 0 && selectedCategory === 'All Categories') {
    // Reset to show all products
    location.reload();
  }
}

function filterProducts(searchTerm, category) {
  fetch("products.json")
    .then(response => response.json())
    .then(data => {
      let filtered = data;
      
      // Filter by category
      if (category !== 'All Categories') {
        filtered = filtered.filter(product => 
          product.catetory && product.catetory.toLowerCase() === category.toLowerCase()
        );
      }
      
      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(searchTerm)
        );
      }
      
      // Display filtered products
      displayFilteredProducts(filtered);
    })
    .catch(error => console.error('Error filtering products:', error));
}

function updateWishlistForFilteredProducts() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const wishlistIcons = document.querySelectorAll('.icon_product');
  
  wishlistIcons.forEach(icon => {
    const productId = icon.getAttribute('data-product-id');
    if (productId && wishlist.includes(Number(productId))) {
      const heartIcon = icon.querySelector('i');
      if (heartIcon) {
        heartIcon.classList.remove('fa-regular');
        heartIcon.classList.add('fa-solid');
        heartIcon.style.color = '#ef4444';
      }
    }
    
    icon.addEventListener('click', function(e) {
      e.preventDefault();
      const productId = this.getAttribute('data-product-id');
      if (productId) {
        toggleWishlist(productId);
      }
    });
  });
}

function displayFilteredProducts(products) {
  // Clear existing products
  const containers = [
    'swiper_item_sale',
    'swiper_item_sale_elec',
    'swiper_item_sale_api',
    'swiper_item_sale_mob'
  ];
  
  containers.forEach(id => {
    const container = document.getElementById(id);
    if (container) {
      container.innerHTML = '';
    }
  });
  
  if (products.length === 0) {
    // Show message if no products found
    const firstContainer = document.getElementById('swiper_item_sale');
    if (firstContainer) {
      firstContainer.innerHTML = '<div class="swiper-slide" style="text-align: center; padding: 40px;"><p style="color: var(--p_color); font-size: 18px;">No products found. Try a different search.</p></div>';
    }
    return;
  }
  
  // Show filtered products in appropriate sections
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  
  products.forEach(product => {
    const isInCart = cart.some(cartItem => cartItem.id === product.id);
    const old_price_Paragraph = product.old_price ? `<p class="old_price">$${product.old_price}</p>` : '';
    const percent_disc = product.old_price ? `<span class="sale_present">%${Math.floor((product.old_price - product.price) / product.old_price * 100)}</span>` : '';
    
    const productHTML = `
      <div class="swiper-slide product">
        ${percent_disc}
        <div class="img_product">
          <a href=""><img src="${product.img}" alt="${product.name}"></a>
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
          <span class="btn_add_cart ${isInCart ? 'active' : ''}" data-id="${product.id}">
            <i class="fa-solid fa-cart-shopping"></i> ${isInCart ? 'item in cart' : 'add to cart'}
          </span>
          <span class="icon_product" data-product-id="${product.id}">
            <i class="${wishlist.includes(product.id) ? 'fa-solid' : 'fa-regular'} fa-heart" ${wishlist.includes(product.id) ? 'style="color: #ef4444;"' : ''}></i>
          </span>
        </div>
      </div>
    `;
    
    // Add to appropriate container based on category or sale
    let targetContainer = document.getElementById('swiper_item_sale');
    
    if (product.old_price) {
      targetContainer = document.getElementById('swiper_item_sale');
    } else if (product.catetory === 'electronics') {
      targetContainer = document.getElementById('swiper_item_sale_elec');
    } else if (product.catetory === 'appliances') {
      targetContainer = document.getElementById('swiper_item_sale_api');
    } else if (product.catetory === 'mobiles') {
      targetContainer = document.getElementById('swiper_item_sale_mob');
    }
    
    if (targetContainer) {
      targetContainer.innerHTML += productHTML;
    }
  });
  
  // Reinitialize add to cart buttons and wishlist
  initializeAddToCartButtons();
  updateWishlistForFilteredProducts();
}

function initializeAddToCartButtons() {
  fetch("products.json")
    .then(response => response.json())
    .then(data => {
      const addToCartButtons = document.querySelectorAll('.btn_add_cart');
      
      addToCartButtons.forEach(button => {
        // Remove existing listeners to avoid duplicates
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', (event) => {
          const productId = event.target.closest('.btn_add_cart').getAttribute('data-id');
          const selectProduct = data.find(product => product.id == productId);
          
          if (selectProduct) {
            addToCart(selectProduct);
            
            const allMatchingButtons = document.querySelectorAll(`.btn_add_cart[data-id='${productId}']`);
            allMatchingButtons.forEach(btn => {
              btn.classList.add("active");
              btn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> item in cart`;
            });
          }
        });
      });
      
      // Also initialize wishlist icons
      initializeWishlistIcons();
    });
}

// Initialize search on page load
document.addEventListener('DOMContentLoaded', function() {
  const categorySelect = document.getElementById('category');
  if (categorySelect) {
    categorySelect.addEventListener('change', function() {
      const searchInput = document.getElementById('searsh');
      handleSearchInput();
    });
  }
});

    


