
.PHONY: test qunit phantomjs setup

qunit:
	mkdir -p test/lib
	curl -Lo test/lib/qunit.js \
		https://github.com/jquery/qunit/raw/master/qunit/qunit.js
	curl -Lo test/lib/qunit.css \
		https://github.com/jquery/qunit/raw/master/qunit/qunit.css
	curl -Lo test/lib/jquery.js \
		https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js
	curl -Lo test/lib/jquery.mockjax.js \
		https://raw.github.com/appendto/jquery-mockjax/master/jquery.mockjax.js
	curl -Lo test/lib/run-qunit.js \
		https://raw.github.com/ariya/phantomjs/1.6/examples/run-qunit.js

phantomjs:
	npm install -g phantomjs

test:
	phantomjs test/lib/run-qunit.js test/index.html

update:
	cp src/*.js tsbarapp/assets

serve:
	@cd tsbarapp && tsapp serve
