//* SELECTORES

const formC = document.querySelector('#form-create');
const formL = document.querySelector('#form-login');

const createInput = document.querySelector('#create-input');
const loginInput = document.querySelector('#login-input');

const notificacion = document.querySelector('.notification');

//* EVENTOS:

//Para crear el usuario:

formC.addEventListener('submit', async e=>{
    e.preventDefault();
    const response = await fetch('http://localhost:3000/users', {metod: 'GET'});
    const users = await response.json();

    //voy a buscar el usuario que estoy colocando en el campo dentro del recurso users:
    const user = users.find(user=> user.username === createInput.value);

    //validamos:

    if(!createInput.value){//<---si el campo esta vacio
        
        notificacion.innerHTML = "El campo de usuario no puede estar vacio";
        notificacion.classList.add('show-notification');

        setTimeout(()=>{
            notificacion.classList.remove('show-notification')
        },2500);
    }else if(user){//<---caso de que el usuario ya existe

        notificacion.innerHTML = "El usuario ya existe";
        notificacion.classList.add('show-notification');

        setTimeout(()=>{
            notificacion.classList.remove('show-notification')
        },2500);
    }else{

        //En caso de crear un usuario nuevo:
        await fetch('http://localhost:3000/users',{
            metod: 'POST',
            headers:{
                'Content-type':'aplication/json'
            },
            body: JSON.stringify({username: createInput.value})    
        });

        notificacion.innerHTML = `El usuario ${createInput.value} ha sido creado`;
        notificacion.classList.add('show-notification');

        setTimeout(()=>{
            notificacion.classList.remove('show-notification');
        },2500);

        createInput.value = '';
    }

})

//Para hacer login:

formL.addEventListener('submit', async e=>{
    e.preventDefault();

    const response = await fetch('http://localhost:3000/users', {metod: 'GET'});
    const users = await response.json();

    //Buscar el usuario:
    const user = users.find(user=> user.username === loginInput.value);

    //Validar:
    if(!user){
        notificacion.innerHTML = "El usuario no existe";
        notificacion.classList.add('show-notification');

        setTimeout(()=>{
            notificacion.classList.remove('show-notification');
        },2500);
    }else{
        //Si se hace el login, primero se guarda en el localstorage y luego se abre una nueva ventana(pagina):
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '../tareas/tareas.html';
    }
})