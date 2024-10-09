// Mostrar a lista de estados ao focar no input
document.getElementById('estado_input').addEventListener('focus', function() {
    document.getElementById('estado_list').style.display = 'block';
});

// Filtrar a lista com base na entrada do usuário
document.getElementById('estado_input').addEventListener('input', function() {
    let filter = this.value.toUpperCase();
    let items = document.querySelectorAll('#estado_list li');

    let hasVisibleItems = false;

    items.forEach(function(item) {
        let text = item.textContent || item.innerText;
        if (text.toUpperCase().indexOf(filter) > -1) {
            item.style.display = "";
            hasVisibleItems = true;
        } else {
            item.style.display = "none";
        }
    });

    // Exibir mensagem se nenhum item corresponder
    if (!hasVisibleItems) {
        let noResultItem = document.createElement('li');
        noResultItem.textContent = 'Nenhum resultado encontrado';
        noResultItem.style.color = 'red';
        noResultItem.style.display = 'block';
        document.getElementById('estado_list').appendChild(noResultItem);
    }
});

// Selecionar o estado ao clicar na lista
document.querySelectorAll('#estado_list li').forEach(function(item) {
    item.addEventListener('click', function() {
        let selectedState = this.textContent;
        document.getElementById('estado_input').value = selectedState;
        document.getElementById('estado_list').style.display = 'none';
    });
});

// Ocultar a lista ao clicar fora
document.addEventListener('click', function(event) {
    let input = document.getElementById('estado_input');
    let list = document.getElementById('estado_list');
    if (!input.contains(event.target) && !list.contains(event.target)) {
        list.style.display = 'none';
    }
});

// Adicionar suporte a navegação por teclado
document.getElementById('estado_input').addEventListener('keydown', function(event) {
    let items = Array.from(document.querySelectorAll('#estado_list li'));
    let currentIndex = items.findIndex(item => item.textContent === this.value);

    if (event.key === 'ArrowDown') {
        event.preventDefault();
        let nextIndex = (currentIndex + 1) % items.length;
        items[nextIndex].focus();
        items[nextIndex].scrollIntoView({ block: 'nearest' }); // Rolagem suave
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        let prevIndex = (currentIndex - 1 + items.length) % items.length;
        items[prevIndex].focus();
        items[prevIndex].scrollIntoView({ block: 'nearest' }); // Rolagem suave
    } else if (event.key === 'Enter') {
        if (currentIndex > -1) {
            items[currentIndex].click();
        }
    }
});

// Historico de CEP

function colocarhistorico(cep){
    
    let adicionar = document.getElementById('adicionar')

    adicionar.innerHTML = `<div class="criar_historico" id="criar_historico" onclick="pesquisacep()" >${cep}</div>`
                
            
}
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' }); // Rola suavemente até a seção
    }
}

