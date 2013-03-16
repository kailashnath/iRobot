REPORTER ?= list
JSLINT = @./node_modules/.bin/jslint -nomen
MOCHA = @./node_modules/.bin/mocha --reporter $(REPORTER) --ui bdd


lint:
	$(JSLINT) ./*.js
	$(JSLINT) ./robots/*.js

test-robots:
	$(JSLINT) ./robots/*.js
	$(MOCHA) \
		./test/robots/*.js
	@echo $@

test-grid:
	$(JSLINT) ./robots/grid.js
	$(MOCHA) \
		./test/robots/test_grid.js
	@echo $@

test: test-robots test-grid
