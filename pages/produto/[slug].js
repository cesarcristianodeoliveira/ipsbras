import React, { useState } from 'react'
import { useStateContext } from '../../context/StateContext'
import { client, urlFor } from '../../lib/client';

import { AiOutlineStar, AiFillStar, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const ProductDetails = ({ product, products }) => {
  const { image, name, price, content, highlights, details, review } = product
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd } = useStateContext()

  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  }

  return (
    <>
      <div>
        
        <div className='bg-gradient-to-t lg:bg-gradient-to-r from-gray-200 to-gray-50'>
          <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-2 xl:gap-x-8 lg:items-center">
              <div className="grid grid-cols-4 gap-y-6 lg:grid-cols-2 gap-x-6 xl:gap-x-8 order-2 lg:order-1">
                {image?.map((item, i) => (
                  <div key={i} className='group relative'>
                    <img 
                    src={urlFor(item)}
                    alt={item}
                    className={`${i === index ? 'bg-indigo-600 rounded-md group-hover:bg-indigo-700 shadow-2xl' : 'group-hover:opacity-75'} w-full h-20 object-center object-contain sm:h-32 lg:h-64 cursor-pointer`}
                    onClick={() => setIndex(i)}
                    />
                  </div>
                ))}              
              </div>
              <div className='order-1 lg:order-2'>
                {image && (
                  <img
                    src={urlFor(image && image[index])}
                    alt={name}
                    className="w-full h-64 object-center object-contain sm:h-96"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{name}</h1>
          </div>

          <div className="mt-4 lg:mt-0 lg:row-span-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">R$ {price}</p>
            <div className="mt-6">
              <h3 className="sr-only">Avaliação</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <div
                      key={rating}
                    >
                      {review > rating ? <AiFillStar className='text-gray-900' /> : <AiOutlineStar className='text-gray-400' /> }
                    </div>
                  ))}
                </div>
                <div className="ml-3 text-sm font-medium text-indigo-600">{review ? review : '0'} de 5 estrelas</div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm text-gray-900 font-medium">Quantidade</h3>
              <div className="mt-4 flex items-center">
                <button onClick={decQty} className='p-2 rounded-l bg-gray-200 hover:bg-gradient-to-r hover:from-gray-300 hover:to-gray-200 focus:outline-none'><AiOutlineMinus className='block w-4 h-4' /></button>
                <div className='w-10 p-2 flex items-center h-8 text-sm justify-center font-medium border-2 border-t-gray-200 border-b-gray-200'>{qty}</div>
                <button onClick={incQty} className='p-2 rounded-r bg-gray-200 hover:bg-gradient-to-l hover:from-gray-300 hover:to-gray-200 focus:outline-none'><AiOutlinePlus className='block w-4 h-4' /></button>
              </div>
            </div>

            <div className="mt-10">
              <button
              onClick={() => onAdd(product, qty)}
              className="mt-10 w-full border border-indigo-600 rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-indigo-600 hover:text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
              Adicionar ao Carrinho
              </button>
              <button
              onClick={handleBuyNow}
              className="mt-4 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
              Comprar Agora
              </button>
            </div>
          </div>

          <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray-900">{content}</p>
              </div>
            </div>
            {highlights && (
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Destaques</h3>
                <div className="mt-4">
                  <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                    {highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {details && (
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Detalhes</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{details}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: { 
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]'

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product }
  }
}

export default ProductDetails