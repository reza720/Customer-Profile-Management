import throwError from "../../utils/throwError.js";
import Customer from "../customer/models/customer.js";

// get photo
// input: customerId
// If user exist
// if user has photo
// return photo path
export async function getPhoto(customerId) {
    const customer = await Customer.findByPk(customerId);
    if(!customer) throwError("Customer not found", 404);

    return customer.photoPath;
}

// get Customers, no quering, does not return photoPath
// inout: nothing
// return: customer basic data, contact, address
export async function getCustomers() {
    const customers = await Customer.findAll({
        attributes:[
            "id",
            "firstName",
            "lastName",
            "gender"
        ],
        include:[
            {
                model: Address,
                attributes:[
                    "province",
                    "district",
                    "area"
                ]
            },
            {
                model: Contact,
                attributes:[
                    "email",
                    "phoneNumber",
                    "whatsappNumber"
                ]
            }
        ]
    });

    if(customers.length === 0){
        throwError("No customer found");
    } 

    return customers;
};
