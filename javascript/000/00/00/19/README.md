# Angular Tailwind CSS Schematics

![npm](https://img.shields.io/npm/v/ngx-tailwindcss-schematic)

A simple standalone angular schematics to add [tailwindcss](https://tailwindcss.com/) to your angular cli project.

## Installation

- [Angular CLI](https://angular.io/cli) workspace

  ```javascript
  ng add ngx-tailwindcss-schematic
  ```

- [Nx](https://nx.dev/angular) workspace

  ```javascript
  nx add ngx-tailwindcss-schematic
  ```

  - In Nx, you can also use `ng add`

## Schematic additional options

You can pass additional options while installing this schematic.

- For e.g., Installing a specific version of `tailwindcss`

  ```javascript
  ng add ngx-tailwindcss-schematic --tw 1.8.7
  ```

| Options            | Alias | Default                           | Type   | Required | Description                                         |
| ------------------ | ----- | --------------------------------- | ------ | -------- | --------------------------------------------------- |
| project            | --p   | `defaultProject` in the workspace | string | No       | The name of the project where we want to add files. |
| tailwindcssVersion | --tw  | latest                            | string | No       | Specific Tailwind CSS version to be installed.      |

---

Different **CSS** types(preprocessors) support:

- On installing, you will prompted to select one of the following CSS types. Select (use Enter key) one depending on your project's default selection.

  ```sh
  ? Which stylesheet type would you like to use? (Use arrow keys)
  ❯ CSS
    SCSS   [ https://sass-lang.com/documentation/syntax#scss]
    Sass   [ https://sass-lang.com/documentation/syntax#the-indented-syntax]
    Less   [ http://lesscss.org]
  ```

## Tailwind CSS dependencies used

```javascript

tailwindcss
postcss-import
postcss-loader
@angular-builders/custom-webpack
postcss-scss (only needed if selected style type is scss)

```

By default, `latest` versions are installed for all the required dependencies. You will notice the word `latest` in your `package.json` file.

As mentioned before you can provide the custom version for `tailwindcss` using the additional `--tw` flag.

## Expected Output

```javascript
  ng add ngx-tailwindcss-schematic --tw 1.8.7
```

```javascript
? Which stylesheet type would you like to use? SCSS   [ https://sass-lang.com/documentation/syntax#scss]
    ➡️ Added tailwindcss@1.8.7 to devDependencies
    ➡️ Added postcss-import@latest to devDependencies
    ➡️ Added postcss-loader@latest to devDependencies
    ➡️ Added @angular-builders/custom-webpack@latest to devDependencies
    ➡️ Added postcss-scss@latest to devDependencies
CREATE tailwind.config.js (228 bytes)
CREATE webpack.config.js (673 bytes)
UPDATE package.json (1425 bytes)
UPDATE src/styles.scss (176 bytes)
UPDATE angular.json (3790 bytes)
✔ Packages installed successfully.
```

## Building and Running schematic locally

To test locally, install `@angular-devkit/schematics-cli` globally and use the `schematics` command line tool. That tool acts the same as the `generate` command of the Angular CLI, but also has a debug mode.

```javascript
npm i -g @angular-devkit/schematics-cli
```

### Building schematic

```javascript
npm run build
// OR run in watch mode
npm run build:watch
```

### Running/Testing Schematic

There are couple of ways to test the schematic in an Angular Cli workspace.

1. Navigate to an angular workspace or create one.
2. Run `schematics <path_to_collection.json>:ng-add` command. By default this runs in **dry run mode** (debug=true).

```javascript
// Example from `sample-app` application.
// dry-run mode
schematics ../src/collection.json:ng-add
// normal mode
schematics ../src/collection.json:ng-add --debug false
```

You can also test using the `ng add` or `nx add` (in Nx workspace) command while developing this locally. This is good test **before** actually publishing your schematic to npm.

1. Build the schematic: `npm run build`
2. Run `npm pack`. This will produce a `ngx-tailwindcss-schematic-1.0.0-tgz` file of your schematic. Copy this file to any Angular workspace where you want to test the schematic.
3. Run `npm i --no-save ngx-tailwindcss-schematic-1.0.0-tgz`
4. Run `ng add ngx-tailwindcss-schematic`

## Unit Testing (Todo)

`npm run test` will run the unit tests, using Jasmine as a runner and test framework.

## Learning

Detailed blog on my learning coming soon!

## Credits

This schematic project has been a learning process for me to learn and dive into [Angular Schematics](https://angular.io/guide/schematics) and also to publish my first schematic to `npm`. This would not have been possible without some very useful resources/blogs etc. Here are couple that I refered a lot:

1. [Tomas Trajan Medium Blog](https://medium.com/@tomastrajan/total-guide-to-custom-angular-schematics-5c50cf90cdb4) - Helped to understand concepts, examples, etc.
2. [ngneat tailwind schematic](https://github.com/ngneat/tailwind) - Helped with few code examples and ideas to structure this schematic.
