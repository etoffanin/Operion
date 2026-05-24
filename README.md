<div align="center">

# ⚙️ Operion 1.1.0

### Sistema de registro, filmagem e evidência operacional de estufagem de containers

<br>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JAVASCRIPT-222222?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![STATUS](https://img.shields.io/badge/STATUS-EM%20DESENVOLVIMENTO-22C55E?style=for-the-badge)

<br>

> Sistema web desenvolvido para registrar operações, capturar evidências visuais e organizar processos de carregamento de bobinas em containers.

</div>

---

<div align="center">

## 🖥️ EXPERIÊNCIA DESKTOP

</div>

<div align="center">

### Dashboard operacional

<img width="1341" height="487" alt="image" src="https://github.com/user-attachments/assets/b63dc1cc-4d17-4002-84ce-80047b742d2c" />

<br><br>

### Área de câmera e gravação

<img width="897" height="601" alt="image" src="https://github.com/user-attachments/assets/d3d95ea8-7609-4312-a7f6-6bbf567e57b7" />

<br><br>

### Controle operacional e finalização

<img width="984" height="599" alt="image" src="https://github.com/user-attachments/assets/6d3c505f-5970-4951-b66b-410f67e84d75" />

</div>

---

<div align="center">

## 📱 EXPERIÊNCIA MOBILE

</div>

<div align="center">

<table>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/5f5e80cb-7406-4667-b879-9fd58be258e8" width="220" />
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/7ccebd48-54ae-4c80-9c0d-de5828779f5a" width="220" />
    </td>
  </tr>
</table>

</div>

---

<div align="center">

## 📌 SOBRE O PROJETO

</div>

O Operion nasceu como um MVP para modernizar o registro operacional de estufagem de containers.

A proposta é transformar um processo que normalmente depende de gravações separadas, fotos soltas e controle manual em um fluxo mais organizado, visual e rastreável.

Nesta versão atual, o foco principal é:

- registrar dados da operação;
- abrir a câmera diretamente pelo navegador;
- capturar fotos importantes do processo;
- controlar a quantidade de bobinas carregadas;
- gerar um resumo operacional;
- organizar melhor a arquitetura do sistema;
- preparar a estrutura para futuras automações.

---

<div align="center">

## ⚙️ FUNCIONALIDADES

</div>

- Registro de data, booking, container, material e quantidade de bobinas
- Captura de fotos da operação
- Área dedicada para filmagem operacional
- Controle progressivo de bobinas carregadas
- Geração de pacote/resumo da operação
- Download do vídeo final
- Layout responsivo para desktop e mobile
- Estrutura JavaScript modular
- Interface otimizada para ambiente operacional

---

<div align="center">

## 🧠 OBJETIVO

</div>

O objetivo do **Operion** não é apenas criar uma interface bonita.

A ideia é validar uma solução real para um problema real: organizar evidências operacionais de forma simples, prática e acessível.

Esse projeto também serve como evolução prática em:

- arquitetura frontend;
- modularização;
- organização de software;
- engenharia de software;
- desenvolvimento de soluções reais.

---

<div align="center">

## 🛠️ TECNOLOGIAS UTILIZADAS

</div>

<div align="center">

| Tecnologia | Uso no projeto |
|---|---|
| HTML5 | Estrutura da aplicação |
| CSS3 | Layout, responsividade e identidade visual |
| JavaScript | Lógica operacional e controle do sistema |
| MediaDevices API | Acesso à câmera |
| MediaRecorder API | Gravação operacional |
| Canvas API | Captura de imagens |

</div>

---

<div align="center">

## 🧱 ESTRUTURA DO PROJETO

</div>

```txt
frontend/
│
├── assets/
│   ├── icons/
│   ├── images/
│   └── videos/
│
├── scripts/
│   ├── camera.js
│   ├── recorder.js
│   ├── state.js
│   ├── ui.js
│   └── main.js
│
├── styles/
│   └── global.css
│
└── index.html
