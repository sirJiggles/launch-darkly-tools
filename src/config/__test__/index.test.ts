import { validateConfiguration } from '..';
import { ErrorMessage } from '../../types';

describe('UNIT | configuration', () => {
  beforeEach(() => {
    process.env = {};
  });

  it('should require the API key', () => {
    process.env.LAUNCH_DARKLY_TOOLS_PROJECT = 'someProject';
    process.env.LAUNCH_DARKLY_TOOLS_ENV = 'someEnv';
    process.env.LAUNCH_DARKLY_TOOLS_SOURCE_FILES_FOLDER = 'some/path';
    process.env.LAUNCH_DARKLY_TOOLS_SOURCE_FILES_PATTERN = '.js';
    expect(() => validateConfiguration()).toThrowError(
      ErrorMessage.noLaunchDarklyAPIKey,
    );
  });
  it('should require the project', () => {
    process.env.LAUNCH_DARKLY_TOOLS_API_KEY = 'someApiKey';
    process.env.LAUNCH_DARKLY_TOOLS_ENV = 'someEnv';
    process.env.LAUNCH_DARKLY_TOOLS_SOURCE_FILES_FOLDER = 'some/path';
    process.env.LAUNCH_DARKLY_TOOLS_SOURCE_FILES_PATTERN = '.js';
    expect(() => validateConfiguration()).toThrowError(
      ErrorMessage.noLaunchDarklyProject,
    );
  });
  it('should require the env key', () => {
    process.env.LAUNCH_DARKLY_TOOLS_PROJECT = 'someProject';
    process.env.LAUNCH_DARKLY_TOOLS_API_KEY = 'someApiKey';
    process.env.LAUNCH_DARKLY_TOOLS_SOURCE_FILES_FOLDER = 'some/path';
    process.env.LAUNCH_DARKLY_TOOLS_SOURCE_FILES_PATTERN = '.js';
    expect(() => validateConfiguration()).toThrowError(
      ErrorMessage.noEnvironment,
    );
  });
  it('should require the source files folder', () => {
    process.env.LAUNCH_DARKLY_TOOLS_PROJECT = 'someProject';
    process.env.LAUNCH_DARKLY_TOOLS_ENV = 'someEnv';
    process.env.LAUNCH_DARKLY_TOOLS_API_KEY = 'someApiKey';
    process.env.LAUNCH_DARKLY_TOOLS_SOURCE_FILES_PATTERN = '.js';
    expect(() => validateConfiguration()).toThrowError(
      ErrorMessage.noSourceFilesFolder,
    );
  });
  it('should require the source files pattern', () => {
    process.env.LAUNCH_DARKLY_TOOLS_PROJECT = 'someProject';
    process.env.LAUNCH_DARKLY_TOOLS_ENV = 'someEnv';
    process.env.LAUNCH_DARKLY_TOOLS_API_KEY = 'someApiKey';
    process.env.LAUNCH_DARKLY_TOOLS_SOURCE_FILES_FOLDER = 'some/path';
    expect(() => validateConfiguration()).toThrowError(
      ErrorMessage.noSourceFilesPattern,
    );
  });

  it('should not error with a valid config', () => {
    process.env.LAUNCH_DARKLY_TOOLS_PROJECT = 'someProject';
    process.env.LAUNCH_DARKLY_TOOLS_ENV = 'someEnv';
    process.env.LAUNCH_DARKLY_TOOLS_API_KEY = 'someApiKey';
    process.env.LAUNCH_DARKLY_TOOLS_SOURCE_FILES_FOLDER = 'some/path';
    process.env.LAUNCH_DARKLY_TOOLS_SOURCE_FILES_PATTERN = '.js';
    expect(() => validateConfiguration()).not.toThrow();
  });
});
