
import SignInForm from '@/components/auth/sign-in/SignInForm'
import React from 'react'

function page() {
  return (
    <section className="w-full h-screen">
    <section className="w-full h-full flex items-center">
      {/* Left Side */}
      <section
        className={`hidden lg:block w-full h-full lg:w-[50%] 
        bg-[url('https://images.unsplash.com/photo-1531058020387-3be344556be6?auhref=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2070')]`}
      ></section>
      {/* Right Side */}
      <section className="w-full lg:w-[50%] p-5">
       <SignInForm/>
      </section>
    </section>
  </section>
  )
}

export default page