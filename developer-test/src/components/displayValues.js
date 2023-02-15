import React, { useState, useEffect, useContext } from 'react';
import { dataContext } from '../data/context';


export default function  () {

    const { insertRecords, queryRsult, upDateRecords } = useContext(dataContext);
    const [sdata, setsData ] = useState(false);
    const [showEdit, setShowEdit ] = useState(false);
    const [ showUpdateEdit, setShowUpdateEdit ] = useState(false);
    const [errmsg, setErrMsg ] = useState(false);
    const [supplier, setSupplier ] = useState("");
    const [whole_seller, setWholeSeller ] = useState("");
    const [steering_type, setSteeringType ] = useState("");
    const [model, setModel] = useState("");
    const [sfx, setSfx ] = useState("");
    const [variant, setVariant ] = useState("");
    const [color, setColor ] = useState("");
    const [txtUpdate, setTxtUpdate ] = useState("");
    const [supdate, setsupdate] = useState(null);
    const [values, setValues ] = useState({
        jan_qty: '',
            feb_qty: '',
            mar_qty: '',
            apr_qty: '',
            may_qty: '',
            jun_qty:'',
            jul_qty: '',
            aug_qty: '',
            sep_qty: '',
            oct_qty: '',
            nov_qty: '',
            dec_qty: ''

    })

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
    /* if(queryRsult[0]["SUM(demand_quantity"]) msg = queryRsult[0]["SUM(demand_quantity"];
    else msg = 'no results founds' */
    const handleUpdateChange = (e) => {
        setTxtUpdate(e.target.value);
    }
    const handleShowElementSubmit = (element) => {
        setShowUpdateEdit(true);
        setsupdate({id: element.id, 
            jan_qty: element.jan_qty,
            feb_qty: element.feb_qty,
            mar_qty: element.mar_qty,
            apr_qty: element.apr_qty,
            may_qty: element.may_qty,
            jun_qty: element.jun_qty,
            jul_qty: element.jul_qty,
            aug_qty: element.aug_qty,
            sep_qty: element.sep_qty,
            oct_qty: element.oct_qty,
            nov_qty: element.nov_qty,
            dec_qty: element.dec_qty
        })

        
       
    }
    const handlePatchUpdate = (e) => {
        const sendData = {id: e.target.id, ...values}
        upDateRecords(sendData);
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
      };
    
    useEffect(()=> {
        
        if(queryRsult)  {
            console.log(queryRsult)
            setsData(true);
          
        }
    }, [queryRsult, sdata])
   
    return(
        <div style={styles.container}>
           
            <h3> selected quatities  </h3>
            <div>
                <div style={styles.titles_headers}>
                    <h4 className='title-head'> jan</h4>
                    <h4 className='title-head'> feb</h4>
                    <h4 className='title-head'> mar</h4>
                    <h4 className='title-head'> apr</h4>
                    <h4 className='title-head'> may</h4>
                    <h4 className='title-head'> jun</h4>
                    <h4 className='title-head'> jul</h4>
                    <h4 className='title-head'> aug</h4>
                    <h4 className='title-head'> sep</h4>
                    <h4 className='title-head'> oct</h4>
                    <h4 className='title-head'> nov</h4>
                    <h4 className='title-head end-row'> dec</h4>
                    
                </div>
                { sdata ? (<div>
                    {queryRsult.map(element => {
                        return(
                            <div style={styles.titles_headers} id={element.id} onClick={() => handleShowElementSubmit(element)}> 
                                <h4 className='title-head'> {element.jan_qty}</h4>
                                <h4 className='title-head'> {element.feb_qty}</h4>
                                <h4 className='title-head'> {element.mar_qty}</h4>
                                <h4 className='title-head'> {element.apr_qty}</h4>
                                <h4 className='title-head'> {element.may_qty}</h4>
                                <h4 className='title-head'> {element.jun_qty}</h4>
                                <h4 className='title-head'> {element.jul_qty}</h4>
                                <h4 className='title-head'> {element.aug_qty}</h4>
                                <h4 className='title-head'> {element.sep_qty}</h4>
                                <h4 className='title-head'> {element.oct_qty}</h4>
                                <h4 className='title-head'> {element.nov_qty}</h4>
                                <h4 className='title-head end-row'> {element.dec_qty}</h4>
                                <button style={{margin: '1rem'}}> update record</button>
                                
                            </div>
                        )
                    })}
                </div>) : (<p> query is null</p>)}
                {showUpdateEdit ? (
                    <div  >
                        <input type="text" onChange={handleInputChange}  name='jan_qty' placeholder={supdate.jan_qty} value={values.jan_qty} />
                        <input type="text" onChange={handleInputChange} name='feb_qty' placeholder={supdate.feb_qty} value={values.feb_qty}/>
                        <input type="text" onChange={handleInputChange} name='mar_qty'  placeholder={supdate.mar_qty} value={values.mar_qty}/>
                        <input type="text" onChange={handleInputChange} name='apr_qty'  placeholder={supdate.apr_qty} value={values.apr_qty}/>
                        <input type="text" onChange={handleInputChange} name='may_qty'  placeholder={supdate.may_qty} value={values.may_qty}/>
                        <input type="text" onChange={handleInputChange} name='jun_qty'  placeholder={supdate.jun_qty} value={values.jun_qty}/>
                        <input type="text" onChange={handleInputChange} name='jul_qty'  placeholder={supdate.jul_qty} value={values.jul_qty}/>
                        <input type="text" onChange={handleInputChange} name='aug_qty'  placeholder={supdate.aug_qty} value={values.aug_qty}/>
                        <input type="text" onChange={handleInputChange} name='sep_qty'  placeholder={supdate.sep_qty} value={values.sep_qty}/>
                        <input type="text" onChange={handleInputChange} name='oct_qty'  placeholder={supdate.oct_qty} value={values.oct_qty}/>
                        <input type="text" onChange={handleInputChange} name='nov_qty'  placeholder={supdate.nov_qty} value={values.nov_qty} />
                        <input type="text" onChange={handleInputChange} name='dec_qty'  placeholder={supdate.dec_qty} value={values.dec_qty}/>
                        <button id={supdate.id} onClick={handlePatchUpdate} style={{margin: '1rem'}}> submit update</button>
                    </div>
                    ): (<></>)
                    }
                
            </div>
            

               

           { !showEdit ? ( 
           <div style={styles.editSvg} onClick={() => {setShowEdit(!showEdit);}}>
                <p> New record </p>
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
    titles_headers: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row'
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