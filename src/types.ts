export enum ErrorMessage {
  noLaunchDarklyAPIKey = 'No launch darkly API key provided',
  noLaunchDarklyProject = 'No launch darkly project provided',
  noEnvironment = 'No environment for launch darkly provided',
  noScanPathProvided = 'No scan path provided, this is the directory of the code',
}

type LDItem = {
  _links: Array<unknown>;
  _maintainer: Array<unknown>;
  _version: number;
  archived: boolean;
  clientSideAvailability: Array<unknown>;
  creationDate: number;
  customProperties: unknown;
  defaults: Array<unknown>;
  description: string;
  environments: Array<unknown>;
  experiments: Array<unknown>;
  goalIds: Array<number>;
  includeInSnippet: boolean;
  key: string;
  kind: string;
  maintainerId: string;
  name: string;
  tags: Array<string>;
  temporary: boolean;
  variationJsonSchema: null;
  variations: Array<Array<unknown>>;
};

export type LDResponse = {
  _links: {
    self: {
      href: string;
      type: string;
    };
  };
  items: Array<LDItem>;
  totalCount: number;
};
