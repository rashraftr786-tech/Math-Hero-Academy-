let currentScore = 0;
let level = 1;

function showHome() {
    document.getElementById('home-page').classList.remove('hidden');
    document.getElementById('game-stage').classList.add('hidden');
}

function startZone(zone) {
    document.getElementById('home-page').classList.add('hidden');
    document.getElementById('game-stage').classList.remove('hidden');
    document.getElementById('game-stage').className = 'screen theme-' + zone;
    
    setupLevel(zone);
}

function setupLevel(zone) {
    const area = document.getElementById('play-area');
    const task = document.getElementById('task-text');
    area.innerHTML = '';

    if (zone === 'addition') {
        task.innerText = "Rainbow Land: Add 3 + 2";
        const target = 5;
        
        // Create Basket
        const basket = document.createElement('div');
        basket.className = 'target-basket';
        basket.id = 'basket';

        // Create 5 Bouncing Numbers/Items
        for(let i=0; i<target; i++) {
            const item = document.createElement('div');
            item.className = 'math-item';
            item.innerText = '🍎'; // Can change based on level
            item.onclick = () => {
                basket.appendChild(item);
                if(basket.children.length === target) triggerWin();
            };
            area.appendChild(item);
        }
        area.appendChild(basket);
    }
}

function triggerWin() {
    document.getElementById('success-overlay').classList.remove('hidden');
    currentScore += 10;
    document.getElementById('star-count').innerText = currentScore;
    document.getElementById('progress-fill').style.width = (currentScore % 100) + '%';
}

function nextLevel() {
    document.getElementById('success-overlay').classList.add('hidden');
    // Logic to increment level difficulty...
    showHome(); 
}
