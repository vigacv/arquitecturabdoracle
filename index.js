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
    },
    "Parameter File":{
        "title": "Parameter File",
        "desc": "Define como se configura la instancia. Guarda parametros de la base de datos. En oracle hay alrededor de 300 parametros. 2 modos: PFILE O SPFILE. <ul><li>PFILE(initPRDSID.ora): Archivo plano. Se puede editar de manera directa pero requiere reinicio.</li><li>SPFILE(spfilePRDSID.ora): Es un archivo binario y solo se puede editar con comandos SQL (alter system). 2/3 de los parametros son cambiantes sin reinicio.</li></ul>"
    },
    "LGWR":{
        "title": "Log Writter",
        "desc": "Escribe el log. Lee lo que está en memoria en el Redo Log Buffer y lo manda a los Redo Log Files. Ocurre: <ul><li>Cada 3 segundos</li><li>Cada commit</li><li>Cada 1MB de updates</li></ul>" 
    },
    "DBWR":{
        "title": "Database writter",
        "desc": "Baja la información que está en el buffer cache y la guarda para su persistencia. Las operaciones de update, insert y delete ocurren en el buffer cache, pero se requieren bajar a la capa física para que persistan. Se ejecuta: <ul><li>Cuando el buffer cache esta lleno</li><li>Cuando se hace alguna operacion de DROP.</li><li>Cuando hay demasiado dirty blocks (registros cambiados que aun no son guardados en disco).</li></ul>"
    },
    "CKPT":{
        "title": "Checkpoint Process",
        "desc": "De por sí no hace nada, es un coordinador. 'Mi base de datos todo el tiempo es inconsistente', se dice esto porque la información que está en memoria no es exactamente igual a la que está en capa física, existe una desincronización normal. El Checkpoint Process tiene como objetivo dejar la base de datos consistente, lo cual logra cuando se ejecuta, pero la siguiente fracción de segundo vuelve a estar inconsistente. Le ordena a los otros bg processes ejecutarse. Ocurre: <ul><li>Cada 1800 segundos (se pude modificar)</li><li>Cuando se detiene la bd de manera limpia</li><li>Switch de redo logs.</li></ul>"
    },
    "SMON":{
        "title": "System MONitor",
        "desc": "Tiene dos principales funciones: <ol><li>Instance Recovery: El SCN (Sequence Changed Number) es un id incremental que la bd genera por cada transaccion y que también tienen los datafiles en sus cabeceras, el cual se sincroniza con el CKPT. Cuando la bd no baja bien y el SCN no es consistente, se inicia el Instance Recovery.</li><li>Limpieza de temporales (tempfiles)</li></ol>"
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
    },
    "PFILE":{
        "titleComp": "Parameter File",
        "desc": "(initPRDSID.ora) Archivo plano. Se puede editar de manera directa pero requiere reinicio."
    },
    "SPFILE":{
        "titleComp": "Redo Log Buffer",
        "desc": "(spfilePRDSID.ora) Es un archivo binario y solo se puede editar con comandos SQL (alter system). 2/3 de los parametros son cambiantes sin reinicio."
    },
    "Control File":{
        "titleComp": "Control File",
        "desc": "Metadata de la base de datos. Guarda el SCN"
    },
    "Background processes":{
        "titleComp": "Background processes",
        "desc": "Se encargan de hacer convivir lo de arriba (instancia) con lo de abajo (capa física). Conocidos como demonios/daemons porque están ejecutandose todo el tiempo."
    },
    "PMON":{
        "titleComp": "Process MONitor",
        "desc": "Se encarga de la recuperación de recursos cuando una sesión no se cierra correctamente. Hace rollback para liberar las tablas que podrían estar bloqueadas."
    },
    "LREG":{
        "titleComp": "Listener Registration",
        "desc": "Desde 12c. Sus tareas eran antes realizadas por el PMON. Agarra los servicios de la bd y busca un listener por default (puerto 1521/tcp) y registrará los servicios ahí para habilitar la conexión."
    },
    "MMAN":{
        "titleComp": "Memory Manager",
        "desc": "Desde 10g. Reparte la memoria asignada al SGA entre sus componentes."
    },
    "MMNL":{
        "titleComp": "MMON Lite",
        "desc": "Desde 10g. Descarga la información del ASH y lo graba en los datafiles, en particular en unas tablas que sirven para afinamiento. Hace muestras de cada 10 segundos."
    },
    "MMON":{
        "titleComp": "Manageability Monitor",
        "desc": "Desde 10g. Toma fotos a la estructura de la BD (como esta el PGA, cuanta memoria ocupa, como estan los discos, etc.) y lo encapsula en snapshots. Ocurre cada hora y permanece por 8 dias por default. Tambien se encarga de borrar los archivos trace."
    },
    "RECO":{
        "titleComp": "Recoverer",
        "desc": "Se usa en dblink, para confirmar transacciones entre bases de datos remotas, y cancelarlas si es necesario."
    },
    "SMCO":{
        "titleComp": "Space Management Coordinator",
        "desc": "Responsable de asegurar que haya espacio en los tablespaces."
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