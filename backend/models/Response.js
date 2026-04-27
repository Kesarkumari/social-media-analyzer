const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema(
  {
    // ✅ User ID (string bhi allow kiya for research)
    userId: { type: String, required: true },

    // ✅ NEW RESEARCH FIELDS
    age: { type: Number },
    gender: { type: String },

    dailyScreenTime: { type: Number },
    sleepQuality: { type: Number },
    stressLevel: { type: Number },
    daysWithoutSocialMedia: { type: Number },
    exerciseFrequency: { type: Number },

   platform: { type: String },
   userEmail: { type: String },
   happinessIndex: { type: Number },
   onlineShopping: { type: String },
   shoppingReason: { type: String },

    // ✅ EXISTING
    answers: { type: Object, required: true },
    score: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Healthy', 'Moderate', 'High Impact', 'Addicted']
    },

    selfRating: { type: Number, min: 1, max: 10 },
    platformUsage: { type: Object },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Response', responseSchema);