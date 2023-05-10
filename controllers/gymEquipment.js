const Item = require("../models/item");

module.exports.renderGymItemPage = async (req, res) => {
    const items = await Item.find({});
    const length = Math.ceil(await Item.countDocuments().exec());
    res.render('equipment/gymequipment', { items, length });
};

module.exports.createItem = async (req, res) => {
    let item = new Item(req.body);
    if (req.files !== null) {
        const { item_image } = req.files;
        item_image.mv("public" + "/" + "images" + "/" + "equipment" + "/" + item_image.name);
        item.item_image = item_image.name;
    }
    await item.save();
    res.status(201).send(item);
};

module.exports.displayItem = async (req, res) => {
    const items = await Item.find({});
    res.json(items);
};

module.exports.itemDetailsPage = async (req, res) => {
    const { id } = req.params;
    const item = await Item.findById({ _id: id });
    res.render('equipment/itemDetails', { item });
}