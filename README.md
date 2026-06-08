# Jovens MTM

Aplicação web (PWA) de **notificações push** para manter um grupo informado em tempo real. Inclui um painel administrativo para disparar mensagens e um service worker que entrega as notificações mesmo com o site fechado.

## Funcionalidades

- Inscrição de dispositivos para receber notificações (Web Push / VAPID)
- Painel administrativo para envio de mensagens (`/admin`)
- Service worker para entrega em segundo plano
- Instalável como PWA

## Stack

- **Node.js** + **Express 5**
- **web-push** (protocolo Web Push com chaves VAPID)
- HTML/JS estático + **Service Worker**

## Pré-requisitos

- Node.js 18+
- Par de chaves VAPID (gere com `npx web-push generate-vapid-keys`)

## Variáveis de ambiente

Crie um arquivo `.env` na raiz:

```env
VAPID_PUBLIC_KEY=sua-chave-publica
VAPID_PRIVATE_KEY=sua-chave-privada
```

## Instalação e execução

```bash
npm install
npm start
```

A aplicação sobe em `http://localhost:3000` (página pública) e o painel fica em `/admin.html`.

## Como funciona

1. O cliente solicita a chave pública em `/vapid-public-key` e se inscreve via `/subscribe`.
2. O painel envia uma mensagem para `/send`, que dispara a notificação a todos os inscritos.
3. O `service worker` (`public/sw.js`) recebe e exibe a notificação.

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE).
