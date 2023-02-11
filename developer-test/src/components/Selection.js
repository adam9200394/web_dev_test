import React, { useContext } from 'react';
import { dataContext } from '../data/context';
import PageOne from './pageOne';
import PageTwo from './pageTwo';
import DisplayValues from './displayValues';


export default function () {


   
   
   
    
    const { handleBtnstate, showBtn, progress, handleProgress, btnstate, currentStep2, setCurrentStep2 } = useContext(dataContext);

    const handleSubmit = () => {
        
        handleProgress();
        setCurrentStep2(currentStep2 + 1);
        if(currentStep2 == 1 || currentStep2 > 2)  handleBtnstate();
        
    
    }
    
    return(
        <div style={styles.container}>
            <div style={styles.page}>
        
                <svg viewBox="0 0 100 10" style={styles.progress}>
                    <rect x="-210" y="0" width={progress} height="10px" fill="#4CAF50" />
                </svg>
                {currentStep2 === 1 && (
                <PageOne />
                )}
                {currentStep2 === 2 && (
                <PageTwo />
                )}
                {currentStep2 >= 3 && (
                <DisplayValues />
                )}
                
                {showBtn && <button style={{...styles.submit, backgroundColor: btnstate.color}} onClick={handleSubmit} disabled={btnstate.state}> Submit </button>
                }
            </div>
        </div>
    )
}




const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
page: {
    display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '1.5rem',
        width: '50%',
        marginTop: '2rem',
       
},
   
    
    submit: {
        padding: '1.5rem',
        textAlign: 'center',
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