emailGoogle = "";
idGoogle = "";

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
  
  function handleCredentialResponse(response) {
    const data = parseJwt(response.credential);
    
    emailGoogle=data.email;
    idGoogle = "";
    console.log(data);
    email.value = emailGoogle;  
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
                "id": idGoogle,
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