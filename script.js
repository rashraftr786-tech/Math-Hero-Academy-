// Game State Manager
let gameState = {
    stars: 0,
    currentZone: 'home',
    levels: {
        addition: 1,
        subtraction: 1,
        multiplication: 1,
        division: 1
    }
};

// Main Navigation: Responds to Button Clicks
function startZone(zone) {
    gameState.currentZone = zone;
    
    // UI Transitions
    document.getElementById('home-page').classList.add('hidden');
    document.getElementById('game-stage').classList.remove('hidden');
    document.getElementById('success-overlay').classList.add('hidden');
    
    // Set Theme Class for Visuals
    document.getElementById('master-container').className = 'theme-' + zone;
    
    generateChallenge();
}

function showHome() {
    document.getElementById('home-page').classList.remove('hidden');
    document.getElementById('game-stage').classList.add('hidden');
    document.getElementById('master-container').className = '';
}

// Level Logic Generator
function generateChallenge() {
    const area = document.getElementById('play-area');
    const taskText = document.getElementById('task-text');
    const zone = gameState.currentZone;
    const currentLevel = gameState.levels[zone];
    
    area.innerHTML = ''; // Clear the stage completely
    
    let num1, num2, target, icon, operator;

    // Difficulty Scaling Logic
    switch(zone) {
        case 'addition':
            num1 = Math.floor(Math.random() * (currentLevel * 3)) + 1;
            num2 = Math.floor(Math.random() * 5) + 1;
            target = num1 + num2;
            icon = '🍬';
            operator = '+';
            break;
        case 'subtraction':
            num1 = Math.floor(Math.random() * 5) + (currentLevel + 5);
            num2 = Math.floor(Math.random() * currentLevel) + 2;
            target = num1 - num2;
            icon = '🍎';
            operator = '-';
            break;
        // Add cases for multiplication/division here
    }

    taskText.innerText = `Level ${currentLevel}: ${num1} ${operator} ${num2} = ?`;

    renderPlaySpace(area, icon, target);
}

// Responsive Grid Rendering
function renderPlaySpace(area, icon, target) {
    const itemContainer = document.createElement('div');
    itemContainer.className = 'item-source-grid'; // Defined in CSS for wrapping

    const basket = document.createElement('div');
    basket.className = 'target-basket';
    basket.id = 'active-basket';

    // Create the items for the child to click/tap
    for (let i = 0; i < target; i++) {
        const item = document.createElement('div');
        item.className = 'math-item';
        item.innerText = icon;
        item.onclick = () => {
            basket.appendChild(item);
            checkWin(target);
        };
        itemContainer.appendChild(item);
    }

    area.appendChild(itemContainer);
    area.appendChild(basket);
}

function checkWin(target) {
    const basket = document.getElementById('active-basket');
    if (basket.children.length === target) {
        setTimeout(() => {
            document.getElementById('success-overlay').classList.remove('hidden');
            gameState.stars += 10;
            document.getElementById('star-count').innerText = gameState.stars;
            
            // Advance the level for this specific operation
            gameState.levels[gameState.currentZone]++;
        }, 500);
    }
}

function nextLevel() {
    document.getElementById('success-overlay').classList.add('hidden');
    generateChallenge(); // Loads the next, harder level
}
