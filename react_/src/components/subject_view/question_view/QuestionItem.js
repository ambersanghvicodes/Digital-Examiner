import React, { Component } from 'react'
import './QuestionItem.css';
import Button from "react-bootstrap/Button";



export default class QuestionItem extends Component {
 render() {
 const {question , diagram1, difficult_level, mark, id} = this.props.question ;
  return (
   <div className='question'>
    <div className='question-item title-question'>
    Question :{' '} <b>{question}</b><br/>
    Difficulty :{' '} <b>{difficult_level}</b><br/>
    Mark :{' '}<b>{mark}</b>
    </div>
    <div className='question-item diagram'>
     { diagram1 !== null ?
     <img src={diagram1} style={{border: '2px solid '}}></img>
     :
     <p style={{fontWeight : 'bold'}}>No image added</p>
     }
     
    </div>
    
    <Button variant='success' className='edit-btn' >Edit Question </Button>
    <Button variant='danger' className='delete-btn' onClick={this.props.delQuestion.bind(this,id)}>Delete Question </Button>
   </div>
  )
 }
}
