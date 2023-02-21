import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import Pattern from './components/Pattern'
import { Triangle } from 'react-loader-spinner'
import './App.css' 

function App(){
  const [pattern, setPattern] = useState({
    boolean:false,
    messageId:null
  })

  const GET_MESSAGES=gql`
   query{
    messages{
      items{
        id
        author{
          login
        }
        subject
        body
      }
    }
   }`;


   // to write the word slice// 

  const checkMore = ({props})=>{
    const word = props 
    const [isCheckMore, setIsCheckMore] = useState(true)
    
    const toggleOpenMore=()=>{
      setIsCheckMore(!isCheckMore)
    }

    return(
      <p className='text'>
        {isCheckMore ? word.slice(0,150):word}
      <span onClick={toggleOpenMore} className="read-or-hide">
        {isCheckMore ? "...check more":" Show less"}
      </span>
      </p>

    )
  }

  function ShowMessages(){
    const {loading, error, data} = useQuery(GET_MESSAGES);

    if(loading)return(
      <div className="loader-container">
      <Triangle  className='spinner-class'  visible={true} ariaLabel='triangle-loading' color='blue'/>
      <p className='loading'>Process..!</p>
  </div>
    )
    if (error) return <p>Error : {error.message}</p>;
  

  return(
    <div className='message-container'>
    { data && data.messages.items?.map((message, index)=>
      <div key={index} className="messages">
            <p><strong>id:  </strong>{message.id}</p>
            <p><strong>subject:  </strong>{message.subject}</p>
            <div><strong>body:  </strong>
              {message.body.length >= 150 ? <checkMore prop={message.body} /> : message.body}
            </div>
            
            <div className="button">
              <button onClick={() => setPattern({
                boolean: true,
                messageId:  message.id 
              })}
              >Check More...</button>
            </div>
          </div>
      
      
      )}
      <div>
      {pattern.boolean ? <Pattern id={pattern.messageId} setPattern={setPattern}/> : null}
      </div>
    </div>
  )
  
};
return(
  <div className='App'>
  <div className='flex-messages'>
  <h1>Update-Mutation-message-container</h1>
  </div>
  <ShowMessages/>
  </div>
)
}
export default App

