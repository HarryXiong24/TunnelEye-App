<template>
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

    <div v-if="this.hasSysInfo === 1 && this.hasMapData === 1">

      <div class="chartWrap">
        <div class="chart">
          <div id="echarts" class="echarts" />
        </div>
      </div>

      <mu-row gutter justify-content="center">
        <mu-col span="10" class="direct">
          <div class="base">
            <div class="square"></div>
            <div>定位人员</div>
          </div>
          <div class="base">
            <div class="circle"></div>
            <div>UWB基站位置连线</div>
          </div>
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
          <mu-button icon color="red" class="update" @click="updateInfo">
            <mu-icon value="autorenew"></mu-icon>
          </mu-button>
        </mu-col>
      </mu-row>

    </div>

    <!-- <mu-row v-else-if="this.nowStatus === 1 && this.hasSysInfo === 1 && this.hasMapData === 0">
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
    </mu-row>  -->

    <!-- <mu-row v-else-if="this.nowStatus === 1 && this.hasSysInfo === 0">
      <mu-alert color="error" class="alert">
        <mu-icon value="warning" class="icon"></mu-icon> 
        <p class="content">抱歉，请查看是否安装主控机</p>
      </mu-alert>
    </mu-row>  -->

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
</template>

<script lang="ts">
import moment from 'moment';
import { Vue, Component } from 'vue-property-decorator';
import LocatingInfo from '../../components/LocatingInfo/LocatingInfo.vue';
import * as echarts from 'echarts'
import { reqNewAllUWBInfo } from '../../api/index';

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

  // 基站信息
  public uwbBaseCoor: Array<any> = []        // 返回的基站坐标
  public hasMapData: number = -1

  // 获取所有UWB标签信息
  public allUWBInfo: Array<any> = []
  public isUWBInfo: boolean = false

  // chart图标的属性
  public chart: any = null
  public showBaseCoor: Array<any> = []        // 最终显示的基站坐标
  public outBaseCoor: Array<any> = []  
  public inBaseCoor: Array<any> = []  
  public maxX: any = 0
  public maxY: any = 0
  public showPoint: Array<any> = []  

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

  public lineChartOptions: any = {}

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
        
        // 每次都要清空一下
        this.uwbBaseCoor = []
        this.showBaseCoor = []

        this.uwbBaseCoor = mapData.uwbBaseCoor
        const closeCoor: number[][] = []
        
        this.uwbBaseCoor.forEach(value => {
          let fommat = [value.xcoor, value.ycoor]
          closeCoor.push([value.xcoor - 0.5, value.ycoor - 1])
          this.showBaseCoor.push(fommat)
        })
        // 封闭
        closeCoor.reverse().forEach((val) => {
          this.showBaseCoor.push(val);
        });
        this.showBaseCoor.push(this.showBaseCoor[0])
        console.log(this.showBaseCoor);
      }

    }
  }

  // 获取所有UWB定位标签的定位信息
  async initAllUWBInfo () {

    let data = {
      sysId: this.nowSysId,
      // startTime: moment().subtract(10, "minutes").format("YYYY-MM-DD-HH:mm:ss"),
      // endTime: moment().format("YYYY-MM-DD-HH:mm:ss"),
      startTime: "2021-03-06-08:00:00",
      endTime: "2021-03-06-18:00:00",
    }

    let response = await reqNewAllUWBInfo(data);


    if (response.data.code !== undefined) {
      this.isUWBInfo = false
      this.showBaseCoor.forEach((value: any) => {
        if (value[0] > this.maxX) {
          this.maxX = value[0]
        }
        if (value[1] > this.maxY) {
          this.maxY = value[1]
        }
      })
    } else {
      this.isUWBInfo = true
      this.allUWBInfo = response.data;
      // 判定并且保存最值
      this.maxX = (this as any).allUWBInfo.data.range.maxX 
      this.maxY = (this as any).allUWBInfo.data.range.maxY
      
      this.showBaseCoor.forEach((value: any) => {
        if (value[0] > this.maxX) {
          this.maxX = value[0]
        }
        if (value[1] > this.maxY) {
          this.maxY = value[1]
        }
      })

      // 存坐标的点
      this.showPoint = [];
     (this as any).allUWBInfo.data.uwbdata.forEach( (value: any) => {
        let arr = []
        arr.push(value.xcoor)
        arr.push(value.ycoor)
        this.showPoint.push(arr)
      })
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

  // 准备阶段
  async beforeDarw() {
    await this.getMapData()
    if (this.hasMapData === 0) {
      return
    } else {
      await this.initAllUWBInfo()
      await this.initChart()
    }
  }

  async initChart() {

    this.lineChartOptions = {
      toolbox: {
        left: 'right',
        feature: {
          saveAsImage: {
            show: true,
            name: '定位示意图'
          }
        }
      },
      animation: true,
      grid: {
        top: 40,
        left: 40,
        right: 30,
        bottom: 30
      },
      title: {
        text: '单位: 米(m)',
        textStyle: {
          fontSize: 14,
          color: '#999'
        },
        top: 0
      },
      tooltip: {
        trigger: 'none',
        triggerOn: 'click',
      },
      xAxis: {
        name: 'x',
        minorTick: {
          show: true
        },
        splitLine: {
          lineStyle: {
            color: '#999'
          }
        },
        minorSplitLine: {
          show: true,
          lineStyle: {
            color: '#ddd'
          }
        }
      },
      yAxis: {
        name: 'y',
        min: -100,
        max: 100,
        minorTick: {
          show: true
        },
        splitLine: {
          lineStyle: {
            color: '#999'
          }
        },
        minorSplitLine: {
          show: true,
          lineStyle: {
            color: '#ddd'
          }
        }
      },
      dataZoom: [{
        show: true,
        type: 'inside',
        filterMode: 'none',
        xAxisIndex: [0],
        startValue: -(this.maxX+2),
        endValue: (this.maxX+2)
      }, {
        show: true,
        type: 'inside',
        filterMode: 'none',
        yAxisIndex: [0],
        startValue: -(this.maxY+2),
        endValue: (this.maxY+2)
      }],
      series: [
      {
        data: this.showBaseCoor,
        type: 'line',
        clip: true,
        lineStyle: {
          width: 3
        }
      },
      {
        symbolSize: 10,
        data: this.showPoint,
        type: 'scatter',
        itemStyle: {
          color: '#aa00ff'
        }
      }]
    }

    this.chart = echarts.init(document.getElementById('echarts') as any)

    this.chart.setOption(this.lineChartOptions)

    this.chart.on('click', async (params: any) => {
	    if (params.componentType === 'series') {
        let labelId: number = -1;
        (this as any).allUWBInfo.data.uwbdata.forEach((value: any, index: number) => {
        if (index === params.dataIndex) {
          labelId = value.labelId
        }
        })
        await this.getUWBData(labelId)
      }
    });
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
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  }

  // 手动更新
  async updateInfo() {
    await this.beforeDarw()
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
          border-radius: 50px;
          margin: 0 30px;
        }
        .square {
          width: 50px;
          height: 50px;
          background-color: #aa00ff;
          border-radius: 50px;
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

    .goPhysicalSign {
      display: block;
      margin: 40px auto;
      width: 60%;
    }

    .chartWrap{
      .chart {
        width: 100%;
        margin: 30px auto;
        .echarts {
          width: 100% !important;
        }
      }
    }

  }
</style>
