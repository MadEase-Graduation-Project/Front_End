import React from 'react'
import AddBlogPostForm from '@/components/doctor/Advice/AddBlogPostForm' 
export const Advice = () => {
  return (
    <div className='px-4 grid gap-3 grid-cols-12'>
      {/* Blog Post Form */}
      <div className='col-span-12'>
        <AddBlogPostForm />
      </div>
    </div>
  )
}
