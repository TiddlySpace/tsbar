[![Build Status](https://travis-ci.org/TiddlySpace/tsbar.png)](https://travis-ci.org/TiddlySpace/tsbar)

# TiddlySpace Bar

A toolbar for [TiddlySpace](http://tiddlyspace.com).
Designed to replace the backstage area and provide a more consistent environment across the whole of TiddlySpace.

# Change Log

* v0.1.0: First release - simply a stub that can be loaded into pages amongst TiddlySpace.

# Contributing

## Requirements

* [node](http://nodejs.org/)
* [grunt](http://gruntjs.com/)
* [tsapp](http://tsapp.tiddlyspace.com/) - optional, for testing out the tsbar in a local TiddlySpace environment.

## First Time Setup

Install the project dependencies then run the grunt default task.

```
npm install
grunt
```

This task:

* Cleans the `dist` directory.
* Lints the JS files.
* Concatonates and minifies the JS code for distribution.
* Copies the contents of the `dist` folder into the `assets` folder to run in a TiddlySpace app.

### Releasing

Bump the version in `package.json` and run `grunt`.
Add an entry to the Change Log section above.
Commit the changes in the dist folder with a suitable commit message.

## Example Inclusion

To view how the bar is included in a page, run the following commands:

```
grunt
tsapp serve
```

Open `http://localhost:8080/index.html` in your browser.