const gameState = {
    stars: 0,
    progress: 0,
    currentWorld: 'candy-garden'
};

function switchWorld(world) {
    gameState.currentWorld = world;
    document.getElementById('game-container').className = `theme-${world}`;
    initLevel();
}

function initLevel() {
    const playArea = document.getElementById('play-area');
    const instruction = document.getElementById('task-instruction');
    playArea.innerHTML = '';

    if (gameState.currentWorld === 'candy-garden') {
        setupAddition(instruction, playArea);
    } else if (gameState.currentWorld === 'fruit-shop') {
        setupSubtraction(instruction, playArea);
    }
}

// LEVEL 1: Candy Garden Addition
function setupAddition(instruction, area) {
    const a = 2, b = 3;
    instruction.innerText = `Move ${a} + ${b} candies into the basket!`;

    const basket = document.createElement('div');
    basket.className = 'basket-zone';
    basket.id = 'basket';
    basket.ondragover = (e) => e.preventDefault();
    basket.ondrop = (e) => {
        const id = e.dataTransfer.getData("text");
        basket.appendChild(document.getElementById(id));
        checkScore(basket, a + b);
    };

    // Create 5 Huge Candies
    for(let i=0; i < (a+b); i++) {
        const candy = document.createElement('div');
        candy.className = 'game-object';
        candy.innerText = '🍬';
        candy.draggable = true;
        candy.id = 'c' + i;
        candy.ondragstart = (e) => e.dataTransfer.setData("text", e.target.id);
        area.appendChild(candy);
    }
    area.appendChild(basket);
}

// LEVEL 3: Fruit Shop Subtraction (Borrowing)
function setupSubtraction(instruction, area) {
    instruction.innerText = "Click the '10' box to break it into small apples!";
    
    const tenBox = document.createElement('div');
    tenBox.className = 'game-object';
    tenBox.style.background = '#E67E22';
    tenBox.style.padding = '20px';
    tenBox.style.borderRadius = '15px';
    tenBox.innerText = '📦 10';

    tenBox.onclick = () => {
        tenBox.style.display = 'none';
        // Visual Regrouping: 10 apples appear
        for(let i=0; i<10; i++) {
            const apple = document.createElement('div');
            apple.className = 'game-object bloom-animation';
            apple.innerText = '🍎';
            apple.onclick = () => apple.remove(); // Child 'eats' the apple to subtract
            area.appendChild(apple);
        }
        instruction.innerText = "Subtraction! Tap the apples to take them away.";
    };
    area.appendChild(tenBox);
}

function checkScore(container, target) {
    const count = container.getElementsByClassName('game-object').length;
    if (count === target) {
        // Success Sensory Feedback
        container.innerHTML = '<div class="game-object bloom-animation">🌸</div>';
        gameState.stars += 1;
        gameState.progress += 20;
        document.getElementById('star-count').innerText = gameState.stars;
        document.getElementById('progress-bar').style.width = gameState.progress + '%';
        
        setTimeout(() => {
            alert("Excellent Work!");
            initLevel();
        }, 1000);
    }
}

// Initialize on Load
window.onload = () => switchWorld('candy-garden');
