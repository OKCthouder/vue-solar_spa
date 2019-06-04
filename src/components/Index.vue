<template>
<div id="index">
<div id="particles-js"></div>
<div id="svg-wrapper" :style="svgWrapper">
  <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g :transform="'translate('+width/2+','+height/2+')'" id="circle">
      <!-- 轨道 -->
      <ellipse cx="0" cy="0" :rx="a" :ry="b" stroke="white" stroke-width="2" fill-opacity="0" stroke-opacity="0.2"/>
      <!-- 轴 -->
      <line :x1="-a" :x2="a" y1="0" y2="0" stroke="white" stroke-width="2" fill-opacity="0" stroke-opacity="0.2"/>
      <line x1="0" x2="0" :y1="-b" :y2="b" stroke="white" stroke-width="2" fill-opacity="0" stroke-opacity="0.2"/>
      <g v-for="solar in solars" class="enter" @click="clickHandler" :data-id="solar.id">
        <image id="earth" v-if="solar.id==1" xlink:href="../assets/images/earth.png" :x="solar.x-12" :y="solar.y-12"  height="24px" width="24px"/>
        <circle v-else class="dot" :cx="solar.x" :cy="solar.y" r="12" :fill="solar.color"/>
        <text :x="solar.textX" :y="solar.textY" fill="white" text-anchor="middle">
          {{data[solar.id]}}
          <tspan :x="solar.textX" :y="solar.textY+30">{{time[solar.id]}}</tspan>
        </text>
      </g>
      <image id="sun" xlink:href="../assets/images/sun.png" x="-60" y="-60" height="120" width="120"/>
    </g>
  </svg>
</div>
</div>
</template>

<script>
import f from '@/assets/particles.js'
export default {
  data () {
    return {
      a: 0,
      b: 0,
      textA: 0,
      textB: 0,
      prevWinSizeLevel: 0,
      width: 0,     //wrapper宽度
      height: 0,  //wrapper高度
      sizeX: 0.7, //横轴缩放
      sizeY: 0.6, //纵轴缩放
      s:[],
      data: ['立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至', '小寒', '大寒'],
      time: ['2月3日', '2月18日', '3月5日', '3月20日', '4月4日', '4月20日', '5月5日', '5月21日', '6月5日', '6月21日', '7月7日', '7月22日', '8月7日', '8月23日', '9月7日', '9月23日', '10月8日', '10月23日', '11月7日', '11月22日', '12月7日', '12月22日', '1月5日', '1月20日']
    }
  },
  computed:{
    svgWrapper(){
      return {width:this.width+'px',height:this.height+'px'};
    },
    solars(){
      for(var n=0;n<13;n++){
        var o1 = {
          x:-this.a+n*(this.a/6),
          y:Math.sqrt(Math.pow(this.b,2)*(1-Math.pow(-this.a+n*(this.a/6),2)/Math.pow(this.a,2))),
          textX:-this.textA+n*(this.textA/6),
          textY:Math.sqrt(Math.pow(this.textB,2)*(1-Math.pow(-this.textA+n*(this.textA/6),2)/Math.pow(this.textA,2))),
          id:n+7,
          color:'#c9c7a1'
        }
        switch(n){
          case 1:o1.color = '#D1567F';break;
          case 7:o1.color = '#D1BF56';break;
          case 13:o1.color = '#569FD1';break;
          default:o1.color = '#c9c7a1'
        }
        this.s[n]=o1
        if(n!==0&&n!==12){
          var o2 = {
            x:-this.a+n*(this.a/6),
            y:-Math.sqrt(Math.pow(this.b,2)*(1-Math.pow(-this.a+n*(this.a/6),2)/Math.pow(this.a,2))),
            textX:-this.textA+n*(this.textA/6),
            textY:-Math.sqrt(Math.pow(this.textB,2)*(1-Math.pow(-this.textA+n*(this.textA/6),2)/Math.pow(this.textA,2))),
            id:n>=10?(33-n):(9-n),
            color:'#c9c7a1'
          }
          o2.id===3&&(o2.color = '#5CCC50')
          this.s[n+12] = o2;
        }
      }
      return this.s;
    }
  },
  methods: {
    clickHandler (e) {
      this.$router.push('/solar/' + e.currentTarget.getAttribute('data-id'))
    },
    getSizeLevel () {
      var w = window.innerWidth
      w = Math.min(1900,w)
      w = Math.max(1000,w)
      return Math.floor(w / 100) * 100
    },
    draw (sizeLevel) {
      this.width = sizeLevel * 1;
      this.height = this.width * (550/882)
      this.a = this.width * this.sizeX / 2
      this.b = this.height * this.sizeY / 2
      this.textA = this.a +50
      this.textB = this.b +70
    }
  },
  created(){
    this.draw(this.getSizeLevel())
    window.onresize = e => {
      var sizeLevel = this.getSizeLevel()
      if (sizeLevel === this.prevWinSizeLevel) {
        return
      } else {
        this.prevWinSizeLevel = sizeLevel
        this.draw(sizeLevel)
      }
    }
  },
  mounted () {
    f('particles-js',
      {
        'particles': {
          'number': {
            'value': 40,
            'density': {
              'enable': false,
              'value_area': 1000
            }
          },
          'color': {
            'value': '#ffffff'
          },
          'shape': {
            'type': 'polygon',
            'polygon': {
              'nb_sides': 5
            }
          },
          'opacity': {
            'value': 0.2,
            'random': true,
            'anim': {
              'enable': true,
              'speed': 0.2,
              'opacity_min': 0,
              'sync': false
            }
          },
          'size': {
            'value': 5,
            'random': true,
            'anim': {
              'enable': false,
              'speed': 40,
              'size_min': 0.1,
              'sync': false
            }
          },
          'line_linked': {
            'enable': false,
            'distance': 150,
            'color': '#ffffff',
            'opacity': 0.4,
            'width': 1
          },
          'move': {
            'enable': true,
            'speed': 2,
            'direction': 'none',
            'random': false,
            'straight': false,
            'out_mode': 'out',
            'attract': {
              'enable': false,
              'rotateX': 600,
              'rotateY': 1200
            }
          }
        },
        'retina_detect': true
      }
    )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a{
  display:block;
  font-size:inherit;
}
.enter:hover text{
  	fill:orange;
}
.enter:hover circle{
  	fill:orange;
}
#earth{
  /* animation: rotate 1s linear infinite; */
}
#svg-wrapper{
	width:1000px;
	height: 500px;
	margin:0 auto;
	font-family: 'PingFang SC','Microsoft YaHei',sans-serif;
	font-size: 20px;
	margin-top: -20px;
}
#svg-wrapper tspan{
 font-size: 15px;
}
#sun{
	position: absolute;
	top:40%;
	left: 45%;
}
#particles-js{
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: -1000;
}
@keyframes rotate{
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
}
</style>
