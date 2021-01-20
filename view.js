/*
TO DO:
Repair Implementation so history will not be display here
[done]
*/


//div container for users
const USERCONTAINER = document.getElementsByClassName("user-container")[0];

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'Php',
    minimumFractionDigits: 2
  })

//Create child div containers for every item in the local storage, append to parent
window.onload = (event) => {
    for (let i = 0; i < window.localStorage.length-1; i++) {
        let div = document.createElement("div");
        let h2 = document.createElement("h2");
        let p = document.createElement("p");
        let obj = JSON.parse(localStorage[i]);
        let notes = document.createElement("div");
        let ta = document.createElement("textarea");
        h2.innerHTML = obj.user;
        p.innerHTML = "Balance : " + formatter.format(obj.balance);
        ta.id = "ta" + i;
        ta.style.resize = 'none';
        ta.style.display = 'none';
        ta.style.width = "90%";
        notes.innerHTML = (obj.notes === undefined)? 'Put notes here': obj.notes;
        notes.id = 'clickable' + i;

        notes.addEventListener('click', 
        ()=>{
            let toggle = document.querySelector('div#clickable' +i);
            let tatoggle = document.querySelector('textarea#ta'+i);
            toggle.style.display = 'none';
            tatoggle.style.display = 'inherit';
            tatoggle.value  = toggle.innerHTML;
            onkeydown = (event) =>{
                let key = event.keyCode;
                // keyCode 13 is Enter
                if(key==13){
                    tatoggle.style.display = 'none';
                    toggle.style.display = 'inherit';
                    toggle.innerHTML = tatoggle.value;
                    obj.notes = notes.innerHTML;
                    obj = JSON.stringify(obj);
                    localStorage.setItem(i,obj);
                }
            }
        });
        div.appendChild(h2);
        div.appendChild(p);
        div.appendChild(notes);
        div.appendChild(ta);

        div.id = "userbox";
        div.classList.add("user" + i);
        USERCONTAINER.appendChild(div);
    }
    let body = document.body.children;
    for(let i = 0; i < body.length; i++){
        if(body[i].className !== ""){
            body[i].style.animation = "fade "+ i*.75 + "s";
        }
    }
}
// Add on click values? notes.