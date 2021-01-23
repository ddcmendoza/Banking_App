/*
TO DO: Transaction History
    Implementation similar to Errors
    Storage to localstorage will be in the form of an obj=
    history = {
        "transactions": ["Time Date Withdraw Dave 500","Time Date Deposit Sam 250"]
    };
    ^ Example
    Additional TO DO: check user list implementation, catch keys that are not for users (i.e. transactions)

    Case: Successful transaction
    1. Fetch obj = localStorage["history"] => parse()
    2. obj.transactions.push("{Transaction type} {Username} {amount} ({receiver})")
    3. obj = JSON.stringify(obj);
    4. setItem("history", obj)

    for displaying:
    0. fetch obj = localStorage['history'] => parse(), loop through obj.transactions
    1. for each ith iteration, items = obj.transactions[i].split(" ")
    2. tr = createElement("tr")
    3. date = creatElement("td") => innerHTML will be items[0] => append to tr
    4. time = creatElement("td") => innerHTML will be items[1] => append to tr
    5. account = creatElement("td") => innerHTML will be items[3] => append to tr
    6. type = createElement("td") => innerHTML will be items[2] => append to tr
    7. if type is send, receiver = createElement("td") => innerHTML will be items[5], otherwise " " => append to tr
    8. amount = createElement("td") => innerHTML will be "Php " + parseFloat(items[4]) => append to tr
    9. append tr to TABLECONTAINER

    feature Idea: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_filter_table
    filter on history logs
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

for (let i = 0; i < window.localStorage.length - 1; i++) {
    let obj = JSON.parse(localStorage[i]);
    users.push(obj.user);
}
console.log(users);

// currency formatter
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'Php',
    minimumFractionDigits: 2
});


// display transaction logs
function displayLogs() {
    let obj = JSON.parse(localStorage['history']);
    for (let i = 0; i < obj.transactions.length; i++) {
        let items = obj.transactions[i].split(' ');
        let tr = document.createElement('tr');
        let dt = document.createElement('td');
        let tm = document.createElement('td');
        let account = document.createElement('td');
        let type = document.createElement('td');
        let receiver = document.createElement('td');
        let amount = document.createElement('td');
        date = items[0].split("-")
        dt.innerHTML = date[0] + "-" + ("0" + date[1]).slice(-2) + "-" + ("0" + date[2]).slice(-2);
        time = items[1].split(":");
        tm.innerHTML = ("0" + time[0]).slice(-2) + ":" + ("0" + time[1]).slice(-2) + ":" + ("0" + time[2]).slice(-2);
        account.innerHTML = items[3];
        type.innerHTML = items[2];
        receiver.innerHTML = (type.innerHTML === 'Send') ? items[5] : "-";
        amount.innerHTML = formatter.format((parseFloat(items[4])));
        tr.appendChild(dt);
        tr.appendChild(tm);
        tr.appendChild(account);
        tr.appendChild(type);
        tr.appendChild(receiver);
        tr.appendChild(amount);
        TABLECONTAINER.appendChild(tr);
    }
}

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

BALANCE.addEventListener
    ('click', function () {
        transactionCB("Balance", false);
    });

DEPOSIT.addEventListener
    ('click', function () {
        transactionCB("Deposit", false);
    });

DEPOSITS.addEventListener
    ('click', function () {
        transactionCB("Deposit", true);
    });
WITHDRAW.addEventListener
    ('click', function () {
        transactionCB("Withdraw", false);
    });
WITHDRAWS.addEventListener
    ('click', function () {
        transactionCB("Withdraw", true);
    });
SEND.addEventListener
    ('click', function () {
        transactionCB("Send", false);
    });
SENDS.addEventListener
    ('click', function () {
        transactionCB("Send", true);
    });

function processAndLog(user, type, isBatch, amount = 0) {

    let balanceText = document.getElementsByClassName('balance')[0];

    // check if user exists already and process (single transactions)
    for (let i = 0; i < window.localStorage.length - 1; i++) {
        let obj = JSON.parse(localStorage[i])
        if (user.toUpperCase() === obj.user.toUpperCase()) {
            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let hist = JSON.parse(localStorage['history']);
            if (type === "Balance" && isBatch === false) {
                balanceText.innerHTML = obj.balance;
                hist.transactions.unshift(date + " " + time + " " + "Balance " + user.capitalize() + " " + obj.balance);
                alert("Successful Balance Inquiry!");
            }
            if (type === "Deposit" && isBatch === false) {
                obj.balance = obj.balance + amount;
                obj = JSON.stringify(obj);
                localStorage.setItem(i, obj);
                hist.transactions.unshift(date + " " + time + " " + "Deposit " + user.capitalize() + " " + amount);
                alert("Successful Transaction!");
            }
            if (type === "Withdraw" && isBatch === false) {
                obj.balance = obj.balance - amount;
                if (obj.balance < 0) {
                    alert("Insufficient funds!");
                    location.reload();
                    return;
                }
                obj = JSON.stringify(obj);
                localStorage.setItem(i, obj);
                hist.transactions.unshift(date + " " + time + " " + "Withdraw " + user.capitalize() + " " + amount);
                alert("Successful Transaction!");
            }
            hist = JSON.stringify(hist);
            localStorage.setItem('history', hist);
            return;
        }
    }

    alert("Invalid Account Name and/or User Doesn't Exist");
    location.reload();

}


function transactionCB(type, isBatch) {
    let transactionContainer = TRANSACTIONCONTAINER[0];
    hideButtons();
    let transactionLabel = TRANSACTIONLABEL[0];
    let receiverLabel = document.getElementsByClassName('rec-name-label')[0];
    let receiverName = document.getElementsByClassName('rec-name')[0];
    let balanceLabel = document.getElementsByClassName('balance-label')[0];
    let balanceText = document.getElementsByClassName('balance')[0];
    let amount = document.getElementsByClassName('amount')[0];


    if (type === "Send") {
        receiverLabel.style.display = 'inherit';
        receiverName.style.display = 'inherit';
    }

    switch (type) {
        case "Balance":
            let submit = TRANSACTIONCONTAINER[0].lastElementChild;
            transactionContainer.style.display = 'inherit';
            receiverLabel.style.display = 'none';
            receiverName.style.display = 'none';
            transactionLabel.style.display = 'none';
            amount.style.display = 'none'

            //hide unnecessary label and fields.
            submit.addEventListener('click',
                () => {
                    let user = document.getElementsByClassName('name')[0].value;
                    // fetch user and amount
                    //  processAndLog(user);
                    processAndLog(user, "Balance", false);
                });

            break;

        case "Deposit":
            transactionContainer.style.display = 'inherit';
            transactionLabel.innerHTML = "Deposit Amount: Php";
            receiverLabel.style.display = 'none';
            receiverName.style.display = 'none';
            balanceLabel.style.display = 'none';
            balanceText.style.display = 'none';
            if (isBatch === false) {
                let submit1 = TRANSACTIONCONTAINER[0].lastElementChild;
                submit1.addEventListener('click',
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
                        // // check if user exists already
                        processAndLog(user, "Deposit", false, amount);
                        location.reload();
                    });
            }
            else {
                // MULTIPLE DEPOSIT
                // number of transactions
                let num = prompt("Number of deposit transactions:");
                if (num === null) {
                    location.reload();
                    return;
                }
                // check if num is valid number
                while (num <= 0 || isNaN(parseInt(num))) {
                    num = parseInt(prompt("Must be a number and greater than 0"));
                    console.log(num);
                }

                // copies number of transaction
                for (let i = 0; i < num - 1; i++) {
                    let cln = TRANSACTIONCONTAINER[0].cloneNode(true);
                    TRANSACTIONSCONTAINER[0].appendChild(cln);
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
                                errors += "\n" + i + ".) Deposit for '" + user + "' : Amount Can't be 0 or Negative";
                                continue;
                            }

                            if (!isIn(user, users)) {
                                errors += "\n" + i + ".) Deposit for '" + user + "' : User Invalid Name and/or User Doesn't Exist...";
                                continue;
                            }

                            // this part will be the only different code block on withdraw and send => can be refactored to a single function
                            for (let j = 0; j < window.localStorage.length - 1; j++) {
                                let obj = JSON.parse(localStorage[j]);
                                if (user.toUpperCase() === obj.user.toUpperCase()) {
                                    obj.balance = obj.balance + amount;
                                    obj = JSON.stringify(obj);
                                    localStorage.setItem(j, obj);
                                    let today = new Date();
                                    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                                    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                                    let hist = JSON.parse(localStorage['history']);
                                    hist.transactions.unshift(date + " " + time + " " + "Deposit " + user.capitalize() + " " + amount);
                                    hist = JSON.stringify(hist);
                                    localStorage.setItem('history', hist);
                                }

                            }
                        }
                        if (errors !== "Errors") alert(errors);
                        location.reload();
                    });
            }
            break;

        case "Withdraw":
            transactionContainer.style.display = 'inherit';
            transactionLabel.innerHTML = "Withdraw Amount: Php";
            receiverLabel.style.display = 'none';
            receiverName.style.display = 'none';
            balanceLabel.style.display = 'none';
            balanceText.style.display = 'none';
            if (isBatch === false) {
                let submit2 = TRANSACTIONCONTAINER[0].lastElementChild;

                submit2.addEventListener('click',
                    () => {
                        let user = document.getElementsByClassName('name')[0].value;
                        let amount = parseFloat(document.getElementsByClassName('amount')[0].value);
                        if (isNaN(amount) || amount < 0) {
                            alert("Invalid Withdraw Amount!");;
                            location.reload();
                            return;
                        }

                        processAndLog(user, "Withdraw", false, amount);
                        location.reload();
                    });
            }
            else {
                let submit = document.getElementsByClassName('transact');
                let submitAllContainer = document.createElement('div');
                let submitAll = document.createElement('button');

                let num = prompt("Number of withdraw transactions:");
                if (num === null) {
                    location.reload();
                    return;
                }
                TRANSACTIONLABEL[0].innerHTML = "Withdraw Amount: Php";
                while (num <= 0 || isNaN(parseInt(num))) {
                    num = prompt("Must be a number and greater than 0");
                }
                for (let i = 0; i < num - 1; i++) {
                    let cln = TRANSACTIONCONTAINER[0].cloneNode(true);
                    TRANSACTIONSCONTAINER[0].appendChild(cln);
                }

                for (let i = 0; i < submit.length; i++) {
                    submit[i].style.display = 'none';
                }

                submitAllContainer.id = 'submitAllContainer';
                submitAll.innerHTML = "Submit All";
                submitAll.id = 'submitAll';
                submitAllContainer.appendChild(submitAll);
                TRANSACTIONSCONTAINER[0].appendChild(submitAllContainer);
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

                            for (let j = 0; j < window.localStorage.length - 1; j++) {
                                let obj = JSON.parse(localStorage[j]);
                                if (user.toUpperCase() === obj.user.toUpperCase()) {
                                    obj.balance = obj.balance - amount;
                                    if (obj.balance < 0) {
                                        errors += "\n Withdrawal for '" + user + "' : Insufficient Funds...";
                                        continue;
                                    }
                                    obj = JSON.stringify(obj);
                                    localStorage.setItem(j, obj);
                                    let today = new Date();
                                    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                                    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                                    let hist = JSON.parse(localStorage['history']);
                                    hist.transactions.unshift(date + " " + time + " " + "Withdraw " + user.capitalize() + " " + amount);
                                    hist = JSON.stringify(hist);
                                    localStorage.setItem('history', hist)
                                }
                            }
                        }
                        if (errors !== "Errors") alert(errors);
                        location.reload();
                    });
            }
            break;
        case "Send":
            balanceLabel.style.display = 'none';
            balanceText.style.display = 'none';
            transactionLabel.innerHTML = "Send Amount: Php";

            if (isBatch === false) {

                TRANSACTIONCONTAINER[0].style.display = 'inherit';
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
                        for (let i = 0; i < window.localStorage.length - 1; i++) {
                            let obj = JSON.parse(localStorage[i])
                            if (user.toUpperCase() === obj.user.toUpperCase()) {
                                if (obj.balance >= amount) {
                                    for (let j = 0; j < window.localStorage.length - 1; j++) {
                                        let receiverObj = JSON.parse(localStorage[j]);
                                        if (receiver.toUpperCase() === receiverObj.user.toUpperCase()) {
                                            obj.balance = obj.balance - amount;
                                            receiverObj.balance = receiverObj.balance + amount;
                                            obj = JSON.stringify(obj);
                                            receiverObj = JSON.stringify(receiverObj);
                                            localStorage.setItem(j, receiverObj);
                                            localStorage.setItem(i, obj);
                                            let today = new Date();
                                            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                                            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                                            let hist = JSON.parse(localStorage['history']);
                                            hist.transactions.unshift(date + " " + time + " " + "Send " + user.capitalize() + " " + amount + " " + receiver.capitalize());
                                            hist = JSON.stringify(hist);
                                            localStorage.setItem('history', hist)
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
                                    alert("Insufficient funds on Sender account!");
                                    location.reload();
                                    return;
                                }
                            }
                        }
                        alert("Invalid Sender Name and/or User Doesn't Exist");
                        location.reload();
                    });
            }
            else {
                document.getElementsByClassName('balance')[0].style.display = 'none';
                document.getElementsByClassName('balance-label')[0].style.display = 'none';
                let num = prompt("Number of Send transactions:");
                if (num === null) {
                    location.reload();
                    return;
                }
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
                            for (let j = 0; j < window.localStorage.length - 1; j++) {
                                let obj = JSON.parse(localStorage[j]);
                                if (user.toUpperCase() === obj.user.toUpperCase()) {
                                    if (obj.balance >= amount) {
                                        for (let k = 0; k < window.localStorage.length - 1; k++) {
                                            let receiverObj = JSON.parse(localStorage[k]);
                                            if (receiver.toUpperCase() === receiverObj.user.toUpperCase()) {
                                                obj.balance = obj.balance - amount;
                                                receiverObj.balance = receiverObj.balance + amount;
                                                obj = JSON.stringify(obj);
                                                receiverObj = JSON.stringify(receiverObj);
                                                localStorage.setItem(k, receiverObj);
                                                localStorage.setItem(j, obj);
                                                let today = new Date();
                                                let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                                                let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                                                let hist = JSON.parse(localStorage['history']);
                                                hist.transactions.unshift(date + " " + time + " " + "Send " + user.capitalize() + " " + amount + " " + receiver.capitalize());
                                                hist = JSON.stringify(hist);
                                                localStorage.setItem('history', hist)
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
                        if (errors !== "Errors") alert(errors);
                        location.reload();
                    });
            }
            break;
    }
}


window.onload = (event) => {
    displayLogs();
    let body = document.body.children;
    for (let i = 0; i < body.length; i++) {
        if (body[i].className !== "") {
            body[i].style.animation = "fade " + 2 + "s";
        }
    }
};

/*
REFACTOR IDEA for 6 buttons
make a function called transactionCB(type, isBatch)
    -type = ["Send","Withdraw","Deposit"]
    -isBatch = [true, false]
Essentially copy all the code on the 6 buttons to shorten the overall code
Use case would be:
    DEPOSIT.addEventListener('click', transactionCB("Deposit", false));
    DEPOSITS.addEventListener('click', transactionCB("Deposit", true));
    WITHDRAW.addEventListener('click', transactionCB("Withdraw", false));
    WITHDRAWS.addEventListener('click', transactionCB("Withdraw", true));
    SEND.addEventListener('click', transactionCB("Send", false));
    SENDS.addEventListener('click', transactionCB("Send", true));

*/




