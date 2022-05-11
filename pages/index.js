import React from 'react';

import { client } from '../lib/client';
import { Banner, Product } from '../components';

const Home = ({ products, banners }) => {
  return (
  <>
    <Banner heroBanner={banners.length && banners[0]}/>
    <div className="max-w-2xl mx-auto py-20 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 cursor-default">Produtos recentes</h2>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products?.map((product) => <Product key={product._id} product={product} />)}
      </div>
    </div>
  </>
  )
};

export const getServerSideProps = async () => {
  const queryProducts = `*[_type == "product"] | order(review desc)`;
  const products = await client.fetch(queryProducts);

  const queryBanners = `*[_type == "product" && isBanner == true] {
    image,
    name,
    details,
    slug {
      current
    },
    review,
    isBanner
  }`
  const banners = await client.fetch(queryBanners)

  return {
    props: { products, banners }
  }
}

export default Home;
