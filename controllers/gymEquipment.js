const Item = require("../models/item");

module.exports.renderGymItemPage = async (req, res) => {
    const items = await Item.find({});
    res.render('gymequipment', { items });
};

module.exports.createItem = async (req, res) => {
    const item = new Item(req.body);
    await item.save();
    res.status(201).send(item);
};

module.exports.displayItem = async (req, res) => {
    const items = await Item.find({});
    res.json(items)
}