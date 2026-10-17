# Publicar no Netlify

## Pelo repositório

1. Entre no Netlify e escolha a opção de importar um projeto existente.
2. Selecione o repositório `Lucasmagdev/fastup` e a branch `main`.
3. Use as configurações declaradas em `netlify.toml`: comando `npm run check`, diretório `dist` e Node.js 24.
4. Inicie a publicação. O Netlify instalará as dependências usando `package-lock.json`, verificará o TypeScript e gerará o site.

Não são necessárias variáveis secretas para o site atual. O projeto é estático e os contatos apontam para o Instagram oficial.

## Envio manual

```sh
npm ci
npm run check
```

Arraste a pasta `dist/`, que contém `index.html` na raiz, para [Netlify Drop](https://app.netlify.com/drop). Para atualizar um projeto já existente, envie a pasta pela área de deploys desse projeto.

Também é possível compactar o conteúdo de `dist/` em um ZIP. Mantenha `index.html` na raiz do arquivo e preserve `assets/`, `proprietarios.html`, `404.html` e `_redirects`. Não inclua `node_modules/` ou os fontes nesse pacote compilado.

## Rotas

- `/`: página inicial.
- `/proprietarios` e `/proprietarios.html`: página de proprietários.
- Páginas inexistentes: tela 404 da Fast Up.

`public/_redirects` e `public/404.html` são copiados automaticamente para `dist/`. As duas variantes da URL de proprietários são reconhecidas pelo aplicativo.

Referências: [Netlify Drop](https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/), [configuração por arquivo](https://docs.netlify.com/build/configure-builds/file-based-configuration/) e [redirecionamentos](https://docs.netlify.com/manage/routing/redirects/redirect-options/).
