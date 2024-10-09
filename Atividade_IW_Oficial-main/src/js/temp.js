const apiKey = "e6260bd2953fad4922e34b980c1f7f9c";

function trazercidade() {
    const cidade = document.getElementById('cidade_temp').value;
    if (cidade !== "") {
        document.getElementById('imagem_now').textContent = "...";
        document.getElementById('Temperatura').textContent = "...";
        document.getElementById('Pais').textContent = "...";

        // Consulta a temperatura atual
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Cidade não encontrada.");
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                const temperatura = parseInt(Math.round(data.main.temp), 10);
                document.getElementById('Temperatura').textContent = `${temperatura}`;
                document.getElementById('Pais').textContent = data.sys.country;
            
                // Acessando a descrição corretamente
                document.getElementById('descricao_now').textContent = data.weather[0].description;
            
                const iconCode = data.weather[0].icon; // Código do ícone
                document.getElementById('imagem_now').src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
                document.getElementById('imagem_now').alt = data.weather[0].description; // Descrição do clima

                //Info
                document.getElementById('humidade').textContent = data.main.humidity + '%'; // Umidade
                document.getElementById('velventos').textContent = data.wind.speed + ' km/h'; // Velocidade do vento
                document.getElementById('presao').textContent = data.main.pressure + ' hPa'; // Pressão
                document.getElementById('visibility').textContent = (data.visibility / 1000) + ' km'; // Visibilidade convertida de metros para km
                console.log(data.visibility)
            })
            

        // Consulta a previsão para os próximos 5 dias
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Cidade não encontrada.");
                }
                return response.json();
            })
            .then(data => {
                const previsaoContainer = document.querySelector('.container-previsao');
                previsaoContainer.innerHTML = ''; // Limpa previsões anteriores
        
                const temperaturasDiarias = {};
                const diaAtual = new Date().toLocaleDateString('pt-BR', { weekday: 'long' }); // Obtém o dia atual
        
                // Loop pelas previsões
                data.list.forEach(item => {
                    const dia = new Date(item.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'long' }); // Formata a data para o dia da semana
                    
                    // Ignora a previsão para o dia atual
                    if (dia === diaAtual) {
                        return; // Sai da iteração atual se for o dia atual
                    }
        
                    const descricao = item.weather[0].description; // Descrição do tempo
                    const icon = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`; // URL do ícone do tempo
                    const temp = parseInt(Math.round(item.main.temp), 10); // Temperatura arredondada

                    
        
                    // Armazena a primeira previsão do dia
                    if (!temperaturasDiarias[dia]) {
                        temperaturasDiarias[dia] = {
                            descricao: descricao,
                            icon: icon,
                            temp: temp
                        };
                    }
                });

                // Exibe as previsões diárias
                for (const dia in temperaturasDiarias) {
                    const previsao = temperaturasDiarias[dia];
                    previsaoContainer.innerHTML += `
                        <div class="previsao-item">
                            <p>${previsao.descricao}</p>
                            <img src="${previsao.icon}" alt="${previsao.descricao}">
                            <p>${previsao.temp}°C</p>
                            <p>${dia}</p>
                        </div>
                    `;
                }
            })
            .catch(error => {
                console.error("Erro:", error);
                alert(error.message);
            });
    }
}
