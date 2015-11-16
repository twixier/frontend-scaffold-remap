# frontend-scaffold-remap
In our frontend-scaffold we have task which merges our different paths with the current themepath (configuration.json).

The task has been moved to this module to provide a more dynamic way of handling the merge and errors.

# Path: Example
  "path": {
      "base": "./sites/all/themes/#THEME#/",
      "css": {
        "source": "stylesheet/source/style.scss",
        "target": "stylesheet/build",
        "watch": ["stylesheet/source/*.scss","stylesheet/source/**/*.scss"]
      },
      "js": {
        "source": ["scripts/source/vendor/*.js", "scripts/source/site/*.js"],
        "target": "scripts/build",
        "watch": ["scripts/source/**/*.js"]
      },
      "images": {
        "source": ["images/*.{gif,jpg,png}", "images/**/*.{gif,jpg,png}"],
        "target": "images/optimized"  
      }
  }
  
See: https://github.com/dwarfhq/frontend-scaffold
