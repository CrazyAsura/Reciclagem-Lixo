# 🌿 Recicla+ - Implementação MUI com Cores Verde, Preto e Branco

Este projeto implementa um design moderno usando Material-UI (MUI) com uma paleta de cores sustentável: **Verde (#00A86B)**, **Preto (#000000)** e **Branco (#FFFFFF)**.

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── app/
│   │   ├── libs/
│   │   │   ├── theme/
│   │   │   │   └── theme.ts           # Tema customizado do MUI
│   │   │   └── providers/
│   │   │       └── MuiProvider.tsx    # Provider do tema
│   │   ├── ui/
│   │   │   └── layout/
│   │   │       ├── header.tsx         # Header com navegação
│   │   │       └── footer.tsx         # Footer responsivo
│   │   ├── about/
│   │   │   └── page.tsx               # Página Sobre
│   │   ├── faq/
│   │   │   └── page.tsx               # Página FAQ
│   │   ├── contact/
│   │   │   └── page.tsx               # Página Contato com formulário
│   │   ├── layout.tsx                 # Layout raiz com MuiProvider
│   │   └── page.tsx                   # Página Home
```

## 🎨 Cores e Tema

### Paleta de Cores
- **Primária (Verde)**: `#00A86B` - Botões, bordas, acentos
- **Secundária (Preto)**: `#000000` - Textos, títulos, footer
- **Background (Branco)**: `#FFFFFF` - Fundo principal

## ✨ Recursos Implementados

### 1. **Header Responsivo**
- Logo com gradient (Preto → Verde)
- Navegação com animações de hover
- Links sublinhados animados

### 2. **Footer Profissional**
- Fundo preto com bordas verdes
- Links rápidos e redes sociais
- Animações ao scroll

### 3. **Página Home**
- Hero section com CTA buttons
- Seção de features com cards animados
- Hover effects elegantes

### 4. **Página Sobre**
- Missão e Visão em cards
- Lista de valores
- Seção de time

### 5. **Página FAQ**
- Accordions com perguntas frequentes
- Design limpo e intuitivo
- Bordas dinâmicas

### 6. **Página Contato**
- Formulário validado com Zod
- React Hook Form
- Cards de informação de contato
- Links para redes sociais

## 🚀 Instalação e Execução

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm build

# Iniciar servidor de produção
npm start
```

## 📦 Dependências Principais

- **Next.js 16**: Framework React
- **MUI 7.3.7**: Material-UI components
- **Motion 12.29.2**: Animações
- **React Hook Form**: Gerenciamento de formulários
- **Zod**: Validação de dados
- **Emotion**: CSS-in-JS

## 🎯 Funcionalidades de Design

### Animações
- Transições suaves em botões e cards
- Efeito de scale ao hover
- Animações de entrada ao scroll (whileInView)
- Transições de transform para efeito 3D

### Bordas
- Bordas pretas sólidas em cards (2px)
- Mudança para verde ao hover
- Bordas verdes em elementos secundários

### Tipografia
- Títulos em gradiente preto→verde
- Pesos variados (600-700)
- Cores de texto consistentes

## 🔧 Customização do Tema

Para alterar cores, edite [src/app/libs/theme/theme.ts](src/app/libs/theme/theme.ts):

```typescript
palette: {
  primary: {
    main: '#00A86B', // Verde principal
  },
  secondary: {
    main: '#000000', // Preto
  },
  background: {
    default: '#FFFFFF', // Branco
  },
}
```

## 📱 Responsividade

- Totalmente responsivo para mobile, tablet e desktop
- Grid system do MUI para layouts flexíveis
- Tipografia adaptativa com `fontSize` condicional

## 🌐 Páginas Disponíveis

- `/` - Home
- `/about` - Sobre
- `/faq` - Perguntas Frequentes
- `/contact` - Contato

## 📝 Licença

Projeto educacional - Siga a licença do seu projeto original.
