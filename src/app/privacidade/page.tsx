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
            ← Voltar
          </Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>
        <div className="bg-white rounded-lg p-6 shadow-sm prose max-w-none">
          <p>Conteúdo da política de privacidade...</p>
        </div>
      </main>
    </div>
  );
}
