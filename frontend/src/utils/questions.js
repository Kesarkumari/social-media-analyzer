export const QUESTIONS = [
  {
    id: 1,
    text: "How many hours per day do you spend on social media?",
    options: [
      { label: "Less than 1 hour", score: 1 },
      { label: "1–2 hours", score: 2 },
      { label: "3–5 hours", score: 3 },
      { label: "More than 5 hours", score: 4 },
    ],
  },
  {
    id: 2,
    text: "How often do you check your social media notifications?",
    options: [
      { label: "Rarely (once a day)", score: 1 },
      { label: "A few times a day", score: 2 },
      { label: "Every hour", score: 3 },
      { label: "Every few minutes", score: 4 },
    ],
  },
  {
    id: 3,
    text: "Do you feel anxious when you can't access social media?",
    options: [
      { label: "Never", score: 1 },
      { label: "Rarely", score: 2 },
      { label: "Sometimes", score: 3 },
      { label: "Always", score: 4 },
    ],
  },
  {
    id: 4,
    text: "How does social media usage affect your sleep?",
    options: [
      { label: "No impact", score: 1 },
      { label: "Slightly delayed sleep", score: 2 },
      { label: "Often sleep late due to it", score: 3 },
      { label: "Severely disrupts my sleep", score: 4 },
    ],
  },
  {
    id: 5,
    text: "Do you use social media during meals or family time?",
    options: [
      { label: "Never", score: 1 },
      { label: "Rarely", score: 2 },
      { label: "Often", score: 3 },
      { label: "Always", score: 4 },
    ],
  },
  {
    id: 6,
    text: "How often do you compare yourself to others on social media?",
    options: [
      { label: "Never", score: 1 },
      { label: "Occasionally", score: 2 },
      { label: "Frequently", score: 3 },
      { label: "All the time", score: 4 },
    ],
  },
  {
    id: 7,
    text: "Do you feel the need to post/share things regularly?",
    options: [
      { label: "No, rarely post", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Often", score: 3 },
      { label: "Compulsively", score: 4 },
    ],
  },
  {
    id: 8,
    text: "How many platforms do you actively use daily?",
    options: [
      { label: "1", score: 1 },
      { label: "2", score: 2 },
      { label: "3–4", score: 3 },
      { label: "5 or more", score: 4 },
    ],
  },
  {
    id: 9,
    text: "Does social media affect your productivity at work/study?",
    options: [
      { label: "Not at all", score: 1 },
      { label: "Minimally", score: 2 },
      { label: "Noticeably", score: 3 },
      { label: "Severely", score: 4 },
    ],
  },
  {
    id: 10,
    text: "How often do you scroll mindlessly without purpose?",
    options: [
      { label: "Never", score: 1 },
      { label: "Rarely", score: 2 },
      { label: "Often", score: 3 },
      { label: "Most of the time", score: 4 },
    ],
  },
  {
    id: 11,
    text: "Do you feel upset when your posts don't get enough likes?",
    options: [
      { label: "Never", score: 1 },
      { label: "A little", score: 2 },
      { label: "Quite often", score: 3 },
      { label: "Very much", score: 4 },
    ],
  },
  {
    id: 12,
    text: "Do you use social media first thing in the morning?",
    options: [
      { label: "Never", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Most days", score: 3 },
      { label: "Every single day", score: 4 },
    ],
  },
  {
    id: 13,
    text: "Have you tried to reduce social media use and failed?",
    options: [
      { label: "Never tried", score: 1 },
      { label: "Tried and succeeded", score: 2 },
      { label: "Tried but partially failed", score: 3 },
      { label: "Tried many times and failed", score: 4 },
    ],
  },
  {
    id: 14,
    text: "How much does FOMO (fear of missing out) affect your social media use?",
    options: [
      { label: "Not at all", score: 1 },
      { label: "Slightly", score: 2 },
      { label: "Moderately", score: 3 },
      { label: "Greatly", score: 4 },
    ],
  },
  {
    id: 15,
    text: "Do you use social media to cope with negative emotions?",
    options: [
      { label: "Never", score: 1 },
      { label: "Rarely", score: 2 },
      { label: "Sometimes", score: 3 },
      { label: "Often", score: 4 },
    ],
  },
  {
    id: 16,
    text: "How often do you feel worse after using social media?",
    options: [
      { label: "Never", score: 1 },
      { label: "Rarely", score: 2 },
      { label: "Sometimes", score: 3 },
      { label: "Often", score: 4 },
    ],
  },
  
   {
  id: 17,
  text: "Which platform do you use the MOST? (for tracking)",
  options: [
    { label: "Instagram", score: 1 },
    { label: "YouTube", score: 2 },
    { label: "TikTok", score: 3 },
    { label: "Twitter/X", score: 4 },
  ],
  isPlatform: true,
},
  {
    id: 18,
    text: "Do you neglect real-life relationships for social media?",
    options: [
      { label: "Never", score: 1 },
      { label: "Rarely", score: 2 },
      { label: "Sometimes", score: 3 },
      { label: "Frequently", score: 4 },
    ],
  },
  {
    id: 19,
    text: "How often do you get into arguments or feel stressed due to social media content?",
    options: [
      { label: "Never", score: 1 },
      { label: "Rarely", score: 2 },
      { label: "Sometimes", score: 3 },
      { label: "Often", score: 4 },
    ],
  },
  {
    id: 20,
    text: "Overall, do you feel social media has a negative impact on your life?",
    options: [
      { label: "No, mostly positive", score: 1 },
      { label: "Mixed — both positive and negative", score: 2 },
      { label: "Mostly negative", score: 3 },
      { label: "Very negative", score: 4 },
    ],
  },
];

export const PLATFORM_QUESTIONS = [
  { id: 'instagram', label: 'Instagram', color: '#E1306C' },
  { id: 'youtube', label: 'YouTube', color: '#FF0000' },
  { id: 'tiktok', label: 'TikTok', color: '#69C9D0' },
  { id: 'twitter', label: 'Twitter/X', color: '#1DA1F2' },
  { id: 'facebook', label: 'Facebook', color: '#1877F2' },
  { id: 'snapchat', label: 'Snapchat', color: '#FFFC00' },
];

export function getCategory(score) {
  if (score <= 30) return 'Healthy';
  if (score <= 60) return 'Moderate';
  if (score <= 90) return 'High Impact';
  return 'Addicted';
}

export function getCategoryColor(category) {
  const map = {
    Healthy: '#22c55e',
    Moderate: '#eab308',
    'High Impact': '#f97316',
    Addicted: '#ef4444',
  };
  return map[category] || '#6366f1';
}

export function getAdvice(category) {
  const advice = {
    Healthy: {
      title: '🌿 You\'re in a healthy place!',
      tips: [
        'Keep maintaining your balanced digital lifestyle.',
        'Continue setting boundaries with technology.',
        'Your mindful usage is great for mental health.',
        'Inspire others by sharing your healthy habits.',
      ],
    },
    Moderate: {
      title: '⚠️ Moderate Usage Detected',
      tips: [
        'Try reducing daily screen time by 30 minutes.',
        'Set app usage limits using your phone\'s settings.',
        'Replace one social media session with outdoor activity.',
        'Practice checking notifications only twice a day.',
      ],
    },
    'High Impact': {
      title: '🔴 High Impact on Your Life',
      tips: [
        'Seriously consider a weekly digital detox day.',
        'Remove social media apps from your home screen.',
        'Turn off all non-essential notifications.',
        'Seek offline hobbies to replace screen time.',
        'Talk to someone about FOMO and social comparison.',
      ],
    },
    Addicted: {
      title: '🚨 Digital Addiction Detected',
      tips: [
        'Consider a complete digital detox for 1–2 weeks.',
        'Seek professional help or counseling if needed.',
        'Delete most used apps for a trial period.',
        'Tell friends and family about your goals.',
        'Replace phone habits with journaling or exercise.',
        'Use a basic phone or app blockers temporarily.',
      ],
    },
  };
  return advice[category];
}

// --------------------------------------------------------------


