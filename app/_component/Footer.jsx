'use client'
import React from 'react'
import { useUser } from '@clerk/nextjs'

const Footer = () => {
  const { user } = useUser(); 
  return user && (
    <div>
      Footer Component
    </div>
  )
}

export default Footer
