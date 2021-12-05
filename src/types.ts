export enum ErrorMessage {
  noLaunchDarklyAPIKey = 'No launch darkly API key provided',
  noLaunchDarklyProject = 'No launch darkly project provided',
  noEnvironment = 'No environment for launch darkly provided',
  noSourceFilesFolder = 'No source files folder passed this is the directory of the code',
  noSourceFilesPattern = 'No source files pattern passed this is the pattern of files to match for example .js',
}

export type LDResponse = {
  // there are a bunch of other things but we don't really care about them right now
  // to be honest
  items: Array<{ key: string }>;
};

export type FoundLaunchedFlags = {
  [filename: string]: {
    matches: Array<string>;
    count: number;
    lines: Array<string>;
  };
};
