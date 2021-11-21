import React from "react";
import axios from "axios";
const Withdraw=()=>{
const [bankers, setBankers] = React.useState([])
const [input, setInput] = React.useState('');
const [des, setDes] = React.useState({
    cash:''
});
const [truthy,setTruthy]=React.useState(false)
const [err, setErr] = React.useState("");
React.useEffect(() => {
    GetData()
},[])

const GetData = () => {
    axios.get('https://bankbackend1.herokuapp.com/api/bank').then(res => {
        setBankers(res.data.data)
        console.log(res.data.data)
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
            if(/^\d+$/.test(des.cash)&&parseInt(des.cash)>=0) {
                let found = bankers.find(b => b.passportId === pass)

                if(parseInt(des.cash)<=found.cash+found.credit) {
                des.cash=parseInt(des.cash)

                    axios.put('https://bankbackend1.herokuapp.com/api/bank/withdraw/'+found._id, des).then(res => {
                        console.log(res)

                    setErr(`Now ${res.data.updated.name} withdraw ${des.cash} and Her Account status:
                cash:${res.data.updated.cash}`)
                    }).catch(err=>console.log(err))
                }else if(found.cash+found.credit===0){
                            setErr(`Your balance: ${found.cash+found.credit}, So u cant withdraw money`)
                    }else{
                    setErr(`u can only withdraw at max ${found.cash+found.credit}`)
                }
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
    setDes({cash:''})
    setInput('')
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
                {bankers.length>0?bankers.map(b => {
                    return <option key={b.id}>{b.passportId}/{b.name}</option>
                }):""}
            </select>
                <br/>
                Amount Of Withdraw : <input type={"text"} value={des.cash} name={'cash'} onChange={inputHandler}/> <br/>
                <input type={"button"} value={'Done'} onClick={getUserBySelect}/><br/>
            </div>}
    </div>
)
}
export default Withdraw