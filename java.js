//API 
const inputReceta = document.getElementById("inputReceta");
const cargarRecetas = document.getElementById("cargarRecetas");
const receta = document.getElementById("receta");

//BOTON CARGAR RECETAS
cargarRecetas.addEventListener("click", () => {
  const nombre = inputReceta.value.trim();
  if (nombre) {
    obtenerReceta(nombre);
  } else {
    mostrarMensaje("Por favor, ingresa el nombre de una receta.");
  }
});

inputReceta.addEventListener("keydown", (e) => {
  if (e.key === "Enter") cargarRecetas.click();
});

//FUNCION PARA LA API
async function obtenerReceta(nombre) {
  try {
    mostrarMensaje(" Buscando Receta...");

    const respuesta = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nombre}`);
    if (!respuesta.ok) throw new Error("Receta no encontradoa. Intente nuevamente más tarde.");

    const data = await respuesta.json();

   if (data.meals) {
    const meal = data.meals[0];
  
    

    //INGREDIENTES

  let ingredientes = '';
    for (let i = 1; i <= 20; i++) {
      const ingrediente = meal[`strIngredient${i}`];
      const medida = meal[`strMeasure${i}`];
        
    if (ingrediente && ingrediente.trim() !== '' && ingrediente.trim() !== 'null') {
          ingredientes += `<li>${medida ? medida : ''} ${ingrediente}</li>`;
        }
  }
    
  //RECETA
    receta.innerHTML = `
      <div class="api-item">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h2>${meal.strMeal}</h2>
        <div class="receta-info">
          <p>Categoria: ${meal.strCategory || 'N/A'}</p>
          <p>Ingradientes:</p>
          <ul class="ingredientes-list">
            <p>${ingredientes} </p>
          </ul>
          <p>Instrucciones: ${meal.strInstructions}</p>
        </div>
      </div>
    `;
  } else {
    mostrarMensaje("Receta no encontrada. Intenta con: pizza, pasta, chicken, curry, beef.");
    
  }

  } catch (error) {
    mostrarMensaje(error.message);
    
  }
}

function mostrarMensaje(texto) {
 receta.innerHTML = `<div class="placeholder">${texto}</div>`;
}
//MENSAJE INICIAL
mostrarMensaje("Por favor, ingresa el nombre de una receta y presiona 'Cargar Recetas'.");


//FIN API
//FORMULARIO

const formulario = document.getElementById("contactForm");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const asunto = document.getElementById("asunto");
const mensaje = document.getElementById("mensaje");
const successMessage = document.getElementById("successMessage");


//validacion
nombre.addEventListener('input', function() {
    if (this.value.trim().length < 3) {
        mostrarError(this, 'El nombre debe tener al menos 3 caracteres');
    } else {
        limpiarError(this);
    }
});

email.addEventListener('blur', function() {
    if (this.value.trim() === '') {
        mostrarError(this, 'El email es obligatorio');
    } else if (!this.value.includes('@') || !this.value.includes('.')) {
        mostrarError(this, 'Ingresa un email válido');
    } else {
        limpiarError(this);
    }
});

asunto.addEventListener('change', function() {
    if (this.value === '') {
        mostrarError(this, 'Selecciona un asunto');
    } else {
        limpiarError(this);
    }       
});

mensaje.addEventListener('input', function() {
    if (this.value.trim().length < 10) {
        mostrarError(this, 'El mensaje debe tener al menos 10 caracteres');
    } else {
        limpiarError(this);
    }
});


//ENVIO DEL FORMULARIO
formulario.addEventListener('submit', function(event) {
    event.preventDefault(); 
    let valido = true;

    //VALIDACIONES
    if (nombre.value.trim().length < 3) {
        mostrarError(nombre, 'El nombre debe tener al menos 3 caracteres');
        valido = false;
    }   
    if (email.value.trim() === '') {
        mostrarError(email, 'El email es obligatorio');
        valido = false;
    }

    if (asunto.value === '') {
        mostrarError(asunto, 'Selecciona un asunto');
        valido = false;
    } 
    if (mensaje.value.trim().length < 10) {
        mostrarError(mensaje, 'El mensaje debe tener al menos 10 caracteres');
        valido = false;
    } 

    if (valido) {
        successMessage.style.display = 'block';
        formulario.style.display = 'none';
    }   

     setTimeout(function() {
        successMessage.style.display = 'none';
        formulario.style.display = 'block';
        formulario.reset(); 
        limpiarError(nombre);
        limpiarError(email);
        limpiarError(asunto);
        limpiarError(mensaje);
    }, 5000);
    
});
    

function mostrarError(campo, mensaje) {
    console.log(campo)
    const errorElemento = document.getElementById(`error${campo.id.charAt(0).toUpperCase() + campo.id.slice(1)}`);
    errorElemento.textContent = mensaje;
    campo.classList.add('invalid');
    campo.classList.remove('valid');
}

function limpiarError(campo) {
    const errorElemento = document.getElementById(`error${campo.id.charAt(0).toUpperCase() + campo.id.slice(1)}`);
    errorElemento.textContent = '';
    campo.classList.remove('invalid');
    campo.classList.add('valid');
}
