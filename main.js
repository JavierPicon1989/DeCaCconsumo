//Definicion de variables
const url = 'http://localhost/DCaC/productos.php'
const contenedor = document.querySelector('tbody')
let resultados = ''
const dolar = 270

const modalProducto = new bootstrap.Modal(document.getElementById('modalProducto'))
const formProducto = document.querySelector('form')
const nombre = document.getElementById('nombre')
const precio_pesos = document.getElementById('precio_pesos')
let opcion = ''

//seteo de btnCrear
btnCrear.addEventListener('click', ()=>{         
    opcion = 'crear'
    modalProducto.show() 
})

//funcion para mostrar los datos
const mostrar = (productos) => {
    productos.forEach(producto => {      
    resultados += `
            <tr>
                <td>${producto.id_producto}</td>
                <td>${producto.nombre}</td>
                <td>${producto.precio_pesos}</td>
                <td>${producto.precio_pesos / dolar}</td>
                <td class="text-center"><a class= "btnEditar btn btn-primary">Editar</a><a class= "btnBorrar btn btn-danger">Borrar</a></td>               
            </tr>
                  `
    })
        contenedor.innerHTML = resultados
}

//Mostrar datos
fetch(url)
.then( response => response.json() )
.then( data => mostrar(data) ) 
.catch (error => console.log(error))

const on = (element, event, selector, handler) => {

    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}


//Borrado de datos
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    //console.log(id)
   
    alertify.confirm("This is a confirm dialog.",
    
     function(){
      fetch(url+'?id='+id, {
    
        method : 'DELETE'
      })
      .then( res => res.json() )
      .then (() => location.reload())
      alertify.success('Ok');
    },
    function(){
      alertify.error('Cancel');
    });    
   
})

//Editar datos
  let idForm = 0
 on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const nombreForm = fila.children[1].innerHTML
    const precio_pesosForm = fila.children[2].innerHTML
    nombre.value = nombreForm;
    precio_pesos.value = precio_pesosForm;
    opcion = 'editar'
    modalProducto.show()    
   
}) 

//procedimiento para editar o crear
 formProducto.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion == 'crear'){
        fetch(url, {
            method: 'POST',
         headers: {
             'Content-Type':'application/json'
         }, 
         body: JSON.stringify({
             nombre : nombre.value,
             precio_pesos : precio_pesos.value
         })
        })
        .then(response => response.json())     
        .then( data=> {
            const nuevoProducto = []
            nuevoProducto.push(data)
            mostrar(nuevoProducto)
        })  
        .then(response => location.reload()) 
    }      
    
    if(opcion == 'editar'){
       fetch(url+'?id='+idForm, {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        }, 
        body: JSON.stringify({
            id_producto : idForm.valueOf(),
            nombre : nombre.value,
            precio_pesos : precio_pesos.value
        })
       })
       .then(response => response.json())
       .then(response => location.reload())
    }
   
    modalProducto.hide()

}) 















