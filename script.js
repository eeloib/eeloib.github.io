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
    idGoogle = data.sub;
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
    linkQrCode = "";
    fetch('https://me-qr.com/api/v2/qr/link/create',{
      method: 'POST',
      headers: {
        'accept': '*/*',
        'X-AUTH-TOKEN': 'ddc0055f9867fd203653660f954858cf497a86caa72577aae95b921f84a7c56c',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "qrFieldsData": {
          "link": 'https://wa.me/5521972360828?text=Quero%20me%20cadastrar%20o%20email%20do%20motorista%20é%20'+email.value
        },
        "title": "Qr Code",
        "format": "png",
        "qrOptions": {
          "size": 300,
          "errorCorrectionLevel": "Q",
          "pattern": "square",
          "patternColor": "#000000",
          "patternBackground": "#ffffff",
          "cornetsOuter": "square",
          "cornetsOuterColor": "#000000",
          "cornetsInterior": "square",
          "cornetsInteriorColor": "#000000",
          "logotype": null,
          "logotypeSize": 0.3,
          "logotypeMargin": 0,
          "logotypeHideBackground": true,
          "gradientPattern": null,
          "gradientCornetsOuter": null,
          "gradientCornetsInterior": null,
          "gradientBackground": null
        },
        "qrFrame": {
          "name": "noFrame",
          "color": "#000000",
          "backgroundColor": "#ffffff",
          "text": "",
          "textColor": "#9C3AAF",
          "textFont": "Roboto"
        }
      })
    }).then(response => {
      console.log("Qr:",response);
      linkQrCode = response.data.QrUrl;
    });    
    
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
                'LinkQrCode':linkQrCode
            })
        }).then(response => {
            console.log("success:", response);
        });
}


document.querySelector('form').addEventListener('submit',handleSubmit);