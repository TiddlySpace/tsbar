[![Build Status](https://travis-ci.org/pads/tsbar.png)](https://travis-ci.org/pads/tsbar)

TiddlySpace Bar
===============

A toolbar for [TiddlySpace](http://tiddlyspace.com).
Designed to replace the backstage area and provide a more consistent environment across the whole of TiddlySpace.

Development Setup
=================

For developing the TiddlySpace Bar you will need:

* [node](nodejs.org)
* [grunt](http://gruntjs.com/)
* phantomjs  - `npm install -g phantomjs`

Run `npm install` for first time use as well, this will fetch the required node modules that will help development.

Hosting the Bar
===============

There is an example application used to host the bar that makes use of [tsapp](https://github.com/cdent/tsapp).
You will need to [install](https://github.com/cdent/tsapp#install) tsapp then run: `tsapp auth` to authenticate.

Run `tsapp serve` to run the app.

To keep it up-to-date run `grunt concat update-tsapp`.  This combines all the source files into one file and copies it
to the assets folder in the tsapp (tsbarapp folder).
There is a version-controlled index.html file, main.js and style.css to kick-start a basic page.

This server interacts with tiddlyspace.com so you can use it with real data.

Testing
=======

Just run `grunt jasmine`

To run tests in a browser run `grunt jasmine-server`.