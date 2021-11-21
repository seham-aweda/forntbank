import React from 'react';
import axios from 'axios';
import Depositing from "./Depositing";
import Transforming from "./transform";
import Withdraw from "./Withdraw";

const CashActions = () => {

    const actions = ['Depositing/Update Credit', 'Withdraw Money', 'Transforming']
    const [chosenAct, setChosenAct] = React.useState('')

    const changeHandler = (e) => {
        setChosenAct(e.target.value)
    }

    return (
        <div>
            <select onChange={changeHandler}>
                <option key={"0"}>Pick An Action</option>
                {actions.map((a, index) => {
                    return <option key={actions[a]}>{a}</option>
                })
                }
            </select>
            {
                chosenAct === 'Depositing/Update Credit' ? <Depositing/> :
                        chosenAct === 'Withdraw Money' ? <Withdraw/> :
                            chosenAct === 'Transforming' ? <Transforming/> :
                                ""

            }
        </div>
    )
}
export default CashActions