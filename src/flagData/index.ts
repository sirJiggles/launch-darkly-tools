import fetch from 'node-fetch';
import { LDResponse } from '../types';

// This function will return all the flags that are launched in your account
export const getLaunchedFlags = async () => {
  const resp = await fetch(
    `https://app.launchdarkly.com/api/v2/flags/${process.env.LAUNCH_DARKLY_PROJECT}?filter=filterEnv:${process.env.LAUNCH_DARKLY_ENV},status:launched`,
    {
      method: 'GET',
      headers: {
        Authorization: process.env.LAUNCH_DARKLY_API_KEY,
      },
    },
  );

  const result = await resp.json();

  // code is only given when there is an error
  if (result.code) {
    // just throw any error that ld gives us
    throw new Error(JSON.stringify(result));
  }

  return result as LDResponse;
};
