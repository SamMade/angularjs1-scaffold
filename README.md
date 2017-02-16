# AngularJS Application
This is an AngularJS application that uses bower dependencies, less stylesheet compilation, grunt tasks for building and testing, and produces js documentation. The application is structured into page templates, isolated components, and isolated services.

## Requirements

 * Node & NPM
 * grunt-cli
 * fontconfig (used by PhantomJS)

## Installation
1. Install Node Packages
~~~~
npm install
~~~~
2. Install Grunt Command Line
    
We're installing it globally you may have to be sudo. If you do not want to install this globally, you just have to make sure you are referencing the right bin path when executing.
~~~~
npm install -g grunt-cli
~~~~

3. Install Bower Globally (optional)
~~~~
npm install -g bower
~~~~
We install this locally but if you don't want to deal setting the right PATH to the local bin file, you can set this globally. 

4. Install Bower Dependencies
~~~~
bower install
~~~~


## Build

### Production build
~~~~
grunt build
~~~~
This is the default build and contains everything such as less compiling, concat, minification, etc.

### Development build
~~~~
grunt build:dev
~~~~
Doesn't do anything to dependency files for easier debugging.  NOTE: production builds should definitely be tested in case the asset efficiency processes cause issues.

### Less Compilation
~~~~
grunt css
~~~~
Compiles the css rules that are currently using LESS

### Testing
~~~~
grunt test
~~~~
Sets off tasks to perform JS linting and Jasmine Unit Testing using Karma and PhantomJS.

### Documentation
~~~~
grunt docs
~~~~
Creates js docs of the application currently deployed to /docs.

## Structure

Root Folders are organized by:

* app - holds template and javascript files that are required to construct the application
* assets - css, images, fonts, and any external js libraries.
* bower_components - this is the default location that bower installs it's dependencies, this does not appear in production
* configs - configuration files used for translations, content, or settings
* data - used for housing misc data that the application can parse.

The application itself is organized by:

* App - routes, pages templates, controllers, and services that comprise of the specific applications needs
* Component - directives, templates, and controllers associated with single isolated components that can be placed anywhere
* Content - Services to populate the content and translations for pages
* Session - Services that provide the creation, management, and removal of temporary storage both as local objects or site cookies
* Util - utility services and helper functions
* WebRequest - Services that deal with connections to outside APIs or asynchronous calls.
