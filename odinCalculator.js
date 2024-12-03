const display = document.querySelector("#display");

let num1 = 0;
let num2 = 0;
let operator = null;


function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    return n1 / n2;
}

function operate(operator, n1, n2) {
    if (operator) {
        switch(operator) {
            case '+':
                return add(n1, n2);
        }
    } else {
        alert('Must choose a number, and operator, and another number to calculate');
        clear();
    }

}

function clear() {
    num1 = 0;
    display.textContent = '0';
    operator = null;
}

// Button click event handler
const calculator = document.querySelector(".calculator");
calculator.addEventListener('click', (event) => {
    let target = event.target;

    if (target.classList.contains('digit')) {
        if (display.textContent === '0') {
            display.textContent = target.getAttribute('data-digit');
        } else {
            display.textContent += target.getAttribute('data-digit');
        }
    } else if (target.classList.contains('operator')) {
        let operator = target.getAttribute("data-oper");
        num2 = +display.textContent;
        num1 = operate(operator, num1, num2);

    } else if (target.classList.contains('equals')) {
        alert('equals');
    } else if (target.classList.contains('clear')) {
        clear()
    }
})