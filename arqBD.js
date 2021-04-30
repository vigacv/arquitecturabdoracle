var dicc = {
    "PGA": 
        {"title": "Program Global Area", 
            "desc": "Es la porción de memoria que ocupa un server process (uno por server process) y es privada para cada server process. Comienza con 3 MB, aproximadamente, pero su tamaño varía conforme a la carga. Puede usar memoria swap/virtual en caso lo requiera (ORA-04030)."},
    "SGA":
        {"title": "System Global Area",
            "desc": ""}};

var diccComponents = {
    "UI":{
        "title": "User Information",
        "desc": "Guarda información mínima del usuario, como nombre de usuario, hostname del cliente, ejecutable, etc."
    },
    "PSQL":{
        "title": "Private SQL Area",
        "desc": "Guarda variables de PL/SQL. *Nota: Un cursor es todo un PSQL Area a parte." 
    },
    "WKArea":{
        "title": "Work Area",
        "desc": "Guarda operaciones de ordenamiento, como order by, group by, distinct, indices, join."
    }
}

var activarPopOvers = function(){
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
    })
}

var llenarInfoOffCanvas = function(e){
    var info = dicc[e.target.innerHTML];
    document.querySelector("#offcanvasBottomLabel").innerHTML = info.title;
    document.querySelector("#offCanvasBotomText").innerHTML = info.desc;
}

var asignarFuncionInfoOffC = function(){
    for(var title of document.getElementsByClassName("infoOffCanvas")){
        title.addEventListener("click", llenarInfoOffCanvas)
    }
}

var llenarInfoPopOver = function(e){
    var componentInfo = diccComponents[e.innerHTML]
    var currentComponent = e;
    currentComponent.setAttribute("title", componentInfo.title);
    currentComponent.setAttribute("data-bs-content", componentInfo.desc);
}

var asignarFuncionPopOvers = function(){
    for(var comp of document.getElementsByClassName("bdcomponent")){
        llenarInfoPopOver(comp);
    }
}

window.addEventListener("load", function(){
    activarPopOvers();
    asignarFuncionInfoOffC();
    asignarFuncionPopOvers();
})