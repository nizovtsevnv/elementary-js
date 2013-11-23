Router = {
  exception: function(route){
    throw 'unknown route "' + route + '"'
  },
  
  routes: {},

  // Function for running controller action by url hash value
  // Add it to listen hashchange event
  run: function(route, params){
    var cfg,
        constraints = [],
        i,
        matches,
        path,
        variables = []

    if(typeof(params) != 'object'){
      params = {}
    }
    
    if(typeof(route) == 'string' && Router.routes[route]){
      path = Router.routes[route].path
      variables = path.match(/:\w+/ig)
      for(i in variables){
        path = path.replace(variables[i], params[variables[i].substring(1)] || '')
      }
      location.hash = path
      return true
    }else{
      for(route in Router.routes){
        cfg = Router.routes[route]
        path = '^' + cfg.path.replace('/', '\\/') + '$'
        variables = path.match(/:\w+/ig)
        for(i in variables){
          variables[i] = variables[i].substring(1)
          path = path.replace(
            /:\w+/i,
            (
              typeof(cfg.constraints) == 'object' && cfg.constraints[variables[i]] ?
              '(' + cfg.constraints[variables[i]] + ')' : '([0-9a-z\-_.]*)'
            )
          )
        }
        matches = location.hash.substring(1).match(new RegExp(path, 'i'))
        if(matches){
          matches.shift()
          for(i in variables){
            params[variables[i]] = matches[i]
          }
          cfg.controller[cfg.action](params)
          return true
        }
      }
    }
    Router.exception(location.hash.substring(1))
    return false
  }
}
