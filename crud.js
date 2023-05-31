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

document.querySelector("#busca").addEventListener("keyup", () => filtrar())
document.querySelector("#buscar").addEventListener("click", () => filtrar())


function filtrar() {
  lista_despesa = JSON.parse(localStorage.getItem("lista_despesa")) || []
  nomeFiltro = document.querySelector("#nomeFiltro").textContent
  const busca = document.querySelector("#busca").value

  switch (nomeFiltro) {
    case 'Nome':
      lista_despesa = lista_despesa.filter(despesa => despesa.nome.includes(busca))
      break;
    case 'Endereço':
      lista_despesa = lista_despesa.filter(despesa => despesa.endereco.includes(busca))
      break;
    default:
      lista_despesa = lista_despesa.filter(despesa => despesa.data > busca)
  }

  atualizar()
}

document.querySelector("#filtroNome").addEventListener("click", () => {
  filtrarPor("o nome", document.querySelector("#filtroNome").textContent)
})
document.querySelector("#filtroEndereco").addEventListener("click", () => {
  filtrarPor("o endereço", document.querySelector("#filtroEndereco").textContent)
})
document.querySelector("#filtroData").addEventListener("click", () => {
  filtrarPor("a data", document.querySelector("#filtroData").textContent)
  document.querySelector("#busca").setAttribute("type", "date")
})

function filtrarPor(filtro, nomeFiltro) {
  document.querySelector("#nomeFiltro").textContent = nomeFiltro
  busca = document.querySelector("#busca")
  busca.setAttribute("placeholder", `Digite ${filtro}...`)
  busca.setAttribute("type", "search")
  busca.removeAttribute("disabled")
  document.querySelector('#buscar').removeAttribute("disabled")
}



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


    if (despesa.nome.length == 0 || despesa.endereco.length == 0 || despesa.data == "" || despesa.litros == "" || despesa.preco == "") {
      if (despesa.nome.length == 0) {
        document.querySelector("#nome").classList.add("is-invalid")
      }
      if (despesa.endereco.length == 0) {
        document.querySelector("#endereco").classList.add("is-invalid")
      }
      if (despesa.data == "") {
        document.querySelector("#data").classList.add("is-invalid")
      }
      if (despesa.litros == "") {
        document.querySelector("#consumoAgua").classList.add("is-invalid")
      }
      if (despesa.preco == "") {
        document.querySelector("#preco").classList.add("is-invalid")
      }
      console.log("passei aqui")
      toastFunctionErr()
      return
  }
    
    document.querySelector("#button-cadastrar").setAttribute("data-bs-target", "#cadastrarDespesaModal")
    toastFunction()
    document.querySelector("#despesas").innerHTML += gerarCard(despesa)

    
    zerarInput(document.querySelector("#nome"))
    zerarInput(document.querySelector("#endereco"))
    zerarInput(document.querySelector("#data"))
    zerarInput(document.querySelector("#preco"))
    zerarInput(document.querySelector("#consumoAgua"))
    zerarInput(document.querySelector("#qtdPessoas"))

    lista_despesa.push(despesa)

    salvar()

    modal.hide()
  }
  
  
function zerarInput(atributo) {
  atributo.value = ""
  atributo.classList.remove("is-invalid")
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
  var x = document.getElementById("toast_del");
  x.className = "show";
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);

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

document.querySelector('#button-consumo').addEventListener('click', () => {
  var totalLitros = 0;
  var totalGasto = 0;
  lista_despesa.forEach(despesa => {
    totalLitros = parseInt(despesa.litros) + parseInt(totalLitros)
    totalGasto = parseInt(despesa.preco) + parseInt(totalGasto)
  })
  document.querySelector('#totalLitros').textContent = "Total de Litros: " + totalLitros
  document.querySelector('#totalGasto').textContent = "Total de gastos: R$ " + totalGasto
})

function toastFunction() {
  var x = document.getElementById("toast_add");
  x.className = "show";
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function toastFunctionLogin() {
  var x = document.getElementById("toast_login");
  x.className = "show";
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function toastFunctionErr() {
  var x = document.getElementById("toast_err");
  x.className = "show";
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function btnCheck() {
  console.log('check')
}

function btnTrash() {
  console.log('trash')
}