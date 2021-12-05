import { FoundLaunchedFlags, LDResponse } from '../types';
import * as findInFiles from 'find-in-files';

export const scanForLaunchedFlagsInCode = async (launchedFlags: LDResponse) => {
  const {
    LAUNCH_DARKLY_TOOLS_SOURCE_FILES_FOLDER,
    LAUNCH_DARKLY_TOOLS_SOURCE_FILES_PATTERN,
  } = process.env;

  // make an or regex to get all flags in one pass
  const allLaunchedFlags = launchedFlags.items
    .map((flag) => flag.key)
    .join('|');

  const foundFlags: FoundLaunchedFlags = await findInFiles.find(
    { term: allLaunchedFlags, flags: 'igm' },
    LAUNCH_DARKLY_TOOLS_SOURCE_FILES_FOLDER,
    LAUNCH_DARKLY_TOOLS_SOURCE_FILES_PATTERN,
  );

  // the format provided by the plugin is mental, make something
  // we can work with
  const keys = Object.keys(foundFlags);
  const values = Object.values(foundFlags);

  // if no results make the return reflect that
  if (!keys.length) {
    return undefined;
  }

  // else return the better formatted results
  return keys.map((file, index) => ({
    ...values[index],
    file,
  }));
};
