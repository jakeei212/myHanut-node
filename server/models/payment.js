const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
    {
      user: {
        type: Array,
        default:[]
      },
      data: {
        type: Array,
        default:[]
      },
      product: {
        type: Array,
        default:[]
      },
    }
  );
  
  module.exports = Payment = mongoose.model("payment", PaymentSchema);
  