import React from 'react'
import axios from 'axios'

const Adding=()=>{
    const [newUser,setNewUser]=React.useState({
        name:'', passportId:'', email:''
    })
    const [err,setErr]=React.useState('')
    const ChangeHandler=(e)=>{
        setNewUser({...newUser,[e.target.name]:e.target.value})
    }

    const ClickHandler=()=>{
        setErr('')
        console.log(newUser)
        axios.post('https://bankbackend1.herokuapp.com/api/bank',newUser).then(res=> {
            console.log('res', res)
            if (res.status !== 200) {
                setErr(res+'❌')
            }else{
                setErr('New BankUser Has Been Added ✅')
            }
        }).catch(err=>{console.log('err',err)
        setErr('❌'+'Check if Your Email is Valid')})
        setNewUser({
            name:'', passportId:'', email:''
        })

    }
    return(
        <div>
            Name: <input type={'text'} value={newUser.name} name={'name'} onChange={ChangeHandler}/><br/>
            PassportId: <input type={'text'} value={newUser.passportId} name={'passportId'} onChange={ChangeHandler}/><br/>
            Email: <input type={'text'} value={newUser.email} name={'email'} onChange={ChangeHandler}/><br/>
            <input type={'button'} value={'Add'} onClick={ClickHandler}/>
            <br/>
            <p style={{color:'blue',fontSize:'20px'}}>{err}</p>
        </div>
    )
}
export default Adding