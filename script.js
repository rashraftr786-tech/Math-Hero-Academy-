const levels = ["Nursery", "LKG", "UKG", "Grade 1", "Grade 2", "Grade 3"];
let currentOp = '';
let currentLevel = 0;
let currentQuestionIndex = 0;
let score = 0;
let correctAnswer = 0;

function showHome() {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById('home-screen').classList.remove('hidden');
}

function showLevels(op) {
    currentOp = op;
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('level-screen').classList.remove('hidden');
    document.getElementById('op-title').innerText = op.toUpperCase();
    
    const container = document.getElementById('level-buttons');
    container.innerHTML = '';
    levels.forEach((lvl, index) => {
        const btn = document.createElement('button');
        btn.className = 'menu-btn';
        btn.innerText = lvl;
        btn.onclick = () => startGame(index);
        container.appendChild(btn);
    });
}

function startGame(lvlIndex) {
    currentLevel = lvlIndex;
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('level-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    nextQuestion();
}

function generateAddition() {
    let n1, n2;
    switch(currentLevel) {
        case 0: n1 = rand(1,3); n2 = rand(1,2); break; // Nursery
        case 1: n1 = rand(1,5); n2 = rand(1,5); break; // LKG
        case 5: n1 = rand(100, 500); n2 = rand(100, 400); break; // Grade 3
        default: n1 = rand(1, 20); n2 = rand(1, 20);
    }
    return { n1, n2, ans: n1 + n2, sym: '+' };
}

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1) + min); }

function nextQuestion() {
    if (currentQuestionIndex >= 15) return endGame();
    
    let q;
    if (currentOp === 'addition') q = generateAddition();
    // (Similar generator functions for subtraction, multiplication, etc.)
    
    correctAnswer = q.ans;
    document.getElementById('question-text').innerHTML = `<h1>${q.n1} ${q.sym} ${q.n2} = ?</h1>`;
    document.getElementById('visual-area').innerHTML = '';
    
    // Add visual objects for lower levels
    if (currentLevel < 2) {
        for(let i=0; i<q.n1; i++) document.getElementById('visual-area').innerHTML += '<span class="visual-obj">🍎</span>';
        document.getElementById('visual-area').innerHTML += '<span> + </span>';
        for(let i=0; i<q.n2; i++) document.getElementById('visual-area').innerHTML += '<span class="visual-obj">🍎</span>';
    }
    
    document.getElementById('current-level-name').innerText = levels[currentLevel];
    document.getElementById('progress-bar').style.width = `${(currentQuestionIndex/15)*100}%`;
    document.getElementById('answer-input').value = '';
    document.getElementById('answer-input').focus();
}

function checkAnswer() {
    const userAns = parseInt(document.getElementById('answer-input').value);
    const container = document.getElementById('game-screen');
    
    if (userAns === correctAnswer) {
        score++;
        document.getElementById('score').innerText = score;
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        currentQuestionIndex++;
        setTimeout(nextQuestion, 1000);
    } else {
        container.classList.add('shake');
        setTimeout(() => container.classList.remove('shake'), 500);
    }
}

function endGame() {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('final-score').innerText = score;
}
