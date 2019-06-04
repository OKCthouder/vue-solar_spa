<template>
<div id="modal">
  <div id="modal-layer" @click="withdraw"></div>
  <router-link class="pointer left" :to="String(parseInt($route.params.detail_id)-1)" v-show="parseInt($route.params.detail_id) > 0">
    <img :src="pointer_l_url" />
  </router-link>
  <router-link class="pointer right" :to="String(parseInt($route.params.detail_id)+1)" v-show="parseInt($route.params.detail_id) < 3">
    <img :src="pointer_r_url" />
  </router-link>
  <transition-group name="fade">
    <div v-for="(item,n) in detail" v-show="n == $route.params.detail_id" :key="n" class="modal-detail" :style="{backgroundImage:'url('+url[n]+')'}">
      <p :class="{poem:n==2}">{{item}}</p>
    </div>
  </transition-group>
  <ul id="bottom-nav">
    <li v-for="(item,n) in nav">
      <router-link :class="{active:n == $route.params.detail_id}" :to="n.toString()">{{item}}</router-link>
    </li>
  </ul>
</div>
</template>

<script>
import {getMousewheelDirection} from '@/util.js'
export default {
  props: ['detail', 'url'],
  data() {
    return {
      pointer_l_url: require('../assets/images/pointer_l.png'),
      pointer_r_url: require('../assets/images/pointer_r.png'),
      nav: ['养生', '气候', '诗词', '农事']
    }
  },
  methods: {
    withdraw() {
      this.$router.push('../')
    },
    wheelHandler(e){
      var left = getMousewheelDirection(e);
      var current = parseInt(this.$route.params.detail_id)
      if (left && current !== 0) {
        this.$router.push(String(current - 1))
      } else if (!left && current !== 3) {
        this.$router.push(String(current + 1))
      }
    }
  },
  created() {
    window.aaa = 3;
    window.addEventListener('mousewheel',this.wheelHandler);
    window.addEventListener('DOMMouseScroll',this.wheelHandler);
  },
  beforeDestroy(){
    window.removeEventListener('mousewheel',this.wheelHandler);
    window.removeEventListener('DOMMouseScroll',this.wheelHandler);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#modal {
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 0;
}
#modal-layer {
  width: 100%;
  height: 100%;
  background-color: grey;
  opacity: 0.7;
}
.modal-detail {
  position: absolute;
  left: 20%;
  right: 20%;
  top: 3%;
  bottom:20%;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 10000;
}
.modal-detail p {
  box-sizing: border-box;
  text-align: justify;
  white-space: pre-wrap;
  line-height: 1.5;
  width: 250px;
  max-width: 100%;
  font-size: 18px;
  margin: 0 auto;
  text-shadow: 1px 2px 3px grey;
  background: rgba(0, 0, 0, 0.4);
  padding: 15px;
  color: whitesmoke;
}

.modal-detail p.poem {
  text-align: center;
}

.pointer {
  position: absolute;
  width: 100px;
  max-width: 15%;
  top: 35%;
  opacity: 0.7;
  transition: opacity 0.5s ease;
}
.pointer img{
  width: 100%;
}
.pointer:hover {
  opacity: 1;
}

.pointer.left {
  left: 5%;
}

.pointer.right {
  right: 5%;
}

#bottom-nav {
  position: absolute;
  left: 20%;
  right: 20%;
  bottom: 10%;
  text-align: center;
  font-size: 20px
}

#bottom-nav li {
  display: inline;
  margin-right: 20px;
}

#bottom-nav li:last-child {
  margin-right: 0;
}

#bottom-nav li a {
  position: relative;
  color: grey;
  transition: all 0.5s ease;
}

#bottom-nav li a:hover {
  color: black;
}

#bottom-nav li a.active {
  color: black;
}

#bottom-nav li a.active:after {
  content: '·';
  font-size: 30px;
  width: 30px;
  height: 30px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -15px;
  animation: fade-in 1s;
}

@keyframes fade-in {
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
}
</style>
