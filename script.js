/* Ensure the basket grows and wraps items properly */
.target-basket {
    width: 320px;
    min-height: 180px; /* Allow it to grow if needed */
    background: rgba(255, 255, 255, 0.3);
    border: 8px dashed white;
    border-radius: 20px 20px 60px 60px;
    display: flex;
    flex-wrap: wrap; /* THIS FIXES THE COLUMN ISSUE */
    justify-content: center;
    align-content: flex-start;
    padding: 15px;
    gap: 10px;
    overflow: visible;
}

/* Make items slightly smaller so more fit in the basket */
.math-item {
    font-size: 3.5rem; 
    cursor: pointer;
    transition: transform 0.2s;
    display: inline-block;
}

/* Specific background for Fruit Forest */
.theme-subtraction #game-stage {
    background: linear-gradient(#a1887f, #4caf50); /* Brown to Green */
}
