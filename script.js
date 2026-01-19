let state = {
    stars: 0,
    progress: 0,
    currentWorld: 'candy-garden'
};

function changeWorld(world) {
    state.currentWorld = world;
    document.getElementById('game-world').className = world;
    initLevel();
}

function initLevel() {
    const stage = document.getElementById('interactive-stage');
    const prompt = document.getElementById('task-prompt');
    stage.innerHTML = '';

    if (state.currentWorld === 'candy-garden') {
        let a = Math.floor(Math.random() * 4) + 1;
        let b = Math.floor(Math.random() * 4) + 1;
        let total = a + b;
        
        prompt.innerText = `Put ${a} + ${b} Candies in the Basket!`;

        // Create Candy Holding Area
        const candyArea = document.createElement('div');
        candyArea.className = 'candy-container';

        // Create the Basket
        const basket = document.createElement('div');
        basket.className = 'basket-sprite';
        basket.id = 'target-basket';

        for (let i = 0; i < total; i++) {
            const candy = document.createElement('div');
            candy.className = 'candy-sprite';
            candy.innerText = '🍬';
            candy.onclick = () => {
                basket.appendChild(candy);
                checkWin(total);
            };
            candyArea.appendChild(candy);
        }

        stage.appendChild(candyArea);
        stage.appendChild(basket);
    }
}

function checkWin(target) {
    const current = document.getElementById('target-basket').children.length;
    if (current === target) {
        state.stars++;
        state.progress += 20;
        document.getElementById('star-count').innerText = state.stars;
        document.getElementById('progress-fill').style.width = (state.progress % 105) + "%";
        
        document.getElementById('task-prompt').innerText = "YUMMY! CORRECT! 🌸";
        
        setTimeout(() => {
            if (state.progress >= 100) {
                alert("Level Up! Moving to Fruit Shop!");
                changeWorld('fruit-shop');
                state.progress = 0;
            } else {
                initLevel();
            }
        }, 1500);
    }
}

// Initial Load
window.onload = () => initLevel();
