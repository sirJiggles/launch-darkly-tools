import * as mockFS from 'mock-fs';
import { scanForLaunchedFlagsInCode } from '../';

describe('UNIT | scan', () => {
  beforeAll(() => {
    // here are some sample files that a consumer could have
    mockFS({
      'withCodeInstance/': {
        'fileOne.js': 'const {launchedFlagOne} = useFlags()',
        'fileTwo.js': 'const {launchedFlagTwo} = useFlags()',
        'fileThree.js': 'const {notLaunchedFlagOne} = useFlags()',
      },
      'withNoCodeInstance/': {
        'fileOne.js': 'const {notLaunchedFlagThree} = useFlags()',
        'fileTwo.js': 'const {notLaunchedFlagTwo} = useFlags()',
        'fileThree.js': 'const {notLaunchedFlagOne} = useFlags()',
      },
    });
  });

  afterAll(() => {
    mockFS.restore();
  });

  it('should find instances of flags in code files', () => {
    process.env.LAUNCH_DARKLY_SOURCE_FILES = './withCodeInstance/**/.js';

    expect(
      scanForLaunchedFlagsInCode({
        items: [
          { key: 'launchedFlagOne' },
          { key: 'launchedFlagTwo' },
          { key: 'launchedFlagThree' },
        ],
      }),
    ).toEqual(['launchedFlagOne', 'launchedFlagTwo']);
  });

  it('should not flag instances when there are none in the code base', () => {
    process.env.LAUNCH_DARKLY_SOURCE_FILES = './withNoCodeInstance/**/.js';

    expect(
      scanForLaunchedFlagsInCode({
        items: [
          { key: 'launchedFlagOne' },
          { key: 'launchedFlagTwo' },
          { key: 'launchedFlagThree' },
        ],
      }),
    ).toEqual(undefined);
  });
});
