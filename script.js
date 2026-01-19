const state = {
    stars: 0,
    currentTheme: 'candy-garden',
    level: 1,
    targetScore: 5
};

// Start Game
window.onload = () => {
    switchTheme('candy-garden');
};

function switchTheme(theme) {
    state.currentTheme = theme;
    document.getElementById('game-container').className = `theme-${theme}`;
    loadLevel();
}

function loadLevel() {
    const zone = document.getElementById('interactive-zone');
    zone.innerHTML = ''; // Clear previous
    
    if (state.currentTheme === 'candy-garden') {
        setupAddition();
    } else if (state.currentTheme === 'fruit-shop') {
        setupSubtraction();
    }
}

// --- CANDY GARDEN LOGIC ---
function setupAddition() {
    const a = Math.floor(Math.random() * 5) + 1;
    const b = Math.floor(Math.random() * 5) + 1;
    const answer = a + b;

    document.getElementById('question-text').innerText = `Add the Candies: ${a} + ${b}`;

    // Create a target basket
    const targetBasket = document.createElement('div');
    targetBasket.className = 'basket';
    targetBasket.id = 'target-basket';
    targetBasket.ondragover = (e) => e.preventDefault();
    targetBasket.ondrop = handleDrop;

    // Create Candies
    for (let i = 0; i < answer; i++) {
        const candy = document.createElement('span');
        candy.className = 'candy-item';
        candy.innerText = '🍬';
        candy.draggable = true;
        candy.id = `candy-${i}`;
        candy.ondragstart = (e) => e.dataTransfer.setData("text", e.target.id);
        document.getElementById('interactive-zone').appendChild(candy);
    }
    
    document.getElementById('interactive-zone').appendChild(targetBasket);

    function handleDrop(e) {
        e.preventDefault();
        const id = e.dataTransfer.getData("text");
        targetBasket.appendChild(document.getElementById(id));
        
        // Check if basket has correct amount
        const currentInBasket = targetBasket.getElementsByClassName('candy-item').length;
        if (currentInBasket === answer) {
            winRound("🌸");
        }
    }
}

// --- FRUIT SHOP LOGIC (Regrouping Concept) ---

function setupSubtraction() {
    document.getElementById('question-text').innerText = "Regroup the 10s to subtract!";
    const zone = document.getElementById('interactive-zone');

    // Create a 'Ten' bundle
    const tenBlock = document.createElement('div');
    tenBlock.style.cssText = "padding:20px; background:#fb8c00; border-radius:10px; cursor:pointer;";
    tenBlock.innerText = "📦 Ten Apples (Click to Break)";
    
    tenBlock.onclick = () => {
        tenBlock.classList.add('basket-shake');
        setTimeout(() => {
            tenBlock.remove();
            // Create 10 single apples
            for(let i=0; i<10; i++) {
                const apple = document.createElement('span');
                apple.innerText = '🍎';
                apple.style.fontSize = '2rem';
                zone.appendChild(apple);
            }
            document.getElementById('question-text').innerText = "Now remove 3 apples!";
        }, 500);
    };

    zone.appendChild(tenBlock);
}

function winRound(symbol) {
    const zone = document.getElementById('interactive-zone');
    zone.innerHTML = `<div class="flower-bloom">${symbol}</div>`;
    
    state.stars += 1;
    document.getElementById('stars').innerText = state.stars;
    document.getElementById('progress-bar').style.width = (state.stars * 20) + "%";

    setTimeout(loadLevel, 2000);
}
