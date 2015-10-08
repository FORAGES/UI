
JQUERY_VERSION=2.1.4
REACT_VERSION=0.13.3
IMMUTABLE_VERSION=3.7.5
POUCHDB_VERSION=4.0.3
POUCHDB_AUTH_VERSION=0.4.2
LEAFLET_VERSION=0.7.5
GEOHASH_VERSION=1.0.1

all:    fonts jquery react immutable pouchdb leaflet geohash
.PHONY: fonts jquery react immutable pouchdb leaflet geohash

fonts: LiberationSerif-Regular.ttf

LiberationSerif-Regular.ttf:
	cp /usr/share/fonts/liberation/LiberationSerif-Regular.ttf $@ # TODO: be more robust than this.

jquery: jquery.js

jquery.js:
	wget -O $@ http://code.jquery.com/jquery-${JQUERY_VERSION}.js

react: react.js

react.js:
	wget -O $@ https://fb.me/react-${REACT_VERSION}.js

immutable: immutable.js

immutable.js:
	wget -O $@ https://raw.githubusercontent.com/facebook/immutable-js/${IMMUTABLE_VERSION}/dist/immutable.js

pouchdb: pouchdb.js pouchdb-authentication.js

pouchdb.js:
	wget -O $@ https://github.com/pouchdb/pouchdb/releases/download/${POUCHDB_VERSION}/pouchdb-${POUCHDB_VERSION}.js

pouchdb-authentication.js:
	wget -O $@ https://raw.githubusercontent.com/nolanlawson/pouchdb-authentication/v${POUCHDB_AUTH_VERSION}/dist/pouchdb.authentication.js

leaflet: leaflet.js leaflet.css images

leaflet.zip:
	wget -O $@ http://cdn.leafletjs.com/downloads/leaflet-${LEAFLET_VERSION}.zip

leaflet.js: leaflet.zip
	unzip -o leaflet.zip $@

leaflet.css: leaflet.zip
	unzip -o leaflet.zip $@

images: leaflet.zip
	unzip -o leaflet.zip $@/*

geohash: geohash.js

geohash.js:
	wget -O $@ https://raw.githubusercontent.com/chrisveness/latlon-geohash/v${GEOHASH_VERSION}/latlon-geohash.js
