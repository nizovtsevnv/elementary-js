addEventListener('load',function(event){
  // Application routes
  Router.routes  = {
    hello: {path: 'hello/:name', controller: HelloController, action: 'hello', constraints:{name: '[^\/]*'}},
    page_not_found: {path: 'errors/404', controller: ErrorsController, action: 'page_not_found'},
    root: {path: ':name', controller: HelloController, action: 'hello', constraints:{name: '[^\/]*'}}
  }

  Router.exception = function(route){
    Router.run('page_not_found')
  }
  
  // Start the application  
  addEventListener('hashchange', Router.run)
  Router.run()
})
