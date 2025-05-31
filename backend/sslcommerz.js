const express = require('express');
const router = express.Router();
const SSLCommerzPayment = require('sslcommerz-lts');
const { v4: uuid } = require('uuid');

const store_id = 'your_store_id';
const store_passwd = 'your_store_password';
const is_live = false;

router.post('/initiate', async (req, res) => {
  const { userId, products, total } = req.body;
  const transactionId = uuid();

  const data = {
    total_amount: total,
    currency: 'BDT',
    tran_id: transactionId,
    success_url: 'http://localhost:3000/success',
    fail_url: 'http://localhost:3000/fail',
    cancel_url: 'http://localhost:3000/fail',
    ipn_url: 'http://localhost:5000/api/payment/ipn',
    shipping_method: 'Courier',
    product_name: 'Ecommerce Purchase',
    product_category: 'General',
    product_profile: 'general',
    cus_name: 'Customer Name',
    cus_email: 'email@example.com',
    cus_add1: 'Dhaka',
    cus_phone: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_city: 'Dhaka',
    ship_country: 'Bangladesh',
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then(apiResponse => {
    if (apiResponse.GatewayPageURL) {
      return res.json({ url: apiResponse.GatewayPageURL });
    } else {
      return res.status(500).json({ message: 'Payment gateway init error' });
    }
  });
});

module.exports = router;
