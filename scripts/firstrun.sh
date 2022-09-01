#!/bin/sh

# Check that NVM is installed. Abort and prompt if not.
if ! [ -d "${HOME}/.nvm/.git" ]; then
  echo >&2 "nvm is required for this project, please install from"
  echo >&2 "https://github.com/nvm-sh/nvm#git-install"
  echo >&2 "then run this firstrun script again"
  exit 1
fi

# NVM is installed, make sure the correct Node version is installed
echo "Ensuring the proper Node version is set"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install

# NPM might be out of date. We don't use it in the project, but it's necessary for installing yarn
if [ $(npm view npm version) != $(npm --version) ]; then
  echo "Updating NPM to latest"
  npm i -g npm@latest
fi

# Check that docker is installed. If not, install with homebrew, or abort and prompt, depending on circumstances.
if ! command -v docker >/dev/null 2>&1; then
  if ! [ -z "$WSL_DISTRO_NAME" ]; then
    echo >&2 "docker is required for this project, but must be installed"
    echo >&2 "in the Windows host OS. Please visit this URL for instructions"
    echo >&2 "https://docs.docker.com/desktop/windows/wsl/"
    echo >&2 "then run this firstrun script again once docker is installed"
    exit 2
  fi

  if ! command -v brew >/dev/null 2>&1; then
    echo >&2 "docker is required for this project, but this script can only"
    echo >&2 "auto-install it using homebrew, which was not found."
    echo >&2 "This script will not attempt to auto-install homebrew."
    echo >&2 ""
    echo >&2 "Please either install docker following instructions at"
    echo >&2 "https://docs.docker.com/engine/install/"
    echo >&2 ""
    echo >&2 "Or install homebrew following instructions at"
    echo >&2 "https://brew.sh/"
    echo >&2 ""
    echo >&2 "then run this firstrun script again once docker or homebrew is installed"
    exit 3
  fi

  echo "Installing docker..."
  brew install docker
fi

# Install the _good_ package manager. Yes, this is highly opinionated.
if ! command -v yarn >/dev/null 2>&1; then
  echo "Installing yarn..."
  npm i -g yarn
fi

echo "Installing project dependencies with yarn..."
yarn

echo "Preparing database for the first time..."
yarn db:init
yarn db:destroy

echo "All set! Make sure to run `nvm use` so that your interactive terminal session uses the correct Node version"