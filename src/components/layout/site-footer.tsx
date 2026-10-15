import { Brand } from '@/components/brand';
import { Icon } from '@/components/icon';
import { product } from '@/config/product';

export function SiteFooter() {
  return (
    <footer className="footer container">
      <div className="footer-main">
        <Brand />
        <p>Capture. Anote. Compartilhe.</p>
        <a className="footer-github" href={product.repository}>
          <Icon name="github" size={18} /> GitHub <Icon name="arrow" size={14} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>
          Um projeto de <a href="https://github.com/pedroaba">Pedro Barbosa</a>. Código aberto sob
          licença MIT.
        </span>
        <a href={`${product.repository}/issues`}>
          Sugestões e problemas <Icon name="arrow" size={13} />
        </a>
        <span>Feito para explicar melhor.</span>
      </div>
    </footer>
  );
}
