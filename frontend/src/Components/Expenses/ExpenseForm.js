import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';


function ExpenseForm() {
    const {addExpense, error, setError} = useGlobalContext()
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    })

    const { title, amount, date, category, description } = inputState;
  
    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        addExpense(inputState)
        setInputState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
        })
    }

  return (
    <ExpenseFormStyled onSubmit={handleSubmit}>
         {error && <p className="error">{error}</p>}
       <div className="input-control">
             <input 
             type="text" 
             value={title}
             name={'title'}
             placeholder="Taken Kudin Da Ka Kashe"
             onChange={handleInput('title')}
             />
       </div>
       <div className="input-control">
             <input 
             type="text" 
             value={amount}
             name={'amount'}
             placeholder="Yawan Kudin Ka Kashe"
             onChange={handleInput('amount')}
             />
       </div>
       <div className="input-control">
           <DatePicker 
               id='date'
               placeholderText='Sanya Kwanan Wata'
               selected={date}
               dateFormat="dd/MM/yyyy"
               onChange={(date) => {
                   setInputState({...inputState, date: date})
               }}
               />
       </div>
       <div className="selects input-control">
           <select required value={category} name="category" id="category" onChange={handleInput('category')}>
               <option value="" disabled > Zabi Wanda Kakeso</option>
               <option value="education" > Karatu</option>
               <option value="groceries" >Kayan Abinchi </option>
               <option value="health" > Lafiya</option>
               <option value="subscriptions" > Data</option>
               <option value="takeaways" > Abinchin Sayarwa</option>
               <option value="clothing" > Kayan Sawa</option>
               <option value="travelling" > Tafiye Tafiye</option>
               <option value="other" > Saura</option>
           </select>
       </div>
       <div className="input-control">
           <textarea name="description" value={description} placeholder='Rubuta Dalilinka' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
       </div>
       <div className="submit-btn">
           <Button 
               name={'Kara Kudinka'}
               icon={plus}
               bPad={'.8rem 1.6rem'}
               bRad={'30px'}
               bg={'#4ccf2d'}
               color={'#fff'}
           />
       </div>
    </ExpenseFormStyled>
  )
}

const ExpenseFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input, textarea, select{
      font-family: inherit;
      font-size: inherit;
      outline: none;
      border: none;
      padding: .5rem 1rem;
      border-radius: 5px;
      border: 2px solid #fff;
      background: transparent;
      resize: none;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      color: rgba(34, 34, 96, 0.9);
      &::placeholder{
          color: rgba(34, 34, 96, 0.4);
      }
  }
  .input-control{
      input{
          width: 100%;
      }
  }

  .selects{
      display: flex;
      justify-content: flex-end;
      select{
          color: rgba(34, 34, 96, 0.4);
          &:focus, &:active{
            color: rgba(34, 34, 96, 1); 
          }
      }
  }

  .submit-btn{
      button{
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.5);
          &:hover{
             background: var(--color-green) !important;
          }
        }
    }

`;

export default ExpenseForm