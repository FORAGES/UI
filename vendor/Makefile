
JQUERY_VERSION=2.1.4
REACT_VERSION=0.13.3
POUCHDB_VERSION=4.0.3
POUCHDB_AUTH_VERSION=0.4.2
LEAFLET_VERSION=0.7.5
GEOHASH_VERSION=1.0.1

all:    fonts jquery react pouchdb leaflet geohash
.PHONY: fonts jquery react pouchdb leaflet geohash

fonts: LiberationSerif-Regular.ttf

LiberationSerif-Regular.ttf:
	cp /usr/share/fonts/liberation/LiberationSerif-Regular.ttf $@ # TODO: be more robust than this.

jquery: jquery-${JQUERY_VERSION}.js

jquery-${JQUERY_VERSION}.js:
	wget -O $@ http://code.jquery.com/jquery-${JQUERY_VERSION}.js

react: react-${REACT_VERSION}.js

react-${REACT_VERSION}.js:
	wget -O $@ https://fb.me/react-${REACT_VERSION}.js

pouchdb: pouchdb-${POUCHDB_VERSION}.js pouchdb-authentication-${POUCHDB_AUTH_VERSION}.js

pouchdb-${POUCHDB_VERSION}.js:
	wget -O $@ https://github.com/pouchdb/pouchdb/releases/download/${POUCHDB_VERSION}/pouchdb-${POUCHDB_VERSION}.js

pouchdb-authentication-${POUCHDB_AUTH_VERSION}.js:
	wget -O $@ https://raw.githubusercontent.com/nolanlawson/pouchdb-authentication/v${POUCHDB_AUTH_VERSION}/dist/pouchdb.authentication.js

leaflet: leaflet-${LEAFLET_VERSION}.js leaflet-${LEAFLET_VERSION}.css

leaflet-${LEAFLET_VERSION}.js:
	wget -O $@ http://cdn.leafletjs.com/leaflet-${LEAFLET_VERSION}/leaflet.js

leaflet-${LEAFLET_VERSION}.css:
	wget -O $@ http://cdn.leafletjs.com/leaflet-${LEAFLET_VERSION}/leaflet.css

geohash: geohash-${GEOHASH_VERSION}.js

geohash-${GEOHASH_VERSION}.js:
	wget -O $@ https://raw.githubusercontent.com/chrisveness/latlon-geohash/v${GEOHASH_VERSION}/latlon-geohash.js
