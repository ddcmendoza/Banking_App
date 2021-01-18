const DEPOSIT = document.getElementById('deposit');
const WITHDRAW = document.getElementById('withdraw');
const SEND = document.getElementById('send');

const DEPOSITS = document.getElementById('batch-deposit');
const WITHDRAWS = document.getElementById('batch-withdraw');
const SENDS = document.getElementById('batch-send');

const TRANSACTIONCONTAINER = document.getElementsByClassName('transaction-container');
const TRANSACTIONSCONTAINER = document.getElementsByClassName('transactions-container');

const TRANSACTIONLABEL = document.getElementsByClassName('transactionlabel');
console.log(localStorage);

let users = [];

for(let i = 0; i < window.localStorage.length; i++){
    let obj = JSON.parse(localStorage[window.localStorage.key(i)]);
    users.push(obj.user);
}
console.log(users); 

function hideButtons(){
    DEPOSIT.style.display = 'none';
    WITHDRAW.style.display = 'none';
    SEND.style.display = 'none';
    DEPOSITS.style.display = 'none';
    WITHDRAWS.style.display = 'none';
    SENDS.style.display = 'none';
}

DEPOSIT.addEventListener('click',
    ()=>{
        TRANSACTIONCONTAINER[0].style.display = 'inherit';
        hideButtons();
        TRANSACTIONLABEL[0].innerHTML = "Deposit Amount: Php";
        document.getElementsByClassName('rec-name')[0].style.display = 'none';
        document.getElementsByClassName('rec-name-label')[0].style.display = 'none';
        let submit = TRANSACTIONCONTAINER[0].lastElementChild;
        submit.addEventListener('click',
        ()=>{
        let user = document.getElementsByClassName('name')[0].value;
        let amount = parseFloat(document.getElementsByClassName('amount')[0].value);
        if (isNaN(amount) || amount < 0){
            alert("Invalid Deposit Amount!");
            location.reload();
            return;
        }
        for (let i = 0; i < window.localStorage.length; i++){
            let obj = JSON.parse(localStorage[i])
            if (user.toUpperCase() === obj.user.toUpperCase()){
                obj.balance = obj.balance + amount;
                obj = JSON.stringify(obj);
                localStorage.setItem(i, obj);
                location.reload();
                alert("Successful Transaction!");
                return;
            }
        }
        alert("Invalid Account Name!");
        location.reload();
    });

})

DEPOSITS.addEventListener('click',
()=>{
    let num = prompt("Number of deposit transactions:");
    TRANSACTIONLABEL[0].innerHTML = "Deposit Amount: Php";
    while(isNaN(parseInt(num))){
        num = prompt("Must be a valid number!");
    }
    for (let i = 0; i < num -1; i++){
        let cln = TRANSACTIONCONTAINER[0].cloneNode(true);
        TRANSACTIONSCONTAINER[0].appendChild(cln);
    }
    for(let i = 0; i < num; i++){
        TRANSACTIONCONTAINER[i].style.display = 'inherit';
        document.getElementsByClassName('rec-name')[i].style.display = 'none';
        document.getElementsByClassName('rec-name-label')[i].style.display = 'none';
    }
    let submit = document.getElementsByClassName('transact');
    for(let i = 0; i < submit.length; i++){
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
            ()=>{
                let names = document.getElementsByClassName('name');
                let amounts = document.getElementsByClassName('amount');
                for(let i = 0; i < names.length; i++){
                    let user = names[i].value;
                    let amount = (amounts[i].value === "")? 0:parseFloat(amounts[i].value);
                    if (amount < 0){
                        continue;
                    }
                    for (let j = 0; j < window.localStorage.length; j++){
                        let obj = JSON.parse(localStorage[j]);
                        if (user.toUpperCase() === obj.user.toUpperCase()){
                            obj.balance = obj.balance + amount;
                            obj = JSON.stringify(obj);
                            localStorage.setItem(j, obj);
                        }
                    }
                }
                location.reload();
            });

});



WITHDRAW.addEventListener('click',
    ()=>{
        TRANSACTIONCONTAINER[0].style.display = 'inherit';
        hideButtons();
        TRANSACTIONLABEL[0].innerHTML = "Withdraw Amount: Php";
        document.getElementsByClassName('rec-name')[0].style.display = 'none';
        document.getElementsByClassName('rec-name-label')[0].style.display = 'none';
        let submit = TRANSACTIONCONTAINER[0].lastElementChild;
        submit.addEventListener('click',
        ()=>{
        let user = document.getElementsByClassName('name')[0].value;
        let amount = parseFloat(document.getElementsByClassName('amount')[0].value);
        if (isNaN(amount) || amount < 0){
            alert("Invalid Withdraw Amount!");
            location.reload();
            return;
        }
        for (let i = 0; i < window.localStorage.length; i++){
            let obj = JSON.parse(localStorage[i])
            if (user.toUpperCase() === obj.user.toUpperCase()){
                obj.balance = obj.balance - amount;
                if (obj.balance < 0){
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
        alert("Invalid Account Name!");
        location.reload();
    });
})

WITHDRAWS.addEventListener('click',
()=>{
    let num = prompt("Number of withdraw transactions:");
    TRANSACTIONLABEL[0].innerHTML = "Withdraw Amount: Php";
    while(isNaN(parseInt(num))){
        num = prompt("Must be a valid number!");
    }
    for (let i = 0; i < num -1; i++){
        let cln = TRANSACTIONCONTAINER[0].cloneNode(true);
        TRANSACTIONSCONTAINER[0].appendChild(cln);
    }
    for(let i = 0; i < num; i++){
        TRANSACTIONCONTAINER[i].style.display = 'inherit';
        document.getElementsByClassName('rec-name')[i].style.display = 'none';
        document.getElementsByClassName('rec-name-label')[i].style.display = 'none';
    }
    let submit = document.getElementsByClassName('transact');
    for(let i = 0; i < submit.length; i++){
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
            ()=>{
                let names = document.getElementsByClassName('name');
                let amounts = document.getElementsByClassName('amount');
                for(let i = 0; i < names.length; i++){
                    let user = names[i].value;
                    let amount = (amounts[i].value === "")? 0:parseFloat(amounts[i].value);
                    if (amount < 0){
                        continue;
                    }
                    for (let j = 0; j < window.localStorage.length; j++){
                        let obj = JSON.parse(localStorage[j]);
                        if (user.toUpperCase() === obj.user.toUpperCase()){
                            obj.balance = obj.balance - amount;
                            if(obj.balance < 0){
                                break;
                            }
                            obj = JSON.stringify(obj);
                            localStorage.setItem(j, obj);
                        }
                    }
                }
                location.reload();
            });
});


SEND.addEventListener('click',
    ()=>{
        TRANSACTIONCONTAINER[0].style.display = 'inherit';
        hideButtons();
        TRANSACTIONLABEL[0].innerHTML = "Amount: Php"
        let submit = TRANSACTIONCONTAINER[0].lastElementChild;
        submit.addEventListener('click',
        ()=>{
        let user = document.getElementsByClassName('name')[0].value;
        let amount = parseFloat(document.getElementsByClassName('amount')[0].value);
        let receiver = document.getElementsByClassName('rec-name')[0].value;
        if (isNaN(amount) || amount < 0){
            alert("Invalid Transfer Amount!");
            location.reload();
            return;
        }
        for (let i = 0; i < window.localStorage.length; i++){
            let obj = JSON.parse(localStorage[i])
            if (user.toUpperCase() === obj.user.toUpperCase()){
                if (obj.balance >= amount){
                    for (let j = 0; j < window.localStorage.length; j++){
                        let receiverObj = JSON.parse(localStorage[j]);
                        if(receiver.toUpperCase() === receiverObj.user.toUpperCase()){
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
                    alert("Invalid Recipient Name!")
                    location.reload();
                    return;
                }
                else{
                    alert("Insufficient funds on account!");
                    location.reload();
                    return;
                }
            }
        }
        alert("Invalid Sender Name!");
        location.reload();
    });

});

SENDS.addEventListener('click',
()=>{
    let num = prompt("Number of Send2 transactions:");
    while(isNaN(parseInt(num))){
        num = prompt("Must be a valid number!");
    }
    for (let i = 0; i < num -1; i++){
        let cln = TRANSACTIONCONTAINER[0].cloneNode(true);
        TRANSACTIONSCONTAINER[0].appendChild(cln);
    }
    for(let i = 0; i < num; i++){
        TRANSACTIONCONTAINER[i].style.display = 'inherit';
    }
    let submit = document.getElementsByClassName('transact');
    for(let i = 0; i < submit.length; i++){
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
            ()=>{
                let names = document.getElementsByClassName('name');
                let amounts = document.getElementsByClassName('amount');
                let receivers = document.getElementsByClassName('rec-name');
                for(let i = 0; i < names.length; i++){
                    let user = names[i].value;
                    let amount = (amounts[i].value === "")? 0:parseFloat(amounts[i].value);
                    let receiver = receivers[i].value;
                    if (amount < 0){
                        continue;
                    }
                    for (let j = 0; j < window.localStorage.length; j++){
                        let obj = JSON.parse(localStorage[j]);
                        if (user.toUpperCase() === obj.user.toUpperCase()){
                            if (obj.balance >= amount){
                                for (let k = 0; k < window.localStorage.length; k++){
                                    let receiverObj = JSON.parse(localStorage[k]);
                                    if(receiver.toUpperCase() === receiverObj.user.toUpperCase()){
                                        obj.balance = obj.balance - amount;
                                        receiverObj.balance = receiverObj.balance + amount;
                                        obj = JSON.stringify(obj);
                                        receiverObj = JSON.stringify(receiverObj);
                                        localStorage.setItem(k, receiverObj);
                                        localStorage.setItem(j, obj);
                                    }
                                }
                            }
                            else{
                                continue;
                            }
                        }
                    }
                }
                location.reload();
            });
});