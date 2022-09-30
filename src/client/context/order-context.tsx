import * as React from 'react';

type OrderContextType = {
  order: any;
  setOrder: React.Dispatch<any>;
  clearOrder: () => void;
};

const OrderContext = React.createContext({} as OrderContextType);

const useOrder = () => {
  const context = React.useContext(OrderContext);

  if (!context) {
    throw Error('useOrder must be used within a OrderProvider');
  }

  return context;
};

const OrderProvider = ({ children, ...props }) => {
  const [order, setOrder] = React.useState(null);

  const clearOrder = () => setOrder(null);

  return (
    <OrderContext.Provider value={{ order, setOrder, clearOrder }} {...props}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderProvider, useOrder };
