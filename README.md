[![Build Status](https://travis-ci.org/TiddlySpace/tsbar.png)](https://travis-ci.org/TiddlySpace/tsbar)

TiddlySpace Bar
===============

A toolbar for [TiddlySpace](http://tiddlyspace.com).
Designed to replace the backstage area and provide a more consistent environment across the whole of TiddlySpace.

Development Setup
=================

For developing the TiddlySpace Bar you will need:

* [node](nodejs.org)
* [grunt](http://gruntjs.com/) - `npm install -g grunt-cli`
* phantomjs  - `npm install -g phantomjs`

Run `npm install` for first time use as well, this will fetch the required node modules that will help development.

Run `grunt` by itself to run all the required tasks to build and deploy the bar.

Hosting the Bar
===============

There is an example application used to host the bar that makes use of [tsapp](https://github.com/cdent/tsapp).
You will need to [install](https://github.com/cdent/tsapp#install) tsapp then run: `tsapp auth` to authenticate.

Run `tsapp serve` to run the app.

To keep it up-to-date run `grunt handlebars concat update-tsapp`.
This compiles handlebars templates in JS files to be included.
Then it combines all the source files into one file and copies it to the assets folder in the tsapp (tsbarapp folder).

There is a version-controlled index.html file, main.js and style.css to kick-start a basic page.

This server interacts with tiddlyspace.com so you can use it with real data or place tiddlers in the assets folder.

Testing
=======

Just run `grunt test` and watch the results in the terminal.

To run tests on-the-fly run:

    grunt tdd-mode

This watches source and test files for changes and runs all the tests
on a local server each time files are saved.  To run the tests in your own browser (keeping the tdd-mode task running),
open:

    http://localhost:8000/_SpecRunner.html