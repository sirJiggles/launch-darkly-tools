import { LDResponse } from '../types';

export const scanForLaunchedFlagsInCode = (launchedFlags: LDResponse) => {
  // using the env var get all the files and scan for the flags.
  // if we find some then add each instance to an array, remove the
  // duplicates and report the array
};
