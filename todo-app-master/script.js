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

    console.log(evt);

    dispatchEvent(evt);
    task_input.value = "";
}

function changeStateLocal(key, status){
    var task = Tasck.creatFromString(localStorage.getItem(key));
    oldV = task.toString;
    task.statu = status;
    localStorage.setItem(key,task);

    //trigger storage event 
    var evt = new StorageEvent('storage', {
        key: key,
        newValue: task,
        oldValue: oldV
    });

    dispatchEvent(evt);

}

function addLi(taskName,ul,statu,key){

    

    var li = document.createElement("li");
    var inp = document.createElement("input");
    var div = document.createElement("div");

    inp.setAttribute("type","checkbox");

    div.classList.add("li-item");
    div.classList.add(`id_${key}`);
    
    li.appendChild(inp);
    li.appendChild(document.createTextNode(taskName));
    div.appendChild(li);

    if(ul == uls[2]){
        //<i class="material-symbols-rounded user-unselect"> delete </i> 
        var i = document.createElement("i");
        i.classList.add("material-symbols-rounded");
        i.textContent = "delete";

        div.appendChild(i);

        i.addEventListener('click',()=>{
            localStorage.removeItem(key);
            //trigger storage event 
            var evt = new StorageEvent('storage', {
                key: key,
                oldValue: `${taskName},${statu}`
            });

        console.log(evt);

        dispatchEvent(evt);
            div.remove();
        });
    }

    inp.addEventListener("change",()=>{
        if (inp.checked){
            li.style.textDecoration = "line-through";
            li.style.color = "gray";
            changeStateLocal(key,"done");
        }
        else{
            li.style.textDecoration = "none";
            li.style.color = "black";
            changeStateLocal(key,"todo");
        }
    });

    if(statu === "done"){
        inp.click();
        li.style.textDecoration = "line-through";
        li.style.color = "gray";
    }
    ul.appendChild(div);


}

function changeLi(taskName,statu,key,cl){

    let old_li = document.querySelector(`${cl} div.id_${key}`);

    var li = document.createElement("li");
    var inp = document.createElement("input");
    var div = document.createElement("div");

    inp.setAttribute("type","checkbox");

    li.appendChild(inp);
    li.appendChild(document.createTextNode(taskName));
    div.appendChild(li);
    div.classList.add("li-item");
    div.classList.add(`id_${key}`);

    inp.addEventListener("change",()=>{
        if (inp.checked){
            li.style.textDecoration = "line-through";
            li.style.color = "gray";
            changeStateLocal(key,"done");
        }
        else{
            li.style.textDecoration = "none";
            li.style.color = "black";
            changeStateLocal(key,"todo");
        }
    });

    if(statu === "done"){
        inp.click();
        li.style.textDecoration = "line-through";
        li.style.color = "gray";
    }
    old_li.parentNode.replaceChild(div,old_li);

}


 function addTasck(task,key) {

    task_split = task.split(',');


    switch (task_split[1]){
        case "todo":
            addLi(task_split[0],uls[0],"todo",key);
            addLi(task_split[0],uls[1],"todo",key);
            break;

        case "done":
            addLi(task_split[0],uls[0],"done",key);
            addLi(task_split[0],uls[2],"done",key);
            break;
        default:
            break;
    }
    
    
}

function mathChangesTask(key){


    /*
        We assume that the task state in localStorage.getItem{key} changed 
        (from: 'todo' to: 'done' or the othre way around)
        therfore we need to update all the ul elements.

    */

    task_split = localStorage.getItem(key).split(',');

    switch (task_split[1]){
        case "todo":

            /*
                from: done => todo 
                1: remove li from complete 
                2: add it in active
            */
           let rm_todo_li = document.querySelector(`.complete .id_${key}`);
           rm_todo_li.remove();

           addLi(task_split[0],uls[1],"todo",key);
           changeLi(task_split[0],"todo",key,".all");

            break;

        case "done":
            /*
                from: to => done 
                1: remove li from active 
                2: add it in complete
            */
            let rm_done_li = document.querySelector(`.active .id_${key}`);
            rm_done_li.remove();
    
            addLi(task_split[0],uls[2],"done",key);
            changeLi(task_split[0],"done",key,".all");

            break;
        default:
            break;
    }

}

function removeFromList(key){

    const rm_every= document.querySelectorAll(`div.id_${key}`);

    rm_every.forEach((elem)=>{
        elem.remove();

    });

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
                add_bar.classList.add("hidden");

            }
            else {
                add_bar.classList.remove("hidden");
            }
            
        }
    });
    
}

window.addEventListener('storage', (e)=>{
    let key = parseInt(e.key);
    if (e.newValue != null && e.oldValue == null){
        //element added to localStorage
        
        addTasck(e.newValue,key);
    }
    else if(e.newValue != null){
        //element modify in localStorage

        mathChangesTask(key);

    }
    else if(e.oldValue != null && e.newValue == null){
        //element removed from  localStorage
        removeFromList(key)
    }

}, false);

/* Populate list (on page load) */

for (let index = 0; index < localStorage.length; index++) {
    let key = localStorage.key(index);
    addTasck(localStorage.getItem(key),key);    
}