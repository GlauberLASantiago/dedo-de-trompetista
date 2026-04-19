# 🎺 Dedo de Trompetista

**Visualizador Interativo de Partituras com Guia de Pistões para Trompete**

Um App que exibe partituras no formato MusicXML, reproduz o áudio e mostra em tempo real quais pistões pressionar no trompete — funciona direto no navegador, sem instalação, e pode ser usado offline.
<img width="1685" height="902" alt="image" src="https://github.com/user-attachments/assets/8992ca9b-1647-47ed-983e-82bd44799de4" />

---

## ✨ Funcionalidades

| Categoria | Recurso |
|---|---|
| **Partitura** | Carrega arquivos `.xml`, `.musicxml` e `.mxl` |
| **Hinário** | Todos os hinos do **HNC (Hinário de Novo Cântico)** pré-carregados em Sib (Bb) |
| **Reprodução** | Tocar / Parar, BPM ajustável, contagem de compassos antes de iniciar |
| **Metrônomo** | Metrônomo integrado durante a execução |
| **Trecho** | Definir compasso inicial e final para repetição |
| **Loop** | Repetição automática do trecho selecionado |
| **Cursor** | Destaque por nota, por compasso ou sem cursor |
| **Zoom** | Zoom da partitura de 40 % a 300 % |
| **Pistões** | Guia visual de pistões sincronizado com a reprodução |
| **Modo Foco** | Oculta todos os controles e exibe apenas a partitura |
| **Reverb** | Controle de reverberação do áudio |
| **Timbre** | Trompete, Piano ou Cordas |
| **Afinação** | Transposição automática: Sib (Bb) ou Dó (C) |
| **Guia de voz** | Escolha qual instrumento guia os pistões em partituras com múltiplas vozes |
| **Solo** | Isola o áudio do instrumento-guia |
| **Atraso BT** | Compensa o atraso de fones Bluetooth (0 – 1200 ms, passos de 50 ms) |
| **Tema** | Claro (bege clássico) e Escuro |
| **Exportar** | Salva o app com a partitura embutida em um único arquivo HTML |
| **PWA / Offline** | Instalável como app; funciona sem conexão após o primeiro acesso |

---

## 🚀 Como usar

### Online
Abra diretamente no navegador — nenhuma instalação necessária.

### Offline / Instalado
1. Acesse o app pelo navegador.
2. Clique em **"Instalar"** (ícone na barra de endereço) para adicionar à tela inicial.
3. Após a instalação, o app funciona sem internet.

### Carregar partitura própria
1. Clique no ícone de **pasta** 📁 na barra de controles.
2. Selecione um arquivo `.xml`, `.musicxml` ou `.mxl`.
3. A partitura será carregada e estará pronta para reprodução.

### Navegar pelo HNC
- Use o seletor verde **📖 HNC Bb** para escolher o hino pelo número.
- As setas **◀ ▶** avançam ou retrocedem um hino por vez.

---

## 🗂 Estrutura do repositório

```
.
├── index.html          # App completo (HTML + CSS + JS em arquivo único)
├── manifest.json       # Manifesto PWA
├── sw.js               # Service Worker (cache e suporte offline)
├── icons/              # Ícones do app (192×192 e 512×512)
└── Instrumentos-Bb/    # Partituras do HNC em MusicXML (.xml / .mxl)
```

---

## 🛠 Tecnologias

- **[OpenSheetMusicDisplay](https://github.com/opensheetmusicdisplay/opensheetmusicdisplay)** — renderização de partituras MusicXML no navegador
- **[WebAudioFont](https://github.com/surikov/webaudiofont)** — síntese de áudio com fontes de som realistas
- **[soundfont-player](https://github.com/danigb/soundfont-player)** — reprodução de soundfonts via Web Audio API
- **[JSZip](https://stuk.github.io/jszip/)** — leitura de arquivos `.mxl` (MusicXML comprimido)
- **Service Worker** — cache em dois níveis: _app shell_ (Cache-first) e _partituras_ (Network-first)

---

## 🎵 Hinário de Novo Cântico (HNC)

O repositório inclui mais de 400 hinos do HNC transpostos para Sib (Bb), prontos para uso com trompete e outros instrumentos transpositores. Os arquivos estão na pasta `Instrumentos-Bb/` no formato MusicXML.

---

## 📄 Licença

Consulte o repositório para informações sobre licenciamento.
