TiddlySpace Bar
===============

A toolbar for [TiddlySpace](http://tiddlyspace.com).
Designed to replace the backstage area and provide a more consistent environment across the whole of TiddlySpace.

Hosting the Bar
===============

There is an example application used to host the bar that makes use of [tsapp](https://github.com/cdent/tsapp).
You will need to [install](https://github.com/cdent/tsapp#install) tsapp then run: `tsapp auth` to authenticate.

Run `make update serve` to run the app.

This copies JavaScript files from src into the tsbarapp/assets folder then runs a local server to host them.
There is a version-controlled index.html file, main.js and style.css to kick-start a basic page.

This server interacts with tiddlyspace.com so you can use it with real data.

Testing
=======

For first time use run `make qunit phantomjs test`
All other test runs can be peformed via `make test`

To run tests in a browser run `make qunit` then open test/index.html.