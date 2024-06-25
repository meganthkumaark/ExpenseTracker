import { useEffect, useState } from 'react';
import axios from 'axios';

import './index.css'

function App() {

  const [balance,setBalance] = useState('');
  const [income,setIncome] = useState('');
  const [expense,setExpense] = useState('');
  const [expenseList,setExpenseList] = useState([]);


  useEffect(()=>{
    F();
  },[]);

  async function F(){
    await axios.get("http://localhost:3000/api/expenses",{mode:'no-cors'}).then((res)=>{
      setExpenseList(res.data);
    let bal = 0;
    let n = (res.data).length;
    for(let i=0;i<n;i++){
      bal += res.data[i].amount;
    }
  let income = 0;
  let out = 0;

   for(let i=0;i<n;i++){
    if(res.data[i].amount > 0){
      income += res.data[i].amount;
    }
    else{
      out += res.data[i].amount;
    }
    setIncome(income);
    setExpense(out);

    setBalance(bal);
  }
  })
  }


  const addExpense = async(e) =>{
    e.preventDefault();
    let des = document.getElementById('description').value;
    let amt = document.getElementById('amount').value;
    let body = {
      description: des,
      amount: amt
    }
    await axios.post("http://localhost:3000/api/expenses",body).then((res)=>{
       if(res.status != 201){
        console.log("Some Error");
       }
    })
    F();
  }

 const deleteExpense = async(e)=>{
          const response = await axios.delete(`http://localhost:3000/api/expenses/${e}).then(()=>F()`);
  }
  
  return (
    <>
      <h1 className='title'>Expense Tracker</h1>
      <div className='balance'><h1>Balance : {balance}</h1></div>
      <div className='income-expense-container'>
        <div className='.income .title'>
            <h1>Income</h1>
            <h2 className='income'>{income}</h2>
        </div>
        <hr className='block'/>
        <div className='.expense .title'>
            <h1>Expense</h1>
            <h2 className='expense'>{expense}</h2>
        </div>
      </div>
      <form onSubmit={addExpense}>
      <h3>Expense</h3>
        <input className='input-container' id="description" placeholder='Description'>

        </input>
        <input className='input-container' id="amount" placeholder='Expense'>

        </input>
        <button type='submit'>Add Expense</button>
      </form>
      <div className='expense-item-container'>

        {expenseList.map((e)=>{
          let id = e._id;
            if(e.amount > 0){
              return(
                <>
                  <div className='expense-item positive'>
                      <p>{e.description}</p>
                      <p>{e.amount}</p>
                  </div>
                  <div className='delete-btn' onClick={()=>deleteExpense(id)}>Delete</div>
                </>
              )
            }
            else{
                return(
                  <>
                  <div className='expense-item negative'>
                        <p>{e.description}</p>
                        <p>{e.amount}</p>
                  </div>
                  <button onclick={()=>handleDelete(expense.id)}>Delete</button>
                  {/* <button >
                    <div className='delete-btn' onClick={()=>deleteExpense(id)}>Delete</div>
                  </button> */}
                  </>
              )
          }
        })}
    </div>

   
    </>
  )
}


export default App


