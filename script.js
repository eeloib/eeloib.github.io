
import * as jwt_decode from 'jwt-decode';
      
      function handleCredentialResponse(response) {
        const data = jwt_decode(response.credential);
        console.log(data)  
      }
      window.onload = function () {
        google.accounts.id.initialize({
          client_id: "512160770236-16n573eolsvjjmoflkl5hlaku9ha22pe.apps.googleusercontent.com",
          callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
          document.getElementById("buttonDiv"),
          { 
            theme: "filled_black", 
            size: "large",
            type: "standard",
            shape: "pill",
            text: "continue_with",
            logo_alignment: "left",
            width: "400" 
          }  // customization attributes
        );
        google.accounts.id.prompt(); // also display the One Tap dialog
      }


const handleSubmit = (event)=>{
    event.preventDefault();
    fetch('https://script.google.com/macros/s/AKfycbxWRBwMEBilng8eIjFzDdykiIqGsseyQcilo4NwhKTM7EiT82A3PUCEfMv5scYVuEAE/exec',{
        method: 'POST',
        mode: 'no-cors',
        redirect: 'follow',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify({
                "Nome": nome.value,
                "Telefone": telefone.value,
                "Email": email.value,
                "Placa":placa.value,
                'CPF':cpf.value,
                'DataNascimento':dataNascimento.value,
                'Cidade':cidade.value,
                'Estado':estado.value,
                'LinkZap':'https://wa.me/5521972360828?text=Quero%20me%20cadastrar%20o%20email%20do%20motorista%20é%20'+email.value,
                'LinkQrCode':""
            })
        }).then(response => {
            console.log("success:", response);
        });
}
document.querySelector('form').addEventListener('submit',handleSubmit);