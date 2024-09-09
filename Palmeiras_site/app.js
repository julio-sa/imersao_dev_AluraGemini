function pesquisar() {
    // Obtém os elementos HTML relevantes
    const campoPesquisa = document.getElementById("campo-pesquisa");
    const termoPesquisa = campoPesquisa.value.toLowerCase();
    const sectionResultados = document.getElementById("resultados-pesquisa");

    // Limpa os resultados anteriores
    sectionResultados.innerHTML = '';

    // Cria um fragmento de documento para otimizar a manipulação do DOM
    const fragment = document.createDocumentFragment();

    // Verifica se o termo de pesquisa está vazio
    if (termoPesquisa.trim() == "") {
        const divMensagem = document.createElement('div');
    divMensagem.classList.add('mensagem-vazio');
    divMensagem.textContent = "Nada encontrado";

    // Limpa o conteúdo da seção antes de adicionar a mensagem
    sectionResultados.innerHTML = '';

    // Adiciona a mensagem à seção
    sectionResultados.appendChild(divMensagem);

    console.log("Mensagem de 'Nada encontrado' adicionada ao DOM");
    } else {
        let encontrouResultado = false; // Flag para indicar se algum resultado foi encontrado

        dados.forEach(dado => {
            // Verifica se o título, descrição ou tags contém o termo de pesquisa (ignorando case)
            if (dado.titulo.toLowerCase().includes(termoPesquisa) ||
                (dado.descricao && dado.descricao.toLowerCase().includes(termoPesquisa)) ||
                (dado.tags && dado.tags.toLowerCase().includes(termoPesquisa))) {

                encontrouResultado = true;

                // Cria um elemento div para cada resultado
                const divResultado = document.createElement('div');
                divResultado.classList.add('item-resultado');

                // Constrói o HTML do resultado com base no tipo de dado
                if (dado.titulo === "Notícias") {
                    divResultado.innerHTML = `
                        <h2>${dado.titulo}</h2>
                        <div class="noticias">
                            ${dado.noticias}
                        </div>
                    `;
                } else {
                    divResultado.innerHTML = `
                        <h2><a href="${dado.link}" target="_blank">${dado.titulo}</a></h2>
                        <p class="descricao-meta">${dado.descricao || ''}</p>
                    `;
                }

                // Adiciona o resultado ao fragmento
                fragment.appendChild(divResultado);
            }
        });

        // Verifica se algum resultado foi encontrado
        if (!encontrouResultado) {
            const divMensagem = document.createElement('div');
            divMensagem.classList.add('mensagem-vazio');
            divMensagem.textContent = "Nenhum resultado encontrado para a busca.";
            fragment.appendChild(divMensagem);
        }
        // Adiciona todos os resultados ao DOM de uma só vez
        sectionResultados.appendChild(fragment);
    }
}