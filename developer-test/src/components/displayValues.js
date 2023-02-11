import React, { useState, useContext, useEffect } from 'react';
import { dataContext } from '../data/context';


export default function  () {

    const {queryRsult, insertRecords } = useContext(dataContext);
    const [showEdit, setShowEdit ] = useState(false);
    const [ showUpdateEdit, setShowUpdateEdit ] = useState(true);
    const [errmsg, setErrMsg ] = useState(false);
    const [supplier, setSupplier ] = useState("");
    const [whole_seller, setWholeSeller ] = useState("");
    const [steering_type, setSteeringType ] = useState("");
    const [model, setModel] = useState("");
    const [sfx, setSfx ] = useState("");
    const [variant, setVariant ] = useState("");
    const [color, setColor ] = useState("");
    const [txtUpdate, setTxtUpdate ] = useState("");

    const handleSupplierChange = (e) => {
        setSupplier(e.target.value);
    }
    const handlewholesellerchange = (e) => {
        setWholeSeller(e.target.value);
    }
    const handleSteeringChange = (e) => {
        setSteeringType(e.target.value);
    }
    const handleModelChage = (e) => {
        setModel(e.target.value);
    }
    const handleSfxChage= (e) => {
        setSfx(e.target.value);
    }
    const handleVariantChange= (e) => {
        setVariant(e.target.value);
    }
    const handleColorChange= (e) => {
        setColor(e.target.value);
    }

    const handleSubmit = () => {
        if(supplier == "" &&  whole_seller =="" && steering_type == "" && model == "" && sfx  == "" && variant == "" && color == "") setErrMsg(true);
        else {
           
            insertRecords(supplier, whole_seller, steering_type, model, sfx, variant, color);
        }
        
    }
    let msg = ''
    if(queryRsult[0]["SUM(demand_quantity"]) msg = queryRsult[0]["SUM(demand_quantity"];
    else msg = 'no results founds'
    const handleUpdateChange = (e) => {
        setTxtUpdate(e.target.value);
    }
    const handleUpdateSubmit = () => {

    }
    return(
        <div style={styles.container}>
            <div style={styles.titles}>
                <div style={styles.editSvg}>
                    <h3> selected { msg } </h3>
                    { showUpdateEdit ? ( <button onClick={() => {setShowUpdateEdit(!showUpdateEdit)}}> Update record </button>) : (
                    <div> 
                       <input type="text" placeholder='updated record ..' onChange={handleUpdateChange} />
                        <button onClick={handleUpdateSubmit}> update record</button>
                    </div>
                    )}

                </div>

                 
            </div>
            <div style={styles.titles}>
            <p className='title-body'>{}</p>
                
            </div>

           { !showEdit ? ( 
           <div style={styles.editSvg} onClick={() => {setShowEdit(!showEdit);}}>
                <p> New record </p>
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M16.0399 3.01976L8.15988 10.8998C7.85988 11.1998 7.55988 11.7898 7.49988 12.2198L7.06988 15.2298C6.90988 16.3198 7.67988 17.0798 8.76988 16.9298L11.7799 16.4998C12.1999 16.4398 12.7899 16.1398 13.0999 15.8398L20.9799 7.95976C22.3399 6.59976 22.9799 5.01976 20.9799 3.01976C18.9799 1.01976 17.3999 1.65976 16.0399 3.01976Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="0.4" d="M14.9102 4.1499C15.5802 6.5399 17.4502 8.4099 19.8502 9.0899" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </div>) : (
                <div style={styles.editable}>
                    <input type="text" value={supplier} onChange={handleSupplierChange} id="Supplier" placeholder="Supplier ..." />
                    <input type="text" value={whole_seller} onChange={handlewholesellerchange} id="whole_seller" placeholder="Whole Seller ..." />
                    <input type="text" value={steering_type}  onChange={handleSteeringChange} id="steering_type" placeholder="Steering Type ..." />
                    <input type="text" value={model} onChange={handleModelChage}  id="model" placeholder="model ..." />
                    <input type="text" value={sfx} onChange={handleSfxChage}  id="sfx" placeholder="sfx ..." />
                    <input type="text" value={variant} onChange={handleVariantChange}  id="variant" placeholder="Variant ..." />
                    <input type="text" value={color} onChange={handleColorChange} id="color" placeholder="Color ..." />
                    <input type="submit" value="submit" onClick={handleSubmit} />
                </div>
            )
            }

            { errmsg && (
                    <p className="err-msg">please enter a value to be submited </p>
                )}

        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    },
    
    titles: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-between'
    },
    editSvg: {
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center'
    },
    editable: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center'
    }
}