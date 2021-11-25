import { validateConfiguration } from './config';
import { getLaunchedFlags } from './flagData';
import { scanForLaunchedFlagsInCode } from './scan';

export const run = async () => {
  // make sure the config is valid
  validateConfiguration();

  const launchedFlags = await getLaunchedFlags();

  // now we gather a list of all the flag names that are listed if there are
  // any and check the code base supplied for any instances of them
  const instancesOfLaunchedFlags = scanForLaunchedFlagsInCode(launchedFlags);

  if (instancesOfLaunchedFlags) {
    throw new Error(
      `there are launched flags in your code base: \r ${instancesOfLaunchedFlags.join(
        '\r',
      )}`,
    );
  }
};
