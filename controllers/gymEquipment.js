const Item = require("../models/item");

module.exports.renderGymItemPage = async (req, res) => {
    const items = await Item.find({});
    res.render('gymequipment', { items });
};

module.exports.createItem = async (req, res) => {
    console.log(req.body)
    console.log(req.files)
    let item = new Item(req.body);

    const { item_image } = req.files;
    item_image.mv("public" + "/" + "images" + "/" + "equipment" + "/" + item_image.name);
    item.item_image = item_image.name;

    await item.save();
    res.status(201).send(item);
};

module.exports.displayItem = async (req, res) => {
    const items = await Item.find({});
    res.json(items)
}