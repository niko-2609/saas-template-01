import React from 'react'

function AuthLayout({children}: {children: React.ReactNode}) {
  return (
    <div className='min-h-screen'>
      {children}
    </div>
  )
}

export default AuthLayout
