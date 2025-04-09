const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))

const userSchema = new mongoose.Schema({
  name: String,
  purchaseHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
})

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number
})

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
  totalAmount: Number,
  status: { type: String, default: 'Placed' }
})

const User = mongoose.model('User', userSchema)
const Product = mongoose.model('Product', productSchema)
const Order = mongoose.model('Order', orderSchema)

class AppError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

app.post('/api/order', async (req, res, next) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const { userId, items } = req.body

    const user = await User.findById(userId).session(session)
    if (!user) throw new AppError('User not found', 404)

    let totalAmount = 0
    const orderItems = []

    for (const item of items) {
      const product = await Product.findById(item.productId).session(session)
      if (!product) throw new AppError('Product not found', 404)
      if (product.stock < item.quantity) throw new AppError('Insufficient stock', 400)

      product.stock -= item.quantity
      await product.save({ session })

      orderItems.push({ product: product._id, quantity: item.quantity })
      totalAmount += product.price * item.quantity
    }

    const order = await Order.create([{ user: user._id, products: orderItems, totalAmount }], { session })

    user.purchaseHistory.push(order[0]._id)
    await user.save({ session })

    await session.commitTransaction()
    session.endSession()
    res.status(201).json({ message: 'Order placed', order: order[0] })

  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    next(error)
  }
})

app.use((err, req, res, next) => {
  console.error('Error:', err.message)
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  })
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
