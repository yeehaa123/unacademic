System.config({
  "paths": {
    "*": "*.js",
    "unacademic/*": "scripts/*.js",
    "github:*": "vendor/github/*.js",
    "npm:*": "vendor/npm/*.js"
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.3.12",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.13",
    "angular-ui-select": "github:angular-ui/ui-select@0.9.6",
    "lodash": "npm:lodash@2.4.1",
    "github:angular-ui/ui-router@0.2.13": {
      "angular": "github:angular/bower-angular@1.3.12"
    },
    "github:angular-ui/ui-select@0.9.6": {
      "angular": "github:angular/bower-angular@1.3.12",
      "css": "github:systemjs/plugin-css@0.1.0"
    },
    "github:jspm/nodelibs-process@0.1.0": {
      "process": "npm:process@0.10.0"
    },
    "npm:lodash@2.4.1": {
      "process": "github:jspm/nodelibs-process@0.1.0"
    }
  }
});

