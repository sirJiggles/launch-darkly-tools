import * as dotenv from 'dotenv';
import { ErrorMessage } from '../types';

// load the env vars using dot env
dotenv.config();

export const validateConfiguration = () => {
  if (!process.env.LAUNCH_DARKLY_API_KEY) {
    throw new Error(ErrorMessage.noLaunchDarklyAPIKey);
  }
  if (!process.env.LAUNCH_DARKLY_PROJECT) {
    throw new Error(ErrorMessage.noLaunchDarklyProject);
  }
  if (!process.env.LAUNCH_DARKLY_ENV) {
    throw new Error(ErrorMessage.noEnvironment);
  }
  if (!process.env.SCAN_PATH) {
    throw new Error(ErrorMessage.noScanPathProvided);
  }
};
