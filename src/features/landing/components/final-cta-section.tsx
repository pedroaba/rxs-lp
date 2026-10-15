import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';

export function FinalCtaSection() {
  return (
    <section className="final-cta container">
      <span className="brand-mark">
        <Icon name="capture" size={26} />
      </span>
      <h2>
        Uma captura.
        <br />
        <span>Tudo mais claro.</span>
      </h2>
      <Button asChild className="button button-primary">
        <a href="#download">
          Comece com o RSX <Icon name="arrow" size={18} />
        </a>
      </Button>
      <p>Gratuito. Aberto. Feito para macOS.</p>
    </section>
  );
}
