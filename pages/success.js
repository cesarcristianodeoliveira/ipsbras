import React, { useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  
  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className="bg-gradient-to-t from-gray-200 to-white h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className='flex flex-col justify-center items-center'>
          <div>
            <BsBagCheckFill className='text-gray-700 w-32 h-32' />
          </div>
          <h2 className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4x'>Obrigado pelo seu pedido!</h2>
          <p className="my-2 text-red-600">Verifique sua caixa de entrada de e-mail para o recibo.</p>
          <p className="mt-4 text-xl text-gray-500">
            Se você tiver críticas, dúvidas ou reclamações, por favor, envie um e-mail.
          </p>
          <a className="my-2 font-medium text-indigo-600 hover:text-indigo-700" href="mailto:cesarcristianodeoliveira@gmail.com">
            cesarcristianodeoliveira@gmail.com
          </a>
          <Link href="/">
            <button type="button" className="mt-4 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none">
              Continuar
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Success