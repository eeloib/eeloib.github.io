

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
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