let btn_variation = document.getElementsByTagName("button");

let variation ;
let shadow_off ;
let disable ;
let icon;
let size;
let color;

const map = new Map();
// [default color, selected color]
map.set('b1',['#E0E0E0','#AEAEAE']) 
map.set('b2',['#ffffff','#2962ff33'])
map.set('b3',['#ffffff','#2962ff33'])
map.set('b4',['#3D5AFE','#0039CB'])
map.set('b5',['#E0E0E0','#AEAEAE'])
map.set('b6',['#FAFBFD','#AEAEAE'])
map.set('b7',['#2962FF','#0039CB'])
map.set('b8',['#2962FF','#0039CB'])
map.set('b9',['#2962FF','#0039CB'])
map.set('b10',['#2962FF','#0039CB'])
map.set('b11',['#2962FF','#0039CB'])
map.set('b12',['#2962FF','#0039CB'])
map.set('b13',['#2962FF','#0039CB'])
map.set('b14',['#2962FF','#0039CB'])
map.set('b15',['#2962FF','#0039CB'])
map.set('b16',['#E0E0E0','#AEAEAE'])
map.set('b17',['#2962FF','#0039CB'])
map.set('b18',['#455A64','#1C313A'])
map.set('b19',['#D32F2F','#9A0007'])






function changeVariation(btn){
    
    //reset color current chose
    //change color selected chose
    if (!variation){
        variation = btn
        variation.style.background = map.get(`${variation.id}`)[1]; 
        return;
    }
    else{

        if(variation.id == btn.id){
            variation.style.background = map.get(`${variation.id}`)[0];
            variation = null;
            return
        }
        variation.style.background = map.get(`${variation.id}`)[0]; 

        btn.style.background = map.get(`${btn.id}`)[1];
        variation = btn;
    }

    
    
}

function changeShadow(btn){

    if (!shadow_off){
        shadow_off = btn;
        btn.style.background = map.get('b4')[1];
    }
    else{
        shadow_off = null;
        btn.style.background = map.get('b4')[0];
    }
}

function changeDisable(btn){

    if (!disable){
        disable = btn
        disable.style.background = map.get(`${disable.id}`)[1]; 
        return;
    }
    else{

        if(disable.id == btn.id){
            disable.style.background = map.get(`${disable.id}`)[0];
            disable = null;
            return
        }

        disable.style.background = map.get(`${disable.id}`)[0]; 
        btn.style.background = map.get(`${btn.id}`)[1];
        disable = btn;
    }
}

function changeIcon(btn){


    if (!icon){
        icon = btn
        icon.style.background = map.get(`${icon.id}`)[1]; 
        return;
    }
    else{

        if(icon.id == btn.id){
            icon.style.background = map.get(`${icon.id}`)[0];
            icon = null;
            return
        }

        icon.style.background = map.get(`${icon.id}`)[0]; 
        btn.style.background = map.get(`${btn.id}`)[1];
        icon = btn;
    }
}

function changeSize(btn){
    if (!size){
        size = btn
        size.style.background = map.get(`${size.id}`)[1]; 
        return;
    }
    else{

        if(size.id == btn.id){
            size.style.background = map.get(`${size.id}`)[0];
            size = null;
            return
        }

        size.style.background = map.get(`${size.id}`)[0]; 
        btn.style.background = map.get(`${btn.id}`)[1];
        size = btn;
    }
}

function changeColor(btn){
    if (!color){
        color = btn
        color.style.background = map.get(`${color.id}`)[1]; 
        return;
    }
    else{
        
        if(color.id == btn.id){
            color.style.background = map.get(`${color.id}`)[0];
            color = null;
            return
        }

        color.style.background = map.get(`${color.id}`)[0];
        btn.style.background = map.get(`${btn.id}`)[1];
        color = btn;
    }
}

for(let btn of btn_variation){

    btn.addEventListener('click',(e)=>{

        switch(btn.className){
            case 'var':
                changeVariation(btn);
                break;
            case 'shadow':
                changeShadow(btn);
                break;
            case 'disable':
                changeDisable(btn);
                break;
            case 'icon':
                changeIcon(btn);
                break;
            case 'size':
                changeSize(btn);
                break;
            case 'color':
                changeColor(btn);
                break;
                
        }

    });

    
}








