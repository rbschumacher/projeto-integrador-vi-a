import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Home: NextPage = () => {
  const router = useRouter();
  const [values, setValues] = useState<{ cpf: string; password: string }>({
    cpf: null,
    password: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await res.json();

      if (data.cpf) {
        localStorage.setItem('user', JSON.stringify(data));
        data.role === 'kitchen'
          ? router.push('/cozinha')
          : router.push('/pedido');
      }
    } catch {
      setError('Ops, algo deu errado. Tente novamente!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold mb-20">
          Bem vindo ao{' '}
          <a className="text-blue-600" href="https://nextjs.org">
            Projeto Integrador VI A
          </a>
        </h1>

        <form
          className="w-full max-w-sm"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="cpf"
              >
                CPF
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-600"
                id="cpf"
                type="text"
                placeholder="xxx.xxx.xxx-xx"
                value={values.cpf}
                onChange={(e) =>
                  setValues((currentValue) => ({
                    ...currentValue,
                    cpf: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="password"
              >
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-600"
                id="password"
                type="password"
                placeholder="******************"
                value={values.password}
                onChange={(e) =>
                  setValues((currentValue) => ({
                    ...currentValue,
                    password: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3" />
            <div className="md:w-2/3">
              <button
                className="w-full shadow bg-blue-600 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Carregando...' : 'Entrar'}
              </button>

              <span className="text-gray-700">{error}</span>
            </div>
          </div>
        </form>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with ❤️ by Rafael Schumacher and Luca Safons
        </a>
      </footer>
    </div>
  );
};

export default Home;
