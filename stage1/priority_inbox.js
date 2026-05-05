const fs = require('fs');
const path = require('path');

const NOTIFICATION_API = 'http://20.244.56.144/evaluation-service/notifications';

// Priority weights mapping
const WEIGHTS = {
  "Placement": 3,
  "Result": 2,
  "Event": 1
};

// Calculate recency score: 1 / (1 + minutes ago)
function calculateRecency(timestampStr) {
  const timestamp = new Date(timestampStr).getTime();
  const now = new Date().getTime();
  const diffMinutes = Math.max(0, (now - timestamp) / (1000 * 60));
  return 1 / (1 + diffMinutes);
}

// Main logic to fetch and sort notifications
async function getTopPriorityNotifications(topN = 10) {
  try {
    // Read token from .env
    const envPath = path.join(__dirname, '../.env');
    let token = '';
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const match = envContent.match(/API_TOKEN=(.*)/);
      if (match) token = match[1].trim();
    }

    if (!token) {
      console.error('❌ No API_TOKEN found. Run setup.js first to register.');
      return;
    }

    console.log('Fetching notifications from API...');
    const res = await fetch(NOTIFICATION_API, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error(`API failed: ${res.status} ${await res.text()}`);
    }

    const data = await res.json();
    const notifications = data.notifications || [];

    // Calculate priority
    const scoredNotifications = notifications.map(notif => {
      const weight = WEIGHTS[notif.Type] || 0;
      const recency = calculateRecency(notif.Timestamp);
      const priorityScore = weight * recency;
      
      return {
        ...notif,
        score: priorityScore,
        weight,
        recency
      };
    });

    // Sort by priority score descending
    scoredNotifications.sort((a, b) => b.score - a.score);

    // Get top N
    const topNotifications = scoredNotifications.slice(0, topN);

    console.log(`\n🏆 Top ${topN} Priority Notifications:`);
    console.table(topNotifications.map(n => ({
      ID: n.ID.slice(0, 8) + '...',
      Type: n.Type,
      Message: n.Message,
      Score: n.score.toFixed(4)
    })));

    return topNotifications;

  } catch (err) {
    console.error('Error:', err.message);
  }
}

// Run the script
getTopPriorityNotifications(10);
