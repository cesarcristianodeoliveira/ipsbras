import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'

const Banner = ({ heroBanner }) => {
    return (
        <>
            {heroBanner.isBanner && (
                <Link href={`/produto/${heroBanner.slug.current}`}>
                    <a>
                    <div className='bg-gradient-to-t lg:bg-gradient-to-r from-gray-200 to-white'>
                    <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-2 xl:gap-x-8 lg:items-center">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-6 xl:gap-x-8 order-2 lg:order-1">
                    <div className="text-center lg:text-left lg:max-w-lg">
                    <h1 className="text-3xl font font-extrabold tracking-tight text-gray-900 lg:text-4xl">{heroBanner.name}</h1>
                    <p className="mt-4 text-xl text-gray-500">{heroBanner.details}</p>
                    </div>
                    </div>
                    <div className='order-1 lg:order-2'>
                    {heroBanner.image && (
                    <img
                    src={urlFor(heroBanner.image[0])}
                    alt={heroBanner.name}
                    className="w-full h-64 object-center object-contain sm:h-96"
                    />
                    )}
                    </div>
                    </div>
                    </div>
                    </div>
                </a>
                </Link>
            )}
        </>
    )
}

export default Banner