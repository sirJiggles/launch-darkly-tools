export enum ErrorMessage {
  noLaunchDarklyAPIKey = 'No launch darkly API key provided',
  noLaunchDarklyProject = 'No launch darkly project provided',
  noEnvironment = 'No environment for launch darkly provided',
  noSourceFilesPath = 'No source files path passed this is the directory of the code',
}

export type LDResponse = {
  // there are a bunch of other things but we don't really care about them right now
  // to be honest
  items: Array<{ key: string }>;
};
