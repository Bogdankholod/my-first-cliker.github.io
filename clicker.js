let clickCount = 0; // Лічильник кліків
let dollars = 0; // Кількість доларів
let dollarsPerClick = 1; // Долари за клік
let upgradeCount = 0; // Лічильник покращень
let upgradeCost = 10; // Початкова ціна покращення
let incomePerSecond = 0; // Дохід в секунду
const autoIncomeCost = 3000; // Вартість автодоходу
let promoUsed = false; // Фіксуємо використання промокоду

// Отримуємо елементи з HTML
const clickButton = document.getElementById('clickButton');
const clickCountDisplay = document.getElementById('clickCount');
const dollarsDisplay = document.getElementById('dollars');
const dollarsPerClickDisplay = document.getElementById('dollarsPerClick');
const upgradeButton = document.getElementById('upgradeButton');
const upgradeCountDisplay = document.getElementById('upgradeCount');
const autoIncomeButton = document.getElementById('autoIncomeButton');
const incomePerSecondDisplay = document.getElementById('incomePerSecond');
const promoCodeInput = document.getElementById('promoCodeInput');
const applyPromoButton = document.getElementById('applyPromoButton');

// Функція оновлення відображення
function updateDisplay() {
    clickCountDisplay.textContent = clickCount;
    dollarsDisplay.textContent = dollars;
    dollarsPerClickDisplay.textContent = dollarsPerClick;
    upgradeCountDisplay.textContent = upgradeCount;
    incomePerSecondDisplay.textContent = incomePerSecond;

    if (upgradeCount < 10) {
        upgradeButton.textContent = `Покращити (${upgradeCost}$)`;
    } else {
        upgradeButton.textContent = "Максимальне покращення";
        upgradeButton.disabled = true;
        upgradeButton.style.backgroundColor = "#6c757d";
        upgradeButton.style.cursor = "default";
    }
}

// Натискання на кнопку кліка
clickButton.addEventListener('click', () => {
    clickCount++;
    dollars += dollarsPerClick;
    updateDisplay();
});

// Купівля покращення кліка
upgradeButton.addEventListener('click', () => {
    if (dollars >= upgradeCost && upgradeCount < 10) {
        dollars -= upgradeCost;
        dollarsPerClick += 1;
        upgradeCount++;
        upgradeCost *= 2;
        updateDisplay();
    } else if (upgradeCount >= 10) {
        alert("Ви вже купили всі покращення!");
    } else {
        alert("У вас недостатньо доларів для покращення!");
    }
});

// Купівля автодоходу
autoIncomeButton.addEventListener('click', () => {
    if (dollars >= autoIncomeCost) {
        dollars -= autoIncomeCost;
        incomePerSecond += 1;
        updateDisplay();
    } else {
        alert("У вас недостатньо доларів для автодоходу!");
    }
});

// Автоматичний дохід кожну секунду
setInterval(() => {
    dollars += incomePerSecond;
    updateDisplay();
}, 1000);

// Використання промокоду
applyPromoButton.addEventListener('click', () => {
    const enteredCode = promoCodeInput.value.trim();
    
    if (enteredCode === "Torrent" && !promoUsed) {
        dollars += 100000;
        promoUsed = true;
        alert("Промокод активовано! Ви отримали 100,000$.");
        updateDisplay();
    } else if (promoUsed) {
        alert("Цей промокод вже використано!");
    } else {
        alert("Неправильний промокод!");
    }

    promoCodeInput.value = ""; // Очистка поля
});

