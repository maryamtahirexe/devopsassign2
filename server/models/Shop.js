import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  isRented: { type: Boolean, default: false },
});

const Shop = mongoose.model("Shop", shopSchema);
export default Shop;
