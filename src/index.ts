import { validateConfiguration } from './config';
import { getLaunchedFlags } from './flagData';
import { scanForLaunchedFlagsInCode } from './scan';
import * as chalk from 'chalk';

export const run = async () => {
  // make sure the config is valid
  validateConfiguration();

  const launchedFlags = await getLaunchedFlags();

  // now we gather a list of all the flag names that are listed if there are
  // any and check the code base supplied for any instances of them
  const instancesOfLaunchedFlags = await scanForLaunchedFlagsInCode(
    launchedFlags,
  );

  // Just leaving this here for simple testing
  // const instancesOfLaunchedFlags = [
  //   { file: 'some/file.js', matches: 'someflag, another flag', count: 1 },
  //   { file: 'another/file.js', matches: 'someflag, another flag', count: 5 },
  // ];

  if (instancesOfLaunchedFlags) {
    // lets make a nice looking error message
    console.error(
      chalk.red('🚨🚨🚨 instances of launched flags in the code base 🚨🚨🚨'),
      '\r',
    );

    instancesOfLaunchedFlags.forEach((flag) =>
      console.error(`
${chalk.magenta('File: ')}${chalk.cyan(flag.file)}
${chalk.magenta('Matches: ')}${chalk.cyan(flag.matches)}
${chalk.magenta('Count: ')}${chalk.cyan(flag.count)}`),
    );

    process.exit(1);
  }

  console.log(chalk.green('No launched feature flags detected 🎉'));
};
