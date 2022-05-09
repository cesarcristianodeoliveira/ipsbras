import React from 'react'
import Link from 'next/link'
import { RiInstagramFill, RiWhatsappFill } from 'react-icons/ri'

const Footer = () => {
  return (
    <>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16'>
        <div className='flex items-center'>
          <Link href='/'>
            <RiInstagramFill />
          </Link>
          <RiWhatsappFill />
        </div>
        <div className='text-sm text-gray-700 cursor-default'>
          © <Link href='/'><a className='font-medium text-indigo-600 hover:text-indigo-700 focus:outline-none'>IPS</a></Link> {new Date().getFullYear()}
        </div>
      </div>
    </>
  )
}

export default Footer