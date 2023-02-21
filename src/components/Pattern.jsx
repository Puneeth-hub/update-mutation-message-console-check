import React, { useState } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import {Triangle} from 'react-loader-spinner'
import './pattern.css' 

export default function Pattern({setPattern, id}){
    
    const [formData, setFormData] = useState(null)
    const [clicked, updateClicked] = useState('')
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
      mutation ($updateMessageInput:updateMessageInput!){
        updateMessage(input:$updateMessageInput){
            body
            subject
            
        }
      }

    `

    const {loading, error, data} = useQuery(GET_MESSAGES,{
        variables:{id:id},
        onCompleted:(data) =>{
            setFormData(data?.message)
        }
    })

    const onButtonClicked=((e)=>{
        updateClicked('Successfully updated mutation go and checked console')
    })

    const [updateMutation] = useMutation(UPDATE_MESSAGE_MUTATION, {
        
        onCompleted:(data)=>{
            console.log('mutation successfull with', data);
        },
        
    })

    const handleChange=(key,value)=>{
        setFormData({
            ...formData,
            [key]: value
        })
    }

    if(loading)return(
        <div className="loader-container">
        <Triangle visible={true} ariaLabel='triangle-loading' color='blue' />
        <p className='loading'>Filling...!</p>
    </div>
    )




    return(
        <form className='model-container' onSubmit={(e)=>{
            e.preventDefault()
            console.log("Data is on the way", formData)
            updateMutation({
                variables:{
                    updateMessageInput:{
                    body:formData.body,
                    subject:formData.subject,
                    
                }
            }
            })
        }}>
        <div className='title'>
            <h2>Update-Message</h2>
        </div>
        <div className='model-mini-container'>
            <div className='model-values'>
                <label>Id:</label><br/>
                <input  disabled value={data?.message?.id} ></input>
            </div>
            <div className='model-values'>
                <label>Author:</label>
                <input value={data?.message?.author.login} readOnly></input>
            </div>
        </div>

        <div className="model-mini-container">
                <div className="model-values">
                    <label>Subject:</label><br />
                    <textarea value={formData?.subject} onChange={(e)=>{
                        handleChange('subject', e.target.value)
                    }}></textarea>
                </div>

                <div className="model-values">
                    <label>Body:</label><br />
                    <textarea value={formData?.body} onChange={(e)=>{
                        handleChange('body', e.target.value)
                    }}></textarea>
                </div>
        </div>

        <div className="model-mini-container">
                <div className="model-values">
                    <label>Language:</label><br />
                    <input value={data?.message?.language} ></input>
                </div>

                <div className="model-values">
                    <label>Views:</label><br />
                    <input value={data?.message?.metrics.views} ></input>
                </div>
        </div>

        <div className="model-mini-container">
                <div className="model-values">
                    <label>Link:</label><br />
                    <div className="message-link">
                        <a href={data?.message?.view_href} target="_blank">{data?.message?.view_href}</a>
                    </div>
                </div>

                <div className="model-values">
                    <label>Post Time:</label><br />
                    <textarea value={data?.message?.post_time} ></textarea>
                </div>
            </div>
        <div className='button-container'>
            <button className='button' type='submit' onClick={onButtonClicked}>Update</button>
            <button onClick={()=> setPattern({boolean:false})} className='button'>Close</button>
            
            
            
        </div>
        <p>{clicked}</p>
    </form>
    )
}
