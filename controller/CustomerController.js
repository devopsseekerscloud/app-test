const CustomerSchema = require('../model/CustomerSchema');
const {parse} = require("dotenv");

const saveCustomer = (req, resp) => {
    console.log(req.body);
    let customer = new CustomerSchema({
        name: req.body.name,
        address: req.body.address,
        salary: req.body.salary
    });
    customer.save().then(result => {
        resp.status(201).json({data: result});
    }).catch(error => {
        resp.status(500).json({error: error});
    })
}
const updateCustomer = (req, resp) => {
    CustomerSchema.findOneAndUpdate({'_id': req.body.id}, {
        $set: {name: req.body.name, address: req.body.address, salary: req.body.salary}
    }).then(result => {
        resp.status(201).json({data: result});
    }).catch(error => {
        resp.status(500).json({error: error});
    });
}
const deleteCustomer = (req, resp) => {
    CustomerSchema.findByIdAndDelete({'_id': req.headers.id}).then(result => {
        resp.status(200).json({data: result});
    }).catch(error => {
        resp.status(500).json({error: error});
    });
}
const getCustomer = (req, resp) => {
    CustomerSchema.findOne({'_id': req.headers.id}).then(result => {
        resp.status(200).json({data: result});
    }).catch(error => {
        resp.status(500).json({error: error});
    });
}
const getAllCustomers = (req, resp) => {
    const paginateOption = {
        page: parseInt(req.query.page) || 0,
        size: parseInt(req.query.size) || 10
    };
    console.log(paginateOption)
    CustomerSchema.find()
        .skip(paginateOption.page * paginateOption.size)
        .limit(paginateOption.size)
        .exec(function (error, result) {
            if (error) {
                resp.status(500).json(error);
            }
            resp.status(200).json(result);
        })
}

module.exports = {
    saveCustomer, updateCustomer, deleteCustomer, getCustomer, getAllCustomers
};