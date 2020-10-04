<template>
  <div>
    <div class="main">

      <div class='siteTitle'>选择信息</div> 
      <mu-row class="siteWrap">  
        <mu-col span="12" lg="4" sm="6">
          <mu-select label="请选择下位机" v-model="nowAddress" full-width class="choose" @change="changeSite(nowAddress)">
            <mu-option v-for="(option, index) in machineAdd" :key="index" :label="option" :value="option"></mu-option>
          </mu-select>
        </mu-col>
      </mu-row>

      <div class="subWrap">
        <div class='title'>定位分布</div>
        <div class="choose">
          <div class="content">
            <p class="text">主控机{{nowSysId}}</p>
          </div>
          <div class="chooseSite">
            <mu-button ref="button" icon @click="open = !open">
              <mu-icon value="keyboard_arrow_down"></mu-icon>
            </mu-button>
            <mu-popover cover :open.sync="open" :trigger="trigger">
              <mu-list>
                <mu-list-item v-for="(val, index) in sysId" :key="index" button @click="changeSys(val, index)">
                  <mu-list-item-title>主控机{{val}}</mu-list-item-title>
                </mu-list-item>
              </mu-list>
            </mu-popover>
          </div>
        </div>
      </div>

      <div v-if="this.nowStatus === 1 && this.hasSysInfo === 1 && this.hasMapData === 1">
        
        <mu-row>
          <mu-col span="12" id="svg">
            <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice">
            </svg>
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

        <mu-row gutter justify-content="center" v-if="this.isUWBInfo === true">
          <mu-col span="12">
            <p class="text">上位机状态: 在线</p>
            <mu-button icon color="red" class="update" @click="updateInfo">
              <mu-icon value="autorenew"></mu-icon>
            </mu-button>
          </mu-col>
        </mu-row>

        <mu-row gutter justify-content="center" v-else>
          <mu-col span="12">
            <p class="text">上位机状态在线, 暂无人员定位信息</p>
            <mu-button icon color="red" class="update">
              <mu-icon value="autorenew"></mu-icon>
            </mu-button>
          </mu-col>
        </mu-row>

      </div>

      <mu-row v-else-if="this.nowStatus === 1 && this.hasSysInfo === 1 && this.hasMapData === 0">
        <mu-alert color="error" class="alert">
          <mu-icon value="warning" class="icon"></mu-icon> 
          <p class="content">抱歉，无平面图定位数据</p>
        </mu-alert>
      </mu-row> 

      <mu-row v-else-if="this.nowStatus === 0">
        <mu-alert color="error" class="alert">
          <mu-icon value="warning" class="icon"></mu-icon> 
          <p class="content">抱歉，该下位机离线，暂无数据</p>
        </mu-alert>
      </mu-row> 

      <mu-row v-else-if="this.nowStatus === 1 && this.hasSysInfo === 0">
        <mu-alert color="error" class="alert">
          <mu-icon value="warning" class="icon"></mu-icon> 
          <p class="content">抱歉，请查看是否安装主控机</p>
        </mu-alert>
      </mu-row> 

      <mu-row v-else-if="this.nowStatus === -1" justify-content="center">
        <mu-circular-progress class="loading" color="primary" :stroke-width="7" :size="56"></mu-circular-progress>
        <mu-circular-progress class="loading" color="secondary" :stroke-width="7" :size="56"></mu-circular-progress>
        <mu-circular-progress class="loading" color="warning" :stroke-width="7" :size="56"></mu-circular-progress>
      </mu-row> 

      <mu-row gutter justify-content="center">
        <mu-col span="12" class="list"> 
          <div class='title'>定位信息</div>

          <LocatingInfo :locatingInfo="locatingInfo"></LocatingInfo>

        </mu-col>
      </mu-row>
    </div>
  </div>
</template>

<script lang="ts">
import * as d3 from 'd3';
import moment from 'moment';
import { Vue, Component } from 'vue-property-decorator';
import { scale, filter, findMax } from '../../util/scale';
import LocatingInfo from '../../components/LocatingInfo/LocatingInfo.vue';

@Component({
  components: {
    LocatingInfo
  }
})
export default class Location extends Vue {
  // 获取下位机，选地点的参数
  public machineAdd: Array<any> = []
  public status: Array<any> = []
  public nowAddress: string = ""
  public nowStatus: number = -1
  public nodeID: number = 0

  // 选择sysId信息
  public sysId: Array<any> = []
  public nowSysId: number = -1
  public hasSysInfo: number = -1
  public open = false
  public trigger = null

  // 平面图信息
  public coorGroups: Array<any>[] = []       // 多个多边形坐标集合
  public scaleMaxSet: Array<any> = []        // 各组多边形最大坐标集合
  public scaleMax: number = 0                // 当前多边形最大坐标集合
  public uwbBaseCoor: Array<any> = []        // 基站位置
  public hasMapData: number = -1

  // 获取所有UWB标签信息
  public allUWBInfo: Array<any> = []
  public isUWBInfo: boolean = false

  // 坐标信息
  public cx: number = 0
  public cy: number = 0
  public second: number = 3

  // 当前存在的人员信息
  public locatingInfo: any = {
    id: "未选择人员",
    name: "未选择人员",
    sector: "暂无信息",
    position: "未选择人员",
    measureTime: "未选择人员",
    mobile: "暂无信息",
    groupName: "暂无信息",
  }

  // 定时器
  public timer: any = 0

  // 获取下位机地址
  async initMachineInfo () {
    await this.$store.dispatch("getMachineInfo")
    let machineInfo = this.$store.state.machineInfo

    if (machineInfo) {
      machineInfo.forEach( (val: any) => {
        this.machineAdd.push(val.devInfo) 
        this.status.push(val.status)
      })
    }
  }

  // 根据地点，获取nodeID，同时判断下位机是否在线
  judgeNodeID () {
    this.$store.state.machineInfo.forEach( (val: any) => {
      if (this.nowAddress === val.devInfo) {
        this.nodeID = val.nodeId
        this.nowStatus = val.status
      }
    })
  }

  // 获取sysId
  async initSysId() {
    this.sysId = []
    await this.judgeNodeID()

    let data = {
      nodeId: this.nodeID
    }

    await this.$store.dispatch('getSysId', data)
    let sysId = this.$store.state.sysId
    if (!sysId || sysId.code === -1) {
      this.hasSysInfo = 0
    } else {
      this.hasSysInfo = 1
      this.sysId = sysId
    }
  }

  // 获取平面图信息，并处理数据
  async getMapData () {
    if (this.nowSysId) {
      let data = {
        sysId: this.nowSysId
      }

      await this.$store.dispatch('getMapData', data)
      let mapData = this.$store.state.mapData

      if (!mapData || mapData.code === -1) {
        this.hasMapData = 0
      } else {
        this.hasMapData = 1
        for (let i = 0; i < mapData.ploygon.coorGroup.length; i++) {
          let val = mapData.ploygon.coorGroup[i]
          this.scaleMaxSet.push(findMax(val))
          this.coorGroups.push(filter(val, 600))
        }

        this.uwbBaseCoor = mapData.uwbBaseCoor
      }
    }
  }

  // 获取所有UWB定位标签的定位信息
  async initAllUWBInfo () {

    let data = {
      startTime: moment().subtract(1, "minutes").format("YYYY-MM-DD-HH:mm:ss"),
      endTime: moment().format("YYYY-MM-DD-HH:mm:ss"),
      // startTime: moment().subtract(30, "minutes").format("2020-09-22-21:38:30"),
      // endTime: moment().format("2020-09-22-21:58:30"),
      sysId: this.nowSysId,
    }

    await this.$store.dispatch('getAllUWBInfo', data)
    this.allUWBInfo = this.$store.state.allUWBInfo.data
    // console.log(this.allUWBInfo)
    if (this.allUWBInfo) {
      this.isUWBInfo = true
    } else {
      this.isUWBInfo = false
    }
  }

  // 获取指定UWB数据
  async getUWBData (labelAdd: number) {
    let data = {
      labelId: labelAdd
    }

    await this.$store.dispatch('getUWBData', data);
    let UWBData = this.$store.state.UWBData
    this.locatingInfo.id = UWBData.userid
    this.locatingInfo.name = UWBData.userName
    this.locatingInfo.measureTime = UWBData.measureTime
    this.locatingInfo.position = `(${UWBData.xcoor}, ${UWBData.ycoor})`
    this.locatingInfo.sector = UWBData.depName
    this.locatingInfo.mobile = UWBData.mobile
    this.locatingInfo.groupName = UWBData.groupName
  }

  // 准备阶段
  async beforeDarw() {
    clearInterval(this.timer);

    await this.getMapData()
    if (this.hasMapData === 0) {
      return
    } else {
      this.drawBoundary()
      this.drawUWBBase()

      // 选择svg画布
      let svg = d3.select("#svg > svg")

      await this.initAllUWBInfo()

      if (this.isUWBInfo === false) {

      } else {
        this.drawPoint(svg)
      }

      this.timer = setInterval( async () => {
        // 每隔一段时间获取所有UWB标签信息
        await this.initAllUWBInfo()
        if (this.isUWBInfo === false) {
          return       
        } else {
          this.drawPoint(svg)
        }
      }, this.second * 1000)
    }
  }

  // 画边界
  drawBoundary () {
    // 移除svg内部节点
    d3.selectAll("#svg > svg > *").remove()

    this.coorGroups.forEach( (val) => {
      let hull = d3.polygonHull(val)

      d3.select('#svg > svg').append('polygon')
      .attr("points", hull)
      .attr("fill", "#ffcbd3")
      .attr("stroke", "black")
      .attr("stroke-width", 2)
    })
  }

  // 画基站监测点
  drawUWBBase () {
    this.findMax()
    let svg = d3.select("#svg > svg")
    // 先清空以前的点
    svg.selectAll('#svg > svg > rect').remove()

    this.uwbBaseCoor.forEach( (val) => {
      svg.append('rect')
      .attr("x", scale(val.xcoor, this.scaleMax, 600))
      .attr("y", scale(val.ycoor, this.scaleMax, 600))
      .attr("height", 15)
      .attr("width", 15)
      .attr("fill", "#aa00ff")
    })
  }

  // 画点
  drawPoint (svg: any) {
    // 先清空以前的点
    svg.selectAll('#svg > svg > circle').remove()
    svg.selectAll('#svg > svg > text').remove()

    // 建立循环，同时画几个点
    for (let i = 0; i < this.allUWBInfo.length; i++) {
      let cx = Math.floor(scale(this.allUWBInfo[i].xcoor, this.scaleMax, 600))
      let cy = Math.floor(scale(this.allUWBInfo[i].ycoor, this.scaleMax, 600))
      let labelAdd = this.allUWBInfo[i].labelAdd
      let that = this
      // 添加点
      svg.append('circle')
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", 10)
      .attr("fill", "red")
      .on("click", async function (this: any, d: any, i: any) {
        await that.getUWBData(labelAdd)
        d3.select(this) 
        .attr("r", 12)
        .attr("fill","#655bff")
      })

      // 点旁边添加序号
      svg.append('text')
      .attr("x", cx-10)
      .attr("y", cy-10)
      .attr("fill", "black")
      .text(labelAdd)
    }
  }

  async mounted () {
    this.trigger = (this.$refs.button as any).$el 
    await this.initMachineInfo()
    this.nowAddress = this.machineAdd[0]
    this.nowStatus = this.status[0]

    await this.initSysId()
    this.nowSysId = this.sysId[0]

    await this.beforeDarw()
  }

  beforeDestroy() {
    clearInterval(this.timer);
  }

  // 选择地点
  async changeSite (val: any) {
    this.nowAddress = val 
    await this.judgeNodeID()

    if (this.nowStatus === 0) {

    } else {
      await this.initSysId()
      this.nowSysId = this.sysId[0]
      await this.beforeDarw()
    }
  }

  // 选择主控机
  async changeSys (val: any, index: any) {
    this.nowSysId = val 
    this.open = false

    await this.beforeDarw()
  }

  // 求当前多边形最大坐标
  findMax () {
    let max = 0
    this.scaleMaxSet.forEach( (val) => {
      if (max < val) {
        max = val
      }
    })

    this.scaleMax = max
  }

  // 手动更新
  updateInfo() {
    this.beforeDarw()
  }
}
</script>

<style lang="scss">
  .main {

    .siteTitle {
      margin-top: 80px;
      font-size: 80px;
      &::before {
        content: '';
        border-left: 20px #ff6f00 solid;
        padding-left: 30px;
      }
      margin-bottom: 80px;
    }

    .siteWrap {
      display: block;
      width: 90%;
      margin: 0 auto;
      .choose {
        font-size: 86px;
      }
    }

    .title {
      font-size: 70px;
      .site {
        float: left;
      }
      .status {
        float: right;
      }
    }

    .loading {
      margin: 10px 100px;
    }

    #svg {
      margin: 50px auto;
      height: 98%;
      width: 98%;
      border: 10px #ff6f00 dashed;
    }

    .text {
      color: #2d3a4b;
      text-align: center;
      margin: 10px 0;
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

    .subWrap {
      position: relative;
      margin-bottom: 80px;
      .title {
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

    .alert {
      width: 90%;
      margin: 30px auto;
      .icon {
        margin-right: 30px;
      }
      .content {
        font-size: 66px;
      }
    }

    .update {
      position: absolute;
      right: 65px;
      bottom: 0;
      width: 10%;
      height: 10%;
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