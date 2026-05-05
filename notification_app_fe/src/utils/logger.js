const LOG_API_URL = 'http://20.207.122.201/evaluation-service/logs';

const Log = async (stack, level, pkg, message) => {
  try {
    const token = typeof process !== 'undefined' ? (process.env.NEXT_PUBLIC_API_TOKEN || process.env.API_TOKEN) : null;
    if (!token) return;

    // Use a fire-and-forget fetch to avoid console errors or blocking
    fetch(LOG_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message
      }),
      mode: 'no-cors' // Use no-cors to avoid preflight issues in browser if not supported by server
    }).catch(() => {});

  } catch (error) {
    // Silent fail
  }
};

module.exports = { Log };