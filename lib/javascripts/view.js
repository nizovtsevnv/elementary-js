View = {
  cache: {},

  render: function(view, params){
    var link = function(){
      var i, j, elements, value
      for(i in view.link){
        value = undefined
        if(view.template[view.link[i]]){ value = view.template[view.link[i]] }
        else if(View.cache[view.link[i]]){ value = View.cache[view.link[i]] }
        else if(params[view.link[i]]){ value = params[view.link[i]] }
        if(value != undefined){
          elements = document.querySelectorAll(i)
          for(j = 0; j < elements.length; j++){
            elements[j].innerHTML = value
          }
        }
      }
    }

    var load = function(){
      var i, list = remain()
      for(i = 0; i < list.length; i++){
        Xhr(list[i]).url(list[i]).fn(save).send()
      }
      return list
    }
    
    var remain = function(){
      var list = []
      for(var i = 0; i < view.require.length; i++){
        if(!View.cache[view.require[i]]){
          list.push(view.require[i])
        }
      }
      return list
    }
    
    var save = function(xhr, name){
      View.cache[name] = xhr.responseText
      if(remain().length == 0){
        link()
      }
    }
    
    if(!view.require){
      view.require = []
    }
    
    if(!view.template){
      view.template = {}
    }

    if(load().length == 0){
      link()
    }
  }
}
