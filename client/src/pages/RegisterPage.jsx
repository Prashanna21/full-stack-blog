import React from 'react'
import { SignUp } from '@clerk/clerk-react'
import { neobrutalism } from '@clerk/themes'

function RegisterPage() {
  return (
    <div className='flex items-center justify-center h-[calc(100vh-100px)] '>
      <SignUp
        className = "hidden"
        signInUrl='/register'
        appearance={{
        baseTheme: neobrutalism,
      }}
      />
    </div>
  )
}

export default RegisterPage