import React, { useState, useContext, useEffect } from 'react';
import { dataContext } from '../data/context';

export default function () {

    const [currentStep, setCurrentStep] = useState(1);
    const [selectedValue, setSelectedValue] = useState('');
    const [optionValue2, setOptionValues2 ] = useState({Model: '', SFX: '', Variant: '', Color: '' });
    const [ optionsLoaded, setOptionsLoaded ] = useState(false);

    const { handlePageTwo, totalValue, setTotalValues, setShowBtn,currentStep2, setCurrentStep2,  handleProgress, handleBtnstate, pageTwoOptions, getQueryResult } = useContext(dataContext);

    

    

    const handleModelChange = event => {
        setSelectedValue(event.target.value);
        setCurrentStep(currentStep + 1);
        setOptionValues2({ ...optionValue2, Model: event.target.value });
      };
    
      const handleSFXChange = event => {
        setCurrentStep(currentStep + 1);
        setOptionValues2({ ...optionValue2, SFX: event.target.value });
      };
    
      const handleVariantChange = event => {
        setCurrentStep(currentStep + 1);
        setOptionValues2({ ...optionValue2, Variant: event.target.value });
      };
      const handleColorChange = event => {
        setCurrentStep(currentStep + 1);
        setOptionValues2({ ...optionValue2, Color: event.target.value });

      };

   const handleLast = (e) => {
    handleProgress();
    handleColorChange(e);
    handleBtnstate();
    setTotalValues({...totalValue, optionValue2});
    setShowBtn(false);
    getQueryResult(totalValue.supplier, totalValue.wholeSeller, totalValue.steeringType, optionValue2.Model, optionValue2.SFX, optionValue2.Variant, optionValue2.Color);
    setCurrentStep2(currentStep2 + 1);
    

    }

    useEffect(() => {
        handlePageTwo(optionValue2);
        if(pageTwoOptions) {
            setOptionsLoaded(true);
           
           
        }
        
    }, [optionValue2, pageTwoOptions, totalValue])
    return(
        <div style={styles.container}>
          
            {currentStep === 1 && (
                <div style={styles.Option}>
                <select  onChange={(e) => {handleModelChange(e); handleProgress() }}>
                        <option value=""> Car Model </option>
                        { !optionsLoaded ? (<option value="Whole Seller One"> Car Model  </option>) : (
                            pageTwoOptions.Models.map(element => (<option value={element.id} key={element.id}> {element.value}</option>))
                        )}
                    </select>
                </div>
            )}
            {currentStep === 2 && (
                <div style={styles.Option}>
                <select  onChange={(e) => {handleSFXChange(e); handleProgress() }}>
                        <option value=""> Car SFX </option>
                        { !optionsLoaded ? (<option value="Whole Seller One"> Car SFX  </option>) : (
                            pageTwoOptions.Sfx.map(element => (<option value={element.id} key={element.id}> {element.value}</option>))
                        )}
                    </select>
                </div>
            )}
            {currentStep === 3 && (
                <div style={styles.Option}>
                <select  onChange={(e) => {handleVariantChange(e); handleProgress() }}>
                        <option value=""> Car Variant </option>
                        { !optionsLoaded ? (<option value="Whole Seller One"> Car Model  </option>) : (
                            pageTwoOptions.Variant.map(element => (<option value={element.id} key={element.id}> {element.value}</option>))
                        )}
                    </select>
                </div>
            )}
            {currentStep === 4 && (
                <div style={styles.Option}>
                <select onChange={handleLast}>
                        <option value=""> Color </option>
                        { !optionsLoaded ? (<option value="Whole Seller One"> Car Model  </option>) : (
                            pageTwoOptions.Colors.map(element => (<option value={element.id} key={element.id}> {element.value}</option>))
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