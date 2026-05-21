# Portfólio — Engenheiro de Dados

Portfólio pessoal para exibir projetos e arquiteturas de engenharia de dados. Desenvolvido com Next.js e hospedado na Vercel.

## Stack

- **Framework**: Next.js 14
- **Estilização**: CSS Modules + Variáveis CSS
- **Fontes**: Syne (títulos) + Space Mono (código/mono)
- **Deploy**: Vercel (integração automática via GitHub)

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Personalizando

### Atualizar seus projetos

Edite o array `PROJECTS` no arquivo `pages/index.js`. Cada projeto tem:

```js
{
  id: 1,
  tag: 'Categoria',
  title: 'Título do projeto',
  subtitle: 'Uma linha descritiva',
  description: 'Descrição detalhada...',
  stack: ['Tech1', 'Tech2'],
  metrics: [
    { label: 'Métrica', value: '99%' },
  ],
  color: 'purple', // purple | teal | amber | coral
  architecture: [
    { layer: 'Ingestão', items: ['Kafka', 'APIs'], color: '#7c6af7' },
  ],
}
```

### Atualizar informações de contato

Substitua `seu@email.com` pelo seu e-mail real no arquivo `pages/index.js`.

### Adicionar links para GitHub/LinkedIn

Na seção do hero ou no nav, adicione seus links:

```jsx
<a href="https://github.com/seuusuario">GitHub</a>
<a href="https://linkedin.com/in/seuperfil">LinkedIn</a>
```

## Deploy na Vercel

O projeto está configurado para deploy automático. Qualquer push para a branch principal dispara um novo deploy.

```bash
git add .
git commit -m "feat: portfolio inicial"
git push origin main
```
