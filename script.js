


const handleSubmit = (event)=>{
    event.preventDefault();
    fetch('https://script.google.com/macros/s/AKfycbxWRBwMEBilng8eIjFzDdykiIqGsseyQcilo4NwhKTM7EiT82A3PUCEfMv5scYVuEAE/exec',{
        method: 'POST',
        mode: 'cors',
        credentials: 'include', // include, *same-origin, omit
        redirect: 'follow',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8',
            'Access-Control-Allow-Origin':"*"
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