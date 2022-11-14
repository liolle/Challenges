const input = document.querySelectorAll('input[type="checkbox"]');
const li = document.querySelectorAll('.list-items ul li');
const ul = document.querySelector('.list-items ul');

var task_input = document.querySelector('.add-bar-container input');

const add_button = document.querySelector('.add-bar-container button');


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


 function addTasck(tasck) {
    var ul = document.querySelector('.list-items ul');
    var li = document.createElement("li");
    var inp = document.createElement("INPUT");
    inp.setAttribute("type","checkbox");

    li.appendChild(inp);
    li.appendChild(document.createTextNode(tasck));
    ul.appendChild(li);

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
}


add_button.addEventListener("click",()=>{
    if (task_input.value != "" && task_input.value != null && task_input.value != undefined){


        let tasck= task_input.value;

        //add tasck in list

        addTasck(tasck);

        task_input.value = "";
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
        }
    });
    
}