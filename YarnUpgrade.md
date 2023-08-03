# Upgrade a project from npm to yarn

TODO: react-scripts 5.0.0 issues: https://github.com/facebook/create-react-app/discussions/11278

## Install yarn
- Install yarn if you have not done so before: `npm install -g yarn`
- If you have node version 16, run `corepack enable`, otherwise run `npm i -g corepack`

## Upgrade project

Open a terminal at your projects root (where package.json is).

### Update existing packages

Before installing yarn into the project, some dependencies need to be updated / added.
1. Update `react-scripts` to version `5.0.0` (or whatever the latest version of 5 is).
2. Remove `node-sass`.
2. Add the following packages:
    - `"react-router": "5.1.0"`
    - `"@types/react-router": "5.1.0"`.
    - `"sass": "1.49.8",` (or whichever is the latest version).
3. Run `npm install`

### Migrate to yarn

1. Run `yarn set version berry`
2. Open the `.yarnrc.yml` file that was just created and add the following after the first line: 
    ```yml
    nodeLinker: node-modules
    enableGlobalCache: true
    packageExtensions:
        babel-preset-react-app@*:
            dependencies:
                "@babel/plugin-proposal-private-property-in-object": "*"
    ```
3. Run `yarn install`
4. Remove the `nodeLinker: node-modules` line from the `.yarnrc.yml` file.
5. Run `yarn install` again.
6. Run `yarn dlx @yarnpkg/sdks vscode`.
7. Use the workspace version of typescript. 
    - Open a `.ts` or `.tsx` file. 
    - Visual studio should ask if it can use the workspace version of typescript.
    - Click allow.
    - If you don't see a prompt, click the `{}` icon next to typescript in the bottom left corner of vs code, and select the workspace typescript version.
8. Run `yarn start` to start the project instead of `npm run start`.

### Update .gitignore

Add the following to your projects .gitignore file:

```
# Yarn
**/.pnp.*
**/.yarn/*
!**/.yarn/patches
!**/.yarn/plugins
!**/.yarn/releases
!**/.yarn/sdks
!**/.yarn/versions
```