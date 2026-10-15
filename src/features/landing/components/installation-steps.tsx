import { product } from '@/config/product';

export function InstallationSteps() {
  return (
    <div className="installation">
      <div>
        <span className="feature-number">COMO INSTALAR</span>
        <h3>
          Três passos.
          <br />E uma ideia para compartilhar.
        </h3>
      </div>
      <ol>
        <li>
          <span>1</span>
          <div>
            <strong>Baixe e descompacte.</strong>
            <p>
              Abra o ZIP do seu processador e mova {product.archiveAppName} para Aplicativos. Este
              release ainda usa o nome RXS.
            </p>
          </div>
        </li>
        <li>
          <span>2</span>
          <div>
            <strong>Abra no seu Mac.</strong>
            <p>
              A versão pública não tem notarização da Apple. Se a abertura for bloqueada e você
              confiar no download, use Privacidade e Segurança → Abrir Mesmo Assim.
            </p>
          </div>
        </li>
        <li>
          <span>3</span>
          <div>
            <strong>Autorize e capture.</strong>
            <p>
              Permita a Gravação de Tela nos Ajustes do Sistema e configure seus atalhos pela barra
              de menus.
            </p>
          </div>
        </li>
      </ol>
    </div>
  );
}
