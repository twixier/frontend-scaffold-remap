"use strict";

var util = require('gulp-util'), 
    log = require('frontend-scaffold-log'),
    pluginError = util.PluginError,
    path = {},
    plugin_name = "frontend-scaffold-remap",
		stringPatternAppendix = "!";

function error (message) {
  throw new util.PluginError(plugin_name, message);
}

function patterncheck (pattern) {	
	if(pattern.indexOf('!') > -1) {
		return true;	
	}
	return false;	
}

function remap (options) {
  if(typeof options !== "object") {
    error('cfg.options is not an object. Please fix and try again!');
  }

  if(Object.keys(options).length) {
    // Check if basepath has been defined, it not - there is no reason for path correction
    if(typeof options.basepath === "undefined") {
      log({
        title: "Pathfinder",
        message: 'Basepath was not set in cfg.path. Paths written in config.json will not be modified.'
      });
      return options;
    }

    // Iterate through paths
    for(var dir in options) {
      if(typeof options[dir] == "object") { // Confirm we're working with an object
        // Map each path into our local path object
        path[dir] = options[dir];
        // Iterate through each property 
        for(var property in path[dir]) {
					// Check for custom marker
          switch(typeof path[dir][property]) {
            case "string": // Join cfg.path.base with current property
							var boolPattern = patterncheck(path[dir][property]); 

              path[dir][property] = (boolPattern ? stringPatternAppendix : "") +  options.basepath + (boolPattern ? path[dir][property].substring(1) : path[dir][property]);
            break;
            case "object": // Join cfg.path.base with current property
              for(var i = 0; i < path[dir][property].length; i++) {
								var boolPattern = patterncheck(path[dir][property][i]);
                path[dir][property][i] = (boolPattern ? stringPatternAppendix : "") + options.basepath + (boolPattern ? path[dir][property][i].substring(1) : path[dir][property][i]);
              }
            break;
            default: // Emit warning since we dont support this type of property (number, int etc)
              throw new pluginError(plugin_name, path[dir][property] + ': Type not supported - (' + (typeof path[dir][property]) +')');
            break;
          }
        }
      }
    }
    
    log({
      title: "Pathfinder",
      message: 'Your paths have been merged successfully'
    });    
    return path;
   } else if (Object.keys(options).length === 0) {
      error('Your configuration object was empty. Please fix cfg.path and try again!');
   } else {
      error('This is awkward! Something went wrong, and we dont know what...');
   }
}

module.exports = remap;
