import React from 'react'
import MessageList from './MessageList'
import ChatInput from './ChatInput'

function HomePage() {
  return (
    <main>
      {/* Message */}
      <MessageList />
      {/* ChatInput */}
      <ChatInput />
    </main>
  )
}

export default HomePage