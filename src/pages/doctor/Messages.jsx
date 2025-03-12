import React, { useState } from 'react'
import { Messages_List_Panel } from '../../components/doctor/Messages/Messages_List_Panel'
import ChatPanel from '../../components/doctor/Messages/ChatPanel'
import { ArrowLeft } from 'lucide-react'

export const Messages = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className='px-4 grid gap-3 grid-cols-12'>
      <div className='border-b mb-2 pb-4 border-gray-200 col-span-12 flex items-center'>
        {showChat && (
          <button 
            onClick={() => setShowChat(false)}
            className='mr-2 p-2 rounded-lg hover:bg-gray-100 lg:hidden'
          >
            <ArrowLeft size={24} />
          </button>
        )}
        <h1 className='font-semibold block text-3xl'>
          Messages
        </h1>
      </div>
      
      <div className={`${!showChat ? 'col-span-12 lg:col-span-4' : 'hidden lg:block lg:col-span-4'}`}>
        <Messages_List_Panel onMessageSelect={() => setShowChat(true)}/>
      </div>
      
      <div className={`${showChat ? 'col-span-12 lg:col-span-8' : 'hidden lg:block lg:col-span-8'}`}>
        <ChatPanel/>
      </div>
    </div>
  )
}
