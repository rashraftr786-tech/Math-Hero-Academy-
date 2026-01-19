let currentScore = 0;
let gameState = {
    world: 'home',
    targetValue: 0,
    currentCount: 0
};

function startZone(zone) {
    gameState.world = zone;
    gameState.currentCount = 0; // Reset count
    
    document.getElementById('home-page').classList.add('hidden');
    document.getElementById('game-stage').classList.remove('hidden');
    
    // Update Theme Class
    const container = document.getElementById('master-container');
    container.className = 'theme-' + zone;

    setupLevel(zone);
}

function setupLevel(zone) {
    const area = document.getElementById('play-area');
    const task = document.getElementById('task-text');
    area.innerHTML = ''; // COMPLETELY CLEAR THE STAGE

    if (zone === 'addition') {
        const a = 3, b = 2;
        gameState.targetValue = a + b;
        task.innerText = `🌈 Rainbow Land: ${a} + ${b} = ?`;
        createGameElements(area, '🍬', gameState.targetValue);
    } 
    else if (zone === 'subtraction') {
        const total = 10, takeAway = 3;
        gameState.targetValue = total - takeAway;
        task.innerText = `🍎 Fruit Forest: 10 - 3 = ?`;
        
        // For subtraction, we show the REMAINING fruits needed
        createGameElements(area, '🍎', gameState.targetValue);
    }
}

function createGameElements(area, icon, target) {
    // Create the items to be clicked
    const itemContainer = document.createElement('div');
    itemContainer.style.display = 'flex';
    itemContainer.style.flexWrap = 'wrap';
    itemContainer.style.justifyContent = 'center';

    const basket = document.createElement('div');
    basket.className = 'target-basket';
    basket.id = 'main-basket';

    for (let i = 0; i < target; i++) {
        const item = document.createElement('div');
        item.className = 'math-item';
        item.innerText = icon;
        item.onclick = () => {
            basket.appendChild(item);
            checkWin();
        };
        itemContainer.appendChild(item);
    }

    area.appendChild(itemContainer);
    area.appendChild(basket);
}

function checkWin() {
    const inBasket = document.getElementById('main-basket').children.length;
    if (inBasket === gameState.targetValue) {
        setTimeout(triggerWin, 500);
    }
}

function triggerWin() {
    document.getElementById('success-overlay').classList.remove('hidden');
    currentScore += 10;
    document.getElementById('star-count').innerText = currentScore;
}
