document.querySelector("#salvar").addEventListener("click", cadastrar)

let lista_despesa = []

window.addEventListener("load", () => { 
    lista_despesa = JSON.parse(localStorage.getItem("lista_despesa")) || []
    atualizar()
  })
  
document.querySelector("#pendentes").addEventListener("click", () => {
  lista_despesa = JSON.parse(localStorage.getItem("lista_despesa")) || []
  lista_despesa = lista_despesa.filter(despesa => !despesa.paga)
  atualizar()
})
  
document.querySelector("#pagas").addEventListener("click", () => {
  lista_despesa = JSON.parse(localStorage.getItem("lista_despesa")) || []
  lista_despesa = lista_despesa.filter(despesa => despesa.paga)
  atualizar()
})

document.querySelector("#busca").addEventListener("keyup", () => {
  lista_despesa = JSON.parse(localStorage.getItem("lista_despesa")) || []
  const nome = document.querySelector("#busca").value
  lista_despesa = lista_despesa.filter(despesa => despesa.nome.includes(nome))
  atualizar()
})

function cadastrar() {
    const modal = bootstrap.Modal.getInstance(document.querySelector("#cadastrarDespesaModal"))
    let nome = document.querySelector("#nome").value
    let endereco = document.querySelector("#endereco").value
    let data = document.querySelector("#data").value
    let litros = document.querySelector("#consumoAgua").value
    let tipoUsuario = document.querySelector("#tipoUsuario").value
    let qtdPessoas = document.querySelector("#qtdPessoas").value
    let preco = document.querySelector("#preco").value
    let observacoes = document.querySelector("#observacoes").value

    const despesa = {
        id: Date.now(),
        nome: nome,
        endereco: endereco,
        data: data,
        litros: litros,
        tipoUsuario: tipoUsuario,
        qtdPessoas: qtdPessoas,
        preco: preco,
        observacoes: observacoes,
        paga: false
    }

    if (despesa.nome.length == 0) {
      document.querySelector("#nome").classList.add("is-invalid")
      return
    }
    
    document.querySelector("#button-cadastrar").setAttribute("data-bs-target", "#cadastrarDespesaModal")
    toastFunction()
    document.querySelector("#despesas").innerHTML += gerarCard(despesa)

    document.querySelector("#nome").value = ""
    document.querySelector("#endereco").value = ""

    lista_despesa.push(despesa)

    salvar()

    modal.hide()
  }
  
  
function salvar() {
    localStorage.setItem("lista_despesa", JSON.stringify(lista_despesa))
}

function atualizar() {
  document.querySelector("#despesas").innerHTML = ""
  lista_despesa.forEach((despesa) => {
    document.querySelector("#despesas").innerHTML += gerarCard(despesa)
  });
}


function apagar(id) {
  lista_despesa = lista_despesa.filter((x) => {
     return x.id != id
  })
  salvar()
  atualizar() 
}

function pagar(id) {
  let despesa = lista_despesa.find((x) => {
    return x.id == id
  })

  despesa.paga = true
  salvar()
  atualizar()
}

function gerarCard(despesa) {
    return `<div class="col-lg-3 col-md-6 col-12">
    <div class="card">
      <div class="card-header">Despesa em nome de ${despesa.nome}</div>
      <div class="card-body">
        <p class="card-text">Endereço: ${despesa.endereco}</p>
        <p class="card-text">Data da despesa: ${despesa.data ? despesa.data : "Sem data"}</p>
        <p class="card-text">Consumo de água: ${despesa.litros} Litros</p>
        <p class="card-text">Preço R$${despesa.preco}</span></p>
        <p class="card-text">Observações: ${despesa.observacoes}</p>
        <p>
          <span class="badge text-bg-warning">${despesa.tipoUsuario}</span>
        </p>
        <a onclick="pagar(${despesa.id})" class="btn btn-success ${despesa.paga ? "disabled" : ""}">
          <i class="bi bi-check-lg"></i>
        </a>
        <a onclick="apagar(${despesa.id})" class="btn btn-danger">
          <i class="bi bi-trash"></i>
        </a>
      </div>
    </div>
  </div>`
}

document.querySelector('#btnSwitch').addEventListener('click',()=>{
    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
        document.documentElement.setAttribute('data-bs-theme','light')
        document.querySelector('#btnSwitch').innerHTML = '<i class="bi bi-moon-fill"></i>'

    }
    else {
        document.documentElement.setAttribute('data-bs-theme','dark')
        document.querySelector('#btnSwitch').innerHTML = '<i class="bi bi-brightness-high-fill"></i>'
    }
})


function toastFunction() {
  var x = document.getElementById("toast_add");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function toastFunctionLogin() {
  var x = document.getElementById("toast_login");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function btnCheck() {
  console.log('check')
}

function btnTrash() {
  console.log('trash')
}