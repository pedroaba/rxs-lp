import { Icon } from '@/components/icon';

export function BenefitsSection() {
  return (
    <section className="benefits container" aria-label="Benefícios do RSX">
      <article>
        <div className="benefit-icon">
          <Icon name="capture" size={24} />
        </div>
        <h2>Do atalho à captura.</h2>
        <p>Tela inteira, região ou janela. Escolha o que importa e comece por ali.</p>
      </article>
      <article>
        <div className="benefit-icon">
          <Icon name="pen" size={24} />
        </div>
        <h2>Um detalhe muda tudo.</h2>
        <p>Uma seta, um contorno, um traço. Torne sua ideia fácil de entender.</p>
      </article>
      <article>
        <div className="benefit-icon">
          <Icon name="copy" size={24} />
        </div>
        <h2>Pronto para compartilhar.</h2>
        <p>Copie ou salve em PNG, com a resolução original da sua imagem.</p>
      </article>
    </section>
  );
}
