"use strict";

var util = require('gulp-util'),
    pluginError = util.PluginError,
    path = {};

const PLUGIN_NAME = "frontend-scaffold-remap";

function remap (options) {
  if(typeof options !== "object") {
    throw new pluginError(PLUGIN_NAME, 'Error');
  }

  if(Object.keys(options).length) {
    // Check if basepath has been defined, it not - there is no reason for path correction
    if(typeof options.basepath === "undefined") return options;

    // Iterate through paths
    for(var dir in options) {
      if(typeof options[dir] == "object") { // Confirm we're working with an object
        // Map each path into our local path object
        path[dir] = options[dir];
        // Iterate through each property 
        for(var property in path[dir]) {
          switch(typeof path[dir][property]) {
            case "string": // Join cfg.path.base with current property
              path[dir][property] = options.basepath + path[dir][property];
            break;
            case "object": // Join cfg.path.base with current property
              for(var i = 0; i < path[dir][property].length; i++) {
                path[dir][property][i] = options.basepath + path[dir][property][i];
              }
            break;
            default: // Emit warning since we dont support this type of property (number, int etc)
              throw new pluginError(PLUGIN_NAME, path[dir][property] + ': Type not supported');
            break;
          }
        }
      }
    }
    
    return path;
   
   } else {
    throw new pluginError(PLUGIN_NAME, 'Warning: Options was not defined!');
   }
}

module.exports = remap;
