import React from 'react'
import axios from 'axios'

const Depositing=()=>{
    const [bankers, setBankers] = React.useState([])
    const [input, setInput] = React.useState('');
    const [des, setDes] = React.useState({
        cash:'',credit:''
    });
    const [truthy,setTruthy]=React.useState(false)
    const [err, setErr] = React.useState("");
    React.useEffect(() => {
        GetData()
    },[])

    const GetData = () => {
        axios.get('https://bankbackend1.herokuapp.com/api/bank').then(res => {
            setBankers(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const Selection = (e) => {
        setInput(e.target.value)
    }

    const getUserBySelect = () => {
        setErr('')
        if (input !== 'Pick A User') {
            if (input.includes('/')) {
                setErr('')
                const pass = input.slice(0, input.match('/').index)
                console.log(typeof des.cash)
                if(/^\d+$/.test(des.cash)&&parseInt(des.cash)>=0) {
               let found = bankers.find(b => b.passportId === pass)
                    console.log(found)
                    des.cash=parseInt(des.cash)
                    console.log(typeof des.cash)
                axios.put('https://bankbackend1.herokuapp.com/api/bank/updateCash/'+found._id,des).then(res=>{
                    console.log(res)
                }).catch(err=>console.log(err))
                    setErr(`Now ${found.name} Have ${parseInt(found.cash)+parseInt(des.cash)} In Her Account`)
            }else{
                setErr('Enter A Positive Number')
                }
            }
            else {
                setErr('Pick A User')
            }
        }
        setTruthy(true)
        setDes({cash:''})
    }

    const inputHandler=(e)=>{
        setDes({...des, [e.target.name]: e.target.value})

    }
    const Another=()=>{
        setTruthy(false)
        setErr('')
        setDes({cash:'',credit:''})
setInput('')
    }

    const getCredit = () => {
        setErr('')
        if (input !== 'Pick A User') {
            if (input.includes('/')) {
                setErr('')
                const pass = input.slice(0, input.match('/').index)
                if(/^\d+$/.test(des.credit)&&des.credit>=0) {
                    let found = bankers.find(b => b.passportId === pass)
                    des.credit=parseInt(des.credit)
                    axios.put('https://bankbackend1.herokuapp.com/api/bank/updateCredit/'+found._id,des).then(res=>{
                        console.log(res)
                    }).catch(err=>console.log(err))
                    setErr(`Now ${found.name} Have ${parseInt(des.credit)} As A Credit Limit`)

                }else{
                    setErr('Enter A Positive Number')
                }
            }
            else {
                setErr('Pick A User')
            }
        }
        setTruthy(true)
        setDes({credit:''})
    }

    return(
        <div style={{marginTop:"150px"}}>
            {truthy ?
                <div style={{color:'blue',fontSize:'20px'}}>{err}<br/>
                <input type={"button"} value={"Do Another"} onClick={Another}/>
                </div>:
                <div>
                PassportId : <select onChange={Selection}>
                <option>Pick A User</option>
            {bankers.map(b => {
                return <option key={b.id}>{b.passportId}/{b.name}</option>
            })}
                </select>
         </div>}
                <br/>
                Amount Of Cash : <input type={"text"} value={des.cash} name={'cash'} onChange={inputHandler}/> <br/>
                <input type={"button"} value={'Done'} onClick={getUserBySelect}/><br/>
                Credit : <input type={"text"} value={des.credit} name={'credit'} onChange={inputHandler}/> <br/>
                <input type={"button"} value={'Done'} onClick={getCredit}/><br/>
        </div>
    )
}
export default Depositing