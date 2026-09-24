const data_entrada = document.querySelector("#data_entrada");
const descricao_problema = document.querySelector("#descricao_problema");
const tipo_servico = document.querySelector("#tipo_servico");
const situacao = document.querySelector("#situacao");
const valor = document.querySelector("#valor");
const corpo = document.querySelector("tbody");
const api = "http://localhost:3000";
const form = document.querySelector("form");
let prods = [];

window.addEventListener("load", async () => {
  const resposta = await fetch(`${api}/manutencoes`);
  prods = await resposta.json();
  console.log(prods);
  renderizar(prods);
});

function renderizar(prods) {
  prods.forEach((element) => {
    corpo.innerHTML += `    <tr>
                <td>${element.id_manutencao}</td>
                <td>${element.data_entrada}</td>
                <td>${element.descricao_problema}</td>
                <td>${element.tipo_servico}</td>
                <td>${element.situacao}</td>
                <td>${element.valor}</td>
                <td>
                <button onclick="deletar(${element.id_manutencao})">✅</button>
                <button onclick='editar(${element.id_manutencao})'>✏️</button>
                </td>
            </tr>`;
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const dados = {
    data_entrada: data_entrada.value,
    descricao_problema: descricao_problema.value,
    tipo_servico: tipo_servico.value,
    situacao: situacao.value,
    valor: valor.value,
  };
  const resposta = await fetch(`${api}/cad_manutencao`, {
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
  const resposta = await fetch(`http://localhost:3000/deleta_manutencao/${id}`, {
    method: "DELETE",
  });
  if (resposta.status == 200) {
    return window.location.reload();
  }
  return alert("erro ao deletar");
}

async function editar(id) {
  const produto = await fetch(`${api}/manutencao/${id}`);
  const prod = await produto.json();
  const datas = {
    data_entrada: prompt("Data de Entrada", prod.data_entrada),
    descricao_problema: prompt("Descrição do Problema", prod.descricao_problema),
    tipo_servico: prompt("Tipo de Serviço", prod.tipo_servico),
    situacao: prompt("Situação", prod.situacao),
    valor: prompt("Valor", prod.valor),
  };
  const resposta = await fetch(`${api}/editar_manutencao/${id}`, {
    method: "put",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(datas),
  });
  resposta.status == 200 || resposta.status == 201 ? window.location.reload() : alert("erro ao editar");
}

