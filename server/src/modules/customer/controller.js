import * as customerService from './service.js';

// register
// req: from body
// res: status, json(success, message, returned data)
export async function register(req, res, next) {
  try {
    const customer = await customerService.register(req.body);
    res.status(201).json({
      success: true,
      message: 'Customer registered',
      customer,
    });
  } catch (err) {
    next(err);
  }
}
// upload photo
// req: customerId from params, file from body.file
// res:status, json(success, message, returned data)
export async function uploadPhoto(req, res, next) {
  try {
    const customer = await customerService.uploadPhoto(req.params.id, req.file);
    res.status(200).json({
      success: true,
      message: 'Photo uploaded',
      customer,
    });
  } catch (err) {
    next(err);
  }
}
// update customer
// req: customerId from params, data from body
// res: status, json(success, message, returned data)
export async function update(req, res, next) {
  try {
    const customer = await customerService.update(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Customer updated',
      customer,
    });
  } catch (err) {
    next(err);
  }
}
// delete customer
// req: customerId from params
// res: status, json(success, message)
export async function deleteCustomer(req, res, next) {
  try {
    await customerService.deleteCustomer(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Customer deleted',
    });
  } catch (err) {
    next(err);
  }
}

// get customer
// req: customerId from params
// res: status, json(success, message, returned data)
export async function getCustomer(req, res, next) {
  try {
    const customer = await customerService.getCustomer(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Customer fetched',
      customer,
    });
  } catch (err) {
    next(err);
  }
}

// get customers
// req: from req.query
// res: status, json(success, message, returned data)
export async function getCustomers(req, res, next) {
  try {
    const customers = await customerService.getCustomers(req.query);
    res.status(200).json({
      success: true,
      message: 'customers fetched',
      customers,
    });
  } catch (err) {
    next(err);
  }
}
