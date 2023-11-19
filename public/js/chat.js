

let usuario = null;

let socket  = null;

// Referencias html
const txtUidconst = document.querySelector('#txtUidconst');
const txtMensaje   = document.querySelector('#txtMensaje');
const ulUsuarios  = document.querySelector('#ulUsuarios');
const ulMensaje    = document.querySelector('#ulMensaje');
const btnSalir    = document.querySelector('#btnSalir');

//Validar el token del localStorage

const validarJWT = async () =>{

    const token = localStorage.getItem('token') || '';

    if(token.length <= 10){
        window.location = 'index.html';
        throw new Error('NO HAY TOKEN EN EL SERVIDOR');
    }

    try {
        
    const resp = await fetch('http://localhost:8080/api/auth/',{
        headers:{'x-token':token}
    });

    const {usuario:userDB, token :tokendDB}= await resp.json();

    console.log(userDB, tokendDB);
    // Asignamos elnuevo para darlemas tiempo y siempre estar usando el del localStorage
    localStorage.setItem('token',tokendDB)
    usuario = userDB;

    document.title = usuario.name;

    await  conectarSocket();


    } catch (error) {
        return new Error(error)
    }

}


const conectarSocket = async () =>{

    socket = io({

            'extraHeaders':{
                'x-token':localStorage.getItem('token')
            }
    });

    socket.on('connect', ()=>{
            console.log('Socket online');
    });

    socket.on('disconnect', ()=>{
        console.log('Socket Offline');

    });
//_____________________________________________
    socket.on('recibir-mensajes',dibujarMensajes );

    socket.on('usuarios-activos',dibujarUsuarios);

    socket.on('mensaje-privado', ()=>{
        console.log('Privado: ', payload);
    });
}


const dibujarUsuarios = (usuarios = []) =>{

    let userHtml = '';

    usuarios.forEach(({name, uid}) =>{
        userHtml += `
        <li> 
            <P>
                <h5 class="text-success"> ${name}</h5>            
                <span class="fs-6 text-muted" >${uid}</span>
            </p>
        </li>
        `;

    });

    ulUsuarios.innerHTML = userHtml

 }


 txtMensaje.addEventListener('keyup', ({ keyCode }) => {
    const mensaje = txtMensaje.value;
    const uid = txtUid.value;


    if (keyCode === 13 && mensaje.trim().length > 0) {
        socket.emit('enviar-mensaje', {mensaje, uid});
        txtMensaje.value = ''; // Limpiar el campo después de enviar
    }
});



const dibujarMensajes = (mensajes = []) =>{

    let mensajesHTML = '';

    mensajes.forEach(({nombre, mensaje}) =>{
        mensajesHTML += `
        <li> 
            <P>
                <span class="text-primary"> ${nombre}</span>            
                <span  >${mensaje}</span>
            </p>
        </li>
        `;

    });

    ulMensaje.innerHTML = mensajesHTML;

 }



const main = async ()  =>{

    await validarJWT();


}


main();
