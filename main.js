let canvas = document.getElementById("gameCanvas");
let engine = new BABYLON.Engine(canvas, true);

let currentScene = null;
let currentWorld = "";
let currentLevel = 1;
let questionIndex = 0;
let score = 0;
let questionSet = [];

function loadWorld(worldName) {
    if (worldName === "addition") {
        currentScene = createAdditionWorld(engine, canvas);
        currentWorld = "addition";
    }
}

function loadLevel(level) {
    currentLevel = level;
    questionSet = generateAdditionQuestions(level); 
    questionIndex = 0;
    score = 0;
}

function nextQuestion() {
    if (questionIndex >= 15) {
        showLevelComplete(score);
        return;
    }
    spawnQuestion3D(currentScene, questionSet[questionIndex]);
    questionIndex++;
}

engine.runRenderLoop(() => {
    if (currentScene) currentScene.render();
});

window.addEventListener("resize", () => {
    engine.resize();
});
