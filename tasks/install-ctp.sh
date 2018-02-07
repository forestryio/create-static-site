#!/bin/bash
# Copyright (c) 2015-present, Facebook, Inc.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

# ******************************************************************************
# This installs the development version of the global CLI from source.
# It is useful for testing the end-to-end flow locally.
# ******************************************************************************

# Start in tasks/ even if run from root directory
cd "$(dirname "$0")"

function cleanup {
  echo 'Cleaning up.'
}

# Error messages are redirected to stderr
function handle_error {
  echo "$(basename $0): ERROR! An error was encountered executing line $1." 1>&2;
  cleanup
  echo 'Exiting with error.' 1>&2;
  exit 1
}

function handle_exit {
  cleanup
  echo 'Exiting without error.' 1>&2;
  exit
}

# Exit the script with a helpful error message when any error is encountered
trap 'set +x; handle_error $LINENO $BASH_COMMAND' ERR

# Cleanup before exit on any termination signal
trap 'set +x; handle_exit' SIGQUIT SIGTERM SIGINT SIGKILL SIGHUP

# Echo every command being executed
set -x

# Go to root
cd ..
root_path=$PWD

# ******************************************************************************
# Pack react-scripts so we can verify they work.
# ******************************************************************************

# Install all our packages
"$root_path"/node_modules/.bin/lerna bootstrap

cd packages/create-static-site

# Save package.json because we're going to touch it
cp package.json package.json.orig

# Replace own dependencies (those in the `packages` dir) with the local paths
# of those packages.
node "$root_path"/tasks/replace-own-deps.js

# Finally, pack react-scripts
ctp_path="$root_path"/packages/create-static-site/`npm pack`

# Restore package.json
rm package.json
mv package.json.orig package.json


# ******************************************************************************
# Now that we have packed them, call the global CLI.
# ******************************************************************************

# If Yarn is installed, clean its cache because it may have cached create-static-site
yarn cache clean || true

# Go back to the root directory and run the command from here
cd "$root_path"
npm install -g "$ctp_path"

# Cleanup
cleanup