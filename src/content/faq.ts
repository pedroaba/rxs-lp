import { product } from '@/config/product';

export const faqs = [
  {
    question: 'O que é o RSX?',
    answer:
      'O RSX é um aplicativo de capturas de tela e anotações para macOS. Ele fica na barra de menus, captura a tela inteira, uma região ou uma janela e permite destacar informações com setas, retângulos e desenho livre.',
  },
  {
    question: 'Funciona no meu Mac?',
    answer: `O requisito mínimo é macOS ${product.minimumMacOS} ou posterior. Há downloads separados para Apple Silicon e Intel. Para conferir seu processador, abra o menu Apple e escolha “Sobre Este Mac”.`,
  },
  {
    question: 'Minhas capturas são enviadas para algum servidor?',
    answer:
      'Não. A captura, a edição e a exportação acontecem no seu Mac. O RSX não tem upload ou sincronização. Os logs de diagnóstico também ficam em arquivos locais; o conteúdo das capturas e do clipboard não é registrado.',
  },
  {
    question: 'O RSX é gratuito?',
    answer:
      'Sim. O projeto é aberto e distribuído sob a licença MIT. Você pode baixar os arquivos publicados no GitHub, consultar o código e contribuir com o desenvolvimento.',
  },
  {
    question: 'Por que o macOS pode bloquear a primeira abertura?',
    answer:
      'Os pacotes públicos da versão 0.3.0 usam assinatura ad-hoc, sem Developer ID ou notarização da Apple. Após conferir a origem do download e tentar abrir o app, use Ajustes do Sistema → Privacidade e Segurança → Abrir Mesmo Assim, se você confiar no arquivo.',
  },
  {
    question: 'O download se chama RXS. É o mesmo projeto?',
    answer:
      'Sim. A marca atual é RSX, mas os arquivos da versão pública 0.3.0 e o aplicativo dentro do ZIP ainda usam o nome RXS. Os links desta página apontam para esses arquivos originais do repositório oficial.',
  },
  {
    question: 'Ele grava vídeos ou reconhece texto?',
    answer:
      'Não. Gravação de vídeo ou GIF, OCR, anotação de texto, blur, recorte posterior e biblioteca de imagens não estão implementados. Os vídeos desta página são demonstrações animadas feitas com imagens do editor, e não gravações de tela realizadas pelo app.',
  },
];
