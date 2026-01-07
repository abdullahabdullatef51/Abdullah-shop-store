 var swiper = new Swiper(".slide-swiper", {
      pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
        clickable: true
      },
      autoplay:{
        delay:3000,
        disableOnInteraction: false,
      },
      loop:true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      speed: 800
    });


    // Responsive product slider
    var productSwiper = new Swiper(".slider_product", {
      slidesPerView: 5,
      spaceBetween: 20,
      autoplay:{
         delay:3000,
         disableOnInteraction: false,
      },
      navigation:{
        nextEl:".swiper-button-next",
        prevEl:".swiper-button-prev"
      },
      loop:true,
      speed: 600,
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 15
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 15
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 20
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 20
        }
      }
    });
