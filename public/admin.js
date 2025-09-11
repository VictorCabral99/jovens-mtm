document.getElementById("btnEnviar").addEventListener("click", async () => {
  const titulo = document.getElementById("titulo").value;
  const mensagem = document.getElementById("mensagem").value;

  if (!titulo || !mensagem) {
    alert("Preencha título e mensagem!");
    return;
  }

  await fetch("/send", {
    method: "POST",
    body: JSON.stringify({ title:titulo, body: mensagem }),
    headers: { "Content-Type": "application/json" }
  });

  alert("✅ Notificação enviada!");
});