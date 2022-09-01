# why-did-i-block
A simple site to keep notes about the reasons you blocked someone who absolutely doesn't deserve being committed to memory.

### Getting Started

This project provides a `firstrun.sh` script which can be used to get nearly everything ready. Some steps cannot be performed automatically - make sure to follow any prompts.
```sh
./scripts/firstrun.sh
```

Once you've successfully completed the firstrun, you'll need to ensure your current shell is using the right Node version.
```sh
nvm use
```

Finally, copy the `.env.example` file at the project root to `.env` and create a DB password and a secret token for encrypting session info.

You're now ready to develop! The database can be managed with
```sh
yarn db:init # initialize the db
yarn db:destroy # fully destroy the db
yarn db:stop # stop the currently running db container
yarn db:start # re-start a stopped db container
```

With the database up, you can get a dev server started (with auto-reload on changes) using
```sh
yarn dev
```

### Manual Getting Started

Alternatively, make sure you have installed
- [`nvm`](https://github.com/nvm-sh/nvm#git-install)
- the correct `node` version (run `nvm use`)
- [`docker`](https://docs.docker.com/engine/install/) (see [special instructions](https://docs.docker.com/desktop/windows/wsl/) for developing under WSL)
- [`yarn`](https://classic.yarnpkg.com/lang/en/docs/install/)