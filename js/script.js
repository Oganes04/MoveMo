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

$(document).ready(function() {
    $(document).mouseup(function(e) {
        var container = $('.popup-mini');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
            $('.overlay').hide();
            container.hide();
            $('html').css('overflow-y', 'auto');
        }
    });
});


//====================== Реализация функционала КОРЗИНЫ ===================


// Обработчик клика по кнопке "Выбрать всё"
$('.cart__items-check-all').click(function() {
    const isChecked = $(this).find('input').prop('checked');
    
    // Применяем состояние ко всем фейковым чекбоксам
    $('.cart__item .fakecheck').toggleClass('checked', isChecked);
    
    // Синхронизируем состояния реальных чекбоксов
    $('.cart__item input[type="checkbox"]')
        .prop('checked', isChecked)
        .trigger('change');
});

// Обработчики для отдельных чекбоксов
$('.cart__item input[type="checkbox"]').change(function() {
    const allChecked = $('.cart__item input[type="checkbox"]:checked').length === 
                      $('.cart__item input[type="checkbox"]').length;
    
    // Обновляем состояние кнопки "Выбрать всё"
    $('.cart__items-check-all')
        .prop('checked', allChecked)
        .trigger('change');
    
    // Обновляем классы у fakecheck элементов
    $(this).siblings('.fakecheck')
        .toggleClass('checked', $(this).prop('checked'));
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