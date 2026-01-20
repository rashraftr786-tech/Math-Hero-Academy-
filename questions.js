function generateAdditionQuestions(level) {
    let q = [];

    for (let i = 0; i < 15; i++) {
        let a, b;

        switch (level) {
            case 1: a = Math.floor(Math.random()*6); b = Math.floor(Math.random()*6); break;
            case 2: a = Math.floor(Math.random()*10); b = Math.floor(Math.random()*10); break;
            case 3: a = Math.floor(Math.random()*10); b = Math.floor(Math.random()*10); break;
            case 4: a = Math.floor(Math.random()*20); b = Math.floor(Math.random()*20); break;
            case 5: a = Math.floor(Math.random()*90)+10; b = Math.floor(Math.random()*90)+10; break;
            case 6: a = Math.floor(Math.random()*900)+100; b = Math.floor(Math.random()*900)+100; break;
        }

        q.push({
            a: a,
            b: b,
            answer: a + b,
            wrong1: a + b + (Math.floor(Math.random()*5)+1),
            wrong2: a + b - (Math.floor(Math.random()*5)+1)
        });
    }
    return q;
}            
