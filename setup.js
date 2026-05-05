const fs = require('fs');

// ==========================================
// 🚨 FILL IN YOUR DETAILS HERE 🚨
// ==========================================
const YOUR_DETAILS = {
  email: "anmol4762.be23@chitkara.edu.in",
  name: "Anmol Bhutani",
  mobileNo: "7015480119",
  githubUsername: "Anmol-Bhutani",
  rollNo: "2310994762",
  accessCode: "EXfvDp"
};
// ==========================================

const BASE_URL = 'http://20.207.122.201/evaluation-service';

async function setup() {
  try {
    let clientId = "c9b11403-4569-4bbf-9595-859c434e9657";
    let clientSecret = "ZAAjkVbEkjWmGCRG";

    console.log('\n2️⃣ Fetching Bearer Token...');
    const authRes = await fetch(`${BASE_URL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: YOUR_DETAILS.email,
        name: YOUR_DETAILS.name,
        rollNo: YOUR_DETAILS.rollNo,
        accessCode: YOUR_DETAILS.accessCode,
        clientId,
        clientSecret
      })
    });

    if (!authRes.ok) {
        throw new Error(`Failed to get token: ${await authRes.text()}`);
    }

    const authData = await authRes.json();
    console.log('✅ Token Fetched Successfully!');
    
    // Save to an env file for the app to use
    const envContent = `NEXT_PUBLIC_API_TOKEN=${authData.access_token}\n`;
    fs.writeFileSync('./notification_app_fe/.env.local', envContent);
    fs.writeFileSync('./.env', `API_TOKEN=${authData.access_token}\n`);
    
    console.log('\n✅ Saved token to .env files!');
    console.log('You can now run the app!');
    
  } catch (err) {
    console.error('❌ Error during setup:', err.message);
  }
}

setup();
