let display = document.getElementById('display');
let historyDiv = document.getElementById('history');
let lastButtonType = null; 
let history = []; 

function addToDisplay(value) {
    if (isOperator(value)) {
        if (lastButtonType === 'operator') return;
        lastButtonType = 'operator';
    } else if (value === 'AC') {
        clearDisplay();
        return;
    } else if (value === '=') {
        calculateResult();
        return;
    } else {
        lastButtonType = 'number'; 
    }

    display.innerText += value;
}

function clearDisplay() {
    display.innerText = '';
    lastButtonType = null; 
}

function calculateResult() {
    try {
        let result = eval(display.innerText);
        history.push(display.innerText + " = " + result); 
        display.innerText = result;
        lastButtonType = null; 
    } catch (error) {
        display.innerText = 'Error';
        lastButtonType = null; 
    }
}

function isOperator(value) {
    return ['+', '-', '*', '/'].includes(value);
}

function toggleHistory() {
    historyDiv.classList.toggle('hidden');
    if (!historyDiv.classList.contains('hidden')) {
        showHistory();
    }
}

function showHistory() {
    let historyItemsDiv = document.getElementById('history-items');
    historyItemsDiv.innerHTML = ''; 
    history.forEach(item => {
        let historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.innerText = item;
        historyItemsDiv.appendChild(historyItem);
    });
}

let calculator = document.getElementById('calculator');
let isDragging = false;
let offsetX, offsetY;

calculator.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - calculator.getBoundingClientRect().left;
    offsetY = e.clientY - calculator.getBoundingClientRect().top;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        calculator.style.left = (e.clientX - offsetX) + 'px';
        calculator.style.top = (e.clientY - offsetY) + 'px';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});
