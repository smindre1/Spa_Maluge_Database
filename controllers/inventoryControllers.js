const { Inventory } = require("../models");
const db = require('../config/connection');

module.exports = {
  //get all inventories
  async getInventoryList(req, res) {
    try {
      let inventories = await Inventory.find().lean();
      res.json(inventories)
    } catch (error) {
      res.status(500).json({message: 'Could not retrieve inventories'})
    }
    // finally {
    //   db.connection.close() //Closing the connection to prevent memory leaks
    // }
  },
  async createInventory(req, res) {
    try {
        const inventory = await Inventory.create({ ItemCategory: req.body.ItemCategory, Rooms: req.body.rooms, Items: req.body.items });
        
      //Checking Response
      res.status(201).json({ message: 'Inventory added successfully', data: inventory });
    } catch (error) {
        console.error('Error adding new inventory', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  },
  async getItemList(req, res) {
    try {
      const inventory = await Inventory.findOne({ItemCategory: req.params.itemCategory});
      if(!inventory) {
        console.log('Inventory Not Found!');
        return res.status(404).json({ error: 'Inventory Not Found' });
      }

      res.status(200).json(inventory);
    } catch (error) {
      console.error('Error getting inventory item list', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  async addToInventory(req, res) {
    try {
        let inventory = await Inventory.find({ItemCategory: req.params.itemCategory});

        let originalInventory = inventory[0][Items];
        let newInventory = [...originalInventory, req.body.item];
  
        const updatedInventory = await Inventory.findOneAndUpdate({ ItemCategory: req.params.itemCategory }, {Items: newInventory});
        

        res.status(202).json({ message: 'Inventory updated successfully', data: updatedInventory });
    } catch (error) {
      console.error('Error updating inventory items', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async removeFromInventory(req, res) {
    try {
        const updatedInventory = await Inventory.findOneAndUpdate({ ItemCategory: req.params.itemCategory },
            { $pull: { Items: req.body.item } },
            {new:true});
    
        res.status(202).json({ message: 'Inventory updated successfully', data: updatedInventory });
    } catch (error) {
      console.error('Error removing item from inventory', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};