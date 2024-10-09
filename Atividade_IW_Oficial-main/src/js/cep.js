function limpa_formularioCep() { 
    // Limpa os valores do formulário de cep.
    document.getElementById('rua_cep').textContent = "";
    document.getElementById('bairro_cep').textContent = "";
    document.getElementById('cidade_cep').textContent = "";
    document.getElementById('estado_cep').textContent = "";

    // Limpa os valores do formulário de endereço.
    document.getElementById('rua_endereco').textContent = "";
    document.getElementById('bairro_endereco').textContent = "";
    document.getElementById('cidade_endereco').textContent = "";
    document.getElementById('estado_endereco').textContent = "";
}

let tipoBusca = '';

function meu_callback(conteudo) {
    console.log(conteudo);
    if (!("erro" in conteudo)) {
        if (tipoBusca === 'cep') {
            // Atualiza os campos para a busca por CEP
            document.getElementById('rua_cep').textContent = conteudo.logradouro;
            document.getElementById('bairro_cep').textContent = conteudo.bairro;
            document.getElementById('cidade_cep').textContent = conteudo.localidade;
            document.getElementById('estado_cep').textContent = conteudo.uf;
            adicionarAoHistorico(conteudo.cep);
        } else if (tipoBusca === 'endereco') {
            const pegaId = document.getElementById('textarea');
            const jsonString = JSON.stringify(conteudo, null, 2); // Converte o objeto JSON em uma string formatada
            pegaId.innerHTML = `<pre>${jsonString}</pre>`; // Exibe o conteúdo JSON formatado na página
            if (Array.isArray(conteudo) && conteudo.length > 0) {
                conteudo = conteudo[0]; // Usa o primeiro elemento do array
            }    
            // Atualiza os campos para a busca por Endereço
            document.getElementById('rua_endereco').textContent = conteudo.logradouro;
            document.getElementById('bairro_endereco').textContent = conteudo.bairro;
            document.getElementById('cidade_endereco').textContent = conteudo.localidade;
            document.getElementById('estado_endereco').textContent = conteudo.uf;
        }
    } else {
        limpa_formularioCep();
        alert("Informação não encontrada.");
    }
}

function pesquisacep(cep) {
    tipoBusca = 'cep'; // Define o tipo de busca como CEP
    cep = cep.replace(/\D/g, ''); // Remove caracteres não numéricos
    console.log(cep);

    if (cep !== "") {
        var validacep = /^[0-9]{8}$/;

        // Verifica se o CEP tem o formato válido
        if (validacep.test(cep)) {
            // Atualiza os campos com reticências enquanto a busca é realizada
            document.getElementById('rua_cep').textContent = "...";
            document.getElementById('bairro_cep').textContent = "...";
            document.getElementById('cidade_cep').textContent = "...";
            document.getElementById('estado_cep').textContent = "...";

            // Cria um elemento de script para fazer a requisição JSONP
            var script = document.createElement('script');
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';
            document.body.appendChild(script);
        } else {
            limpa_formularioCep(); // Limpa o formulário caso o CEP seja inválido
            alert("Formato de CEP inválido.");
        }
    } else {
        limpa_formularioCep(); // Limpa o formulário se o campo CEP estiver vazio
    }
}

function selecionarEstado(event) {
    if (event.target.tagName === 'LI') {
        document.getElementById('estado_input').value = event.target.getAttribute('data-value');
        document.getElementById('estado_list').style.display = 'none';
    }
}

function pesquisarCepPorEndereco(estado_input, cidade_input, rua_input) {
    tipoBusca = 'endereco'; // Define o tipo de busca
    limpa_formularioCep();
    rua_input = rua_input.trim().replace(/\s+/g, '%20');
    var url = `https://viacep.com.br/ws/${estado_input}/${cidade_input}/${rua_input}/json/?callback=meu_callback`;
    var script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
}

function adicionarAoHistorico(cep) {
    let historico = JSON.parse(localStorage.getItem("historico_cep")) || []; 
    if (!historico.includes(cep)) {
        historico.push(cep); // Adiciona o CEP ao histórico se não estiver presente
    }
    localStorage.setItem("historico_cep", JSON.stringify(historico));
    atualizarHistorico();
}

// Atualiza a área de histórico com os valores armazenados no localStorage
function atualizarHistorico() {
    let historico = JSON.parse(localStorage.getItem("historico_cep")) || []; 
    document.getElementById("CEPS").value = historico.join("\n"); 
}

// Inicializa a área de histórico ao carregar a página
window.onload = atualizarHistorico;

function limparHistorico() {
    localStorage.removeItem("historico_cep"); 
    document.getElementById("CEPS").value = "";
}
function limparCeps() {
    document.getElementById("textarea").value = "";

}
