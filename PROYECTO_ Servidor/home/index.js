//* SELECTORES:
const formL = document.querySelector('#form-login');
const formC = document.querySelector('#form-create');
const inputL = document.querySelector('#login-input');
const inputC = document.querySelector('#create-input');
const notificacion = document.querySelector('.notification');


//* EVENTOS:

formC.addEventListener('submit', async e=>{ //? <--- operacion asincrona
    e.preventDefault();

    const respuesta = await fetch('http://localhost:3000/user', {
        method:'GET'
    });

    const users = await respuesta.json();

    //buscar si ya existe un usuario con el mismo nombre:
    const user = users.find(user=>user.nombre === inputC.value);
    ////console.log(user)

    //validaciones:
    if(!inputC.value){
        //el campo esta vacio
        console.log('El usuario no puede estar vacio')
        notificacion.innerHTML = 'El usuario no puede estar vacio';
        notificacion.classList.add('show-notification');

        setTimeout(()=>{
            notificacion.classList.remove('show-notification');//<--esta clase le hace display a la notificacion
        },2500);
    }else if(user){
        //ya existe el usuario
        ////console.log('ya existe')
        notificacion.innerHTML = 'El usuario ya existe';
        notificacion.classList.add('show-notification');

        setTimeout(()=>{
            notificacion.classList.remove('show-notification');
        },2500);
    }else{
        //Crear el usuario
        ////console.log('creando nuevo usuario')
        await fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({nombre:inputC.value})//<--solo puede recibir strings
        })


        notificacion.innerHTML = `El usuario ${inputC.value} ha sido creado`;
        notificacion.classList.add('show-notification');

        setTimeout(()=>{
            notificacion.classList.remove('show-notification');
        },2500);

        inputC.value = '';
    }
});

formL.addEventListener('submit', async e=>{
    e.preventDefault();

    const respuesta = await fetch('http://localhost:3000/user', {
        method: 'GET'
    });

    const users = await respuesta.json();

    const user = users.find(user=>user.nombre === inputL.value);

    //validar:
    if(!user){
        //si no existe
        notificacion.innerHTML = 'El usuario no existe';
        notificacion.classList.add('show-notification');
        setTimeout(()=>{
            notificacion.classList.remove('show-notification');
        }, 2500);
    }else{
        //si existe, debe tomar el valor y guardarlo en el localstorage
        localStorage.setItem('user', JSON.stringify(user))
        window.location.href = '../tareas/tareas.html';
    }

})
