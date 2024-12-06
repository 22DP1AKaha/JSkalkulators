let display = document.getElementById('display');
let historyDiv = document.getElementById('history');
let history = [];
let lastButtonType = null;

// Add value to the display
function addToDisplay(value) {
    if (isOperator(value)) {
        if (lastButtonType === 'operator') return;
        lastButtonType = 'operator';
    } else {
        lastButtonType = 'number';
    }
    display.innerText += value;
}

// Clear the display
function clearDisplay() {
    display.innerText = '';
    lastButtonType = null;
}

// Calculate and display the result
// function calculateResult() {
//     try {
//         let result = eval(display.innerText);
//         history.push(`${display.innerText} = ${result}`); // Add to history
//         display.innerText = result;
//         lastButtonType = null;
//     } catch (error) {
//         display.innerText = 'Error';
//         lastButtonType = null;
//     }
// }

function calculateResult() {
    try {
        let expression = display.innerText;

        // Handling factorial (!)
        if (expression.includes('!')) {
            let factorialIndex = expression.indexOf('!');
            let numBeforeFactorial = expression.substring(0, factorialIndex).trim();

            // Check if there's a valid number before the factorial
            if (!isNaN(numBeforeFactorial)) {
                let result = factorial(parseInt(numBeforeFactorial));
                expression = result.toString();
            } else {
                throw new Error("Invalid factorial expression");
            }
        }

        // Handling exponentiation (^)
        if (expression.includes('^')) {
            expression = expression.replace(/\^/g, '**');
        }

        // Handling square root (√)
        if (expression.includes('√')) {
            let numBeforeSqrt = expression.replace('√', '');
            if (!isNaN(numBeforeSqrt)) {
                expression = `Math.sqrt(${numBeforeSqrt})`;
            } else {
                throw new Error("Invalid square root expression");
            }
        }

        // Now evaluate the expression (with adjusted operations)
        let result = eval(expression);
        
        // Push to history and update the display
        history.push(`${display.innerText} = ${result}`);
        display.innerText = result;

        // Reset the lastButtonType for future interactions
        lastButtonType = null;
    } catch (error) {
        // If there's an error (invalid expression or calculation), show 'Error'
        display.innerText = 'Error';
        lastButtonType = null;
    }
}

// Factorial function (for numbers >= 0)
function factorial(n) {
    if (n < 0) return 'Error'; // Factorial is undefined for negative numbers
    if (n === 0 || n === 1) return 1; // 0! = 1 and 1! = 1
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Check if a value is an operator
function isOperator(value) {
    return ['+', '-', '*', '/', '^', '√', '!'].includes(value);
}

// Toggle the visibility of the history modal
function toggleHistory() {
    historyDiv.classList.toggle('open');
    if (historyDiv.classList.contains('open')) {
        showHistory();
    }
}

// Display the calculation history
function showHistory() {
    let historyItemsDiv = document.getElementById('history-items');
    historyItemsDiv.innerHTML = ''; // Clear the history section
    history.forEach((item, index) => {
        let historyItem = document.createElement('div');
        historyItem.classList.add('history-item');

        // Add history text
        let historyText = document.createElement('span');
        historyText.innerText = item;
        historyItem.appendChild(historyText);

        // Add delete button with a cross symbol
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = '&times;'; // Use the HTML entity for ×
        deleteButton.classList.add('delete-btn');
        deleteButton.onclick = () => deleteHistory(index);
        deleteButton.style.marginLeft = '50px';
        historyItem.appendChild(deleteButton);

        historyItemsDiv.appendChild(historyItem);
    });
}

// Delete a specific history entry
function deleteHistory(index) {
    history.splice(index, 1); // Remove the item at the given index
    showHistory(); // Refresh the history display
}

// Clear all history
function clearAllHistory() {
    history = [];
    showHistory(); // Refresh the history display
}

// Draggable functionality for the calculator
let calculator = document.getElementById('calculator');
let isDragging = false;
let offsetX, offsetY;

calculator.addEventListener('mousedown', (e) => {
    // Check if the modal is open before enabling drag
    if (!historyDiv.classList.contains('open')) {
        isDragging = true;
        offsetX = e.clientX - calculator.getBoundingClientRect().left;
        offsetY = e.clientY - calculator.getBoundingClientRect().top;
    }
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
