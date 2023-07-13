const Item = require("../models/item");
const db = require('../mySqlConnection');

module.exports.renderGymItemPage = async (req, res) => {
    // const items = await Item.find({});
    // const length = Math.ceil(await Item.countDocuments().exec());
    // res.render('equipment/gymequipment', { items, length });
    let sql = 'SELECT * FROM gymequipment';
    let query = db.query(sql, function (err, result) {
        if (err) throw err;
        let items = result;
        const length = 'SELECT COUNT(*) FROM gymequipment';
        res.render('equipment/gymequipment', { items, length });
    });


    // res.render('equipment/qymequipment', { items, length });
};

module.exports.createItem = async (req, res) => {
    // let item = new Item(req.body);
    let { item_name, description, purpose } = req.body;
    let item_image
    if (req.files !== null) {
        item_image = req.files.item_image;
        item_image.mv("public" + "/" + "images" + "/" + "equipment" + "/" + item_image.name);
        item_image = item_image.name;
    } else {
        item_image = 'no_image.jpg';
    }

    let sql = `INSERT INTO gymequipment (item_name, item_image, description, purpose) VALUES ('${item_name}','${item_image}', 
    '${description}', '${purpose}')`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
    });
    let sql1 = 'SELECT * FROM gymequipment';
    db.query(sql1, (err, item) => {
        if (err) {
            throw err;
        }
        res.status(201).send(item);
    })
    // await item.save();
    // res.status(201).send(item);
};

module.exports.displayItem = async (req, res) => {
    // const items = await Item.find({});
    // res.json(items);
    let sql = 'SELECT * FROM gymequipment';
    db.query(sql, (err, items) => {
        if (err) {
            throw err;
        }
        res.json(items);
    })
};

module.exports.itemDetailsPage = async (req, res) => {
    // const { id } = req.params;
    // const item = await Item.findById({ _id: id });
    // res.render('equipment/itemDetails', { item });
    let id = req.params.id;
    let sql = `SELECT * FROM gymequipment WHERE id = ${id}`;
    db.query(sql, (err, item) => {
        if (err) {
            throw err;
        } else {
            res.render('equipment/itemDetails', { item });

        }
    })
};