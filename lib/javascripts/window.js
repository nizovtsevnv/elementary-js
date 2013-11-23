/* Remember about a power of clean JS methods:
 * - addEventListener, removeEventListener
 */

// Add event listener and remove when it happen
addEventOnce = function(event, fn, capture){
  this.addEventListener(event, function(e){
    this.removeEventListener(event, arguments.callee)
    fn(e)
  }, capture)
}
