//Selecciona elementos
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Nombres de las clases
const CHECK = "fa-check-circle"
const UNCHECK = "fa-circle-thin"
const LINE_THROUGH = "lineThrough"

//Variables
let LIST, id;

//Obtener objeto del localstorage
let data = localStorage.getItem("TODO");

//Revisa que la información no este en blanco
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadToDo(LIST);
    
} else {
    LIST = [];
    id = 0;
}

//Carga los objetos en la interfaz del usuario
function loadToDo(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash)
    });
}

//Limpia el localstorage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})

//Muestra la fecha
const options = {weekday:'long', day:'numeric', month:'short'}
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options)


//Función de agregar
function addToDo(toDo, id, done, trash){

    if(trash){  return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}"> ${toDo} </p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                 </li>`
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}


//Agrega una tarea con la tecla enter
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const toDo = input.value; 

        //En caso de que no esté vacio
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                })
            
            localStorage.setItem("TODO", JSON.stringify(LIST))
            
            id++;
        }
        input.value = "";
    }
})

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//Elimina la tarea
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    deleteId(element.id, LIST);
    localStorage.setItem("TODO", JSON.stringify(LIST));
}

function deleteId(id, array){
    array.forEach(function(currentValue, index, arr){
        if(array[index].id == id){
            array.splice(index, 1);
        }
    });
}

//Obtiene los objetos dinámicos 
list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        completeToDo(element);
    } else if(elementJob == "delete"){
        removeToDo(element);
    }

    localStorage.setItem("TODO", JSON.stringify(LIST));
});

