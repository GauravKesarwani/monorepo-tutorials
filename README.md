
## The goal of this project is to create a sample repo similar to design systems cli

# monorepo - repo contains more than one logical project.
## https://www.toptal.com/front-end/guide-to-monorepos

Avoid code dupes and separate concerns.

monorepo packages share a common build system.

# What are the advantages of monorepo

1. One place to store all the configs and tests. configure ci/cd and bundler once.
2. pull request in single repo instead of multiple repos.
3. simplified package publishing. rich selection of tools 
including lerna, yarn workspaces, bazel.
4. easier dependency  management. - done
5. reuse code with shared package. use local symlinks.

# Disadvantages.
1. no way to restrict only to some part of the app
2. poor git performance on large scale projects.
3. higher build time.


# Note: Root of the package.json can also hold hoisted packages which speeds up bootstraping

# Q. how to handle two versions of dependency(say moment.js) in different packages as bundle size is a constraint.

// solution is to use peer dependencies.

# monorepo has no benefits of doing unit testing but it does have benefit of doing integration testing.

# Package node_modules/.bin executable creates a symlink to the root node_modules/.bin executable

## Lerna

## tool that optimizes the workflow around managing multi package repositories with git and npm.

** lerna makes versioning and publishing packages to an npm org easier.
** provides utility commands for handling the execution of tasks across multiple repositories.

## Lerna Commands

** lerna init 
** npx lerna bootstrap. - install dependencies for each package. node_modules. you don't have to do individually for each package.
** lerna add dependency-name - adds a common dependency to all packages.
** lerna add installs the dependency in each folder in project.
** lerna run to run the scripts in the package json file.
** lerna add moment --scope="package-name" to limit the scope to a package.
** lerna - internal dependencies -  package can depend on other packages.
** "lerna run lint --stream --parallel",


note: --parallel flag will execute the command in parallel. build command cannot be run with parallel flag because of dependencies.

# Developing a component library

** Excluding react from the component bundles as React will be provided by the hosting 
web application. This is achieved through peer dependency.


# yarn workspaces.

## workspaces comes with built in monorepo capabalities. you do not need lerna for this approach. 
## workspaces property in package.json tell where to find projects.

## yarn workspaces creates only one node_modules folder. all dependencies are hoisted to the root folder. This behavior is possible with lerna using the --hoist flag.

** manages our dependencies. intelligently optimizes the installation of dependencies together and allows for cross linking of dependencies in a monorepo.

** provides tools like lerna in order to manage multipackage repositories.

$ yarn workspace awesome-package add react --dev
Up next is an example to remove a dependency from a particular package:

$ yarn workspace web-project remove some-package --save

# Note: adding local packages should be done by specifying a version number otherwise yarn tries to find the dependency in the registry.
## yarn leverages symlinks to point to different local packages.

## Learnings for design systems

Scaffolding a new cli repo.
** Repository is configured with yarn & lerna
** yarn init similar to npm init. C

## setting private true in root package json prevents the root project from being published to npm

## each individual package in packages directory should follow npm org scope name @monorepo-tutorials

## lerna add @my-scope-name/design-system-button --scope=@my-scope-name/my-design-system-form



# common dev dependencies can be in workspace root package.json. This can be dependencies
# like Jest, husky, storybook, eslint, prettier.

# yarn add husky --dev -W 
# adding the W flag makes it explicit that we are adding the dependency to workspace root.


# to execute a command in all packages use lerna exec. Eg : to remove a dependency in all packages run => lerna exec -- yarn remove dependency-name

# To run npm scripts use lerna run command.
# lerna run test --stream. The stream flag just provides the output from the child processes.

# Todo: publish a package to npm. There are two ways in which package is published to npm. manual or automatic through CI.

# CI configuration: lerna publish --conventional-commits --yes

# Conventional commits standard
## To enforce conventional commits standard , commitlint can be added to the root of the project.

# yarn add @commitlint/cli @commitlint/config-conventional husky cross-env --dev


## how is the release process in project
## To release a package you can have release script in package.json.

## Cli does not have husky as dependency. 

## renovate

## Links referred

# Monorepos by example: https://codeburst.io/monorepos-by-example-part-1-3a883b49047e

# Lerna and yarn workspaces: https://medium.com/@jsilvax/a-workflow-guide-for-lerna-with-yarn-workspaces-60f97481149d

## https://doppelmutzi.github.io/monorepo-lerna-yarn-workspaces/

## https://medium.com/@maoberlehner/monorepos-in-the-wild-33c6eb246cb9

## https://medium.com/ah-technology/a-guide-through-the-wild-wild-west-of-setting-up-a-mono-repo-with-typescript-lerna-and-yarn-ed6a1e5467a

# https://www.toptal.com/front-end/guide-to-monorepos

# https://github.com/korfuri/awesome-monorepo

# https://www.atlassian.com/git/tutorials/monorepos

## Why use lerna with yarn workspaces ?

* You solely use yarn workspaces for the Mono-Repo workflow.
* You use lerna’s utility commands to optimize managing of multiple packages, e.g., selective execution of npm scripts for testing.
* You use lerna for publishing packages since lerna provides sophisticated features with its version and publish commands.


* lerna calls yarn/npm install for each package inside the project and then create symlinks between the packages that 
* refer to each other.

* lerna calls yarn install multiple times for each package. lot of code duplication for each node_modules.
* lerna manually creates links between packages that refer to each other.

* yarn workspaces is a feature that allows users to install dependencies from multiple package.json files in subfolders of 
* a single root package.json file. yarn workspaces enables faster, lighter installation by preventing package duplication. yarn 
* can also create symlinks between workspaces.

** yarn helps with packaging and dependency management.

** yarn add link:/path/to/local/folder

** yarn add file:/path/to/local/folder

** npm scope:  A scope allows you to create a package with same name as another package by another 
** user or organization.

** npm init <initializer> ( is same as `npx <@scope>/create`)
** initializer is an npm package named create-initializer which will be installed by npx 
** and then have its main bin executed. 
** npm init foo => executes npx create-foo
** npm init @design-systems executes npx @design-systems/create.
** npm init @design-systems/foo executes npx @design-systems/create-foo
** npm since v6.1 comes with npx

** npm init @design-systems is transformed to `npx @design-systems/create`.
** initializer is an npm package which will be installed by  npx and then have its main ** bin executed.


// 3 ways to create a react application using create react application
// use npm install create-react-app then use create-react-app to scaffold app

// if you have npm version 5 and above
// npx can temporarily install a dependency which is not globally present.

// npm init now supports a package initializer option.
// npm init react-app

// mdx-deck

// To test if create react app is installed globally.
// npm ls create-react-app --global 

// To check if create-react-app is installed in local node modules
// npm ls create-react-app

## Test Different node module versions with npx
// npm view, npm info, npm show
// npm v create-react-app version
// npm v create-react-app versions

//dist-tags

//npx create-react-app@next playground -to scaffold app with next version of create-react-app

## use another dependency package alongside eslint, -c is to execute a command.
// npx -p eslint@next -p eslint-config-google -c "eslint ./"

## npm repo command ?

## To run code from another branch(say interactive) on a repo. npx elijahmanor/elijahmanor#interactive

## npm run env | grep npm_

## npm i babel{-cli,-preset-env,-plugin-transform-object-rest-spread} -D use bash brace

## npm scripts have access to all the environment variables.

## npx -p node@8.2.1 -- node index.js
## use environment variables
## -c flag executes the command in npm script like environment.
## npx -c `babel index.js -d lib/$npm_package_version`





## packages/create is used to scaffold a new design system.





























