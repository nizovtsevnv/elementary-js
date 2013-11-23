/* Remember about a power of clean JS methods:
 * - querySelector, querySelectorAll
 * - getElementsByClassName, getElementById, getElementsByName, getElementsByTagName
 * - createElement, appendChild, insertBefore
 * - addEventListener, removeEventListener
 */

// Patch for old browsers
if(!document.head){ document.head = document.querySelector('head') }

// Extension for document.createElement: Create DOM element with its attributes in one line
document.createElementTag = document.createElement
document.createElement = function(node, attributes){
  var i, element = document.createElementTag(node)
  for(i in attributes){
    element[i] = attributes[i]
  }
  return element
}

// Append CSS file with callback on load
document.loadCSS = function(src, fn){
  var element = document.createElement('link', {type: 'text/css', rel: 'stylesheet', href: src})
  if(fn){ element.addEventListener('load', fn); }
  document.head.appendChild(element);
}

// Append JS file with callback on load
document.loadJS = function(src, fn){
  var element = document.createElement('script', {type: 'text/javascript', src: src})
  if(fn){ element.addEventListener('load', fn); }
  document.head.appendChild(element);
}
