document.getElementById('formCapture').addEventListener('submit', function (event) {
    event.preventDefault();

    const fileInput = document.getElementById('csvFile');
    const file = fileInput.files[0];

    if (!file) {
        alert('Selecione um arquivo CSV antes de enviar.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const csvContent = e.target.result;
        const lines = csvContent.split(/\r\n|\n|\r/).filter(line => line.trim().length > 0);
        const headers = lines[0].split(';').map(h => h.trim());

        const clientesMap = new Map();

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(';').map(v => v.trim());
            const obj = {};
            headers.forEach((key, index) => {
                obj[key] = values[index] ?? null;
            });

            const cpfCliente = obj.CPF;

            if (!clientesMap.has(cpfCliente)) {
                clientesMap.set(cpfCliente, {
                    CPF: obj.CPF,
                    Nome: obj.Nome,
                    Sobrenome: obj.Sobrenome,
                    Email: obj.email,
                    Telefone: obj.Telefone,
                    Logradouro: obj.Logradouro,
                    CEP: obj.cep,
                    Cidade: obj.cidade,
                    Estado: obj.estado,
                    Nacionalidade: obj.Nacionalidade,
                    Beneficiarios: []
                });
            }

            const cliente = clientesMap.get(cpfCliente);

            if (obj.CPF_bnf && obj.Nome_bnf) {
                cliente.Beneficiarios.push({
                    CPF_bnf: obj.CPF_bnf,
                    Nome_bnf: obj.Nome_bnf
                });
            }
        }

        const clientes = Array.from(clientesMap.values());

        console.log("Lista de clientes estruturada:", clientes);

        fetch('/Cliente/Capturar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientes)
        })
            .then(response => {
                if (!response.ok) throw new Error('Erro ao enviar o arquivo');
                return response.json();
            })
            .then(data => {
                console.log('Resposta do servidor:', data);
                alert('Arquivo enviado com sucesso!');
            })
            .catch(error => {
                console.error('Erro no envio JSON:', error);
                alert('Erro ao enviar os dados.');
            });
    };

    reader.readAsText(file, 'UTF-8');
});
