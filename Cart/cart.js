document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Функция для форматирования цены
    function formatPrice(price) {
        return price.toFixed(2);
    }
    
    // Функция для отображения товаров в корзине
    function displayCartItems() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 40px;">
                        <h3>Ваша корзина порожня</h3>
                        <p>Додайте товари з каталогу</p>
                    </td>
                </tr>
            `;
            cartTotalElement.textContent = '0.00 грн';
            checkoutBtn.disabled = true;
            checkoutBtn.style.opacity = '0.5';
            return;
        }
        
        checkoutBtn.disabled = false;
        checkoutBtn.style.opacity = '1';
        
        let total = 0;
        let cartHTML = '';
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            cartHTML += `
                <tr data-id="${item.id}">
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${formatPrice(item.price)} грн</td>
                    <td>
                        <div class="quantity-controls">
                            <button class="quantity-btn minus-btn">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn plus-btn">+</button>
                        </div>
                    </td>
                    <td>${formatPrice(itemTotal)} грн</td>
                    <td>
                        <button class="delete-btn">Видалити</button>
                    </td>
                </tr>
            `;
        });
        
        cartItemsContainer.innerHTML = cartHTML;
        cartTotalElement.textContent = `${formatPrice(total)} грн`;
        
        // Добавляем обработчики событий для кнопок
        addCartItemEventListeners();
    }
    
    // Функция для добавления обработчиков событий к элементам корзины
    function addCartItemEventListeners() {
        // Кнопки удаления
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const row = this.closest('tr');
                const productId = row.dataset.id;
                
                removeFromCart(productId);
            });
        });
        
        // Кнопки уменьшения количества
        document.querySelectorAll('.minus-btn').forEach(button => {
            button.addEventListener('click', function() {
                const quantityDisplay = this.nextElementSibling;
                const currentValue = parseInt(quantityDisplay.textContent);
                
                if (currentValue > 1) {
                    quantityDisplay.textContent = currentValue - 1;
                    updateCartQuantity(this);
                }
            });
        });
        
        // Кнопки увеличения количества
        document.querySelectorAll('.plus-btn').forEach(button => {
            button.addEventListener('click', function() {
                const quantityDisplay = this.previousElementSibling;
                const currentValue = parseInt(quantityDisplay.textContent);
                
                if (currentValue < 99) {
                    quantityDisplay.textContent = currentValue + 1;
                    updateCartQuantity(this);
                }
            });
        });
    }
    
    // Функция для удаления товара из корзины
    function removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }
    
    // Функция для обновления количества товара
    function updateCartQuantity(element) {
        const row = element.closest('tr');
        const productId = row.dataset.id;
        const quantityDisplay = row.querySelector('.quantity-display');
        const newQuantity = parseInt(quantityDisplay.textContent);
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productIndex = cart.findIndex(item => item.id === productId);
        
        if (productIndex !== -1) {
            cart[productIndex].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
        }
    }
    
    // Обработчик кнопки "Оплатити"
    checkoutBtn.addEventListener('click', function() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (cart.length === 0) {
            alert('Ваша корзина порожня');
            return;
        }
        
        // Здесь обычно идет отправка данных на сервер
        // Для демонстрации просто очистим корзину
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        alert(`Дякуємо за замовлення! Сума до сплати: ${formatPrice(total)} грн\n\nПісля сплати наш менеджер зв'яжеться з вами.`);
        
        // Очищаем корзину после "оплаты"
        localStorage.removeItem('cart');
        displayCartItems();
    });
    
    // Инициализация отображения корзины
    displayCartItems();
});