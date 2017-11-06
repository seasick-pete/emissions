# Front-end Web Development Overview

## Summary

This short introduction will hopefully serve as a useful document when discussing technical aspects of visualisation web development.

## Web Development (2017)

* Modern web development now has some really smart ways of deploying apps
* In the past there was a somewhat arduous process of javascript module at runtime. If there was a failure the webpage might behave unexpectedly
* Thankfully, there are now package managers which **bundle** all project code plus dependencies into a single file that can just be copied to the webserver
* These package managers allow you to maintain a well organised code, testing functionality, style management and linting
* Webpack.js is probably the most common, however Rollup.js is gaining popularity




### Web Coding Standards

* Browsers (chrome, mozilla, etc) use javascript to execute code from the webpage
* However, not all browsers support the latest javascript standards (es2017) so newer functionality and methods takes time to filter into normal practice because of browser compatibility issues
* Thankfully, javascript developers have created libraries that can transpile code based on the latest standards and understood by browsers
* This process occurs behind the scenes during the bundling stage so you don't really need to spend too much time worrying about this (unless something goes wrong)
* Babel.js is a common transpiling library
* Understanding this concept is important because over the last few years javascript syntax has changed significantly and a **major** update occured in es2017 where variable scope and declaration were significantly altered
* Developing code on older conventions probably is okay for typical sites, but for data visualisation a lot of benefit comes using the latest conventions
* Other developer languages exist that can be transpiled to javascript, such as;
    * Typescript - this is becoming very popular in web development and probably is the next thing
    * Coffeescript - a python style language. It has lost a lot of interest over the last few years due to the lack of support. Not sure if it is a dead language just yet, but it does not look good

### Data Visualisation Libraries

#### D3
* Of the visualisation libraries, a really popular one is D3.js
* D3 allows a webpage to load data from a server in the form of csv and json as well as other formats
* Once data is loaded it has several useful data manipulation functions to help you restructure and aggregate the data directly in the browser
* This data then 'drives' the visual elements like bar charts - but that is an oversimplification as this data can be linked to any graphical element
* D3 also contains 'transitions' which allows these elements to move and change using interpolators
* D3 also allows event handlers to enable user interaction
* Although D3 provides a lot of functionality a lot still needs to be coded and it is a difficult library to become familiar with
* Major upgrades occured between v3 and v4 which means that many tutorials, examples and learning resources are now obsolete
* Most examples on the web are pretty basic and don't really help developing a visual in a wider website
* The best resource currently found that covers the latest es2017 standards is the book **D3.js 4.x Data Visualisation** which covers most of the concepts discussed in this short overview

#### D3 Working Example

A working example has been provided to demonstrate how a project could be managed and the built files are being deployed here; https://seasick-pete.github.io/emissions/

Its a very basic example but hopefully demonstrates how the basic mechanisms of d3 work and how these can be expanded to include more sophisticated visuals as time goes by. The proposed directory structure is only for reference to demonstrate how the example has been put together.

If this method is considered to be a good approach to take, then this structure can act as the base foundation of any development.

```shell
├── data
│   ├── input        - any aggregated datasets (csv, tsv, json)
│   ├── output       - fully prepared data for use in visuals  (csv, tsv, json)
│   └── process      - data processing scripts if necessary
├── docs             - transpiled deployment files with data dependencies
│   ├── bundle.js
│   ├── data
│   │   └── output_csv_route_specific_dummy.csv
│   └── index.html
├── lib               - javascript development files 
│   ├── common        - common functions can reside here
│   │   └── index.js
│   ├── index.ejs     - a very basic index.html page template
│   ├── main.js       - the entry script for the web site code
│   └── pisces        - the project specific code goes here
│       ├── bubbleChart.js   - separated visualisation objects
│       └── index.js
├── node_modules       - dependency files used during development and build process
├── package.json       - npm project package config file
├── readme.md
├── styles             - any scss/css styling files if used
│   └── index.css
├── webpack.common.js  - webpack config files
├── webpack.dev.js
└── webpack.prod.js
```