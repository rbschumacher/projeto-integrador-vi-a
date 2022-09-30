import React, { useState } from 'react';
import { NextPage } from 'next';
import { useOrder } from '../../context/order-context';
import { useRouter } from 'next/router';

const Pagamento: NextPage = () => {
  const { order, clearOrder } = useOrder();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const payOrder = async () => {
    setIsLoading(true);

    await fetch(`/orders/pay/${order.id}`, { method: 'POST' });

    clearOrder();
    setIsLoading(false);
    router.push('/pedido');
  };

  if (!order) {
    router.push('/pedido');
  }

  return (
    <div className="flex flex-col items-center mt-12">
      <h3 className="text-xl font-bold mb-2">Carrinho:</h3>
      <div>
        {order?.items?.map((item) => (
          <div className="flex justify-between">
            <span className="text-md mr-8">{item.name}</span>
            <span className="text-md font-bold">R$ {item.price}</span>
          </div>
        ))}

        <div className="flex justify-between my-4">
          <span className="text-xl">Total:</span>
          <span className="text-xl font-bold">R$ {order?.price}</span>
        </div>
      </div>

      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-500"
        onClick={payOrder}
        disabled={isLoading}
      >
        {isLoading ? 'Pagando...' : 'Pagar'}
      </button>
    </div>
  );
};

export default Pagamento;
