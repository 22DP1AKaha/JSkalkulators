const calculator = document.getElementById('calculator');
let isDragging = false;
let offsetX, offsetY;

calculator.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - calculator.getBoundingClientRect().left;
    offsetY = e.clientY - calculator.getBoundingClientRect().top;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        calculator.style.left = `${e.clientX - offsetX}px`;
        calculator.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

