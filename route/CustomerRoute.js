const express = require('express');
const CustomerController = require('../controller/CustomerController');

const router = express.Router();

router.post('/create', CustomerController.saveCustomer);
router.put('/modify', CustomerController.updateCustomer);
router.get('/find', CustomerController.getCustomer);
router.delete('/remove', CustomerController.deleteCustomer);
router.get('/list', CustomerController.getAllCustomers);

module.exports = router;