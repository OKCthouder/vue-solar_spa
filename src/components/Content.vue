<template>
<div id="content">
  <div id="content-in">
    <nav id="thumb-wrapper">
      <router-link v-for="(item,n) in thumb_url" :to="'/solar/'+$route.params.id+'/detail/'+n"><img :src="item" /></router-link>
    </nav>
    <section id="intro">
      <hgroup>
        <h2>{{solar.pinyin}}</h2><br>
        <h1>{{solar.name}}</h1><br>
        <h3>{{solar.time}}</h3>
      </hgroup>
      <section id="three">
        <h1>三候</h1>
        <p>
          <span class="three-item" v-for="item in solar.three">
      <i :data-id="seasonId" :style="{backgroundImage: 'url(' + threeImg + ')'}"></i>
      <span class="three-text">{{item}}</span>
          </span>
        </p>
      </section>
      <article>{{solar.intro}}</article>
    </section>
  </div>
  <transition name="fade">
    <router-view :detail="solar.detail" :url="url"></router-view>
  </transition>
</div>
</template>

<script>
export default {
  props: ['solar', 'seasonId'],
  data() {
    return {
      threeImg: require('../assets/images/sprite.png'),
      thumb_url: [],
      url: [],
    }
  },
  methods: {
    init(id) { //  更新图片
      for (var i = 0; i < 4; i++) {
        this.thumb_url[i] = require(`../assets/images/detail/${id}/thumb_${i}.png`);
        this.url[i] = require(`../assets/images/detail/${id}/${i}.jpg`)
      }
    }
  },
  created() {
    this.init(this.$route.params.id)
    this.$('#content>div').fadeIn('normal')
  },
  watch: {
    '$route' (to, from) {
      if (from.params.id !== to.params.id) {
        this.$('#content>div').hide().fadeIn('normal')
        this.init(to.params.id)
      }
    }
  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#content {
  position: fixed;
  background-color: white;
  top: 103px;
  bottom: 0px;
  left: 0px;
  right: 0px;
}

#content-in {
  width: 100%;
  height: 100%;
}

#thumb-wrapper {
  margin: 0 5%;
  float: left;
  width: 30%;
  height: 100%;
  position: relative;
}

#thumb-wrapper a {
  position: absolute;
}

#thumb-wrapper a:nth-child(1) {
  width: 56%;
  top: 50%;
  left: 50%;
  margin-top: -50%;
  margin-left: -28%;
}

#thumb-wrapper a:nth-child(2) {
  width: 48%;
  top: 50%;
  left: 0;
  margin-top: -28%;
}

#thumb-wrapper a:nth-child(3) {
  bottom: 50%;
  left: 50%;
  width: 56%;
  margin-left: -28%;
  margin-bottom: -50%;
}

#thumb-wrapper a:nth-child(4) {
  width: 48%;
  top: 50%;
  right: 0;
  margin-top: -28%;
}

#thumb-wrapper img {
  width: 100%;
}

#intro {
  float: left;
  width: 40%;
  padding: 0 5%;
  padding-top: 5%;
}

#intro hgroup {
  text-align: center;
}

#intro hgroup h1,
h2,
h3 {
  display: inline;
  line-height: 35px;
  font-weight: normal;
}

#intro hgroup h1 {
  font-size: 30px;
}

#intro>hgroup h2 {
  font-size: 10px;
}

#intro>hgroup h3 {
  font-size: 10px;
}

article {
  line-height: 2;
}

#three {
  text-align: center;
  margin-bottom: 20px;
}

#three h1 {
  text-align: left;
  margin-bottom: 10px;
  font-size: 12px;
  color: grey;
  font-weight: normal;
}

.three-item {
  margin-right: 40px;
}

#three i {
  display: inline-block;
  margin-right: 5px;
  vertical-align: -20%;
  width: 24px;
  height: 24px;
}

#three .three-item:nth-child(2) i {
  background-position: -25px 0;
}

#three .three-item:nth-child(3) i {
  background-position: -49px 0;
}

#three i[data-id="1"] {
  background-position: 0 -24px;
}

#three .three-item:nth-child(2) i[data-id="1"] {
  background-position: -25px -24px;
}

#three .three-item:nth-child(3) i[data-id="1"] {
  background-position: -49px -24px;
}

#three i[data-id="2"] {
  background-position: 0 -48px;
}

#three .three-item:nth-child(2) i[data-id="2"] {
  background-position: -25px -48px;
}

#three .three-item:nth-child(3) i[data-id="2"] {
  background-position: -49px -48px;
}

#three i[data-id="3"] {
  background-position: 0 -72px;
}

#three .three-item:nth-child(2) i[data-id="3"] {
  background-position: -25px -72px;
}

#three .three-item:nth-child(3) i[data-id="3"] {
  background-position: -49px -72px;
}
</style>
