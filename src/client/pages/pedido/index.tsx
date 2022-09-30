import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Pedido: NextPage = () => {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch('/items');
      const data = await res.json();

      setItems(data);
    };

    fetchItems();
  }, []);

  const addItemToCart = (item) => {
    setOrder((currOrder) => [...currOrder, item]);
  };

  const placeOrder = async () => {
    await fetch('/orders', {
      method: 'POST',
      body: JSON.stringify({ items: order.map((orderItem) => orderItem.id) }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    router.push('pedido/pagamento');
  };

  return (
    <div className="flex min-h-screen flex-col items-center py-8">
      <h1 className="text-6xl text-blue-600 font-bold mb-20">
        Projeto Integrador VI A
      </h1>
      {items.map((item) => (
        <div className="w-full max-w-sm bg-white rounded-lg shadow-md px-4 py-2 mb-2">
          <div className="px-5 pb-5">
            <h5 className="text-xl font-semibold tracking-tight">
              {item.name}
            </h5>

            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold">R$ {item.price}</span>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => addItemToCart(item)}
              >
                Pedir
              </button>
            </div>
          </div>
        </div>
      ))}

      {!!order.length && (
        <div className="flex flex-col items-start mt-12">
          <h3 className="text-xl font-bold mb-2">Carrinho:</h3>
          <div>
            {order.map((item) => (
              <div className="flex justify-between">
                <span className="text-md mr-8">{item.name}</span>
                <span className="text-md font-bold">R$ {item.price}</span>
              </div>
            ))}

            <div className="flex justify-between my-4">
              <span className="text-xl">Total:</span>
              <span className="text-xl font-bold">
                R$ {order.reduce((acc, curr) => acc + curr.price, 0)}
              </span>
            </div>
          </div>

          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={placeOrder}
          >
            Ir para pagamento
          </button>
        </div>
      )}
    </div>
  );
};

export default Pedido;
