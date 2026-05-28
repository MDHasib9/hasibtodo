import { UserButton } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div className=' flex flex-col' >
      <div className='flex w-screen justify-end p-8' >

      <UserButton/>
      </div>
      <div className='flex text-center w-screen justify-center mt-40' >
        <h1 className='text-4xl font-bold  text-white ' >Welcome    </h1>
      </div>
      <div className='mt-6 justify-center flex  text-green-500 font-bold' > 
      <Link href={'/sign-up'}>signUp</Link>

      </div>
    </div>
  )
}

export default Home