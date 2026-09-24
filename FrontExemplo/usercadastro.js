const marca = document.getElementById('marca');
const modelo = document.getElementById('modelo');
const ano = document.getElementById('ano');
const placa = document.getElementById('placa');
const cor = document.getElementById('cor');
const enviar = document.getElementById('enviar');
console.log (id_cliente);
const formulario = document.querySelector('form');
formulario.addEventListener('submit', async (e) => {
  e.preventDefault();
  const dados = {
    marca: marca.value,
    modelo: modelo.value,
    ano: ano.value,
    placa: placa.value,
    cor: cor.value
  };
  const resposta = await fetch("http://localhost:3000/cadVeiculo", {
   method: "POST",
   headers: { "content-type": "application/json" },
    body: JSON.stringify(dados)
  })
    
})