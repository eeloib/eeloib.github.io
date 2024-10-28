


const handleSubmit = (event)=>{
    event.preventDefault();
    fetch('https://script.google.com/macros/s/AKfycbxWRBwMEBilng8eIjFzDdykiIqGsseyQcilo4NwhKTM7EiT82A3PUCEfMv5scYVuEAE/exec',{
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*'
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
            'LinkZap':LinkZap.value,
            'LinkQrCode':LinkQrCode.value
        })
    }).then(response => {
        console.log("success:", response);
    });
}

document.querySelector('form').addEventListener('submit',handleSubmit);