//variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];

        limpiarHTML();
    })
}


//Funciones
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }        
}

function eliminarCurso(e) {
   if(e.target.classList.contains('borrar-curso')) {
       const cursoId = e.target.getAttribute('data-id');

       //eliminar del array
       articulosCarrito = articulosCarrito.filter(curso => curso.id != cursoId);

       console.log(articulosCarrito);
       
       carritoHTML();
   }
}

//Lee el contenido del html al que le dimos click y axtrae la informaicon del curso
function leerDatosCurso(curso) {
  

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //revisa si un elemnto ya existe
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(existe) {
        //actualizar la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            }else {
                return curso;
            }
        })
        articulosCarrito = [...cursos];
    } else {
        //agregar elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    
    
    console.log(articulosCarrito);
    carritoHTML();
}


//muestra el carrito de compras en el html
function carritoHTML() {

    limpiarHTML();

    articulosCarrito.forEach( (curso) => {

        const {imagen,titulo,precio,cantidad,id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `

            <td><img src="${imagen}" width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

        //agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

function limpiarHTML() {

    //forma lenta
    //contenedorCarrito.innerHTML = '';

    //forma optima de limpiar el html
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}