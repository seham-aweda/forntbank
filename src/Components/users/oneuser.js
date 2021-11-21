import React from 'react'

const OneUser=({name, email, cash, credit,id})=>{

    return(
        <div key={id} style={{border:'2px solid black',borderRadius:'10px',padding:'5px',margin:'5px',width:'28%',textAlign:'left'}}>
            <p style={{display:'flex',justifyContent:'space-between'}}><span> UserName: {name}</span> <span>PassportId: {id}</span></p>
            <p style={{display:'flex',justifyContent:'space-between'}}><span>Email: {email}</span></p>
            <p style={{display:'flex',justifyContent:'space-between'}}>
                <span>Card: <span style={{color:cash>=0 ? 'green' : 'red',fontSize:'20px'}}>{cash}</span></span>
                <span>Credit: <span style={{color:'green',fontSize:'20px'}}>{credit}</span></span>
            </p>
        </div>
    )
}
export default OneUser