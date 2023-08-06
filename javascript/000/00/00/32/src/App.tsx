import './App.css'
import localClient from './lib/client'
import { ChatApp } from './components/ChatApp'
import { ApolloProvider } from '@apollo/client'

function App() {
  return (
    <>
      <ApolloProvider client={localClient}>
        <ChatApp />
      </ApolloProvider>
    </>
  )
}

export default App
