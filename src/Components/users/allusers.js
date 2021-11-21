import React from 'react';
import axios from 'axios';
import OneUser from "./oneuser";

const AllUsers=()=>{
    const [bankers,setBankers]=React.useState('')
    React.useEffect(()=>{
        GetData()
    },[])

    const GetData=()=>{
        axios.get('https://bankbackend1.herokuapp.com/api/bank').then(res=>{
           setBankers(res.data.data)
        }).catch(err=>{
            console.log(err)
        })
    }
    return(
        <>
            <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',width:"100vw"}}>
                {bankers?
                    bankers.map(b=>{
                        return <OneUser key={b.id} id={b.passportId} name={b.name} email={b.email} cash={b.cash} credit={b.credit}/>
                    }):''
                }
            </div>
        </>
    )
}
export default AllUsers