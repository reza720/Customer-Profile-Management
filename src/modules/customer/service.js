import Customer from "./models/customer.js";
import Address from "./models/address.js";
import Contact from "./models/contact.js";
import sequelize from "../../config/sequelize.js";
import throwError from "../../utils/throwError.js";
import deleteFile from "../../utils/deleteFile.js";

// register
// input: data(firstaName, lastName, gender, address{}, contact{})
// Destructure data into customer varibles and address and contact object
// User transaction to create three models
// return: customer basic info + address + contact
export async function register(data) {
    const {
        firstName,
        lastName,
        gender,
        address: addressData,
        contact: contactData
    } = data;
        
    if(addressData === undefined || contactData === undefined){
        throwError("Address and contact are required", 400);
    }

    const transaction = await sequelize.transaction();
    try{
        const customer = await Customer.create({
            firstName,
            lastName,
            gender
        }, {transaction});

        const address = await Address.create({
             ...addressData,
            customerId: customer.id
        }, {transaction});

        const contact = await Contact.create({
            ...contactData,
            customerId: customer.id
        }, {transaction});

        await transaction.commit();

        return {
            id: customer.id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            gender: customer.gender,
            address:{
                province: address.province,
                district: address.district,
                area: address.area
            },
            contact:{
                email: contact.email,
                phoneNumber: contact.phoneNumber,
                whatsappNumber: contact.whatsappNumber
            }
        }
    }
    catch(err){
        await transaction.rollback();
        throw err;
    }
};
// upload/replace photo
// input: customerId, file
// If customer exist
// if file exist in input
// If DB fails to upload, delete the file in storage
// if customer had photo and DB succeed delete old image
// regturn basic customer data + photo path
export async function uploadPhoto(customerId, file) {
    const customer = await Customer.findByPk(customerId);
    if(!customer) throwError("Customer not found", 404);
    if(!file) throwError("File is required", 400);
    const oldPhotoPath = customer.photoURL;
    const newPhotoPath = file.path;
    
    try{
        await customer.update({
            photoURL:newPhotoPath
        });
    }
    catch(err){
        await deleteFile(newPhotoPath);
        throw err;
    }

    if(oldPhotoPath){
        await deleteFile(oldPhotoPath);
    }

    return{
        id: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        gender: customer.gender,
        photoURL: customer.photoURL
    }
};

// Update Customer basic data + address + contact
// input: data(basic, address, contact)
// User transaction to update all models 
// Destructur the input data
// If customer exist
// update the models and data are provided
// return: basic data + address + contact
export async function update(customerId, data) {
    const transaction = await sequelize.transaction();

    try{
        const customer = await Customer.findByPk(customerId, {transaction});
        if(!customer) throwError("Customer not found", 404);

        const {
            firstName,
            lastName,
            gender,
            contact: contactData,
            address: addressData
        } = data;

        await customer.update({
            ...(firstName !== undefined && {firstName}),
            ...(lastName !== undefined && {lastName}),
            ...(gender !== undefined && {gender})
        }, {transaction});

        let contact = await Contact.findByPk(customerId, {transaction});
        if(!contact) throwError("Contact not found", 404);
        if(contactData){
            await contact.update({
                ...(contactData.email !== undefined && {email: contactData.email}),
                ...(contactData.phoneNumber !== undefined && {phoneNumber: contactData.phoneNumber}),
                ...(contactData.whatsappNumber !== undefined && {whatsappNumber: contactData.whatsappNumber})
            }, {transaction});
        }

        let address = await Address.findByPk(customerId, {transaction});
        if(!address) throwError("Address not found", 404);
        if(addressData){
            await address.update({
                ...(addressData.province !== undefined && {province: addressData.province}),
                ...(addressData.district !== undefined && {district: addressData.district}),
                ...(addressData.area !== undefined && {area: addressData.area})
            }, {transaction});
        }

        await transaction.commit();

        return {
            id: customer.id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            gender: customer.gender,
            address:{
                province: address.province,
                district: address.district,
                area: address.area
            },
            contact:{
                email: contact.email,
                phoneNumber: contact.phoneNumber,
                whatsappNumber: contact.whatsappNumber
            },
            createdAt: customer.createdAt,
            updatedAt: customer.updatedAt
        }
    }
    catch(err){
        await transaction.rollback();
        throw err;
    }
}


// Delete Customer
// input: customerId
// if cusomer exist
// delete cutomer
// delete photo
// return nothing

// get customer
// input: customerId
// if customer eixst
// return: customer basic data, address, and contact

// get photo
// input: customerId
// If user exist
// if user has photo
// return photo path

// get Customers
// input: options: search(fullname), filte(gender/created range)
//     sortng(lastName / createdAt: default), page, limit
// return: rows + pagination metadata

