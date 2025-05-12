
function atualizarSensores() {
    const temp = Math.floor(Math.random() * 10 + 25);
    const umidade = Math.floor(Math.random() * 60 + 20);
    const luz = Math.random() > 0.5 ? "Alta" : "Baixa";

    document.getElementById("temp").textContent = temp;
    document.getElementById("soil").textContent = umidade;
    document.getElementById("light").textContent = luz;

    const alerta = document.getElementById("alerta");
    alerta.textContent = (umidade < 40) ? "⚠️ Umidade baixa! Regar a horta." : "";
}

function registrarAcao(acao) {
    const lista = document.getElementById("historico");
    const item = document.createElement("li");
    const hora = new Date().toLocaleTimeString();
    item.textContent = `${hora} - ${acao}`;
    lista.prepend(item);
}

document.addEventListener("DOMContentLoaded", () => {
    const nome = sessionStorage.getItem("usuario");
    if (nome && document.getElementById("bemvindo")) {
        document.getElementById("bemvindo").textContent = "Bem-vindo(a), " + nome + "!";
    }
    if (document.getElementById("temp")) {
        atualizarSensores();
        setInterval(atualizarSensores, 5000);
    }
});
