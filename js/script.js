//====================== Обработка нажатия на кастомные чекбоксы ===================

$(".check-label").on("click", function () {
    let isChecked = $(this).children("input").prop("checked");
    if (isChecked) {
        $(this).find(".fakecheck").addClass("checked");
    } else {
        $(this).find(".fakecheck").removeClass("checked");
    }
});


//====================== Обработка нажатия на бургер меню ===================

$(".burger-menu-btn").click(function() {
    $(this).find('.burger_menu').toggleClass('open');
});



//====================== Реализация функционала popup окон ===================

function openPopup(popup) {
    $('.popup').hide();
    $('.overlay').show();
    $('html').css('overflow', 'hidden');
    popup.show();
}
  
function closePopup(closeBtn) {
    $('.overlay').hide();
    closeBtn.parent().hide();
    $('html').css('overflow-y', 'auto');
}

$(document).on('click', '.popup_close', function(e) {
    closePopup($(this));
});
  

$('.popup-account-change-btn').click(function() {
    openPopup($('.popup-account-change'));
});

$('.popup-dept-btn').click(function() {
    openPopup($('.popup-dept'));
});


$('.popup-authorization-btn').click(function() {
    openPopup($('.popup-authorization'));
});

$('.popup-password-recovery-btn').click(function() {
    openPopup($('.popup-password-recovery'));
});



$('.popup-confirmation-code-btn').click(function() {
    openPopup($('.popup-confirmation-code'));
});

$('.popup-provider-btn').click(function() {
    openPopup($('.popup-provider'));
});

$('.popup-item-imgs-btn').click(function() {
    openPopup($('.popup-item-imgs'));
});

$(document).ready(function() {
    $(document).mouseup(function(e) {
        var container = $('.popup-js');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
            $('.overlay').hide();
            $('html').css('overflow-y', 'auto');
        }
    });
});



//====================== Реализация функционала КОРЗИНЫ ===================


// Функция для обновления текста кнопки удаления
function updateDeleteButtonText(isChecked) {
    const deleteButton = $('.cart__items-delete span');
    deleteButton.text(isChecked ? 'Удалить выбранное' : 'Очистить корзину');
}

// Обновите существующий обработчик кнопки "Выбрать всё":
$('.cart__items-check-all').click(function() {
    const isChecked = $(this).find('input').prop('checked');
    $('.cart__item .fakecheck').toggleClass('checked', isChecked);
    $('.cart__items-delete').toggleClass('check', isChecked);
    updateDeleteButtonText(isChecked);
    
    $('.cart__item input[type="checkbox"]')
        .prop('checked', isChecked)
        .trigger('change');
});

// Обновите существующий обработчик отдельных чекбоксов:
$('.cart__item input[type="checkbox"]').change(function() {
    const allChecked = $('.cart__item input[type="checkbox"]:checked').length ===
                       $('.cart__item input[type="checkbox"]').length;
    $('.cart__items-check-all')
        .prop('checked', allChecked)
        .trigger('change');
    
    $(this).siblings('.fakecheck')
           .toggleClass('checked', $(this).prop('checked'));
    
    const anyChecked = $('.cart__item input[type="checkbox"]:checked').length > 0;
    $('.cart__items-delete').toggleClass('check', anyChecked);
    updateDeleteButtonText(anyChecked);
});




$('.cart__items-delete').click(function() {
    $('.cart__item').remove();
});

$('.cart-item-delete').click(function() {
    $(this).closest('.cart__item').remove();
});


$('.cart-item-quantity-add').click(function() {
    let currntValueBlock = $(this).parent().find('span');
    let currntValue = parseInt(currntValueBlock.text());
    let maxValue = $(this).data('max');

    if (currntValue < maxValue) {
        currntValue++;
    }

    currntValueBlock.text(currntValue);
});



$('.cart-item-quantity-remove').click(function() {
    let currntValueBlock = $(this).parent().find('span');
    let currntValue = parseInt(currntValueBlock.text());

    if (currntValue > 1) {
        currntValue--;
    }
    
    currntValueBlock.text(currntValue);
});




//====================== Реализация функционала поля ввода для паролей ===================

$(document).on('click', '.popup-mini form label:has(input[type="password"]) svg', function(e) {
    $(this).parent().find('input').attr('type', 'text');
    $(this).parent().find('svg .cross').hide();
});


$(document).on('click', '.popup-mini form label:has(input[type="text"]) svg', function(e) {
    $(this).parent().find('input').attr('type', 'password');
    $(this).parent().find('svg .cross').show();

});




//====================== Реализация функционала добавления и удаления полей для почты ===================

$(document).on('click', '.settings-profile__input button.add', function(e) {
    const container = $(this).closest('.col');
    const template = `
        <div class="settings-profile__input">
            <input type="email">
            <button class="add">
                <img src="../images/icons/icon-plus.svg" alt="">
            </button>
            <button class="delite">
                <img src="../images/icons/icon-minus.svg" alt="">
            </button>
        </div>
    `;
    
    $(template).appendTo(container);
});



$(document).on('click', '.settings-profile__input button.delite', function() {
    const inputsCount = $('.settings-profile__input').length;
    if (inputsCount > 1) {
        $(this).parent().remove();
    }
});




//====================== Инициализация слайдера с галерей товара в popup окне в корзине ===================


if (document.querySelectorAll('.cartItemSwiper').length) {
    const cartItemSwiper= new Swiper('.cartItemSwiper', {
      loop: true,
      slidesPerView: 1,
      speed: 600,
      centeredSlides: true,  
      spaceBetween: 20,
      keyboard: {
          enabled: true,
          onlyInViewport: false,
        },                      
  
      navigation: {
          nextEl: ".cartItemSwiper-next",
          prevEl: ".cartItemSwiper-prev",
      },
      pagination: {
          el: ".cartItemSwiper-pagination",
          clickable: true,
        },
    })
}


//====================== Инициализация слайдера с сотрудниками на странице контакты ===================


if (document.querySelectorAll('.contactsSwiperOne').length) {
    const contactsSwiperOne = new Swiper('.contactsSwiperOne', {
        loop: false,
        slidesPerView: 'auto',
        speed: 600,
        spaceBetween: 28,
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
        navigation: {
            nextEl: ".contactsSwiperOne-next",
            prevEl: ".contactsSwiperOne-prev",
        },
        watchSlidesProgress: true,
        
        on: {
            init: function () {
                this.slides.forEach(slide => {
                    const slideElement = slide.querySelector('.swiper-slide');
                    if (slideElement) {
                        slideElement.classList.toggle('swiper-slide-visible', 
                            slideElement.classList.contains('swiper-slide-active'));
                    }
                });
            },
            slideChangeTransitionStart: function () {
                this.slides.forEach(slide => {
                    const slideElement = slide.querySelector('.swiper-slide');
                    if (slideElement) {
                        slideElement.classList.toggle('swiper-slide-visible', 
                            slideElement.classList.contains('swiper-slide-active'));
                    }
                });
            }
        }
    });
}


if (document.querySelectorAll('.contactsSwiperTwo').length) {
    const contactsSwiperTwo = new Swiper('.contactsSwiperTwo', {
        loop: false,
        slidesPerView: 'auto',
        speed: 600,
        spaceBetween: 28,
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
        navigation: {
            nextEl: ".contactsSwiperTwo-next",
            prevEl: ".contactsSwiperTwo-prev",
        },
        watchSlidesProgress: true,
        
        on: {
            init: function () {
                this.slides.forEach(slide => {
                    const slideElement = slide.querySelector('.swiper-slide');
                    if (slideElement) {
                        slideElement.classList.toggle('swiper-slide-visible', 
                            slideElement.classList.contains('swiper-slide-active'));
                    }
                });
            },
            slideChangeTransitionStart: function () {
                this.slides.forEach(slide => {
                    const slideElement = slide.querySelector('.swiper-slide');
                    if (slideElement) {
                        slideElement.classList.toggle('swiper-slide-visible', 
                            slideElement.classList.contains('swiper-slide-active'));
                    }
                });
            }
        }
    });
}

if (document.querySelectorAll('.contactsSwiperThree').length) {
    const contactsSwiperThree = new Swiper('.contactsSwiperThree', {
        loop: false,
        slidesPerView: 'auto',
        speed: 600,
        spaceBetween: 28,
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
        navigation: {
            nextEl: ".contactsSwiperThree-next",
            prevEl: ".contactsSwiperThree-prev",
        },
        watchSlidesProgress: true,
        
        on: {
            init: function () {
                this.slides.forEach(slide => {
                    const slideElement = slide.querySelector('.swiper-slide');
                    if (slideElement) {
                        slideElement.classList.toggle('swiper-slide-visible', 
                            slideElement.classList.contains('swiper-slide-active'));
                    }
                });
            },
            slideChangeTransitionStart: function () {
                this.slides.forEach(slide => {
                    const slideElement = slide.querySelector('.swiper-slide');
                    if (slideElement) {
                        slideElement.classList.toggle('swiper-slide-visible', 
                            slideElement.classList.contains('swiper-slide-active'));
                    }
                });
            }
        }
    });
}



//====================== Инициализация слайдера договоров на странице "Контакты" ===================


if (document.querySelectorAll('.agreementIPSwiper').length) {
    const agreementIPSwiper= new Swiper('.agreementIPSwiper', {
      loop: true,
      speed: 600,
      centeredSlides: false,  
      spaceBetween: 36,
      slidesPerView: 4,
      keyboard: {
          enabled: true,
          onlyInViewport: false,
    },                      
  
      navigation: {
          nextEl: ".agreementIPSwiper-next",
          prevEl: ".agreementIPSwiper-prev",
      },
    })
}

if (document.querySelectorAll('.agreementOOOSwiper').length) {
    const agreementOOOSwiper= new Swiper('.agreementOOOSwiper', {
      loop: true,
      speed: 600,
      centeredSlides: false,  
      spaceBetween: 36,
      slidesPerView: 4,
      keyboard: {
          enabled: true,
          onlyInViewport: false,
    },                      
  
      navigation: {
          nextEl: ".agreementOOOSwiper-next",
          prevEl: ".agreementOOOSwiper-prev",
      },
    })
}


$(document).on('click', '.contacts-agreement__btns button', function() {
    $('.contacts-agreement__btns button').removeClass('active');
    $(this).toggleClass('active');

    let sliderType = $(this).data('type');

    $(`.contacts-agreement__slider`).removeClass('active');
    $(`.contacts-agreement__slider[data-type="${sliderType}"]`).addClass('active');
});




//====================== Функционал страницы "Регистранция" ===================


$(document).on('click', '.registration-retail', function() {
    $('.registration__opt').removeClass('open');
    $('.registration__retail').addClass('open');

    $('.registration__type-selector:has(.registration-retail)').removeClass('opacity');

    $('.registration__type-selector:not(:has(.registration-retail))').addClass('opacity');
});

$(document).on('click', '.registration-opt', function() {
    $('.registration__retail').removeClass('open');
    $('.registration__opt').addClass('open');

    $('.registration__type-selector:has(.registration-opt)').removeClass('opacity');

    $('.registration__type-selector:not(:has(.registration-opt))').addClass('opacity');

});


$(document).on('click', '.registration__opt-selector', function() {
    $('.registration__opt-selector').removeClass('active');
    $(this).toggleClass('active');

    let formType = $(this).data('type');

    $(`.registration__opt form`).removeClass('active');
    $(`.registration__opt form[data-type="${formType}"]`).addClass('active');
});

