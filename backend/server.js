const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactRoutes = require('./routes/contact');

require('dotenv').config();

const responseRoutes = require('./routes/responses');
const authRoutes = require('./routes/auth'); // ← ADD

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/responses', responseRoutes);
app.use('/api/auth', authRoutes); // ← ADD
app.use('/api/contact', contactRoutes);



// Test route
app.get('/', (req, res) => {
  res.send('API Running');
});

// MongoDB connect
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => console.log('❌ DB Error:', err));