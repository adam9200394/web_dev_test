import React, { useState, useContext, useEffect } from 'react';
import { dataContext } from '../data/context';

export default function () {

    const [currentStep, setCurrentStep] = useState(1);
    const [selectedValue, setSelectedValue] = useState('');
    const [optionValue, setOptionValues ] = useState({supplier: '', wholeSeller: '', steeringType: '' });
    const [ optionsLoaded, setOptionsLoaded ] = useState(false);

    const { handleBtnstate, handlepageOne, handleProgress, pageOneOptions, setTotalValues, totalValue} = useContext(dataContext);

    
    const handleSupplierChange = event => {
        setSelectedValue(event.target.value);
        setCurrentStep(currentStep + 1);
        setOptionValues({ ...optionValue, supplier: event.target.value });
      };
    
      const handleSellerChange = event => {
        setCurrentStep(currentStep + 1);
        setOptionValues({ ...optionValue, wholeSeller: event.target.value });
      };
    
      const handleSteeringChange = event => {
        setCurrentStep(currentStep + 1);
        setOptionValues({ ...optionValue, steeringType: event.target.value });
      };

   const handleLast = (e) => {
    handleProgress();
    handleSteeringChange(e);
    handleBtnstate();
    setTotalValues(optionValue);
    
    
    

    }

    useEffect(() => {
        handlepageOne(optionValue);
        if(pageOneOptions) {
            setOptionsLoaded(true);
            setTotalValues(optionValue);
        }
        
    }, [optionValue, pageOneOptions]);
    return(
        <div style={styles.container}>
          
            {currentStep === 1 && (
                <div style={styles.Option}>
                    <select onChange={(e) => {handleSupplierChange(e); handleProgress() }} id="supplier">
                        <option value=""> Suppliers </option>
                        { !optionsLoaded ? (<option value="Whole Seller One"> supplier  </option>) : (
                            pageOneOptions.Suppliers.map(element => (<option value={element.id} key={element.id}> {element.value}</option>))
                        )}
                    </select>
                </div>
            )}
            {currentStep === 2 && (
                <div style={styles.Option}>
                    <select onChange={(e) => {handleSellerChange(e); handleProgress() }} id="whole_seller">
                        <option value=""> Whole Sellers </option>
                        { !optionsLoaded ? (<option value="Whole Seller One"> Whole sellers  </option>) : (
                            pageOneOptions.WholeSellers.map(element => (<option value={element.id} key={element.id} > {element.value}</option>))
                        )}
                    </select>
                </div>
            )}
            {currentStep === 3 && (
                <div style={styles.Option}>
                    <select onChange={handleLast} id="supplier">
                    <option value=""> Steering Type </option>
                        { !optionsLoaded ? (<option value="Whole Seller One"> Steering type  </option>) : (
                            pageOneOptions.SteeringType.map(element => (<option value={element.id} key={element.id}> {element.value}</option>))
                        )}
                    </select>
                </div>
            )}
            
        {selectedValue && <p>Your selected value: {selectedValue}</p>}

         

        </div>
    )
}




const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#c9c9c9',
       
    },
    
    Option: {
        backgroundColor: 'white',
        padding: '1.5rem',
        margin: '1px',
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    
       
    },
    
    submit: {
        padding: '1.5rem',
        textAlign: 'center',
        backgroundColor: '#333',
        margin: '1rem',
        width: '60%',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        color: 'white'
        
    },
    progress: {
        height: '10px',
        width: "120%",
        backgroundColor: '#d1d1d1',
        textAlign: 'left',
        marginLeft: '-2rem',
        marginRight: '-2rem'
    }
}