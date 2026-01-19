const state = { stars: 0, world: 'candy-garden' };

function switchWorld(w) {
    state.world = w;
    document.getElementById('game-container').className = `theme-${w}`;
    loadGame();
}

function loadGame() {
    const area = document.getElementById('play-area');
    const task = document.getElementById('task-text');
    area.innerHTML = '';

    if (state.world === 'candy-garden') {
        const a = 3, b = 2;
        task.innerText = `Add: ${a} + ${b}`;

        // Create Basket
        const basket = document.createElement('div');
        basket.className = 'basket-zone';
        basket.id = 'main-basket';
        
        // Create Candies container
        const candyBox = document.createElement('div');
        candyBox.style.display = 'flex';

        for(let i=0; i<(a+b); i++) {
            const c = document.createElement('div');
            c.className = 'candy-obj';
            c.innerText = '🍬';
            c.onclick = () => {
                basket.appendChild(c);
                checkWin(a+b);
            };
            candyBox.appendChild(c);
        }

        area.appendChild(candyBox);
        area.appendChild(basket);
    }
}

function checkWin(target) {
    const count = document.getElementById('main-basket').children.length;
    if (count === target) {
        state.stars++;
        document.getElementById('star-count').innerText = state.stars;
        document.getElementById('task-text').innerText = "Correct! 🌸";
        setTimeout(loadGame, 2000);
    }
}

window.onload = loadGame;
