import React, { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useStateContext } from '../context/StateContext'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { urlFor } from '../lib/client'
import getStripe from '../lib/getStripe';
import toast from 'react-hot-toast'

const Cart = () => {
  const cartRef = useRef()
  const { totalPrice, totalQuantities, cartItems, showCart, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartItems),
    });

    if(response.statusCode === 500) return;

    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <>
      <Transition.Root show={showCart} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setShowCart} ref={cartRef}>
          <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full sm:pl-10">
                <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen sm:max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      
                      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">Carrinho {totalQuantities === 1 ? `- nenhum produto` : `- ${totalQuantities} produtos`}</Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
                              onClick={() => setShowCart(false)}
                            >
                              <span className="sr-only">Fechar</span>
                              <AiOutlineClose className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {cartItems.length < 1 && (
                                <li className="flex flex-col items-center justify-center py-6">
                                  <AiOutlineShoppingCart className='text-gray-400 w-32 h-32' />
                                  <h6 className='font-medium text-gray-700'>Nenhum produto no carrinho</h6>
                                  <button 
                                    onClick={() => setShowCart(false)}
                                    className='mt-6 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none'
                                  >
                                    Continuar
                                  </button>
                                </li>
                              )}
                              {cartItems.length >= 1 && cartItems.map((item) => (
                                <li key={item._id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                    src={urlFor(item.image[0])}
                                    alt={item.name}
                                    className="h-full w-full object-contain object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href='/'>{item.name}</a>
                                        </h3>
                                        <p className="ml-4 flex-shrink-0">R$ {item.price}</p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div>
                                        <div className="flex items-center">
                                          <button onClick={() => toggleCartItemQuanitity(item._id, 'dec')} className='p-2 rounded-l bg-gray-200 hover:bg-gradient-to-r hover:from-gray-300 hover:to-gray-200 focus:outline-none'><AiOutlineMinus className='block w-4 h-4' /></button>
                                          <div className='w-10 p-2 flex items-center h-8 text-sm justify-center font-medium border-2 border-t-gray-200 border-b-gray-200'>{item.quantity}</div>
                                          <button onClick={() => toggleCartItemQuanitity(item._id, 'inc')} className='p-2 rounded-r bg-gray-200 hover:bg-gradient-to-l hover:from-gray-300 hover:to-gray-200 focus:outline-none'><AiOutlinePlus className='block w-4 h-4' /></button>
                                        </div>
                                      </div>
                                      <div className="flex">
                                        <button
                                        onClick={() => onRemove(item)}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                        Remover
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                        
                      {cartItems.length >= 1 && (
                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>R$ {totalPrice}</p>
                          </div>
                          <div className="mt-6">
                            <button
                            onClick={handleCheckout}
                            className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none"
                            >
                            Finalizar
                            </button>
                          </div>
                          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                              ou{' '}
                              <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                              onClick={() => setShowCart(false)}
                              >
                              Continuar<span aria-hidden="true"> &rarr;</span>
                              </button>
                            </p>
                          </div>
                        </div>
                      )}
                      
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default Cart