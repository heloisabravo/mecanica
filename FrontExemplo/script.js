const placa = document.querySelector("#placa");
const marca = document.querySelector("#marca");
const modelo = document.querySelector("#modelo");
const ano = document.querySelector("#ano");
const cor = document.querySelector("#cor");
const corpo = document.querySelector("tbody");
const api = "http://localhost:3000";
const form = document.querySelector("form");
let prods = [];
window.addEventListener("load", async () => {
  const resposta = await fetch(`${api}/produtos`);
  prods = await resposta.json();
  console.log(prods)
  renderizar(prods);
});

function renderizar(prods) {
  prods.forEach((element) => {
    corpo.innerHTML += `    <tr>
                <td>${element.id_veiculo}</td>
                <td>${element.placa}</td>
                <td>${element.marca}</td>
                <td>${element.modelo}</td>
                <td>${element.ano}</td>
                <td>${element.cor}</td>
                <td>
                <button onclick="deletar(${element.id_veiculo})">❌</button>
                <button onclick='editar(${element.id_veiculo})'>✏️</button>
                </td>
            </tr>`;
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const dados = {
    placa: placa.value,
    marca: marca.value,
    modelo: modelo.value,
    ano: ano.value,
    cor: cor.value,
  };
  const resposta = await fetch(`${api}/cad_produto`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (resposta.status == 201) {
    alert("cadastrado com sucesso");
    window.location.reload();
  }
});

async function deletar(id) {
  const resposta = await fetch(`http://localhost:3000/deleta/${id}`, {
    method: "DELETE",
  });
  if (resposta.status == 200) {
    return window.location.reload();
  }
  return alert("erro ao deletar");
}

async function editar(id) {
  const produto = await fetch(`${api}/produto/${id}`);
  const prod = await produto.json();
  const datas = {
    placa: prompt("Placa", prod.placa),
    marca: prompt("Marca", prod.marca),
    modelo: prompt("Modelo", prod.modelo),
    ano: prompt("Ano", prod.ano),
    cor: prompt("Cor", prod.cor),
  };
  const resposta = await fetch(`${api}/editar/${id}`, {
    method: "put",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(datas),
  });
  resposta.status == 201 ? window.location.reload() : alert("erro ao editar");
}
