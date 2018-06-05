ESLINT=./node_modules/.bin/eslint
NODE= NODE_OPTIONS=--max_old_space_size=8000 node
SASSLINT=./node_modules/.bin/sass-lint -v
S3CMD=s3cmd sync -P --delete-removed --add-header=Cache-Control:no-cache,public,max-age=3600
TAP=./node_modules/.bin/tap
WATCH= NODE_OPTIONS=--max_old_space_size=8000 ./node_modules/.bin/watch
WEBPACK= NODE_OPTIONS=--max_old_space_size=8000 ./node_modules/.bin/webpack

# ------------------------------------

build:
	@make clean
	@make translations
	@make webpack

clean:
	rm -rf ./build
	rm -rf ./intl
	mkdir -p build
	mkdir -p intl

deploy:
	@make build
	@make sync

translations:
	./bin/get-localized-urls localized-urls.json
	./bin/build-locales node_modules/scratchr2_translations/www/translations intl

webpack:
	$(WEBPACK) --bail

sync-s3:
	$(S3CMD) --exclude '.DS_Store' --exclude '*.svg' --exclude '*.js' ./build/ s3://$(S3_BUCKET_NAME)/
	$(S3CMD) --exclude '*' --include '*.svg' --mime-type 'image/svg+xml' ./build/ s3://$(S3_BUCKET_NAME)/
	$(S3CMD) --exclude '*' --include '*.js' --mime-type 'application/javascript' ./build/ s3://$(S3_BUCKET_NAME)/

sync-fastly:
	$(NODE) ./bin/configure-fastly.js

sync:
	@make sync-s3
	@make sync-fastly

# ------------------------------------

start:
	$(NODE) ./dev-server/index.js

# ------------------------------------

test:
	@make lint
	@make build
	@make tap

lint:
	$(ESLINT) . --ext .js,.jsx,.json
	$(SASSLINT) ./src/*.scss
	$(SASSLINT) ./src/**/*.scss

unit:
	$(TAP) ./test/unit/*.js

functional:
	$(TAP) ./test/functional/*.js

integration:
	$(TAP) ./test/integration/*.js

smoke:
	$(TAP) ./test/integration/smoke-testing/*.js --timeout=3600
	
smoke-verbose:
	$(TAP) ./test/integration/smoke-testing/*.js --timeout=3600 -R spec

localization:
	$(TAP) ./test/localization/*.js

tap:
	$(TAP) ./test/{unit,functional,localization}/*.js

coverage:
	$(TAP) ./test/{unit,functional,localization}/*.js --coverage --coverage-report=lcov

# ------------------------------------

.PHONY: build clean deploy translations webpack start test lint unit functional integration localization tap coverage
