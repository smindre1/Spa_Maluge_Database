const { Schema, model } = require('mongoose');

const inventorySchema = new Schema({
    ItemCategory: {
        type: Number,
        required: true,
    },
    Rooms: [{
        Room: {
            type: Number,
            required: true,
        }
    }],
    Items: [{
        Item: {
            type: String,
            required: true,
        },
        Prices: [{
            time: {
                type: Number,
                required: true,
            },
            cost: {
                type: Number,
                required: true,
            }
        }],
    }],
});

const Inventory = model('Inventory', inventorySchema);

module.exports = Inventory;
