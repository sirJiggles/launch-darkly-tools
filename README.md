# What

This package right now just does one thing:

Scan a given package for instances of "launched" flags from Launch darkly using their API.

Launch Darkly tells us if a feature flag is launched if the flag is either in production or not turned on for a prolonged period of time. And if all visitors are seeing the same version on/off for that time.

# How

To use this package, just install it as a dep using

`npm install @jigglytech/launch-darkly-tools`

And set up some env vars before you run it, wherever you run it:

`LAUNCH_DARKLY_TOOLS_API_KEY` This you need to create in the authorization section of launch darkly

`LAUNCH_DARKLY_TOOLS_PROJECT` This is the project containing your stages

`LAUNCH_DARKLY_TOOLS_ENV` This is the stage, for example production or next

`LAUNCH_DARKLY_TOOLS_SOURCE_FILES_FOLDER` This the folder we will use to check for instances of flags. This is relative to where you run this script

`LAUNCH_DARKLY_TOOLS_SOURCE_FILES_PATTERN` This is the file pattern you would like to check, for example `.js`. Refer to https://www.npmjs.com/package/find-in-files for docs on the `fileFilter` argument

The idea would be that you run this script either in something like a git action to stop code rot of feature flags.

# How does it look:

On Passing:

![passing](https://github.com/sirJiggles/launch-darkly-tools/blob/main/assets/passing.png?raw=true)

On Failing:

![passing](https://github.com/sirJiggles/launch-darkly-tools/blob/main/assets/failing.png?raw=true)
