import React from 'react';
import Link from 'next/link';
import { useStateContext} from '../context/StateContext';
import { Cart } from './';
import { AiFillShopping, AiOutlineShoppingCart } from 'react-icons/ai'

const Navbar = () => {
  const { setShowCart, totalQuantities } = useStateContext();

  return (
    <>
      <div className='sticky top-0 w-full z-40 bg-white'>
        <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div>
              <Link href='/'>
              <a className='flex items-center'>
                <AiFillShopping className='mr-2 block w-6 h-6 text-gray-900' />
                <h3 className='focus:outline-none font-bold text-3xl leading-none uppercase text-indigo-600 hover:text-indigo-700'>IPS</h3>
              </a>
              </Link>
            </div>
            <div className="ml-4 flow-root lg:ml-6">
              <button className="group -m-2 p-2 flex items-center focus:outline-none" onClick={() => setShowCart(true)}>
              <AiOutlineShoppingCart
              className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{totalQuantities}</span>
              <span className="sr-only">itens no carrinho, ver produtos</span>
              </button>
            </div>
          </div>
        </nav>
      </div>

      <Cart />
    </>
  )
}

export default Navbar