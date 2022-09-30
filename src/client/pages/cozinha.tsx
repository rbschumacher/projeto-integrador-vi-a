import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';

const Cozinha: NextPage = () => {
  const [orders, setOrders] = useState([]);
  const [isFinishing, setIsFinishing] = useState(false);

  const fetchItems = async () => {
    const res = await fetch('/orders');
    const data = await res.json();

    setOrders(data);
  };

  const finishOrder = async (orderId) => {
    setIsFinishing(true);
    await fetch(`/orders/finish/${orderId}`, {
      method: 'POST',
    });

    await fetchItems();
    setIsFinishing(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center py-8 px-16">
      <h1 className="text-6xl text-blue-600 font-bold mb-20">Pedidos</h1>

      <div className="flex flex-col items-start w-full mb-8">
        <h2 className="text-3xl text-yellow-400 font-bold mb-4">
          Em preparação
        </h2>

        {orders
          .filter((order) => order.status === 'PREPARING')
          .map((order) => (
            <div className="w-full max-w-sm flex flex-col bg-white rounded-lg shadow-md px-4 py-2 mb-2">
              <h5 className="mb-1">Pedido: </h5>
              {order.items.map((item) => (
                <span className="text-xl">
                  <span className="text-md font-bold">1x</span> {item.name}
                </span>
              ))}

              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 disabled:bg-gray-400"
                onClick={() => finishOrder(order.id)}
                disabled={isFinishing}
              >
                {isFinishing ? 'Finalizando...' : 'Finalizar pedido'}
              </button>
            </div>
          ))}
      </div>

      <div className="flex flex-col items-start w-full mb-8">
        <h2 className="text-3xl text-red-400 font-bold mb-4">
          Aguardando pagamento
        </h2>

        {orders
          .filter((order) => order.status === 'WAITING_PAYMENT')
          .map((order) => (
            <div className="w-full max-w-sm flex flex-col bg-white rounded-lg shadow-md px-4 py-2 mb-2">
              <h5 className="mb-1">Pedido: </h5>
              {order.items.map((item) => (
                <span className="text-xl">
                  <span className="text-md font-bold">1x</span> {item.name}
                </span>
              ))}
            </div>
          ))}
      </div>

      <div className="flex flex-col items-start w-full">
        <h2 className="text-3xl text-green-400 font-bold mb-4">Finalizados</h2>

        {orders
          .filter((order) => order.status === 'FINISHED')
          .map((order) => (
            <div className="w-full max-w-sm flex flex-col bg-white rounded-lg shadow-md px-4 py-2 mb-2">
              <h5 className="mb-1">Pedido: </h5>
              {order.items.map((item) => (
                <span className="text-xl">
                  <span className="text-md font-bold">1x</span> {item.name}
                </span>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Cozinha;
