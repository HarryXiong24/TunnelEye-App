<template>
  <div class="fake">
    <div class='subTitle'>定位分布</div>

    <mu-row>
      <mu-col span="12" id="#svg">
        <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice">
        </svg>
        <mu-button icon color="red" class="update" @click="update">
          <mu-icon value="autorenew"></mu-icon>
        </mu-button>
      </mu-col>
    </mu-row>

    <mu-row gutter justify-content="center">
        <mu-col span="10" class="direct">
          <div class="base">
            <div class="square"></div>
            <div>UWB基站</div>
          </div>
          <div class="base">
            <div class="circle"></div>
            <div>定位人员</div>
          </div>
          <div class="base">
            <div class="area"></div>
            <div>施工区域</div>
          </div>
        </mu-col>
    </mu-row>

    <mu-row gutter justify-content="center">
      <mu-col span="12">
        <p class="text">项目地点平面示意图</p>
      </mu-col>
    </mu-row>

    <mu-row gutter justify-content="center">
      <mu-col span="12">
        <p class="text">上位机状态在线</p>
      </mu-col>
    </mu-row>


    <mu-row gutter justify-content="center">
      <mu-col span="12" class="list"> 
        <div class='title'>定位信息</div>
        <mu-list textline="two-line">
          <mu-divider></mu-divider>
          <mu-list-item avatar :ripple="false">
            <mu-icon value="star" left></mu-icon>
            <mu-list-item-content class="wrap">
              <mu-list-item-title class="name">工号</mu-list-item-title>
              <mu-list-item-sub-title class="content">{{id}}</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action class="item">
              <mu-list-item-after-text class="msg">在岗时间 2 hr</mu-list-item-after-text>
            </mu-list-item-action>
            <mu-icon value="assignment_turned_in" right></mu-icon>
          </mu-list-item>
          <mu-divider></mu-divider>

          <mu-list-item avatar :ripple="false">
            <mu-icon value="star" left></mu-icon>
            <mu-list-item-content class="wrap">
              <mu-list-item-title class="name">姓名</mu-list-item-title>
              <mu-list-item-sub-title class="content">{{name}}</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action class="item">
              <mu-list-item-after-text class="msg">性别: {{sex}}</mu-list-item-after-text>
            </mu-list-item-action>
            <mu-icon value="assignment_ind" right></mu-icon>
          </mu-list-item>

          <mu-divider></mu-divider>

          <mu-list-item avatar :ripple="false">
            <mu-icon value="star" left></mu-icon>
            <mu-list-item-content class="wrap">
              <mu-list-item-title class="name">位置坐标</mu-list-item-title>
              <mu-list-item-sub-title class="content">{{position}}</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action class="item">
              <mu-list-item-after-text class="msg">获得时间 {{time}}</mu-list-item-after-text>
            </mu-list-item-action>
            <mu-icon value="room" right></mu-icon>
          </mu-list-item>
          <mu-divider></mu-divider>

          <mu-list-item avatar :ripple="false"> 
            <mu-icon value="star" left></mu-icon>
            <mu-list-item-content class="wrap">
              <mu-list-item-title class="name">当前时间</mu-list-item-title>
              <mu-list-item-sub-title class="content">{{nowTime}}</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action style="margin-right: 9px;">
              <mu-list-item-after-text></mu-list-item-after-text>
            </mu-list-item-action>
            <mu-icon value="update" right></mu-icon>
          </mu-list-item>
          <mu-divider></mu-divider>

        </mu-list>        
      </mu-col>
    </mu-row>

    <mu-row gutter justify-content="center" v-show="physicalSign === true">
      <mu-col span="12" class="list"> 
        <mu-button color="brown500" round class="goPhysicalSign" @click="goPhysicalSign">
          查看个人体征信息
        </mu-button>
      </mu-col>
    </mu-row>

  </div>
</template>

<script lang="ts">
import * as d3 from 'd3'
import { Vue, Component } from 'vue-property-decorator';

 // 生成从minNum到maxNum的随机数
  function randomNum(minNum: number, maxNum: number): number {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1 + '', 10);
        break;
      case 2:
        return parseInt(Math.random() * ( maxNum - minNum + 1 ) + minNum + '', 10);
        break;
      default:
        return 0;
        break;
    }
  } 


  function getTime(type: any) {
  // 获取时间
  let now = new Date()
  // 获取个数据
  let hour  = now.getHours()       // 0~23
  let minute = now.getMinutes()    // 0~59
  let second = now.getSeconds()    // 0~59
  let year = now.getFullYear()     
  let month = now.getMonth() + 1   // 0~11
  let day = now.getDate()          // 1~31
  let week = now.getDay()          // 0~6 周日~周六

  let weekName = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
  
  // 24小时制
  let time = '' + hour
  time  = time + (minute < 10 ? ':0' : ":") + minute
  time  = time + (second < 10 ? ':0' : ":") + second


  let date = `${year}.${month}.${day}`
  let today = `${weekName[week]}`
  time = `${time}`
  let all = `${year}.${month}.${day} ${weekName[week]} ${time}`
  
  if (type === 'date') {
    return date
  } else if (type === 'day') {
    return today
  } else if (type === 'time') {
    return time
  } else if (type === 'all') {
    return all
  } else {
    return all
  }
}

@Component
export default class Fake extends Vue{

  public cx: number = 0
  public cy: number = 0
  public hull: any = d3.polygonHull([ [100,40], [10,290], [100,560], [500,560], [590,290], [500,40] ])
  public count: number = 5
  public second: number = 3
  public id: string = "未选择人员"
  public name: string = "未选择人员"
  public sex: string =  "未选择人员"
  public position: string =  "未选择人员"
  public time: string =  "无"
  public nowTime: string =  ""
  public timer: any

  public physicalSign: boolean = false

  update() {
    
  }

  mounted () {
    // 创建好六边形
    d3.select('svg').append('polygon')
    .attr("points", this.hull)
    .attr("fill", "pink")
    .attr("stroke", "black")
    .attr("stroke-width", 1)
      
    // 刷新时间
    setInterval( () => {
      this.nowTime = getTime('all')
    }, 10);

    // 后台获取数据
    let svg = d3.select("svg")
    
    this.timer = setInterval( () => {
      svg.selectAll('circle').remove()
      svg.selectAll('text').remove()

      for(let i = 0; i < this.count; i++) {
        while (true) {
          
          if (d3.polygonContains(this.hull, [this.cx, this.cy]) === true) {
            let cx = this.cx
            let cy = this.cy
            let that = this
            
            svg.append('circle')
            .attr("cx", cx)
            .attr("cy", cy)
            .attr("r", 10)
            .attr("fill", "red")
            .on("click", function(this: any, d: any) {
              that.id = i + 1 + ""
              that.name = "xxx"
              that.sex = "男"
              that.position = `(${cx},${cy})`
              that.time = getTime('time')
              that.physicalSign = true

              d3.select(this) 
              .attr("r", 12)
              .attr("fill","#655bff")
            })

            svg.append('text')
            .attr("x", cx-10)
            .attr("y", cy-10)
            .attr("fill", "black")
            .text(i+1)

            this.cx = 0
            this.cy = 0
            break
          } else {
            this.cx = randomNum(15, 585)
            this.cy = randomNum(45, 555)
          }
        }
      }
    }, this.second * 1000)
  }

  // 跳转到体征页面
  goPhysicalSign() {
    let labelAdd = this.id
    this.$router.push(`/PhysicalSign?labelAdd=${labelAdd}`)
  }
}
</script>

<style lang="scss">
  .fake {
      .title {
      font-size: 70px;
      .site {
        float: left;
      }
      .status {
        float: right;
      }
    }

    #svg {
      height: 100%;
      width: 100%;
      margin: 10px auto;
    }

    .text {
      color: #2d3a4b;
      text-align: center;
    }

    .direct {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .base {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .area {
          width: 50px;
          height: 50px;
          background-color: rgb(255, 187, 198);
          margin: 0 30px;
        }
        .square {
          width: 50px;
          height: 50px;
          background-color: #aa00ff;
          margin: 0 30px;
        }   
        .circle {
          width: 50px;
          height: 50px;
          background: red;
          border-radius: 50px;
          margin: 0 30px;
        }     
      }
    }

    .update {
      position: absolute;
      right: 0;
      bottom: 0;
    }

    .list {
      margin-top: 50px;
      .title {
        color: black;
        font-size: 80px;
        margin-bottom: 30px;
        &::before {
          content: '';
          border-left: 20px #ff6f00 solid;
          padding-left: 30px;
        }
      }
      .wrap {
        margin-left: 40px;
        padding-left: 20px;
        .name {
          font-size: 68px;
        }
        .content {
          font-size: 60px;
          color: rgba(0, 0, 0, .87);
        }
      }
      .item {
        margin-right: 60px;
        .msg {
          width: 900px;
          font-size: 60px;
        }
      }
    }

    .subTitle {
      margin-top: 80px;
      font-size: 80px;
      &::before {
        content: '';
        border-left: 20px #ff6f00 solid;
        padding-left: 30px;
      }
    }

    .goPhysicalSign {
      display: block;
      margin: 40px auto;
      width: 60%;
    }
  }
</style>
