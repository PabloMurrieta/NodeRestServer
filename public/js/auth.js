
const miFormulario = document.querySelector('#form1');
    
    


    miFormulario.addEventListener('submit', ev =>{

        ev.preventDefault();
        const formData = {};

            //Ler cada uno de los elementos del formulario

        for(let el of miFormulario.elements){
            
            //Ingnorando boton porque no tiene name
            if(el.name.length > 0 )
                formData[el.name] = el.value



        }
        const body = formData; // Aquí defines el valor de 'body

        //fetch indica a que enpoint le pegara 
        fetch('http://localhost:8080/api/auth/login',{
            //especificamos metodo
            method: 'POST',
            //Por que parte se mandaray especificar el tipo
            headers: {
               'Content-Type': 'application/json'
            },
            // convertir el json con stringify() porque  ocupa este formato
            body: JSON.stringify(body)
         })
        //  extraer la respuesta porque es un promesa   
        .then(resp => resp.json())    
        .then(({msg,token}) =>{
            if(msg){
                return console.log(msg);
            }
            localStorage.setItem('token',token);
            window.location = 'Chat.html'
        })  
        //Por cual quier error que pueda venir en la promesa    
        .catch(err =>{
            console.log(err);
        })

         });
    

    function handleCredentialResponse(response) {

         //google token : ID_TOKEN
         //  console.log('ID_TOKEN', response.credential);
         //Body resive lo el valor del id_token que contiene el reponse.crendential
         const body = { id_token: response.credential }
         //Con el fetch debemos espesificar el tipo de contenido que se envia en este caso un post
         //y que sera en formato json Y el body serealizando su contenido
         fetch('http://localhost:8080/api/auth/google', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
         })

            .then(resp => resp.json())
            .then(({token}) => {
               localStorage.setItem('token:',token);
               window.location = 'Chat.html'

            })
            .catch(console.warn);

      }

      const button = document.getElementById('google_SingOut');





      button.onclick = () => {
         console.log(google.accounts.id);
         google.accounts.id.disableAutoSelect();


         google.accounts.id.revoke(localStorage.getItem('email'), done => {
            localStorage.clear();
            location.reload();
         })
      }
    