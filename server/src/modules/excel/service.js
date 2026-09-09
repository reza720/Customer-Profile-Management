import Customer from '../customer/models/customer.js';
import Address from '../customer/models/address.js';
import Contact from '../customer/models/contact.js';
import throwError from '../../utils/throwError.js';

// Get customers for Excel
export async function getCustomersForExcel() {
  const customers = await Customer.findAll({
    include: [
      {
        model: Address,
        as: 'Address',
      },
      {
        model: Contact,
        as: 'Contact',
      },
    ],
  });

  if (customers.length === 0) {
    throwError('No customer found', 404);
  }

  return customers.map((customer) => ({
    Customer_ID: customer.id,
    Fullname: `${customer.firstName} ${customer.lastName}`,
    Gender: customer.gender,

    Address: [
      customer.Address?.province,
      customer.Address?.district,
      customer.Address?.area,
    ]
      .filter(Boolean)
      .join(' / '),

    Email: customer.Contact?.email ?? '',
    Phone_Number: customer.Contact?.phoneNumber ?? '',
    WhatsApp_Number: customer.Contact?.whatsappNumber ?? '',
  }));
}
