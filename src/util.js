export default{
  install(Vue,options){
    Vue.prototype.$ = require('jquery');
  }
}
export function getMousewheelDirection(e){
  var left = true
  var delta = e.wheelDelta
  if (!delta) {
    delta = e.detail
    if (delta > 0) {
      left = false
    }
  } else {
    if (delta < 0) {
      left = false
    }
  }
  return !left;
}
