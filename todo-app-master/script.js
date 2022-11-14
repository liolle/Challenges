const input = document.querySelectorAll('input[type="checkbox"]');
const li = document.querySelectorAll('.list-items ul li');
const uls = document.querySelectorAll('.list-items ul');

var task_input = document.querySelector('.add-bar-container input');

const add_button = document.querySelector('.add-bar-container button');

const add_bar = document.querySelector('.add-bar');


class Tasck {

    constructor(name, statu) {
        this.name = name;
        this.statu = statu;
    }

    toString(){
        return `${this.name},${this.statu}`;
    }

    static creatFromString(str){
        let split_string = str.split(',');
        return new Tasck(split_string[0],split_string[1]);
    }
}


for (let index = 0; index < input.length; index++) {
    input[index].addEventListener("change",()=>{
        if (input[index].checked){
            li[index].style.textDecoration = "line-through";
            li[index].style.color = "gray";
        }
        else{
            li[index].style.textDecoration = "none";
            li[index].style.color = "black";
        }
    });
    
}

function addLocal(task){

    for(let char of task){
        if (char === ','){
            alert("Please remove all commas from the tasck name");
            return;
        }
    }

    let size = localStorage.length;

    // state : "done" | "todo"

    const new_tasck = new Tasck(task,"todo");

    var key ;

    for (let index = 0; index < 5 && localStorage.length<=size; index++) {
        let random_num = Math.floor(Math.random()*10000)
        key = random_num;
        localStorage.setItem(random_num,new_tasck);
        
    }

    //trigger storage event 
    var evt = new StorageEvent('storage', {
        key: key,
        newValue: new_tasck
    });

    dispatchEvent(evt);
    task_input.value = "";
}

function addLi(taskName,ul,statu){

    var li = document.createElement("li");
    var inp = document.createElement("input");

    inp.setAttribute("type","checkbox");
    li.appendChild(inp);
    li.appendChild(document.createTextNode(taskName));

    inp.addEventListener("change",()=>{
        if (inp.checked){
            li.style.textDecoration = "line-through";
            li.style.color = "gray";
        }
        else{
            li.style.textDecoration = "none";
            li.style.color = "black";
        }
    });

    if(statu === "done"){
        inp.click();
    }
    ul.appendChild(li);


}


 function addTasck(task,key) {


    //var ul = document.querySelector('.list-items ul');

    task_split = task.split(',');


    switch (task_split[1]){
        case "todo":
            addLi(task_split[0],uls[0],"todo");
            addLi(task_split[0],uls[1],"todo");
            break;

        case "done":
            addLi(task_split[0],uls[0],"done");
            addLi(task_split[0],uls[2],"done");
            break;
        default:
            break;
    }
    
    
}


add_button.addEventListener("click",()=>{
    if (task_input.value != "" && task_input.value != null && task_input.value != undefined){


        let tasck= task_input.value;

        //add tasck in list

        addLocal(tasck);

    }
});

/* Slide indicator */ 

const marker_list = document.querySelectorAll('.marker');
const lists =  document.querySelectorAll('.list-items');


for (let index = 0; index < marker_list.length; index++) {
    marker_list[index].addEventListener('click',()=>{

        
        if(!marker_list[index].classList.contains("indicator")){
            /* Switch indicator */ 
            let current_indicator = document.querySelector('.indicator');           
            current_indicator.classList.remove("indicator");
            marker_list[index].classList.add("indicator");

            /* show correct list */
            let current_list = document.querySelector('.active_list'); 
            current_list.classList.remove("active_list");
            lists[index].classList.add("active_list");

            if (index == 2){
                console.log("hidden");
                add_bar.classList.add("hidden");

            }
            else {
                add_bar.classList.remove("hidden");
            }
            
        }
    });
    
}

window.addEventListener('storage', (e)=>{
    console.log(e)
    if (e.newValue != null){
        let key = parseInt(e.key);
        addTasck(e.newValue,key);
    }

}, false);

/* Populate list (on page load) */

for (let index = 0; index < localStorage.length; index++) {
    let key = localStorage.key(index);
    addTasck(localStorage.getItem(key),key);    
}