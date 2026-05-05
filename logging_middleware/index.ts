export type LogStack = 'frontend' | 'backend';
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
export type LogPackage = 'api' | 'component' | 'hook' | 'page' | 'state' | 'style' | 'auth' | 'config' | 'middleware' | 'utils';

const LOG_API_URL = 'http://20.207.122.201/evaluation-service/logs';

export const Log = async (
  stack: LogStack,
  level: LogLevel,
  pkg: LogPackage,
  message: string
) => {
  try {
    const token = process.env.NEXT_PUBLIC_API_TOKEN || process.env.API_TOKEN;
    if (!token) {
      console.warn('[Logger] No API token found. Log not sent:', message);
      return;
    }

    const res = await fetch(LOG_API_URL, {
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
      })
    });

    if (!res.ok) {
      console.warn(`[Logger] Failed to send log: ${res.status} ${await res.text()}`);
    }
  } catch (error) {
    console.error('[Logger] Error sending log:', error);
  }
};
