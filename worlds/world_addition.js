function createAdditionWorld(engine, canvas) {

    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("cam",
        Math.PI/2, Math.PI/2.5, 20, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    new BABYLON.HemisphericLight("light1",
        new BABYLON.Vector3(1, 1, 0), scene);

    const ground = BABYLON.MeshBuilder.CreateGround("ground",
        { width: 30, height: 30 }, scene);
    ground.material = new BABYLON.StandardMaterial("gmat", scene);
    ground.material.diffuseColor = new BABYLON.Color3(0.8, 1, 0.8);

    return scene;
}

// Spawn 3D Question + Answer Cubes
function spawnQuestion3D(scene, q) {

    scene.meshes.filter(m => m.name.includes("ans")).forEach(m=>m.dispose());

    let y = 2;

    let textPlane = BABYLON.MeshBuilder.CreatePlane("question", 
        {size:4}, scene);
    textPlane.position.y = 5;

    let textTexture = new BABYLON.DynamicTexture("dynamic texture", 
        {width:512, height:256}, scene);
    textPlane.material = new BABYLON.StandardMaterial("m", scene);
    textPlane.material.diffuseTexture = textTexture;

    textTexture.drawText(
        `${q.a} + ${q.b} = ?`,
        50, 150, "bold 80px Comic Sans MS", "black", "white"
    );

    let answers = [
        {val:q.answer, correct:true},
        {val:q.wrong1, correct:false},
        {val:q.wrong2, correct:false}
    ];

    BABYLON.Tools.Shuffle(answers);

    let xPos = [-6, 0, 6];

    answers.forEach((ans, i)=>{
        let cube = BABYLON.MeshBuilder.CreateBox("ans"+i, {size:2}, scene);
        cube.position = new BABYLON.Vector3(xPos[i], y, 0);

        cube.material = new BABYLON.StandardMaterial("mat", scene);
        cube.material.diffuseColor = ans.correct ?
            new BABYLON.Color3(0.4, 1, 0.4) :
            new BABYLON.Color3(1, 0.6, 0.6);

        cube.actionManager = new BABYLON.ActionManager(scene);

        cube.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPickTrigger,
                function(){
                    if(ans.correct){
                        score++;
                        nextQuestion();
                    } else {
                        cube.material.diffuseColor = new BABYLON.Color3(1,0,0);
                    }
                }
            )
        );

        // Floating animation
        scene.registerBeforeRender(()=>{
            cube.position.y = y + Math.sin(Date.now()/400)*0.3;
        });
    });

}
