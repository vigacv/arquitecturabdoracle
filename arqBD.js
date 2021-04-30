var dicc = {
    "PGA": {
        "title": "Program Global Area", 
        "desc": "Es la porción de memoria que ocupa un server process (uno por server process) y es privada para cada server process. Comienza con 3 MB, aproximadamente, pero su tamaño varía conforme a la carga. Puede usar memoria swap/virtual en caso lo requiera (ORA-04030)."
    },
    "SGA":{
        "title": "System Global Area",
        "desc": "Es memoria compartida entre todos los server process. La distribución usual es 40% Buffer Cache y 40% Shared Pool. Cuando llega un query este primero pasa por el library cache, luego una vez se tiene el plan de ejecución, primero se consulta si los registros están en buffer cache, en cuyo caso se leen de ahí (logical read) y si no, se busca en disco (physical read). El Buffer Cache y el Shared Pool usan el algoritmo LRU (Least Recently Used) para organizar su espacio."
    },
    "Data Block": {
        "title": "Data Block",
        "desc": "Es la unidad mínima con la que se compone una base de datos, es decir son registros. Puede ser de varios tamaños: 2, 4, 8, 16 o 32 Kb. En Oracle se llama Data Block, en SQL Server se conoce como página. Sugerencia de tamaños: 2 - 4 Kb para bases de datos altamente transaccionales, 8 Kb Mixta (Transaccional + Reporteria (DW)), 16 - 32 Kb DW."
    }
};

var diccComponents = {
    "UI":{
        "titleComp": "User Information",
        "desc": "Guarda información mínima del usuario, como nombre de usuario, hostname del cliente, ejecutable, etc."
    },
    "PSQL":{
        "titleComp": "Private SQL Area",
        "desc": "Guarda variables de PL/SQL. *Nota: Un cursor es todo un PSQL Area a parte." 
    },
    "WKArea":{
        "titleComp": "Work Area",
        "desc": "Guarda operaciones de ordenamiento, como order by, group by, distinct, indices, join."
    },
    "Shared Pool":{
        "titleComp": "Shared Pool",
        "desc": "Cuando se hace una consulta, Oracle buscará el hash de dicha consulta aquí, en particular en el Library Cache y lanza el plan de ejecución (soft parse). De no encontrarlo lo guarda (hard parse)."
    },
    "Library Cache":{
        "titleComp": "Library Cache",
        "desc": "Aqui se guarda los hash de las consultas (case sensitive). Además lanza el plan de ejecución, el cual optimiza los queries."
    },
    "Data Dictionary":{
        "titleComp": "Data Dictionary",
        "desc": "Guarda información de las vistas que no tienen persistencia (ejemplo: v$instance)"
    },
    "Result Cache":{
        "titleComp": "Result Cache",
        "desc": "Creado en la versión 11g. Guarda resultados. Por ejemplo de un sum."
    },
    "ASH":{
        "titleComp": "Active Session History",
        "desc": "Creado en la versión 10g. Guarda cada segundo todo lo que se está haciendo en la base de datos (sentencias SQL + user id)"
    },
    "Large Pool":{
        "titleComp": "Active Session History",
        "desc": "Creado en la versión 9i para asumir ciertas responsabilidades que antes el Shared Pool hacía, como son: Backup/Restore (rman), paralelismo, Transacciones XA (aplicaciones que interactúa con múltiples bds)."
    },
    "Java Pool":{
        "titleComp": "Java Pool",
        "desc": "Introducido en la versión 8i. Espacio en memoria RAM donde se almacenan objetos Java instanciados. Requiere la JVM."
    },
    "Stream Pool":{
        "titleComp": "Java Pool",
        "desc": "Desde 9i. Guarda colas AQ (Advanced Queue). Replicación"
    },
    "Redo":{
        "titleComp": "Redo Log Buffer",
        "desc": "Sirve para recuperación. Guarda todas las sintaxis de sentencias DML, DDL, DCL. Es una especie de caja negra."
    }
}

var activarToolTips = function(){
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
    })
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
    console.log(e);
    console.log(e.innerHTML);
    var componentInfo = diccComponents[e.innerHTML];
    var currentComponent = e;
    console.log(componentInfo["desc"]);
    currentComponent.setAttribute("title", componentInfo["titleComp"]);
    currentComponent.setAttribute("data-bs-content", componentInfo["desc"]);
}

var asignarFuncionPopOvers = function(){
    for(let comp of document.getElementsByClassName("bdcomponent")){
        llenarInfoPopOver(comp);
    }
}

window.addEventListener("load", function(){
    activarToolTips();
    activarPopOvers();
    asignarFuncionInfoOffC();
    asignarFuncionPopOvers();
})