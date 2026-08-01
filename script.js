// Get expenses from localStorage or initialize an empty array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

const form = document.getElementById('expense-form');
const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const expenselist = document.getElementById('expense-list');
const totalEl = document.getElementById('total');

//Form submit hone par ye function call hoga
form.addEventListener('submit', function (e) {
    e.preventDefault(); //page reload hone se rokega

    const expense = {
        id: Date.now(),
        desc: descInput.value,
        amount: Number(amountInput.value),
    };

    expenses.push(expense);
    saveAndRender();

    descInput.value = '';
    amountInput.value = '';
});

function saveAndRender() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    render();
}

function render() {
    expenselist.innerHTML = '';

    expenses.forEach(function (expense) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${expense.desc} - ${expense.amount}</span>
            <button onclick="deleteExpense(${expense.id})">Delete</button>
        `;
        expenselist.appendChild(li);
    });

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalEl.textContent = total;
}

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    saveAndRender();
}

render(); //Initial render on page load
