const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3001;

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dummy_db'
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/fetch', (req, res) => {
    const sqlQuery = 'SELECT * FROM car_details;';
    db.query(sqlQuery, (err, result) => {
        if(err) res.send(err);
        else res.send(result);
    })
});

app.get('/api/querydata', (req, res) => {
     const supplier = req.query.supplier;
    const wholeSeller = req.query.seller;
    const steeringType = req.query.steering;
    const model = req.query.model;
    const sfx = req.query.sfx;
    const variant = req.query.variant;
    const color = req.query.color | 1;


    const sqlQuery = `SELECT * FROM records
    WHERE
        supplier_id = ? OR
        whole_seller_id = ? OR
        steering_type_id = ? OR
        car_model_id = ? OR
        car_sfx_id = ? OR
        car_variant_id = ? OR
        color_id = ?;
    `;
    db.query(sqlQuery, [supplier, wholeSeller, steeringType, model, sfx, variant, color ], (err, result) => {
        if (err) res.send(err)
        else {
            res.send(result)
            
        }
    });
})
app.post('/api/insert', (req, res) => {
    const sqlQuery = "INSERT INTO car_details (supplier, whole_seller, steering_type, model, sfx, variant,color) VALUES (?, ?, ?, ?, ?, ?, ?);";
    const supplier = req.body.supplier;
    const wholeSeller = req.body.seller;
    const steeringType = req.body.steering;
    const model = req.body.model;
    const sfx = req.body.sfx;
    const variant = req.body.variant;
    const color = req.body.color;
    db.query(sqlQuery, [supplier, wholeSeller, steeringType, model, sfx, variant, color], (err, result) => {
        if(err) res.send(err);
    });
});

app.patch('/api/patch', (req, res) => {
    const { jan_qty, feb_qty, mar_qty, apr_qty, may_qty, jun_qty, jul_qty, aug_qty, sep_qty, oct_qty, nov_qty, dec_qty } = req.body;
    const sqlQuery = `UPDATE car_demand
    SET jan_qty = ?,
        feb_qty = ?,
        mar_qty = ?,
        apr_qty = ?,
        may_qty = ?,
        jun_qty = ?,
        jul_qty = ?,
        aug_qty = ?,
        sep_qty = ?,
        oct_qty = ?,
        nov_qty = ?,
        dec_qty = ?
    WHERE id = your_record_id;
    `;

    db.query(sqlQuery, [jan_qty, feb_qty, mar_qty, apr_qty, may_qty, jun_qty, jul_qty, aug_qty, sep_qty, oct_qty, nov_qty, dec_qty, id], (res, err) => {
        if(err) console.log(err);
        else console.log(res);
    } )

})
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});