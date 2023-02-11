import React, { useState, createContext, useEffect } from 'react';
import Axios from 'axios';




export const dataContext = createContext();

const DataContextProvider = ({children}) => {


   const [pageOneValues, setpageOneValue ] = useState(null);
   const [pageTwoValues, setpageTwoValue ] = useState(null);
   const [progress, setProgress] = useState(40);
   const [btnstate, setbtnstate] = useState({state: true, color: '#b4b4b4'});
   const [ pageOneOptions, setPageOneOptions ] = useState(null);
   const [ pageTwoOptions, setPageTwoOptions ] = useState(null);
   const [totalValue, setTotalValues ] = useState(null)
   const [queryRsult, setQueryRsult ] = useState(null);
   const [ showBtn, setShowBtn ] = useState(true);
   const [currentStep2, setCurrentStep2 ] = useState(1);
   
   useEffect(() => {
      Axios.get('http://localhost:3001/api/fetch').then((res) => {
        const suppliers = res.data.map(obj => obj.supplier);
        const wholeSellers = res.data.map(obj => obj.whole_seller);
        const steeringTypes = res.data.map(obj => obj.steering_type);
        const models = res.data.map(obj => obj.model);
        const sfxs = res.data.map(obj => obj.sfx);
        const colors = res.data.map(obj => obj.color);

        setPageOneOptions({suppliers, wholeSellers, steeringTypes});
        setPageTwoOptions({models, sfxs, colors});
       
       
        
      });

   }, []);

   const getQueryResult = (supplier, seller, steering, model, sfx, variant, color) => {
     const data = {
          supplier,
          seller,
          steering,
          model,
          sfx, 
          variant,
          color
     }
     
     Axios.get('http://localhost:3001/api/querydata', {
          params: data
         
     } ).then((res) => {
          
          setQueryRsult(res.data);
          
     });
   }

   const insertRecords = (supplier, seller, steering, model, sfx, variant, color) => {
     Axios.post('http://localhost:3001/api/insert', {
          supplier,
          seller,
          steering,
          model,
          sfx, 
          variant,
          color
     }).then((err, result) => {
          if(err) console.log(err);
     });
   }

   const upDateRecords = () => {
     Axios.patch('http://localhost:3001/api/patch', () => {

     })
   }
   const handleProgress = () => {
        setProgress(progress + 100 )
   }
   const handleBtnstate = () => {
        if(btnstate.state) setbtnstate({state: false, color: '#333'})
        else setbtnstate({state: true, color: '#b4b4b4'})
   }
 
   const handlepageOne = (val) => {
    setpageOneValue(val)
   }
   const handlePageTwo = (val) => {
    setpageTwoValue(val)
   }
    return ( 
        <dataContext.Provider value={{showBtn, setShowBtn, currentStep2, setCurrentStep2, progress, pageOneValues, btnstate, pageOneOptions, pageTwoOptions, totalValue, setTotalValues, handlepageOne, handlePageTwo, handleProgress, pageTwoValues, handleBtnstate, insertRecords, getQueryResult, setQueryRsult, queryRsult }}>
            { children  }
        </dataContext.Provider>
     );
}
 
export default DataContextProvider;