//Selecionando os elelmenetos por ID
const form = document.getElementById("newItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

//function call back
itens.forEach( (e) => {
    criaElemento(e)
} )

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const name = e.target.elements['nome']
    const quantidade = e.target.elements['quantidade']

    const existe = itens.find( e => e.nome === nome.value )

    const itemAtual = {
        "nome": name.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id
        
        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

        criaElemento(itemAtual)

        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
})

//criando os elemetos HTML
function criaElemento(item) {
    const newItem = document.createElement("li")
    newItem.classList.add("item")

    const numberItem = document.createElement("strong")
    numberItem.innerHTML = item.quantidade
    numberItem.dataset.id = item.id
    newItem.appendChild(numberItem)
    
    newItem.innerHTML += item.nome

    newItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(newItem)
}
//Verificando os elementos existentes
function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id) {
    const eButton = document.createElement("button")
    eButton.innerText = "X"

    eButton.addEventListener("click", function() {
        deleteElement(this.parentNode, id)
    })

    return eButton
}

function deleteElement(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}

console.log('enviando para o git')