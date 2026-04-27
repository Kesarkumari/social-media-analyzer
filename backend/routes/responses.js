const express = require('express');
const router = express.Router();
const Response = require('../models/Response');

// GET /api/responses/my
router.get('/my', async (req, res) => {
  try {
    const responses = await Response.find().sort({ createdAt: -1 });
    res.json({ responses });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/responses/submit
router.post('/submit', async (req, res) => {
  try {
    console.log('📥 Body received:', req.body);

    const payload = req.body.data || req.body;
    const { answers, selfRating, platformUsage, ...userData } = payload;

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ message: 'Answers missing' });
    }

    const score = Object.values(answers).reduce((sum, val) => sum + Number(val), 0);
    const category =
      score <= 30 ? 'Healthy' :
      score <= 60 ? 'Moderate' :
      score <= 90 ? 'High Impact' : 'Addicted';

    // ✅ MongoDB mein save karo
    const response = await Response.create({
      userId: userData.userEmail || userData.userId || 'anonymous',
      age: Number(userData.age),
      gender: userData.gender,
      dailyScreenTime: Number(userData.dailyScreenTime),
      sleepQuality: Number(userData.sleepQuality),
      stressLevel: Number(userData.stressLevel),
      daysWithoutSocialMedia: Number(userData.daysWithoutSocialMedia),
      exerciseFrequency: Number(userData.exerciseFrequency),
      platform: userData.platform,
      happinessIndex: Number(userData.happinessIndex),
      onlineShopping: userData.onlineShopping,
      shoppingReason: userData.shoppingReason,
      answers,
      platformUsage,
      selfRating,
      score,
      category,
    });

    res.json({ success: true, response });

  } catch (err) {
    console.error('❌ Submit error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/responses
router.post('/', async (req, res) => {
  try {
    res.json({ success: true, data: req.body });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/export', async (req, res) => {
  try {
    const responses = await Response.find().lean();

    const headers = [
      'age', 'gender', 'dailyScreenTime', 'sleepQuality', 'stressLevel',
      'daysWithoutSocialMedia', 'exerciseFrequency', 'platform', 'happinessIndex',
      'onlineShopping', 'shoppingReason', 'selfRating', 'score', 'category',
      'ans_1','ans_2','ans_3','ans_4','ans_5','ans_6','ans_7','ans_8','ans_9','ans_10',
      'ans_11','ans_12','ans_13','ans_14','ans_15','ans_16','ans_17','ans_18','ans_19','ans_20',
      'platform_instagram','platform_youtube','platform_tiktok',
      'platform_twitter','platform_facebook','platform_snapchat',
    ];

    const rows = responses.map(r => [
      r.age, r.gender, r.dailyScreenTime, r.sleepQuality, r.stressLevel,
      r.daysWithoutSocialMedia, r.exerciseFrequency, r.platform, r.happinessIndex,
      r.onlineShopping, r.shoppingReason, r.selfRating, r.score, r.category,
      ...Array.from({length: 20}, (_, i) => r.answers?.[String(i+1)] || 0),
      r.platformUsage?.instagram || 0,
      r.platformUsage?.youtube || 0,
      r.platformUsage?.tiktok || 0,
      r.platformUsage?.twitter || 0,
      r.platformUsage?.facebook || 0,
      r.platformUsage?.snapchat || 0,
    ]);

    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=social_media_data.csv');
    res.send(csv);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;