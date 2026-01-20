let menuDiv = document.getElementById("menu");

function showMainMenu() {
    menuDiv.innerHTML = `
        <div class="button" onclick="showWorldMenu()">Start 3D Math Game</div>
    `;
}

function showWorldMenu() {
    menuDiv.innerHTML = `
        <div class="button" onclick="startWorld('addition')">Addition World</div>
    `;
}

function startWorld(world) {
    menuDiv.innerHTML = "";
    loadWorld(world);
    showLevelMenu();
}

function showLevelMenu() {
    menuDiv.innerHTML = `
        <div class="button" onclick="startLevel(1)">Nursery</div>
        <div class="button" onclick="startLevel(2)">LKG</div>
        <div class="button" onclick="startLevel(3)">UKG</div>
        <div class="button" onclick="startLevel(4)">Grade 1</div>
        <div class="button" onclick="startLevel(5)">Grade 2</div>
        <div class="button" onclick="startLevel(6)">Grade 3</div>
    `;
}

function startLevel(level) {
    menuDiv.innerHTML = "";
    loadLevel(level);
    nextQuestion();
}

function showLevelComplete(score) {
    menuDiv.innerHTML = `
        <h1>Level Complete!</h1>
        <h2>Score: ${score}/15</h2>
        <div class="button" onclick="showWorldMenu()">Back to Worlds</div>
    `;
}
