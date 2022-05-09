import React from 'react'
import Link from 'next/link'
import { RiInstagramFill, RiWhatsappFill } from 'react-icons/ri'

const Footer = () => {
  const urlencodedtext = 'Olá!%20Atendimento%20via%20Loja%20Virtual%20-%20https://ipsbras.vercel.app'
  return (
    <>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16'>
        <div className='flex items-center'>
          <Link href='https://www.instagram.com/ipsbras/'>
            <a target='_blank' className='p-1.5 rounded-full bg-violet-600 text-white hover:opacity-75 focus:outline-none'>
            <RiInstagramFill className='block w-5 h-5' />
            </a>
          </Link>
          <Link href={`https://wa.me/5511991258064?text=${urlencodedtext}`}>
            <a target='_blank' className='ml-1.5 p-1.5 rounded-full bg-green-600 text-white hover:opacity-75 focus:outline-none'>
            <RiWhatsappFill className='block w-5 h-5' />
            </a>
          </Link>
        </div>
        <div className='mt-2 text-sm text-gray-700 cursor-default'>
          © <Link href='/'><a className='font-medium text-indigo-600 hover:text-indigo-700 focus:outline-none'>IPS</a></Link> {new Date().getFullYear()}
        </div>
      </div>
    </>
  )
}

export default Footer