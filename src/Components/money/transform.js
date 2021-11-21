import React from 'react'
import axios from 'axios'

const Transforming=()=>{
    const [truthy,setTruthy]=React.useState(false)

    const [des,setDes]=React.useState({
    cash:'',
    from:'',
    to:''
})
    const [allBankers,setAllBankers]=React.useState([])
    const [err, setErr] = React.useState("");

    React.useEffect(()=>{
     getData()
    },[])

    const getData=()=>{
        axios.get('https://bankbackend1.herokuapp.com/api/bank').then(res => {
            setAllBankers(res.data.data)
            console.log(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }
    const SelectFirst=(e)=>{
        let found= allBankers.find(b=>b.passportId===e.target.value.slice(0, e.target.value.match('/').index))
console.log(found)
    setDes({cash:'',from:found._id,to:''})
    }

    const SelectSecond=(e)=>{
        let found2= allBankers.find(b=>b.passportId===e.target.value.slice(0, e.target.value.match('/').index))
        console.log(found2)
        setDes({cash:des.cash,from:des.from,to:found2._id})
    }
    const SelectCash=(e)=>{
        setDes({cash:e.target.value,from:des.from,to:des.to})
    }

    const TransMoney=()=>{
       setErr('')
         if(/^\d+$/.test(des.cash)&&parseInt(des.cash)>=0) {
             let found2= allBankers.find(b=>b._id===des.from)
             let found= allBankers.find(b=>b._id===des.to)
             if(parseInt(des.cash)<=found2.cash+found2.credit){
                 des.cash=parseInt(des.cash)
                 console.log(typeof des.cash)
                 axios.put('https://bankbackend1.herokuapp.com/api/bank/transform',des).then(res=>{
                     console.log(res)
                 }).catch(err=>console.log(err))
                 setErr(`${found2.name} has transferred to ${found.name}/ ${found2.name}:${parseInt(found2.cash)-parseInt(des.cash)}/ ${found.name}:${parseInt(found.cash)+parseInt(des.cash)}`)
             }else{
                 setErr(`U can only transfer ${found2.cash+found2.credit}`)
             }
         }else{
             setErr('Enter A Positive Number')
         }
        setDes({cash:"",from:"",to:""})
        setTruthy(true)

    }

    const Another=()=>{
        setTruthy(false)
        setErr('')
        setDes({cash:'',from:'',to:''})
    }
    return(
        <div>
            {console.log(des)}
            {truthy ?
                <div style={{color: 'blue', fontSize: '20px'}}>{err}<br/>
                    <input type={"button"} value={"Do Another"} onClick={Another}/>
                </div> :
                <div>
                <div>
                    From:<select onChange={SelectFirst}>
                    <option>Pick A User</option>
                    {
                        allBankers.map(b => {
                            return <option key={b.id}>{b.passportId}/{b.name}</option>
                        })
                    }
                </select></div>
            {des.from!==""?<div>
                To: <select onChange={SelectSecond}>
                <option>Pick A User</option>
            {
                allBankers.map(b=>{
                let found= allBankers.find(b=>b._id===des.from)
                if(b._id!==found._id ) {
                return <option key={b.id}>{b.passportId}/{b.name}</option>
            }
            })
            }
                </select></div>:""}
                </div> }
            <div>
                Amount Of Money : <input type={"text"} name={"cash"} value={des.cash} onChange={SelectCash}/>
                    <input type={"button"} value={"submit"} onClick={TransMoney}/></div>


    </div>
    )
}
export default Transforming