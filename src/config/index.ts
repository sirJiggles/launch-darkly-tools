import * as dotenv from 'dotenv';
import { ErrorMessage } from '../types';

// load the env vars using dot env
dotenv.config();

export const validateConfiguration = () => {
  if (!process.env.LAUNCH_DARKLY_TOOLS_API_KEY) {
    throw new Error(ErrorMessage.noLaunchDarklyAPIKey);
  }
  if (!process.env.LAUNCH_DARKLY_TOOLS_PROJECT) {
    throw new Error(ErrorMessage.noLaunchDarklyProject);
  }
  if (!process.env.LAUNCH_DARKLY_TOOLS_ENV) {
    throw new Error(ErrorMessage.noEnvironment);
  }
  if (!process.env.LAUNCH_DARKLY_TOOLS_SOURCE_FILES_FOLDER) {
    throw new Error(ErrorMessage.noSourceFilesFolder);
  }
  if (!process.env.LAUNCH_DARKLY_TOOLS_SOURCE_FILES_PATTERN) {
    throw new Error(ErrorMessage.noSourceFilesPattern);
  }
};
