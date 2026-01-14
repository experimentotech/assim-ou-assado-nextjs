import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: 'Política de Privacidade - Assim ou Assado',
};

export default function Privacidade() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            <ChevronLeft className="inline-block" /> Voltar
          </Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>
        <div className="bg-white rounded-lg p-6 shadow-sm prose max-w-none">
          <section className="space-y-4 my-4">
            <h2 className="text-xl font-semibold text-neutral-900">
              1. Introdução
            </h2>
            <p>
              A presente Política de Privacidade descreve como o projeto{" "}
              <strong>Assim ou Assado</strong> coleta, utiliza e protege as
              informações dos usuários que acessam e utilizam a aplicação.
            </p>
            <p>
              O uso da aplicação implica na concordância com esta Política.
            </p>
          </section>

          <section className="space-y-4 my-4">
            <h2 className="text-xl font-semibold text-neutral-900">
              2. Dados Coletados
            </h2>
            <p>
              O <strong>Assim ou Assado</strong> não coleta dados pessoais
              identificáveis diretamente, como nome, e-mail ou documentos.
            </p>
            <p>
              A aplicação coleta apenas <strong>dados anônimos de uso</strong>,
              por meio de cookies e tecnologias semelhantes, conforme descrito
              abaixo.
            </p>
          </section>

          <section className="space-y-4 my-4">
            <h2 className="text-xl font-semibold text-neutral-900">
              3. Uso de Cookies e Tecnologias de Monitoramento
            </h2>
            <p>
              Utilizamos <strong>Google Analytics</strong>, integrado via{" "}
              <strong>Google Tag Manager</strong>, para coletar informações
              estatísticas e anônimas sobre o uso da aplicação.
            </p>

            <p>Essas informações podem incluir:</p>

            <ul className="list-disc list-inside my-1">
              <li>Páginas acessadas</li>
              <li>Tempo de permanência na aplicação</li>
              <li>Tipo de dispositivo e navegador</li>
              <li>Eventos de interação (cliques, navegação, etc.)</li>
              <li>Métricas de performance e usabilidade</li>
            </ul>

            <p>
              Esses dados são utilizados exclusivamente para fins de análise,
              monitoramento de performance e melhoria da experiência do usuário.
            </p>
          </section>

          <section className="space-y-4 my-4">
            <h2 className="text-xl font-semibold text-neutral-900">
              4. Finalidade do Tratamento dos Dados
            </h2>
            <p>
              Os dados coletados têm como finalidade:
            </p>
            <ul className="list-disc list-inside my-1">
              <li>Compreender como a aplicação é utilizada</li>
              <li>Identificar problemas de usabilidade</li>
              <li>Melhorar funcionalidades e desempenho</li>
              <li>Apoiar decisões de evolução do produto</li>
            </ul>
          </section>

          <section className="space-y-4 my-4">
            <h2 className="text-xl font-semibold text-neutral-900">
              5. Compartilhamento de Dados
            </h2>
            <p>
              Os dados coletados são processados pelo Google Analytics, de acordo
              com suas próprias políticas de privacidade.
            </p>
            <p>
              O <strong>Assim ou Assado</strong> não vende, compartilha ou
              transfere dados para terceiros além das ferramentas estritamente
              necessárias para análise e monitoramento.
            </p>
          </section>

          <section className="space-y-4 my-4">
            <h2 className="text-xl font-semibold text-neutral-900">
              6. Controle de Cookies
            </h2>
            <p>
              O usuário pode, a qualquer momento, configurar seu navegador para
              bloquear ou remover cookies, bem como utilizar ferramentas de
              bloqueio de rastreamento.
            </p>
            <p>
              A desativação de cookies pode impactar algumas métricas de uso,
              mas não impede o acesso à aplicação.
            </p>
          </section>

          <section className="space-y-4 my-4">
            <h2 className="text-xl font-semibold text-neutral-900">
              7. Segurança das Informações
            </h2>
            <p>
              O projeto adota boas práticas técnicas e organizacionais para
              proteger os dados coletados contra acesso não autorizado,
              uso indevido ou divulgação indevida.
            </p>
          </section>

          <section className="space-y-4 my-4">
            <h2 className="text-xl font-semibold text-neutral-900">
              8. Alterações nesta Política
            </h2>
            <p>
              Esta Política de Privacidade pode ser atualizada a qualquer
              momento, sem aviso prévio. Recomenda-se a revisão periódica
              deste documento.
            </p>
          </section>

          <section className="space-y-4 my-4">
            <h2 className="text-xl font-semibold text-neutral-900">
              9. Disposições Finais
            </h2>
            <p>
              Ao utilizar o <strong>Assim ou Assado</strong>, o usuário declara
              estar ciente e de acordo com esta Política de Privacidade.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
