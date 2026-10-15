import { Icon } from '@/components/icon';
import { product } from '@/config/product';
import { faqs } from '@/content/faq';

export function FaqSection() {
  return (
    <section className="section container faq-section" id="faq" aria-labelledby="faq-title">
      <div>
        <p className="eyebrow">ANTES DA PRIMEIRA CAPTURA</p>
        <h2 id="faq-title">
          Ficou alguma
          <br />
          <span>pergunta?</span>
        </h2>
        <p>
          Mais detalhes e atualizações
          <br />
          no{' '}
          <a className="inline-link" href={product.repository}>
            repositório do projeto <Icon name="arrow" size={14} />
          </a>
          .
        </p>
      </div>
      <div className="faq-list">
        {faqs.map((faq) => (
          <details key={faq.question}>
            <summary>
              {faq.question}
              <span className="faq-plus" aria-hidden="true">
                +
              </span>
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
