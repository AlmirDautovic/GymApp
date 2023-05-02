const Item = require("../models/item");

module.exports.renderGymItemPage = async (req, res) => {
    const items = await Item.find({});
    const length = Math.ceil(await Item.countDocuments().exec())
    for (let [i, item] of items.entries()) {
        console.log(item, i)
    }
    res.render('gymequipment', { items, length });
    // res.json({ items, length })
};

module.exports.createItem = async (req, res) => {
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