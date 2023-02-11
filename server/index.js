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
    database: 'dummy_data'
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
    const supplier = req.body.supplier;
    const wholeSeller = req.body.seller;
    const steeringType = req.body.steering;
    const model = req.body.model;
    const sfx = req.body.sfx;
    const variant = req.body.variant;
    const color = req.body.color;
    const data = req.query;
    console.log(data.seller);
    
    const sqlQuery = `SELECT SUM(demand_quantity)
    FROM filtered_records
    WHERE 
        supplier_id = (SELECT id FROM selected_options WHERE option_name = ? )
        OR whole_seller_id = (SELECT id FROM selected_options WHERE option_name = ? )
        OR sfx_id = (SELECT id FROM selected_options WHERE option_name = ? )
        OR variant_id = (SELECT id FROM selected_options WHERE option_name = ? )
        OR color_id = (SELECT id FROM selected_options WHERE option_name = ? )
        OR model_id = (SELECT id FROM selected_options WHERE option_name = ? )
        OR steering_type_id = (SELECT id FROM selected_options WHERE option_name = ? );
        `;
    db.query(sqlQuery, [supplier, wholeSeller, sfx, variant, color, model, steeringType ], (err, result) => {
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

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});