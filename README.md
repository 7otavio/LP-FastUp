# Fast Up — Marketing Imobiliário

Site responsivo da Fast Up, com serviços de produção de vídeo e tráfego pago, curso Corretor de Autoridade, contato pelo Instagram e página para proprietários.

O projeto usa React, TypeScript, Vite, Tailwind CSS e Remotion. A identidade visual segue o briefing da Fast Up: preto, verde e branco, com as logos originais.

## Executar localmente

Use Node.js 24 e execute:

```sh
npm ci
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente `http://localhost:5173`.

## Verificar e gerar o site

```sh
npm run check
```

O comando verifica o TypeScript e gera os arquivos de produção em `dist/`. Para conferir essa versão:

```sh
npm run preview
```

## Publicar no Netlify

Importe este repositório no Netlify. O arquivo `netlify.toml` já define:

| Configuração | Valor |
| --- | --- |
| Diretório base | Raiz do repositório |
| Comando de build | `npm run check` |
| Diretório de publicação | `dist` |
| Node.js | `24` |
| Variáveis de ambiente | Nenhuma necessária |

Para publicação manual, execute `npm run check` e envie a pasta `dist/` pelo Netlify Drop. Mais detalhes em [docs/netlify.md](docs/netlify.md).

## Estrutura

- `src/App.tsx`: composição da página inicial e da página de proprietários.
- `src/components/`: seções, navegação e componentes visuais.
- `src/components/motion/`: apresentação em quatro cenas e cenário arquitetônico animado.
- `src/hooks/`: animação de entrada, seção ativa e preferência de movimento reduzido.
- `src/index.css` e `tailwind.config.js`: identidade visual e estilos responsivos.
- `public/assets/`: logos, imagens locais e favicon.
- `public/_redirects`: suporte à URL curta da página de proprietários.
- `public/404.html`: página de erro da Fast Up.
- `index.html` e `proprietarios.html`: entradas do build.

## Páginas e conteúdo

- `/`: serviços, quem somos, curso e contato.
- `/proprietarios` e `/proprietarios.html`: corretagem com marketing para proprietários.
- Os contatos e a inscrição no curso apontam para [@sejafastup](https://www.instagram.com/sejafastup/).
- Os quatro módulos, bônus e materiais do curso estão presentes; preços não são exibidos.
- O vídeo promocional específico do curso está indicado como “em breve”, aguardando o arquivo ou a URL definitiva.

## Animação

A apresentação do topo dura 18 segundos e mostra gravação de imóvel com celular, edição, tráfego pago e a marca Fast Up. O visitante pode pausar ou escolher uma cena. A reprodução pausa fora da tela e quando a aba fica oculta.

O fundo usa arquitetura em SVG, luzes verdes discretas e movimento suave. Há um controle próprio de pausa. Quando o dispositivo solicita movimento reduzido, a apresentação e o cenário usam alternativas estáticas.

A estrutura por cenas foi inspirada no [workflow de Remotion indicado no projeto](https://dfolloni.substack.com/p/criando-videos-com-claude-code-workflow). A reprodução usa [Remotion Player](https://www.remotion.dev/docs/player); não há MP4 exportado. Consulte a [licença do Remotion](https://www.remotion.dev/license) para suas condições de uso.

## Ativos

As logos foram extraídas do briefing fornecido para o projeto. As imagens ilustrativas são do Unsplash; as famílias Sora e Inter são carregadas pelo Google Fonts. Os arquivos Manrope e `OFL.txt` da versão anterior estão preservados em `public/assets/`.

`studio-camera.png` é um ativo gerado de uma versão anterior; a apresentação atual usa um celular desenhado em SVG e a fotografia `architecture.jpg` no visor.
