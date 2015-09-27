
JQUERY_VERSION=2.1.4
REACT_VERSION=0.13.3
LEAFLET_VERSION=0.7.5

all:    jquery react leaflet
.PHONY: jquery react leaflet

jquery: jquery-${JQUERY_VERSION}.min.js

jquery-${JQUERY_VERSION}.min.js:
	wget -O $@ http://code.jquery.com/jquery-${JQUERY_VERSION}.min.js

react: react-${REACT_VERSION}.js

react-${REACT_VERSION}.js:
	wget -O $@ https://fb.me/react-${REACT_VERSION}.js

leaflet: leaflet-${LEAFLET_VERSION}.js leaflet-${LEAFLET_VERSION}.css

leaflet-${LEAFLET_VERSION}.js:
	wget -O $@ http://cdn.leafletjs.com/leaflet-${LEAFLET_VERSION}/leaflet.js

leaflet-${LEAFLET_VERSION}.css:
	wget -O $@ http://cdn.leafletjs.com/leaflet-${LEAFLET_VERSION}/leaflet.css
