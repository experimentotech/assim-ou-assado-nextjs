import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: 'Termos de Uso - Assim ou Assado',
};

export default function TermosDeUso() {
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
        <h1 className="text-3xl font-bold mb-6">Termos de Uso</h1>
        <div className="bg-white rounded-lg p-6 shadow-sm prose max-w-none">
          <section className="my-4">
            <h2 className="text-xl font-semibold text-gray-900 my-4">
              1. Aceitação dos Termos
            </h2>
            <p>
              Ao acessar e utilizar a ferramenta <strong>Assim ou Assado</strong>
              (“Ferramenta”), o usuário declara que leu, compreendeu e concorda
              com os presentes Termos de Uso. Caso não concorde com algum dos
              termos, recomenda-se não utilizar a Ferramenta.
            </p>
          </section>

          <section className="my-4">
            <h2 className="text-xl font-semibold text-gray-900 my-4">
              2. Descrição da Ferramenta
            </h2>
            <p>
              O <strong>Assim ou Assado</strong> é uma ferramenta pública e gratuita
              desenvolvida pela <strong>Experimento Tech</strong>, com o objetivo
              de auxiliar usuários a estimar quantidades equivalentes de alimentos
              com base na comparação de macronutrientes
              (proteínas, carboidratos e lipídios).
            </p>
            <p>
              A Ferramenta permite, por exemplo, calcular a quantidade necessária
              de um alimento substituto para atingir um determinado valor de
              macronutriente, tomando como referência outro alimento e a porção
              informada pelo usuário.
            </p>
          </section>

          <section className="my-4">
            <h2 className="text-xl font-semibold text-gray-900 my-4">
              3. Fontes de Dados
            </h2>
            <p>
              As informações nutricionais utilizadas pela Ferramenta são obtidas
              a partir de fontes públicas, incluindo:
            </p>
            <ul className="list-disc list-inside my-1">
              <li>Tabela Brasileira de Composição de Alimentos (TACO)</li>
              <li>Outras fontes públicas amplamente divulgadas</li>
            </ul>
            <p>
              Os valores apresentados são estimativas médias e podem variar de
              acordo com fatores como marca, método de preparo, origem do alimento
              e variações naturais dos ingredientes.
            </p>
          </section>

          <section className="my-4">
            <h2 className="text-xl font-semibold text-gray-900 my-4">
              4. Cálculo Energético (Calorias)
            </h2>
            <p>
              Quando aplicável, o cálculo do valor energético (kcal) é realizado
              com base no <a href="https://pt.wikipedia.org/wiki/Energia_alimentar" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Sistema de Atwater</a>, utilizando a seguinte
              fórmula:
            </p>

            <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-900 my-4">
              E = (4 × P) + (4 × C) + (9 × L)
            </div>

            <ul className="my-1">
              <li><strong>E</strong> = Energia (kcal)</li>
              <li><strong>P</strong> = Proteína (g)</li>
              <li><strong>C</strong> = Carboidrato (g)</li>
              <li><strong>L</strong> = Lipídios (g)</li>
            </ul>
          </section>

          <section className="my-4">
            <h2 className="text-xl font-semibold text-gray-900 my-4">
              5. Finalidade Informativa
            </h2>
            <p>
              A Ferramenta possui finalidade exclusivamente informativa e educacional.
              Ela não substitui a orientação de profissionais da saúde, como
              nutricionistas, médicos ou outros especialistas.
            </p>
            <p>
              O uso das informações fornecidas é de inteira responsabilidade do usuário.
            </p>
          </section>

          <section className="my-4">
            <h2 className="text-xl font-semibold text-gray-900 my-4">
              6. Isenção de Responsabilidade
            </h2>
            <p>O desenvolvedor da Ferramenta não se responsabiliza por:</p>
            <ul className="list-disc list-inside my-1">
              <li>Decisões alimentares tomadas com base nos resultados apresentados</li>
              <li>Planos alimentares, dietas clínicas, esportivas ou terapêuticas</li>
              <li>Eventuais erros, omissões ou desatualizações nos dados utilizados</li>
              <li>Consequências diretas ou indiretas decorrentes do uso da Ferramenta</li>
            </ul>
          </section>

          <section className="my-4">
            <h2 className="text-xl font-semibold text-gray-900 my-4">
              7. Uso Livre dos Resultados
            </h2>
            <p>
              O usuário está livre para utilizar os resultados gerados pela
              Ferramenta como bem entender, incluindo uso pessoal, educacional
              ou informativo, bem como para compartilhamento ou reprodução.
            </p>
          </section>

          <section className="my-4">
            <h2 className="text-xl font-semibold text-gray-900 my-4">
              8. Alterações nos Termos
            </h2>
            <p>
              Estes Termos de Uso podem ser modificados ou atualizados a qualquer
              momento, sem aviso prévio. Recomenda-se que o usuário revise este
              documento periodicamente.
            </p>
          </section>

          <section className="my-4">
            <h2 className="text-xl font-semibold text-gray-900 my-4">
              9. Disposições Finais
            </h2>
            <p>
              Ao continuar utilizando a Ferramenta, o usuário confirma sua
              concordância com estes Termos de Uso.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
