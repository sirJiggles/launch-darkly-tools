import { validateConfiguration } from '..';
import { ErrorMessage } from '../../types';

describe('UNIT | configuration', () => {
  beforeEach(() => {
    process.env = {};
  });

  it('should require the API key', () => {
    process.env.LAUNCH_DARKLY_PROJECT = 'someProject';
    process.env.LAUNCH_DARKLY_ENV = 'someEnv';
    process.env.LAUNCH_DARKLY_SOURCE_FILES = './somePath/**/.js';
    expect(() => validateConfiguration()).toThrowError(
      ErrorMessage.noLaunchDarklyAPIKey,
    );
  });
  it('should require the project', () => {
    process.env.LAUNCH_DARKLY_API_KEY = 'someApiKey';
    process.env.LAUNCH_DARKLY_ENV = 'someEnv';
    process.env.LAUNCH_DARKLY_SOURCE_FILES = './somePath/**/.js';
    expect(() => validateConfiguration()).toThrowError(
      ErrorMessage.noLaunchDarklyProject,
    );
  });
  it('should require the env key', () => {
    process.env.LAUNCH_DARKLY_PROJECT = 'someProject';
    process.env.LAUNCH_DARKLY_API_KEY = 'someApiKey';
    process.env.LAUNCH_DARKLY_SOURCE_FILES = './somePath/**/.js';
    expect(() => validateConfiguration()).toThrowError(
      ErrorMessage.noEnvironment,
    );
  });
  it('should require the source files', () => {
    process.env.LAUNCH_DARKLY_PROJECT = 'someProject';
    process.env.LAUNCH_DARKLY_ENV = 'someEnv';
    process.env.LAUNCH_DARKLY_API_KEY = 'someApiKey';
    expect(() => validateConfiguration()).toThrowError(
      ErrorMessage.noSourceFilesPath,
    );
  });
  it('should not error with a valid config', () => {
    process.env.LAUNCH_DARKLY_PROJECT = 'someProject';
    process.env.LAUNCH_DARKLY_ENV = 'someEnv';
    process.env.LAUNCH_DARKLY_API_KEY = 'someApiKey';
    process.env.LAUNCH_DARKLY_SOURCE_FILES = './somePath/**/.js';
    expect(() => validateConfiguration()).not.toThrow();
  });
});
