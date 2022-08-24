window.onload=(event)=>{
    
    window["inicio"].addEventListener("click", (event)=>push(event));
    window["recomendados"].addEventListener("click", (event)=>push(event));
    window["registrarme"].addEventListener("click", (event)=>push(event));
    cargar("inicio"); 
}
 
async function load_content(id){
    let response=await fetch(`${window.location.origin}/${id}.html`); 
    let contenedor= document.querySelector("#content");
    try{
        
        
        if (response.ok) {
            let content =await response.text();
            contenedor.innerHTML=content;
            if(id=="recomendados"){
                iniciarPaginaTabla();
            }
            else if(id=="registrarme"){
                iniciarPaginaCaptcha();
            } 
        }
        else {
           contenedor.innerHTML="Error loading for /"+ id+"...";
        }
    }
    catch(error){
        contenedor.innerHTML="Error";
    }
}
//para volver a la pagina anterior
window.addEventListener("popstate", (event)=>{ 
    let stateId=event.state.id; //agarro el estado anterior
    console.log("stateId =", stateId);
    load_content(stateId); //agarro el contenido anterior
    document.title=stateId;
})
function push (event){
    let id=event.target.id;
    cargar(id);
}
function cargar(id){
    document.title=id; //se va a cambiar el nombre del tab
    load_content(id);
    window.history.pushState({id}, `${id}`, `/${id}`); //pushea el estado, cambia la URL
}
