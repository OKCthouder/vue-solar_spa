<template>
<div id="nav">
<router-link id="logo" :class="'season-'+season.id" to="/"></router-link>
<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <line x1="20%" x2="80%" y1="35%" y2="35%" stroke="white" stroke-width="2" fill-opacity="0" stroke-opacity="0.2"/>
    <g v-for="(item,n) in season.solar" class="enter" :data-id="item.id" @click="clickHandler" :class="{active:item.active}">
      <circle class="dot" :cx="20+12*n+'%'" cy="35%" r="12" fill="#c9c7a1"/>
      <text :x="20+12*n+'%'" y="70%" fill="white" text-anchor="middle">{{item.name}}</text>
    </g>
</svg>
<div id="progress-wrapper">
<div id="progress" :style="{width:progressWidth}" :data-id="season.id"></div>
</div>
</div>
</template>

<script>
export default {
  name: 'index',
  props: ['season'],
  data () {
    return {
    }
  },
  computed:{
    progressWidth(){
      return (parseInt(this.$route.params.id)+1)/24*100+'%';
    }
  },
  methods: {
    clickHandler (e) {
      this.$router.push('/solar/' + e.currentTarget.getAttribute('data-id'))
    }
  },
  watch: {
    'season' (to, from) {
      var $ = require('jquery')
      $('#logo').hide().fadeIn('normal')
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@keyframes logo-rotate{
  form{
    transform:rotate(0deg);
  }
  to{
    transform:rotate(360deg);
  }
}
#progress-wrapper{
  background-color: white;
  position:fixed;
  top:100px;
  height:3px;
  width:100%;
}
#progress{
  position:fixed;
  top:100px;
  height:3px;
  width:100px;
  background-color: #5CCC50;
  transition:width 0.3s ease;
}
#progress[data-id="1"]{
  background-color: #D1567F;
}
#progress[data-id="2"]{
  background-color: #D1BF56;
}
#progress[data-id="3"]{
  background-color: #569FD1;
}
#logo{
  position:absolute;
  top:19px;
  left:8%;
  width:63px;
  height:63px;
  background-image:url('../assets/images/sprite.png');
  background-position:0 -96px;
  animation:logo-rotate 10s linear infinite;
}
#logo.season-1{
  background-position-y:-159px;
}
#logo.season-2{
  background-position-y:-222px;
}
#logo.season-3{
  background-position-y:-285px;
}
#logo:hover{
  background-position-x:-63px;
}
#nav{
  height:100px;
  position:fixed;
  width:100%;
  font-size: 15px;
}
#nav tspan{
  font-size: 12px;
}
.enter{
  opacity: 0.3;
}
.enter.active,.enter:hover{
    opacity: 1;
}
</style>
