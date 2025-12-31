import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  player1: {
    type: String,
    required: true
  },
  player2: {
    type: String,
    required: true
  },
  rounds: {
    type: Array,
    required: true
  },
  winner: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Match", matchSchema);
