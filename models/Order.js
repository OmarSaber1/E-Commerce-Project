const mongoose = require("mongoose");


const orderSchema = mongoose.Schema([
  {
    //  connect to user
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    
    // connect to product
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          require: true,
        },
        quantity: {
          type: Number,
          require: true,
          default: 1,
        }
      },
    ],

    status: {
      type: String,
      enum: ["ordered", "orderPickedUp", "orderDelivering", "orderDelivered"],
      default: "ordered"
    },

    totalPrice: {
      type : Number
    },

    startShippingAt: {
      type: Date,
      default: Date.now(),
    },
    
    deliveryAt: {
      type: Date,
      default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
    },
  },
]);

const order = mongoose.model("order", orderSchema);

module.exports = order;

