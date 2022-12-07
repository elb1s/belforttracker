var state = {
    balance:0,
    income:0,
    expense:0,
    transactions: [
    ]
}

const balanceElement= document.querySelector("#balance");
const incomeElement= document.querySelector("#income");
const expenseElement= document.querySelector("#expense");

const transactionElement= document.querySelector("#transaction");

const nameInput = document.querySelector("#name");
const amountInput = document.querySelector("#amount");


const incomeBtnEl = document.querySelector("#incomeBtn"); 
const expenseBtnEl = document.querySelector("#expenseBtn"); 




function init(){
    var localState = JSON.parse(localStorage.getItem("expenseTrackerState"));
    if(localState!==null){
        state= localState;
    }


    updateState();
    initListeners();
}

function uniqueId(){
    return Math.round (Math.random()* 10000);
}

function initListeners(){
    incomeBtnEl.addEventListener('click', onAddIncomeClick);
    expenseBtnEl.addEventListener('click', onAddExpenseClick);
}


function onAddIncomeClick(){
    addTransaction(nameInput.value,amountInput.value,'income');
}

function onAddExpenseClick(){
  addTransaction(nameInput.value,amountInput.value,'expense');
}

function addTransaction(name, amount, type){
    if(amount==0){
        alert("Amount can not be 0!")
    }
    else if(name!== '' && amount !==''){
        var transaction = {id:uniqueId(), name:name, amount:parseInt(amount), type:type};
        state.transactions.push(transaction);
        updateState();

    }
    else {
        alert("Please type name and amount!")
    }
    nameInput.value= "";
    amountInput.value= "";
}


function updateState(){
    var balance= 0,
        income =0,
        expense=0,
        item;

    for (var m=0;m<state.transactions.length;m++){
        item = state.transactions[m];
        if(item.type ==='income'){
            income+=item.amount;


        }else if(item.type ==='expense'){
            expense+=item.amount
        }

    }

    balance= income-expense
    state.income= income;
    state.balance=balance;
    state.expense=expense;
    

    localStorage.setItem('expenseTrackerState',JSON.stringify(state));



    render();

}

function onDeleteClick(e){
    var id = parseInt(e.target.getAttribute("data-id"));
    var deleteIndex;
    for (var i=0; i<state.transactions.length;i++){
        if (state.transactions[i].id === id){
            deleteIndex= i;
            break;
        }
    }

    state.transactions.splice(deleteIndex,1);
    updateState();
}


function render(){
    balanceElement.innerHTML=`$${state.balance}`;
    incomeElement.innerHTML=`$${state.income}`;
    expenseElement.innerHTML=`$${state.expense}`;

    var transactionLiEl, containerEl, amountEl, btnEl;

    transactionElement.innerHTML = '';
    for (var k= 0; k<state.transactions.length;k++){

        transactionLiEl = document.createElement("li");
        transactionLiEl.append(state.transactions[k].name);
        transactionElement.appendChild(transactionLiEl);

        containerEl = document.createElement("div");
        amountEl = document.createElement("span");
        
        if(state.transactions[k].type === 'income'){
            amountEl.classList.add('income-amt');
        }else if (state.transactions[k].type==='expense') {
            amountEl.classList.add('expense-amt');
        }
        
        amountEl.innerHTML = `$${state.transactions[k].amount}`;
        containerEl.appendChild(amountEl);

        btnEl = document.createElement("button");
        btnEl.setAttribute('data-id', state.transactions[k].id);
        btnEl.innerHTML = "X";

        btnEl.addEventListener('click',onDeleteClick);



        containerEl.appendChild(btnEl);

        transactionLiEl.appendChild(containerEl);
    }
}

init();
