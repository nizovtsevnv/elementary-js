HelloView = {
  require: [ 'app/assets/hello/hello.html' ],

  template: {},

  link: {
    'body': 'app/assets/hello/hello.html',
    '#name': 'name'
  }
}
