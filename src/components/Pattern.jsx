import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import './pattern.css' 

const GET_MESSAGES=gql`
      query MESSAGE_QUERY($id:String!){
        message(id:$id){
            id
            author{
                login
            }
            subject
            body 
            language 
            metrics{
                views
            }
            view_href 
            post_time

        }
      }`;


      const UPDATE_MESSAGE_MUTATION = gql`
      mutation UPDATE($input:updateMessageInput!){
        updateMessage(input:$input){
            id
            body
            subject
            
        }
      }

    `



export default function Pattern({setPattern, id}){
    
    const [formData, setFormData] = useState({})
    const [clicked, updateClicked] = useState(false)
    

    

    const { data} = useQuery(GET_MESSAGES,{
        variables:{id:id},
        onCompleted:(data) =>{
            setFormData(data.message)
        }
    })

    

    const [updateMutation] = useMutation(UPDATE_MESSAGE_MUTATION, {
        
        onCompleted:(data)=>{
            console.log('mutation successfull with', data);
            updateClicked(true)
        },
        onError:(error)=>{
            console.log('error in mutation', error)
        }
        
    })

    const handleChange=(key,value)=>{
        setFormData({
            ...formData,
            [key]: value
        })
    }

    

    

    return(
        <form className='pattern-container' onSubmit={(e)=>{
            e.preventDefault()
            console.log("Data is on the way", formData)
            updateMutation({
                variables:{
                    input:{
                    id:formData.id,
                    subject:formData.subject,
                    body:formData.body,
                    
                    
                }
            }
            })
        }}>
        <div className='title'>
            <h2>Update-Message</h2>
        </div>
        <div className='pattern-mini-container'>
            <div className='pattern-values'>
                <label>Id:</label><br/>
                <input  value={data?.message?.id} readOnly></input>
            </div>
            <div className='pattern-values'>
                <label>Author:</label>
                <input value={data?.message?.author.login} readOnly></input>
            </div>
        </div>

        <div className="pattern-mini-container">
                <div className="pattern-values">
                    <label>Subject:</label><br />
                    <textarea value={formData?.subject} onChange={(e)=>{
                        handleChange('subject', e.target.value)
                    }}></textarea>
                </div>

                <div className="pattern-values">
                    <label>Body:</label><br />
                    <textarea value={formData?.body} onChange={(e)=>{
                        handleChange('body', e.target.value)
                    }}></textarea>
                </div>
        </div>

        <div className="pattern-mini-container">
                <div className="pattern-values">
                    <label>Language:</label><br />
                    <input value={data?.message?.language} readOnly></input>
                </div>

                <div className="pattern-values">
                    <label>Views:</label><br />
                    <input value={data?.message?.metrics.views} readOnly></input>
                </div>
        </div>

        <div className="pattern-mini-container">
                <div className="pattern-values">
                    <label>Link:</label><br />
                    <div className="message-link">
                        <a href={data?.message?.view_href} target="_blank">{data?.message?.view_href}</a>
                    </div>
                </div>

                <div className="pattern-values">
                    <label>Post Time:</label><br />
                    <textarea value={data?.message?.post_time}  readOnly></textarea>
                </div>
            </div>
        <div className='button-container'>
            <button className='button' type='submit' >Update</button>
            <button onClick={()=> setPattern({boolean:false})} className='button'>Close</button>
            
            
            
        </div>
        {clicked ?  <p>Successfully updated mutation go and checked console</p> : ''}
    </form>
    )
}
