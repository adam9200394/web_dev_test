import React, { useState } from 'react';

export default function () {


    const [isOneChecked, setIsChecked] = useState(false);
    const [isTwoChecked, setIsTwoChecked] = useState(false);
    const [isThreeChecked, setIsThreeChecked] = useState(false);
    const [isFourChecked, setIsFourChecked] = useState(false);
   
    
    const handleChange = (event) => {
        setIsChecked(event.target.checked);
        if(isOneChecked) return;
        else {
            setIsTwoChecked(false);
            setIsThreeChecked(false);
        }
    };
    const handleTwoChange = (event) => {
        setIsTwoChecked(event.target.checked);
        if(isTwoChecked) return;
        else setIsThreeChecked(false);
    };
    const handleThreeChange = (event) => {
        setIsThreeChecked(event.target.checked);
    };
    const handleFourChange = (event) => {
        setIsFourChecked(event.target.checked);
    };

   
    return(
        <div style={styles.container}>
          
               
                <div style={styles.Option}>
                    <input type="checkbox" onChange={handleChange} checked={isOneChecked} />
                    <label> Car Model </label>
                </div>
                {!isOneChecked ? (
                    <div>
                        <p> ... </p>
                    </div>
                ) : (
                    <div style={styles.Option}>
                    <input type="checkbox" onChange={handleTwoChange} checked={isTwoChecked} />
                    <label> Car SFX </label>
                </div>
                
                )
                } 
                {!(isTwoChecked & isOneChecked) ? (
                    <div>
                        <p> ... </p>
                    </div>
                ) : (
                    <div style={styles.Option}>
                    <input type="checkbox" onChange={handleThreeChange} checked={isThreeChecked} />
                    <label> Car Variant </label>
                </div>
                
                )
                }
                {!(isThreeChecked & isTwoChecked  & isOneChecked) ? (
                    <div>
                        <p> ... </p>
                    </div>
                ) : (
                    <div style={styles.Option}>
                    <input type="checkbox" onChange={handleFourChange} checked={isFourChecked} />
                    <label> Car Variant </label>
                </div>
                
                )
                }
               

         

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
        justifyContent: 'left',
       
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