
.PHONY: test qunit phantomjs setup

OS := $(shell uname)
ARCH := $(shell uname -m)
PHANTOMJS_MAC := phantomjs-1.6.1-macosx-static.zip
PHANTOMJS_LINUX_32 := phantomjs-1.6.1-linux-i686-dynamic.tar.bz2
PHANTOMJS_LINUX_64 := phantomjs-1.6.1-linux-x86_64-dynamic.tar.bz2
ifeq ($(OS), Linux)
	ifeq ($(ARCH), x86_64)
		PHANTOMJS_DL := $(PHANTOMJS_LINUX_64)
	else
		PHANTOMJS_DL := $(PHANTOMJS_LINUX_32)
	endif
endif
ifeq ($(OS), Darwin)
	PHANTOMJS_DL := $(PHANTOMJS_MAC)
endif

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
	wget http://phantomjs.googlecode.com/files/$(PHANTOMJS_DL) \
	-O phantomjs.tar.bz2
	tar xjf phantomjs.tar.bz2
	mv phantomjs-* phantomjs

test:
	@cd phantomjs/bin && \
    	./phantomjs ../../test/lib/run-qunit.js ../../test/index.html

update:
	cp src/*.js tsbarapp/assets

serve:
	@cd tsbarapp && tsapp serve