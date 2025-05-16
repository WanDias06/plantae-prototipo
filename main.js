const usuario = localStorage.getItem("usuario");
if (document.getElementById("usuario")) {
  document.getElementById("usuario").textContent = usuario;
}

function simularSensores() {
  const temp = Math.floor(Math.random() * 10 + 25);
  const umid = Math.floor(Math.random() * 60 + 20);
  const luz = Math.random() > 0.5 ? "Alta" : "Baixa";

  document.getElementById("temp").textContent = temp;
  document.getElementById("umid").textContent = umid;
  document.getElementById("luz").textContent = luz;

  const alerta = document.getElementById("alerta");
  alerta.textContent = umid < 40 ? "⚠️ Umidade baixa! Rega necessária." : "";
  adicionarAoGrafico(temp, umid);
}

if (document.getElementById("grafico")) {
  const ctx = document.getElementById("grafico").getContext("2d");
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Umidade (%)',
        data: [],
        borderColor: 'green',
        fill: false
      }]
    },
    options: {
      scales: { y: { min: 0, max: 100 } }
    }
  });

  function adicionarAoGrafico(temp, umid) {
    if (chart.data.labels.length > 10) {
      chart.data.labels.shift();
      chart.data.datasets[0].data.shift();
    }
    chart.data.labels.push(new Date().toLocaleTimeString());
    chart.data.datasets[0].data.push(umid);
    chart.update();
  }

  setInterval(simularSensores, 5000);
  simularSensores();
}

function registrarAcao(acao) {
  const nome = localStorage.getItem("usuario");
  const db = firebase.database().ref("usuarios/" + nome + "/acoes");
  const hora = new Date().toLocaleTimeString();
  db.push(`${hora} - ${acao}`);
  const li = document.createElement("li");
  li.textContent = `${hora} - ${acao}`;
  document.getElementById("historico").prepend(li);
}

function cadastrarPlanta(event) {
  event.preventDefault();
  const nome = localStorage.getItem("usuario");
  const planta = document.getElementById("nomePlanta").value;
  const tipo = document.getElementById("tipo").value;
  const db = firebase.database().ref("usuarios/" + nome + "/plantas");
  db.push(`${planta} (${tipo})`);
  const li = document.createElement("li");
  li.textContent = `${planta} (${tipo})`;
  document.getElementById("listaPlantas").appendChild(li);
  event.target.reset();
}
