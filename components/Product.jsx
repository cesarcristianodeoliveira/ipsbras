import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'

function truncateString(str, num) {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <>
      <Link href={`/produto/${slug.current}`}>
        <a className="group relative focus:outline-none">
          <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
            {image && (
              <img
                src={urlFor(image && image[0])}
                alt={name}
                className="w-full h-full object-center object-cover sm:object-contain sm:h-80 lg:h-full"
              />
            )}
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <span aria-hidden="true" className="absolute inset-0" />
                <span className='hidden sm:block'>{truncateString(name, 30)}</span>
                <span className='block sm:hidden'>{name}</span>
              </h3>
            </div>
            <p className="flex-shrink-0 text-sm font-medium text-gray-900">R$ {price}</p>
          </div>
        </a>
      </Link>
    </>
  )
}

export default Product