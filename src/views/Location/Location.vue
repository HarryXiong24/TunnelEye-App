<template>
  <div>
    <div class="main">
      <div class="subWrap">
        <div class='title'>定位分布</div>
        <div class="choose">
          <div class="content">
            <p class="text">{{nowAddress}}</p>
          </div>
          <div class="chooseSite">
            <mu-button ref="button" icon @click="open = !open">
              <mu-icon value="keyboard_arrow_down"></mu-icon>
            </mu-button>
            <mu-popover cover :open.sync="open" :trigger="trigger">
              <mu-list>
                <mu-list-item v-for="(val, index) in machineAdd" :key="index" button @click="chooseSite(val)">
                  <mu-list-item-title>{{val}}</mu-list-item-title>
                </mu-list-item>
              </mu-list>
            </mu-popover>
          </div>
        </div>
      </div>

      <mu-row class="tabs">
        <mu-tabs :value.sync="active" inverse full-width color="secondary" text-color="rgba(0, 0, 0, .54)"  center>
          <mu-tab @click="changeTab(index)" v-for="(value, index) in coorGroups" :key="index">场景{{index+1}}</mu-tab>
        </mu-tabs>
      </mu-row>

      <mu-row>
        <mu-col span="12" id="#svg">
          <svg viewBox="0 0 1300 1300" preserveAspectRatio="xMidYMid slice">
          </svg>
          <mu-button icon color="red" class="update">
            <mu-icon value="autorenew"></mu-icon>
          </mu-button>
        </mu-col>
      </mu-row>

      <mu-row gutter justify-content="center">
        <mu-col span="6">
          <p class="text">项目地点平面示意图</p>
        </mu-col>
      </mu-row>

      <mu-row gutter justify-content="center">
        <mu-col span="6">
          <p class="text">上位机状态: 在线</p>
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
    </div>
  </div>
</template>

<script lang="ts">
import * as d3 from 'd3';
import moment from 'moment'
import { Vue, Component } from 'vue-property-decorator';
import scale from '../../util/scale';

// 生成从minNum到maxNum的随机数
function randomNum(minNum: number, maxNum: number) {
  switch (arguments.length) {
    case 1:
      return parseInt(String(Math.random() * minNum + 1), 10);
      break;
    case 2:
      return parseInt(String(Math.random() * ( maxNum - minNum + 1 ) + minNum), 10);
      break;
    default:
      return 0;
      break;
  }
} 

@Component
export default class Location extends Vue {
  // tab标签切换
  public active: number = 0;

  // 平面图信息
  public coorGroups: Array<any>[] = []
  public ploygon: Array<any> = []

  // 获取下位机，选地点的参数
  public machineAdd: Array<any> = []
  public nowAddress: Array<any> = []
  public open = false
  public trigger = null

  // 获取所有UWB标签信息
  public nodeID = 0

  public cx = 0
  public cy =0
  public hull = d3.polygonHull([ [100,40], [10,290], [100,560], [500,560], [590,290], [500,40] ])
  public count = 5
  public second = 3
  public id = "未选择人员"
  public name = "未选择人员"
  public sex = "未选择人员"
  public position = "未选择人员"
  public time = "无"
  public nowTime = ""

  // 获取下位机地址
  async initMachineInfo () {
    await this.$store.dispatch("getMachineInfo")
    let machineInfo = this.$store.state.machineInfo
    if (machineInfo) {
      machineInfo.forEach( (val: any) => {
        this.machineAdd.push(val.devAddress) 
      })
    }
  }

  // 获取所有UWB定位标签的定位信息
  async initAllUWBInfo () {
    this.nodeID = this.judgeNodeID()
    let data = {
      nodeId: this.nodeID,
      startTime: moment().subtract(30, "minutes").format("YYYY-MM-DD-HH:mm:ss"),
      endTime: moment().format("YYYY-MM-DD-HH:mm:ss"),
      sysId: 1,
    }

    await this.$store.dispatch('getAllUWBInfo', data);
    console.log(this.$store.state.allUWBInfo)
  }

  // 获取指定UWB数据
  async getUWBData () {
    this.nodeID = this.judgeNodeID()
    let data = {
      nodeId: this.nodeID,
      labelAdd: 1,
      sysId: 1,
    }

    await this.$store.dispatch('getUWBData', data);
    console.log(this.$store.state.UWBData)
  }

  // 获取平面图信息
  async getMapData () {
    await this.$store.dispatch('getMapData', {sysId: 1})
    let mapData = this.$store.state.mapData
    console.log(mapData)
    
    console.log(scale(2000, 2000, 1000))
    // 测试 
    this.coorGroups.push([[0,0],[1024,0],[1024,728],[900,455]])
    this.coorGroups.push([[0,0],[0,728],[1024,728],[1300,400]])
  }

  // 画边界
  drawBoundary () {
    this.ploygon = this.coorGroups[this.active]
    let hull = d3.polygonHull(this.ploygon)
    
    // 移除svg内部节点
    d3.selectAll("svg > *").remove()

    d3.select('svg').append('polygon')
    .attr("points", hull)
    .attr("fill", "pink")
    .attr("stroke", "black")
    .attr("stroke-width", 1)
  }


  // 根据地点，获取nodeID 
  judgeNodeID () {
    let nodeID = 0;
    this.$store.state.machineInfo.forEach( (val: any) => {
      if (this.nowAddress === val.devAddress) {
        nodeID = val.nodeId
      }
    })
    return nodeID
  }

  // 选择地点
  chooseSite (val: any) {
    this.nowAddress = val 
    this.open = false
  }

  // 切换平面图场景
  changeTab (index: number) {
    this.active = index
    this.drawBoundary()
  }


  // 画点
  drawPoint (svg: any) {
    // 先清空以前的点
    svg.selectAll('circle').remove()
    svg.selectAll('text').remove()

    // 建立循环，同时画几个点
    for(let i = 0; i < this.count; i++) {
      while (true) {
        if (d3.polygonContains(this.hull, [this.cx, this.cy]) === true) {
          let cx = this.cx
          let cy = this.cy
          let that = this
          let index = i

          // 添加点
          svg.append('circle')
          .attr("cx", cx)
          .attr("cy", cy)
          .attr("r", 10)
          .attr("fill", "red")
          .on("click", function (this: any, d: any, i: any) {
            that.id = index+1 + ""
            that.name = "xxx"
            that.sex = "男"
            that.position = `(${cx},${cy})`
            that.time = moment().format('HH:mm:ss')
            d3.select(this) 
            .attr("r", 12)
            .attr("fill","#aa00ff")
          })

          // 点旁边添加序号
          svg.append('text')
          .attr("x", cx-10)
          .attr("y", cy-10)
          .attr("fill", "black")
          .text(i+1)

          // 还原成0，方便下一次画点
          this.cx = 0
          this.cy = 0
          break
        } else {
          this.cx = randomNum(15, 585)
          this.cy = randomNum(45, 555)
        }
      }
    }
  }

  async mounted () {
    this.trigger = (this.$refs.button as any).$el 
    await this.initMachineInfo()
    this.nowAddress = this.machineAdd[0]

    await this.initAllUWBInfo()
    await this.getUWBData()

    await this.getMapData()
    this.drawBoundary()
      
    // 刷新时间
    setInterval( () => {
      this.nowTime = moment().format('YYYY-MM-DD HH:mm:ss')
    }, 10);

    // 选择svg画布
    let svg = d3.select("svg")
    
    let timer = setInterval( () => {
      this.drawPoint(svg)
    }, this.second * 1000)
  }
}
</script>

<style lang="scss">
  .main {
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
    }

    .text {
      color: #2d3a4b;
      text-align: center;
      margin: 10px 0;
    }

    .tabs {
      margin-top: 80px;
      margin-bottom: 40px;
    }

    .subWrap {
      position: relative;
      .title {
        margin-top: 80px;
        font-size: 80px;
        &::before {
          content: '';
          border-left: 20px #ff6f00 solid;
          padding-left: 30px;
        }
      }
      .choose {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        position: absolute;
        top: 0;
        right: 0;
        .content {
          font-size: 70px;
          margin-top: 35px;
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
          font-size: 72px;
        }
        .content {
          font-size: 68px;
          color: rgba(0, 0, 0, .87);
        }
      }
      .item {
        margin-right: 60px;
        .msg {
          width: 600px;
          font-size: 62px;
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
  }
</style>