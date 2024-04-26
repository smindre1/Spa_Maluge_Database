const router = require('express').Router();
const {getInventoryList, createInventory, getItemList, addToInventory, removeFromInventory} = require('../../controllers/inventoryControllers');

router.route('/').get(getInventoryList).post(createInventory);

router.route('/:itemCategory').get(getItemList).put(addToInventory).delete(removeFromInventory);



module.exports = router;
