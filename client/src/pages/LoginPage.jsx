import React from 'react'
import { SignIn } from '@clerk/clerk-react'
import { neobrutalism } from '@clerk/themes'

function LoginPage() {
  return (
    <div className='flex items-center justify-center h-[calc(100vh-80px)] '>
      <SignIn
        signUpUrl='/register'
        appearance={{
        baseTheme: neobrutalism,
      }}
      />
    </div>
    
  )
}

export default LoginPage