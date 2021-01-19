/*
TO DO: Transaction History
    Implementation similar to Errors
    Storage to localstorage will be in the form of an obj=
    history = {
        "transactions": ["Withdraw Dave 500","Deposit Sam 250"]
    };
    ^ Example
    Additional TO DO: check user list implementation, catch keys that are not for users (i.e. transactions)

    Case: Successful transaction
    1. Fetch obj = localStorage("history") => parse()
    2. obj.transactions.push("{Transaction type} {Username} {amount} ({receiver})")
    3. obj = JSON.stringify(obj);
    4. setItem("history", obj)

    for displaying:
    0. fetch obj = localStorage('history') => parse(), loop through obj.transactions
    1. for each ith iteration, items = obj.transactions[i].split(" ")
    2. tr = createElement("tr")
    3. account = creatElement("th") => innerHTML will be items[1] => append to tr
    4. type = createElement("th") => innerHTML will be items[0] => append to tr
    5. if type is send, receiver = createElement("th") => innerHTML will be items[3], otherwise " " => append to tr
    6. amount = createElement("th") => innerHTML will be "Php " + parseFloat(items[2]) => append to tr
    7. append tr to TABLECONTAINER
*/


const BALANCE = document.getElementById('balance');
const DEPOSIT = document.getElementById('deposit');
const WITHDRAW = document.getElementById('withdraw');
const SEND = document.getElementById('send');

const DEPOSITS = document.getElementById('batch-deposit');
const WITHDRAWS = document.getElementById('batch-withdraw');
const SENDS = document.getElementById('batch-send');

const TRANSACTIONCONTAINER = document.getElementsByClassName('transaction-container');
const TRANSACTIONSCONTAINER = document.getElementsByClassName('transactions-container');

// for history log
const TABLECONTAINER = document.getElementsByClassName('transaction-table')[0];


const TRANSACTIONLABEL = document.getElementsByClassName('transactionlabel');

console.log(localStorage);
const NUMS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

let users = [];

for (let i = 0; i < window.localStorage.length-1; i++) {
    let obj = JSON.parse(localStorage[i]);
    users.push(obj.user);
}
console.log(users);


// function for hiding buttons, used when a button is clicked
function hideButtons() {
    BALANCE.style.display = 'none';
    DEPOSIT.style.display = 'none';
    WITHDRAW.style.display = 'none';
    SEND.style.display = 'none';
    DEPOSITS.style.display = 'none';
    WITHDRAWS.style.display = 'none';
    SENDS.style.display = 'none';
}

// function to check whether an element (user) exists inside an array (users)
function isIn(user, users) {
    for (let i = 0; i < users.length; i++) {
        if (user.capitalize() === users[i].capitalize()) {
            return true;
        }
    }
    return false;
}


//Added 
BALANCE.addEventListener('click',
    () => {
        TRANSACTIONCONTAINER[0].style.display = 'inherit';
        hideButtons();

        //hide unnecessary label and fields.
        document.getElementsByClassName('rec-name')[0].style.display = 'none';
        document.getElementsByClassName('rec-name-label')[0].style.display = 'none';
        document.getElementsByClassName('amount')[0].style.display = 'none';
        document.getElementsByClassName('transactionlabel')[0].style.display = 'none';

        const balanceText = document.getElementsByClassName('balance')[0];

        let submit = TRANSACTIONCONTAINER[0].lastElementChild;
        submit.addEventListener('click',
            () => {
                let user = document.getElementsByClassName('name')[0].value;

                for (let i = 0; i < window.localStorage.length; i++) {
                    let obj = JSON.parse(localStorage[i])
                    if (user.toUpperCase() === obj.user.toUpperCase()) {
                        balanceText.innerHTML = obj.balance;
                        alert("Balance Inquiry Successful!");
                        return;
                    }
                }
                alert("Invalid Account Name and/or User Doesn't Exist");
                location.reload();

            });

    });

// Deposit button functionality
DEPOSIT.addEventListener('click',
    () => {
        TRANSACTIONCONTAINER[0].style.display = 'inherit';
        hideButtons();
        TRANSACTIONLABEL[0].innerHTML = "Deposit Amount: Php";

        // hide receiver name and label
        document.getElementsByClassName('rec-name')[0].style.display = 'none';
        document.getElementsByClassName('rec-name-label')[0].style.display = 'none';
        // hide balance and label
        document.getElementsByClassName('balance')[0].style.display = 'none';
        document.getElementsByClassName('balance-label')[0].style.display = 'none';
        // submit button functionality
        let submit = TRANSACTIONCONTAINER[0].lastElementChild;
        submit.addEventListener('click',
            () => {
                // fetch user and amount
                let user = document.getElementsByClassName('name')[0].value;
                let amount = parseFloat(document.getElementsByClassName('amount')[0].value);

                // check if valid amount
                if (isNaN(amount) || amount < 0) {
                    alert("Invalid Deposit Amount!");
                    location.reload();
                    return;
                }

                // check if user exists already
                for (let i = 0; i < window.localStorage.length; i++) {
                    let obj = JSON.parse(localStorage[i])
                    if (user.toUpperCase() === obj.user.toUpperCase()) {
                        obj.balance = obj.balance + amount;
                        obj = JSON.stringify(obj);
                        localStorage.setItem(i, obj);
                        location.reload();
                        alert("Successful Transaction!");
                        return;
                    }
                }

                alert("Invalid Account Name and/or User Doesn't Exist");
                location.reload();
            });

    });

// batch deposit functionality
DEPOSITS.addEventListener('click',
    () => {
        // hide balance and label
        document.getElementsByClassName('balance')[0].style.display = 'none';
        document.getElementsByClassName('balance-label')[0].style.display = 'none';

        // number of transactions
        let num = prompt("Number of deposit transactions:");
        TRANSACTIONLABEL[0].innerHTML = "Deposit Amount: Php";

        // check if num is valid number
        while (num <= 0 || isNaN(parseInt(num))) {
            num = parseInt(prompt("Must be a number and greater than 0"));
        }

        // copies number of transaction
        for (let i = 0; i < num - 1; i++) {
            let cln = TRANSACTIONCONTAINER[0].cloneNode(true);
            TRANSACTIONSCONTAINER[0].appendChild(cln);
        }

        // hides receiver name and label
        for (let i = 0; i < num; i++) {
            TRANSACTIONCONTAINER[i].style.display = 'inherit';
            document.getElementsByClassName('rec-name')[i].style.display = 'none';
            document.getElementsByClassName('rec-name-label')[i].style.display = 'none';
        }
        // hide all submit buttons to make a submit all button
        let submit = document.getElementsByClassName('transact');
        for (let i = 0; i < submit.length; i++) {
            submit[i].style.display = 'none';
        }
        let submitAllContainer = document.createElement('div');
        submitAllContainer.id = 'submitAllContainer';
        let submitAll = document.createElement('button');
        submitAll.innerHTML = "Submit All";
        submitAll.id = 'submitAll';
        submitAllContainer.appendChild(submitAll);
        TRANSACTIONSCONTAINER[0].appendChild(submitAllContainer);
        hideButtons();
        submitAll.addEventListener('click',
            () => {
                // fetch all container for names and amounts
                let names = document.getElementsByClassName('name');
                let amounts = document.getElementsByClassName('amount');
                let errors = "Errors";

                // loops through all containers
                for (let i = 0; i < names.length; i++) {
                    let user = names[i].value;
                    let amount = (amounts[i].value === "") ? 0 : parseFloat(amounts[i].value);
                    if (amount <= 0) {
                        errors += "\n Deposit for '" + user + "' : Amount Can't be 0 or Negative";
                        continue;
                    }

                    if (!isIn(user, users)) {
                        errors += "\n Deposit for '" + user + "' : User Invalid Name and/or User Doesn't Exist...";
                        continue;
                    }
                    // this part will be the only different code block on withdraw and send => can be refactored to a single function
                    for (let j = 0; j < window.localStorage.length; j++) {
                        let obj = JSON.parse(localStorage[j]);
                        if (user.toUpperCase() === obj.user.toUpperCase()) {
                            obj.balance = obj.balance + amount;
                            obj = JSON.stringify(obj);
                            localStorage.setItem(j, obj);
                        }

                    }

                }
                alert(errors);
                location.reload();
            });

    });

// withdraw and send follows the same pattern as deposit with different functionality on the submit buttons, can be refactor later to shorten code

WITHDRAW.addEventListener('click',
    () => {
        TRANSACTIONCONTAINER[0].style.display = 'inherit';
        hideButtons();
        TRANSACTIONLABEL[0].innerHTML = "Withdraw Amount: Php";
        document.getElementsByClassName('rec-name')[0].style.display = 'none';
        document.getElementsByClassName('rec-name-label')[0].style.display = 'none';

        document.getElementsByClassName('balance')[0].style.display = 'none';
        document.getElementsByClassName('balance-label')[0].style.display = 'none';
        let submit = TRANSACTIONCONTAINER[0].lastElementChild;
        submit.addEventListener('click',
            () => {
                let user = document.getElementsByClassName('name')[0].value;
                let amount = parseFloat(document.getElementsByClassName('amount')[0].value);
                if (isNaN(amount) || amount < 0) {
                    alert("Invalid Withdraw Amount!");
                    location.reload();
                    return;
                }
                for (let i = 0; i < window.localStorage.length; i++) {
                    let obj = JSON.parse(localStorage[i])
                    if (user.toUpperCase() === obj.user.toUpperCase()) {
                        obj.balance = obj.balance - amount;
                        if (obj.balance < 0) {
                            alert("Insufficient funds!");
                            location.reload();
                            return;
                        }
                        obj = JSON.stringify(obj);
                        localStorage.setItem(i, obj);
                        alert("Successful Transaction!");
                        location.reload();
                        return;
                    }
                }
                alert("Invalid Account Name and/or User Doesn't Exist");
                location.reload();
            });
    })

WITHDRAWS.addEventListener('click',
    () => {

        document.getElementsByClassName('balance')[0].style.display = 'none';
        document.getElementsByClassName('balance-label')[0].style.display = 'none';
        let num = prompt("Number of withdraw transactions:");
        TRANSACTIONLABEL[0].innerHTML = "Withdraw Amount: Php";
        while (num <= 0 || isNaN(parseInt(num))) {
            num = prompt("Must be a number and greater than 0");
        }
        for (let i = 0; i < num - 1; i++) {
            let cln = TRANSACTIONCONTAINER[0].cloneNode(true);
            TRANSACTIONSCONTAINER[0].appendChild(cln);
        }
        for (let i = 0; i < num; i++) {
            TRANSACTIONCONTAINER[i].style.display = 'inherit';
            document.getElementsByClassName('rec-name')[i].style.display = 'none';
            document.getElementsByClassName('rec-name-label')[i].style.display = 'none';
        }
        let submit = document.getElementsByClassName('transact');
        for (let i = 0; i < submit.length; i++) {
            submit[i].style.display = 'none';
        }
        let submitAllContainer = document.createElement('div');
        submitAllContainer.id = 'submitAllContainer';
        let submitAll = document.createElement('button');
        submitAll.innerHTML = "Submit All";
        submitAll.id = 'submitAll';
        submitAllContainer.appendChild(submitAll);
        TRANSACTIONSCONTAINER[0].appendChild(submitAllContainer);
        hideButtons();
        submitAll.addEventListener('click',
            () => {
                let names = document.getElementsByClassName('name');
                let amounts = document.getElementsByClassName('amount');
                let errors = "Errors";
                for (let i = 0; i < names.length; i++) {
                    let user = names[i].value;
                    let amount = (amounts[i].value === "") ? 0 : parseFloat(amounts[i].value);
                    if (amount < 0) {
                        continue;
                    }

                    if (!isIn(user, users)) {
                        errors += "\n Withdrawal for '" + user + "' : User Invalid Name and/or User Doesn't Exist...";
                        continue;
                    }

                    for (let j = 0; j < window.localStorage.length; j++) {
                        let obj = JSON.parse(localStorage[j]);
                        if (user.toUpperCase() === obj.user.toUpperCase()) {
                            obj.balance = obj.balance - amount;
                            if (obj.balance < 0) {
                                errors += "\n Withdrawal for '" + user + "' : Insufficient Funds...";
                                break;
                            }
                            obj = JSON.stringify(obj);
                            localStorage.setItem(j, obj);
                        }
                    }
                }
                alert(errors);
                location.reload();
            });
    });


SEND.addEventListener('click',
    () => {

        document.getElementsByClassName('balance')[0].style.display = 'none';
        document.getElementsByClassName('balance-label')[0].style.display = 'none';
        TRANSACTIONCONTAINER[0].style.display = 'inherit';
        hideButtons();
        TRANSACTIONLABEL[0].innerHTML = "Amount: Php"
        let submit = TRANSACTIONCONTAINER[0].lastElementChild;
        submit.addEventListener('click',
            () => {
                let user = document.getElementsByClassName('name')[0].value;
                let amount = parseFloat(document.getElementsByClassName('amount')[0].value);
                let receiver = document.getElementsByClassName('rec-name')[0].value;
                if (isNaN(amount) || amount < 0) {
                    alert("Invalid Transfer Amount!");
                    location.reload();
                    return;
                }
                for (let i = 0; i < window.localStorage.length; i++) {
                    let obj = JSON.parse(localStorage[i])
                    if (user.toUpperCase() === obj.user.toUpperCase()) {
                        if (obj.balance >= amount) {
                            for (let j = 0; j < window.localStorage.length; j++) {
                                let receiverObj = JSON.parse(localStorage[j]);
                                if (receiver.toUpperCase() === receiverObj.user.toUpperCase()) {
                                    obj.balance = obj.balance - amount;
                                    receiverObj.balance = receiverObj.balance + amount;
                                    obj = JSON.stringify(obj);
                                    receiverObj = JSON.stringify(receiverObj);
                                    localStorage.setItem(j, receiverObj);
                                    localStorage.setItem(i, obj);
                                    alert("Successful Transaction!");
                                    location.reload();
                                    return;
                                }
                            }
                            alert("Invalid Recipient Name and/or User Doesn't Exist")
                            location.reload();
                            return;
                        }
                        else {
                            alert("Insufficient funds on account!");
                            location.reload();
                            return;
                        }
                    }
                }
                alert("Invalid Sender Name and/or User Doesn't Exist");
                location.reload();
            });

    });

SENDS.addEventListener('click',
    () => {

        document.getElementsByClassName('balance')[0].style.display = 'none';
        document.getElementsByClassName('balance-label')[0].style.display = 'none';
        let num = prompt("Number of Send transactions:");

        while (num <= 0 || isNaN(parseInt(num))) {
            num = prompt("Must be a number and greater than 0");
        }

        for (let i = 0; i < num - 1; i++) {
            let cln = TRANSACTIONCONTAINER[0].cloneNode(true);
            TRANSACTIONSCONTAINER[0].appendChild(cln);
        }
        for (let i = 0; i < num; i++) {
            TRANSACTIONCONTAINER[i].style.display = 'inherit';
        }
        let submit = document.getElementsByClassName('transact');
        for (let i = 0; i < submit.length; i++) {
            submit[i].style.display = 'none';
        }
        let submitAllContainer = document.createElement('div');
        submitAllContainer.id = 'submitAllContainer';
        let submitAll = document.createElement('button');
        submitAll.innerHTML = "Submit All";
        submitAll.id = 'submitAll';
        submitAllContainer.appendChild(submitAll);
        TRANSACTIONSCONTAINER[0].appendChild(submitAllContainer);
        hideButtons();
        submitAll.addEventListener('click',
            () => {
                let names = document.getElementsByClassName('name');
                let amounts = document.getElementsByClassName('amount');
                let receivers = document.getElementsByClassName('rec-name');

                let errors = "Errors";

                for (let i = 0; i < names.length; i++) {
                    let user = names[i].value;
                    let amount = (amounts[i].value === "") ? 0 : parseFloat(amounts[i].value);
                    let receiver = receivers[i].value;
                    if (amount <= 0) {
                        errors += "\n Sending for '" + user + "' : Amount can't be 0 or negative";
                        continue;
                    }
                    if (!isIn(user, users)) {
                        errors += "\n Sending for '" + user + "' to '" + receiver + "' : User Invalid Name and/or Sender Doesn't Exist...";
                        continue;
                    }
                    if (!isIn(receiver, users)) {
                        errors += "\n Sending for '" + user + "' to '" + receiver + "' : User Invalid Name and/or Sender Doesn't Exist...";
                        continue;
                    }
                    for (let j = 0; j < window.localStorage.length; j++) {
                        let obj = JSON.parse(localStorage[j]);
                        if (user.toUpperCase() === obj.user.toUpperCase()) {
                            if (obj.balance >= amount) {
                                for (let k = 0; k < window.localStorage.length; k++) {
                                    let receiverObj = JSON.parse(localStorage[k]);
                                    if (receiver.toUpperCase() === receiverObj.user.toUpperCase()) {
                                        obj.balance = obj.balance - amount;
                                        receiverObj.balance = receiverObj.balance + amount;
                                        obj = JSON.stringify(obj);
                                        receiverObj = JSON.stringify(receiverObj);
                                        localStorage.setItem(k, receiverObj);
                                        localStorage.setItem(j, obj);
                                    }
                                }
                            }
                            else {
                                errors += "\n Sending for '" + user + "' to '" + receiver + "' : Sender Has Insufficient funds";
                                continue;
                            }
                        }
                    }
                }
                alert(errors);
                location.reload();
            });
    });