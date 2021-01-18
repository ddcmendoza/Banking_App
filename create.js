

const ADD = document.getElementById('add');
const ADDS = document.getElementById('batch-add');

const ADDCONTAINER = document.getElementsByClassName('add-container');
const ADDSCONTAINER = document.getElementsByClassName('adds-container')[0];

let users = [];

for(let i = 0; i < window.localStorage.length; i++){
    let obj = JSON.parse(localStorage[window.localStorage.key(i)]);
    users.push(obj.user);
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function isIn(name, names){
    for (let i = 0; i < names.length; i++){
        if(name.capitalize() === names[i].capitalize()){
            return true;
        }
    }
    return false;
}

ADD.addEventListener(
    'click',
    () =>{
        ADDCONTAINER[0].style.display = 'inherit';
        ADD.style.display = 'none';
        ADDS.style.display = 'none';
        let submit = ADDCONTAINER[0].lastElementChild;
        submit.addEventListener('click',
        ()=>{
            // insert code for pushing to local storage
            let names = document.getElementsByClassName('name');
            let balances = document.getElementsByClassName('balance');
            let user = names[0].value;
            if (user === '' || isIn(user,users)){
                location.reload();
            }
            let balance = (balances[0].value === "")? 0:parseFloat(balances[0].value);
            if (balance < 0){
                alert("Initial balance must be 0 or positive!");
                location.reload();
            }
            let obj = {
                "user": user,
                "balance": balance
            }
            obj = JSON.stringify(obj);
            let n = window.localStorage.length;
            localStorage.setItem(n, obj);

            location.reload();
        });
    }
);


ADDS.addEventListener(
    'click',
    () =>{
        let num = prompt("Number of users to be added:");
        while(isNaN(parseInt(num))){
            num = prompt("Must be a valid number!");
        }
        for (let i = 0; i < num -1; i++){
            let cln = ADDCONTAINER[0].cloneNode(true);
            ADDSCONTAINER.appendChild(cln);
        }

        for(let i = 0; i < num; i++){
            ADDCONTAINER[i].style.display = 'inherit';
        }

        let submit = document.getElementsByClassName('addusers');
        for(let i = 0; i < submit.length; i++){
            submit[i].style.display = 'none';
        }
        let submitAllContainer = document.createElement('div');
        submitAllContainer.id = 'submitAllContainer';
        let submitAll = document.createElement('button');
        submitAll.innerHTML = "Submit All";
        submitAll.id = 'submitAll';
        submitAllContainer.appendChild(submitAll);
        ADDSCONTAINER.appendChild(submitAllContainer);
        ADD.style.display = 'none';
        ADDS.style.display = 'none';

        submitAll.addEventListener('click', 
            ()=>{
                let names = document.getElementsByClassName('name');
                let balances = document.getElementsByClassName('balance');
                // insert code for pushing to local storage
                for(let i = 0; i < names.length; i++){
                    let user = names[i].value;
                    if (user === '' || isIn(user,users)){
                        continue;
                    }
                    let balance = (balances[i].value === "")? 0:parseFloat(balances[i].value);
                    if (balance < 0){
                        continue;
                    }
                    let obj = {
                        "user": user,
                        "balance": balance
                    }
                    obj = JSON.stringify(obj);
                    let n = window.localStorage.length;
                    localStorage.setItem(n, obj);
                }
                location.reload();
            });
    }
);
