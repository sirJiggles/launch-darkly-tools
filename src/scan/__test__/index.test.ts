import * as mockFS from 'mock-fs';
import * as path from 'path';

import { scanForLaunchedFlagsInCode } from '../';

describe('UNIT | scan', () => {
  beforeAll(() => {
    // here are some sample files that a consumer could have
    mockFS({
      // Recursively loads all node_modules
      // to keep the tests working :D
      node_modules: mockFS.load(
        path.resolve(__dirname, '../../../node_modules'),
      ),
      'withCodeInstance/': {
        'fileOne.js': 'const {launchedFlagOne} = useFlags()',
        'fileTwo.js': 'const {launchedFlagTwo, launchedFlagOne} = useFlags()',
        'fileThree.js': 'const {notSomethingLaunchedOne} = useFlags()',
      },
      'withNoCodeInstance/': {
        'fileOne.js': 'const {notSomethingLaunchedOne} = useFlags()',
        'fileTwo.js': 'const {notSomethingLaunchedTwo} = useFlags()',
        'fileThree.js': 'const {notSomethingLaunchedThree} = useFlags()',
      },
    });
  });

  afterAll(() => {
    mockFS.restore();
  });

  it('should find instances of flags in code files', async () => {
    process.env.LAUNCH_DARKLY_SOURCE_FILES_FOLDER = './withCodeInstance';
    process.env.LAUNCH_DARKLY_SOURCE_FILES_PATTERN = '.js';

    const results = await scanForLaunchedFlagsInCode({
      items: [
        // these are in the code base
        { key: 'launchedFlagOne' },
        { key: 'launchedFlagTwo' },
        // these are not in the code
        { key: 'launchedFlagThree' },
        { key: 'launchedFlagFour' },
      ],
    });

    expect(results).toEqual([
      {
        matches: ['launchedFlagTwo', 'launchedFlagOne'],
        count: 2,
        line: ['const {launchedFlagTwo, launchedFlagOne'],
        file: 'withCodeInstance/fileTwo.js',
      },
      {
        matches: ['launchedFlagOne'],
        count: 1,
        line: ['const {launchedFlagOne'],
        file: 'withCodeInstance/fileOne.js',
      },
    ]);
  });

  it('should not flag instances when there are none in the code base', async () => {
    process.env.LAUNCH_DARKLY_SOURCE_FILES_FOLDER = './withNoCodeInstance';
    process.env.LAUNCH_DARKLY_SOURCE_FILES_PATTERN = '.js';

    const results = await scanForLaunchedFlagsInCode({
      items: [
        { key: 'launchedFlagOne' },
        { key: 'launchedFlagTwo' },
        { key: 'launchedFlagThree' },
      ],
    });
    expect(results).toEqual(undefined);
  });
});
