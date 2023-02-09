const formulario = document.querySelector('#formulario');
const listaItens = document.querySelector('#listaItens');
var item = document.querySelector('#item');
var preco = document.querySelector('#preco');
var quantidade = document.querySelector('#quantidade');
const listaCompleta = JSON.parse(localStorage.getItem("itens")) || [];

listaCompleta.forEach((itemIncluido) => {
    criaItemLista(itemIncluido)

});

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const itemAtual = {
        'nome': item.value,
        'preco': preco.value,
        'qtd': quantidade.value,
        'check': 'false'
    };

    listaCompleta.push(itemAtual);

    criaItemLista(itemAtual);

    localStorage.setItem("itens", JSON.stringify(listaCompleta));

    item.value = '';
    preco.value = '';
    quantidade.value = '';

});


function criaItemLista(item) {

    var criaItem = document.createElement('li');
    var criaValor = document.createElement('strong');
    var criaQtd = document.createElement('i');
    var criaNome = document.createElement('i');

    criaItem.classList.add("organizaLista");
    criaItem.dataset.ids = listaCompleta.indexOf(item);
    criaValor.classList.add("organizaValor");
    criaQtd.classList.add('ajusteQtd');
    criaNome.classList.add('ajusteNome');

    criaNome.innerHTML = item.nome;
    criaValor.innerHTML = "R$" + item.preco;
    criaQtd.innerHTML = "Qtd: " + item.qtd;

    criaItem.appendChild(criaNome);
    criaItem.appendChild(criaValor);
    criaItem.appendChild(criaQtd);

    criaItem.appendChild(checkRiscado(item, criaItem.dataset.ids));
    criaItem.appendChild(botaoApagar(criaItem.dataset.ids));
    criaItem.appendChild(preparaEdicao(item, criaItem.dataset.ids));

    if (item.check === 'false') {
        criaItem.classList.remove('vermelho');
    } else {
        criaItem.classList.add('vermelho');
    }

    listaItens.appendChild(criaItem);
    definirvalorTotal(item);
    
}

function checkRiscado(item, idsItem) {

    var criaRiscado = document.createElement('button');
    criaRiscado.setAttribute('id', idsItem);
    criaRiscado.classList.add('checkboxRiscado');
    criaRiscado.innerHTML = "✓";

    criaRiscado.addEventListener('click', function () {
        riscarItem(item, this.parentNode, idsItem)
    })
    return criaRiscado;
}


function riscarItem(item, parent, id) {
    console.log(parent)
    if (item.check === 'false') {
        item.check = 'true';
        parent.classList.add('vermelho');

    } else if (item.check === 'true') {
        item.check = 'false';
        parent.classList.remove('vermelho');
    }

    atualizarLista(listaCompleta)

}


function botaoApagar(idItem) {

    var criaBotaoApagar = document.createElement('button');
    criaBotaoApagar.innerHTML = '🗑';
    criaBotaoApagar.classList.add('botaoDinamico');

    criaBotaoApagar.addEventListener('click', function () {
        apagarItem(this.parentNode, idItem)
    });
    return criaBotaoApagar;
}


function apagarItem(pai, id) {
    pai.remove();
    listaCompleta.splice(id, 1);

    atualizarLista(listaCompleta)
    location.reload();
}



function atualizarLista(novaLista) {
    localStorage.setItem("itens", JSON.stringify(novaLista));
}



function preparaEdicao(itemEditado, idsItem) {

    var criaBotaoEditar = document.createElement('button');
    criaBotaoEditar.innerHTML = '🖉';
    criaBotaoEditar.classList.add('botaoDinamico');

    criaBotaoEditar.addEventListener('click', function () {

        document.querySelector('#item').value = itemEditado.nome;
        document.querySelector('#preco').value = itemEditado.preco;
        document.querySelector('#quantidade').value = itemEditado.qtd;

        editaItem(idsItem, itemEditado)

    })

    return criaBotaoEditar;

}



function editaItem(idsItemEditado, itemEditado) {

    document.querySelector('#btnEnviar').addEventListener('click', (evento) => {
        evento.preventDefault();

        var novoNome = document.querySelector('#item').value;
        var novoPreco = document.querySelector('#preco').value;
        var novoQtd = document.querySelector('#quantidade').value;

        for (var itensArray in listaCompleta) {

            if (itensArray.idsItemEditado === itemEditado.id) {

                listaCompleta[idsItemEditado].nome = novoNome;
                listaCompleta[idsItemEditado].preco = novoPreco;
                listaCompleta[idsItemEditado].qtd = novoQtd;

                atualizarLista(listaCompleta)
                location.reload();


            }
        }

    })

}




function definirvalorTotal(item) {

    var setValor = document.querySelector('#valorTotal');
    var valor = 0;

    for (var itemLista in listaCompleta) {

        valor += parseFloat(listaCompleta[itemLista].preco) * parseFloat(listaCompleta[itemLista].qtd);
    }
    setValor.innerHTML = 'R$' + valor;

}


function editarItem(itemAtual, id){
    
    document.querySelector(".editarItem").style.opacity = 1;

    const itemEditado = document.querySelector('#itemEditado');
    const precoEditado = document.querySelector('#precoEditado');
    const quantidadeEditado = document.querySelector('#quantidadeEditado');
    const enviarItemEditado = document.querySelector('#enviarItemEditado');

    itemEditado.value = itemAtual.nome;
    precoEditado.value = itemAtual.preco;
    quantidadeEditado.value = itemAtual.qtd;

    enviarItemEditado.addEventListener('click', function(evento){
        evento.preventDefault();

        var itemAtt = {
            'nome':  itemEditado.value,
            'preco': precoEditado.value,
           'qtd': quantidadeEditado.value
        }

        itemAtual = itemAtt;
        criaItemLista(itemAtual);

        id = '';
       
    })

    

}
