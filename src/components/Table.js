import React, { useState, useEffect } from 'react';
import Popup from './Popup.js';
import './table.css';
import './Popup.css';
import axios from 'axios';

const URL = 'http://192.168.0.18:8093/credit/api/'

const Table = () => {
    const [applications, setApplications] = useState([])
    const [plans, setPlansDetails] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

    useEffect(() => {
        getData()
    }, [])
 

    const getData = async () => {

        const response = await axios.get(URL+'allapplcation')
        setApplications(response.data)
    }

    const getPlanData = async (Id) => {

        const response = await axios.get(URL+'plandetails/'+Id)
        setPlansDetails(response.data)
    }

   
    const renderHeader = () => {
        let headerElement = ['APPLICATION_ID','FIRST_NAME','LAST_NAME','SSN','PHONE','EMAIL','APPROVED_AMOUNT','PAYBACK_PERIOD','INTEREST_RATE','INVOICE_FEE','PLANS']
          

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    
    const renderPlanHeader = () => {
        let headerPlanElement = ['plan','amortization','interest','invoiceFee','monthlyPayableAmount','debtBalance']
          

        return headerPlanElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
    const renderPlanBody = () => {
        return plans && plans.map(({ id,plan,amortization,interest,invoiceFee,monthlyPayableAmount,debtBalance}) => {
            return (
                <tr key={id}>
                    <td>{plan}</td>
                    <td>{amortization}</td>
                    <td>{interest}</td>
                    <td>{invoiceFee}</td>
                    <td>{monthlyPayableAmount}</td>
                    <td>{debtBalance}</td>
                  
                </tr>
              
            )
        })
    }

    const renderBody = () => {
        return applications && applications.map(({  id,firstName,lastName,ssn,phone,email,approvedAmount,paybackPeriod,interestRate,invoiceFee}) => {
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{ssn}</td>
                    <td>{phone}</td>
                    <td>{email}</td>
                  
                    <td>{approvedAmount}</td>
                    <td>{paybackPeriod}</td>
                    <td>{interestRate}</td>
                    <td>{invoiceFee}</td>
                   
                    <td className='opration'>
                        <button className='button'  onClick={ () => { togglePopup(); getPlanData(id);} } >Plan</button>
                    </td>
                </tr>
              
            )
        })
    }

    return (
        <>
            <h1 id='title'>Credit Management</h1>
            <table id='mytable'>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                    {isOpen && <Popup
                    content={<>
                        <table id='mytable'>
                            <thead>
                                <tr>{renderPlanHeader()}</tr>
                            </thead>
                            <tbody>
                                {renderPlanBody()}
                            </tbody>
                    </table>
                    
                    </>}
                    handleClose={togglePopup}
                  />}
                </tbody>
            </table>
        </>
    )
}


export default Table;