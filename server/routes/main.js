const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

// Getting Module
const Order = require("../models/Order")
const CustomerDetails = require("../models/CustomerDetails")
const Coupon = require("../models/Coupon")
const QRCode = require("../models/QRCode")
const Reservation = require("../models/Reservation")

// Add a new Reservation
router.post("/add_reservation", (req, res) => {
  console.log(req.body)

  res.setHeader("Content-Type", "application/json");

  const newReservation = new Reservation({
    ...req.body
  });

  newReservation.save((err) => {
    if (err)
      res.status(400).json(`Error: ${err}`)
    else
      res.status(200).send("Created a new reservation")
  })
})

router.get("/get_reservations/:userId", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  Reservation.find({ ...req.params }, (err, reservations) => {
    if (err)
      res.status(400).json(`Error: ${err}`)
    else
      res.status(200).json(reservations)
  }
  )
})

router.delete("/delete_reservation/:id/:userId", async (req, res) => {

  res.setHeader("Content-Type", "application/json");

  Reservation.deleteOne({ _id: req.params.id, userId: req.params.userId }, (err) => {
    if (err)
      res.status(400).json(`Error: ${err}`)
    else
      res.status(200).send("Deleted one reservation successfully!")
  })
})

router.get("/get_reservation_by_id/:id/:userId", async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  Reservation.findOne({ _id: req.params.id, userId: req.params.userId }, (err, reservation) => {
    if (err)
      res.status(400).json(`Error: ${err}`)
    else
      res.status(200).send(reservation)
  })
})

router.patch("/edit_reservation/:id/:userId", async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  Reservation.updateOne({ _id: req.params.id, userId: req.params.userId },
    {
      $set: req.body
    },
    (err) => {
      if (err)
        res.status(400).json(`Error: ${err}`)
      else
        res.status(200).send("Edited a reservation")
    })
})

// Add a new QR code 
router.post("/add_qr_code", (req, res) => {
  console.log(req.body)

  res.setHeader("Content-Type", "application/json");

  const newQRCode = new QRCode({
    ...req.body
  });

  newQRCode.save((err) => {
    if (err)
      res.status(400).json(`Error: ${err}`)
    else
      res.status(200).send("Created a new qr code")
  })
})

router.get("/get_qr_code/:type/:userId", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  QRCode.find({ ...req.params }, (err, codes) => {
    if (err)
      res.status(400).json(`Error: ${err}`)
    else
      res.status(200).json(codes)
  }
  )
})

router.delete("/delete_qr_code/:id/:userId", async (req, res) => {

  res.setHeader("Content-Type", "application/json");

  QRCode.deleteOne({ _id: req.params.id, userId: req.params.userId }, (err) => {
    if (err)
      res.status(400).json(`Error: ${err}`)
    else
      res.status(200).send("Deleted one QR code successfully!")
  })
})

router.get("/get_code_by_id/:id/:userId", async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  QRCode.findOne({ _id: req.params.id, userId: req.params.userId }, (err, code) => {
    if (err)
      res.status(400).json(`Error: ${err}`)
    else
      res.status(200).send(code)
  })
})

router.patch("/edit_qr_code/:id/:userId", async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  QRCode.updateOne({ _id: req.params.id, userId: req.params.userId },
    {
      $set: req.body
    },
    (err) => {
      if (err)
        res.status(400).json(`Error: ${err}`)
      else
        res.status(200).send("Edited a QR code")
    })
})

// Add a new coupon
router.post("/add_coupon", (req, res) => {
  console.log(req.body)

  res.setHeader("Content-Type", "application/json");

  const newCoupon = new Coupon({
    ...req.body
  });

  newCoupon.save((err) => {
    if (err)
      res.status(400).json(`Error: ${err}`)
    else
      res.status(200).send("created a new coupon")
  })
})

// Get all the coupons
router.get("/get_coupons/:userId", async (req, res) => {

  res.setHeader("Content-Type", "application/json");

  Coupon.find({ userId: req.params.userId }, (err, coupons) => {
    if (err)
      res.status(400).json(`Error: ${err}`)
    else
      res.status(200).json(coupons)
  }
  )
})

// Get a single customer 
router.get("/get_coupon_by_id/:couponId/:userId", async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  Coupon.findOne({ _id: req.params.couponId, userId: req.params.userId }, (err, coupon) => {
    if (err)
      res.status(400).json(`Error: ${err}`)
    else
      res.status(200).send(coupon)
  })
})

// Delete a coupon
router.delete("/delete_coupon/:couponId/:userId", async (req, res) => {

  res.setHeader("Content-Type", "application/json");

  Coupon.deleteOne({ _id: req.params.couponId, userId: req.params.userId }, (err) => {
    if (err)
      res.status(400).json(`Error: ${err}`)
    else
      res.status(200).send("Deleted one coupon successfully!")
  })
})

// Patch a coupon
router.patch("/edit_coupon/:couponId/:userId", async (req, res) => {

  res.setHeader("Content-Type", "application/json");

  Coupon.updateOne({ _id: req.params.couponId, userId: req.params.userId },
    {
      $set: req.body
    },
    (err) => {
      if (err)
        res.status(400).json(`Error: ${err}`)
      else
        res.status(200).send("Edited a coupon")
    })
})

// Add a new customer
router.post("/add_customer", (req, res) => {
  console.log(req.body)

  res.setHeader("Content-Type", "application/json");

  const newCustomer = new CustomerDetails({
    ...req.body
  });

  newCustomer.save((err) => {
    if (err)
      res.status(400).json(`Error: ${err}`)
    else
      res.status(200).send("created a new customer")
  })
})

// Get all the customers
router.get("/get_customers/:userId", async (req, res) => {

  res.setHeader("Content-Type", "application/json");

  CustomerDetails.find({ userId: req.params.userId }, (err, customers) => {
    if (err)
      res.status(400).json(`Error: ${err}`)
    else
      res.status(200).json(customers)
  }
  )
})

// Get a single customer 
router.get("/get_customer_by_id/:customerId/:userId", async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  CustomerDetails.findOne({ _id: req.params.customerId, userId: req.params.userId }, (err, customer) => {
    if (err)
      res.status(400).json(`Error: ${err}`)
    else
      res.status(200).send(customer)
  })
})

// Delete a customer
router.delete("/delete_customer/:customerId/:userId", async (req, res) => {

  res.setHeader("Content-Type", "application/json");

  CustomerDetails.deleteOne({ _id: req.params.customerId, userId: req.params.userId }, (err) => {
    if (err)
      res.status(400).json(`Error: ${err}`)
    else
      res.status(200).send("Deleted one customer successfully!")
  })
})

// Patch a customer
router.patch("/edit_customer/:customerId/:userId", async (req, res) => {

  res.setHeader("Content-Type", "application/json");

  CustomerDetails.updateOne({ _id: req.params.customerId, userId: req.params.userId },
    {
      $set: req.body
    },
    (err) => {
      if (err)
        res.status(400).json(`Error: ${err}`)
      else
        res.status(200).send("Edited a customer")
    })
})

// Add a new order
router.post("/add_order", (req, res) => {
  console.log(req.body)

  res.setHeader("Content-Type", "application/json");

  const newOrder = new Order({
    ...req.body,
    createdOn: new Date(),
  });

  newOrder.save((err) => {
    if (err)
      res.status(400).json(`Error: ${err}`)
    else
      res.status(200).send("created a new order")
  })
})

// Get all the orders
router.get("/get_orders/:userId", async (req, res) => {

  res.setHeader("Content-Type", "application/json");

  Order.find({ userId: req.params.userId }, (err, orders) => {
    if (err)
      res.status(400).json(`Error: ${err}`)
    else
      res.status(200).json(orders)
  }
  )
})


// Get all the orders based on their type
router.get("/get_orders_by_type/:userId/:type", async (req, res) => {

  res.setHeader("Content-Type", "application/json");

  Order.find({ userId: req.params.userId, type: parseInt(req.params.type) }, (err, orders) => {
    if (err)
      res.status(400).json(`Error: ${err}`)
    else
      res.status(200).json(orders)
  }
  )
})

// Get all the orders based on their status and type
router.get("/get_orders_by_status/:userId/:status/:type", async (req, res) => {

  res.setHeader("Content-Type", "application/json");

  Order.find({ userId: req.params.userId, status: parseInt(req.params.status), type: parseInt(req.params.type) },
    (err, orders) => {
      if (err)
        res.status(400).json(`Error: ${err}`)
      else
        res.status(200).json(orders)
    }
  )
})

// Delete an order
router.delete("/delete_order/:orderId/:userId", async (req, res) => {

  res.setHeader("Content-Type", "application/json");

  Order.deleteOne({ _id: req.params.orderId, userId: req.params.userId }, (err) => {
    if (err)
      res.status(400).json(`Error: ${err}`)
    else
      res.status(200).send("Deleted one order successfully!")
  })
})

// Get a single order 
router.get("/get_order_by_id/:orderId/:userId", async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  Order.findOne({ _id: req.params.orderId, userId: req.params.userId }, (err, order) => {
    if (err)
      res.status(400).json(`Error: ${err}`)
    else
      res.status(200).send(order)
  })
})

// Patch an order
router.patch("/edit_order/:orderId/:userId", async (req, res) => {

  res.setHeader("Content-Type", "application/json");

  Order.updateOne({ _id: req.params.orderId, userId: req.params.userId },
    {
      $set: req.body
    },
    (err) => {
      if (err)
        res.status(400).json(`Error: ${err}`)
      else
        res.status(200).send("Edited an order")
    })
})

// TEST
// @GET TEST
// GET
router.get("/test", (req, res) => {
  res.send("Working");
});


module.exports = router;