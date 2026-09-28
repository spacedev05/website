# Agropecuária Dois Rios — proposta de novo site

Proposta de redesign moderno para o site da fazenda. Site estático (HTML + CSS + JS puro), sem build.

## Como ver
Abra `index.html` no navegador, ou rode `python3 -m http.server` e acesse http://localhost:8000.

## Seções
Hero com chamada principal · números animados · A Fazenda · Atividades (pecuária, grãos, genética) ·
Sustentabilidade · Linha do tempo · Galeria com lightbox · Contato (formulário que abre o WhatsApp) · botão flutuante de WhatsApp.

## O que substituir antes de publicar
Todo o conteúdo é **modelo**:
- Textos, anos da linha do tempo e números (`data-count` em `index.html`)
- Telefone/WhatsApp (`5500000000000` em `index.html` e `js/main.js`), e-mail, endereço e redes sociais
- Fotos: hoje usam imagens do Unsplash; troque por fotos reais da fazenda
- Cores ficam em variáveis no topo de `css/styles.css`
