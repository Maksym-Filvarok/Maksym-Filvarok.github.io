document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const cartCountElement = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.product .btn:not(.disabled)');
    const cartLink = document.querySelector('.cart-link');
    const quantityModal = document.getElementById('quantityModal');
    const confirmModal = document.getElementById('confirmModal');
    const emptyCartModal = document.getElementById('emptyCartModal');
    const quantityDisplay = document.getElementById('quantityDisplay');
    const quantityMinusBtn = document.getElementById('quantityMinus');
    const quantityPlusBtn = document.getElementById('quantityPlus');
    const addToCartModalBtn = document.getElementById('addToCartModalBtn');
    const continueShoppingBtn = document.getElementById('continueShoppingBtn');
    const closeButtons = document.querySelectorAll('.close');
    
    // Текущий выбранный товар
    let currentProduct = null;
    let currentQuantity = 1;
    
    // Функция для обновления счетчика корзины
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const uniqueItems = new Set(cart.map(item => item.id)).size;
        cartCountElement.textContent = uniqueItems;
    }
    
    // Инициализация счетчика корзины
    updateCartCount();
    
    // Обработчик клика по кнопке "В корзину"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productElement = this.closest('.product');
            currentProduct = {
                id: productElement.dataset.id,
                name: productElement.dataset.name,
                price: parseFloat(productElement.dataset.price)
            };
            
            // Сброс количества к 1
            currentQuantity = 1;
            quantityDisplay.textContent = currentQuantity;
            
            quantityModal.style.display = 'block';
        });
    });
    
    // Обработчик уменьшения количества
    quantityMinusBtn.addEventListener('click', function() {
        if (currentQuantity > 1) {
            currentQuantity--;
            quantityDisplay.textContent = currentQuantity;
        }
    });
    
    // Обработчик увеличения количества
    quantityPlusBtn.addEventListener('click', function() {
        if (currentQuantity < 99) {
            currentQuantity++;
            quantityDisplay.textContent = currentQuantity;
        }
    });
    
    // Обработчик добавления товара в корзину из модального окна
    addToCartModalBtn.addEventListener('click', function() {
        // Получаем текущую корзину из localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Проверяем, есть ли уже такой товар в корзине
        const existingProductIndex = cart.findIndex(item => item.id === currentProduct.id);
        
        if (existingProductIndex !== -1) {
            // Если товар уже есть, увеличиваем количество
            cart[existingProductIndex].quantity += currentQuantity;
        } else {
            // Если товара нет, добавляем новый
            cart.push({
                ...currentProduct,
                quantity: currentQuantity
            });
        }
        
        // Сохраняем корзину в localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Обновляем счетчик корзины
        updateCartCount();
        
        // Закрываем модальное окно выбора количества
        quantityModal.style.display = 'none';
        
        // Показываем модальное окно подтверждения
        confirmModal.style.display = 'block';
    });
    
    // Обработчик клика по ссылке корзины
    cartLink.addEventListener('click', function(e) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (cart.length === 0) {
            e.preventDefault();
            emptyCartModal.style.display = 'block';
        }
        // Если в корзине есть товары, переход происходит автоматически по ссылке
    });
    
    // Обработчик продолжения покупок
    continueShoppingBtn.addEventListener('click', function() {
        confirmModal.style.display = 'none';
    });
    
    // Закрытие модальных окон
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });
    
    // Закрытие модальных окон при клике вне их
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Обработчики для стрелок слайдера
    const swipeLeft = document.querySelector('.swipe_left');
    const swipeRight = document.querySelector('.swipe_right');
    const catalogContainer = document.querySelector('.catalog-container');
    
    swipeLeft?.addEventListener('click', function() {
        catalogContainer.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });
    
    swipeRight?.addEventListener('click', function() {
        catalogContainer.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });
});