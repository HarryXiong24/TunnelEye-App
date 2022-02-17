<template>
  <div class="analysis">

    <p class="subTitle1">选择信息</p>

    <div class="wrap">
      <div class="item">
        <mu-select
          label="请选择下位机"
          v-model="machineNormal.value"
          full-width
          class="choose"
          @change="updateMachineInfo"
        >
          <mu-option
            v-for="(option, index) in machine"
            :key="index"
            :label="option"
            :value="option"
          ></mu-option>
        </mu-select>
      </div>
      <div class="item">
        <mu-select
          label="请选择传感器类型"
          v-model="sensorNormal.value"
          full-width
          class="choose"
          @change="updateAllSensorInfo"
        >
          <mu-option
            v-for="(option, index) in sensorOptions"
            :key="index"
            :label="option"
            :value="option"
          ></mu-option>
        </mu-select>
      </div>
    </div>

    <div class="wrap">
      <div class="item">
        <mu-date-input
          actions
          action-icon="today"
          v-model="dateValue"
          label="请选择日期节点"
          container="bottomSheet"
          label-float
          full-width
          @change="updateSensorData"
        ></mu-date-input>
      </div>
      <div class="item">
        <mu-select
          label="请选择传感器节点"
          v-model="sensorIDNormal.value"
          full-width
          class="choose"
          @change="updateSensorData"
        >
          <mu-option
            v-for="(option, index) in sensorIDOptions"
            :key="index"
            :label="option"
            :value="option"
          ></mu-option>
        </mu-select>
      </div>
    </div>

    <div class="subTitle2">
      <div class="content">统计结果</div>
      <div class="chooseCharts">
        <mu-radio class="radio" v-model="chartNormal.value" value="折线" uncheck-icon="show_chart" checked-icon="show_chart" label="折线"></mu-radio>
        <mu-radio class="radio" v-model="chartNormal.value" value="条形" uncheck-icon="insert_chart" checked-icon="insert_chart" label="条形"></mu-radio>
        <mu-radio class="radio" v-model="chartNormal.value" value="扇形" uncheck-icon="pie_chart" checked-icon="pie_chart" label="扇形"></mu-radio>
      </div>
    </div>

    <div class="chartWrap" v-if="hasData === true && chartNormal.value === '折线'">
      <div class="chart">
        <v-chart :options="lineChartOptions" class="echarts"></v-chart>
      </div>
      <div class="statistics">
        <mu-chip class="chip" color="#ba68c8">
          最大值: {{maxData}}
        </mu-chip>
        <mu-chip class="chip" color="#ba68c8">
          平均值: {{average}}
        </mu-chip>
        <mu-chip class="chip" color="#ba68c8">
          最小值: {{minData}}
        </mu-chip>
      </div>
      <mu-button class="update" color="brown500" round @click="updateChartData">
        更新数据
        <mu-icon right value="autorenew"></mu-icon> 
      </mu-button>
    </div>

    <div class="chartWrap" v-else-if="hasData === true && chartNormal.value === '条形'">
      <div class="chart">
        <v-chart :options="barChartOptions" class="echarts"></v-chart>
      </div>
      <div class="statistics">
        <mu-chip class="chip" color="#ba68c8">
          最大值: {{maxData}}
        </mu-chip>
        <mu-chip class="chip" color="#ba68c8">
          平均值: {{average}}
        </mu-chip>
        <mu-chip class="chip" color="#ba68c8">
          最小值: {{minData}}
        </mu-chip>
      </div>
      <mu-button color="brown500" round class="update" @click="updateChartData">
        更新数据
        <mu-icon right value="autorenew"></mu-icon> 
      </mu-button>
    </div>

    <div class="chartWrap" v-else-if="hasData === true && chartNormal.value === '扇形'">
      <div class="chart">
        <v-chart :options="pieChartOptions" class="echarts"></v-chart>
      </div>
      <div class="statistics">
        <mu-chip class="chip" color="#ba68c8">
          最大值: {{maxData}}
        </mu-chip>
        <mu-chip class="chip" color="#ba68c8">
          平均值: {{average}}
        </mu-chip>
        <mu-chip class="chip" color="#ba68c8">
          最小值: {{minData}}
        </mu-chip>
      </div>
      <mu-button color="brown500" round class="update" @click="updateChartData">
        更新数据
        <mu-icon right value="autorenew"></mu-icon> 
      </mu-button>
    </div>

    <mu-row v-else-if="hasData === false">
      <mu-alert color="error" class="alert">
        <mu-icon value="warning" class="icon"></mu-icon> 
        <p class="content">抱歉，暂无数据</p>
      </mu-alert>
    </mu-row> 

  </div>  
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import moment from 'moment';

@Component
export default class Analysis extends Vue {
  public sensorType: string =  ''
  public machine: Array<string> = []
  public machineNormal = {
    value: ""
  }
  public sensorOptions: Array<string> = ["甲烷", "氧气", "硫化氢", "一氧化碳", "液位传感器"]
  public sensorNormal = {
    value: "氧气"
  }
  public sensorIDOptions: Array<string> = []
  public sensorIDNormal = {
    value: ""
  }
  public dateValue: Date = new Date('2022-01-23')

  // 决定统计图的类别
  public chartNormal = {
    value: '折线',
  }

  // 存放数据，决定是否渲染
  public XData: Array<number> = []
  public YData: Array<number> = []
  public hasData: boolean = true
  public average: number = 0
  public parts: Array<any> = []
  public maxData: number = 0
  public minData: number = 0

  public lineChartOptions: any = {
    title: {
      text: '',
      textStyle: {
        fontStyle: "normal",
        fontSize: 14
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      name: "时间",
      data: [],
      nameTextStyle: {
        padding: [0, 0, 0, -10]
      }
    },
    yAxis: {
      name: "含量(%)",
      min: -3,
      max: 24,
      splitLine: {
        show: false
      }
    },
    toolbox: {
      left: 'center',
      feature: {
        mark: {show: true},
        dataView: {show: true, readOnly: false, textColor: '#ff6f00'},
        restore: {show: true},
        saveAsImage: {show: true}
      }
    },
    dataZoom: [{
      start: 95,
      end: 100
    }, {
      type: 'inside'
    }],
    visualMap: {
      top: 0,
      right: 0,
      pieces: [{
        gt: 0,
        lte: 5,
        color: '#096'
      }, {
        gt: 5,
        lte: 10,
        color: '#ffde33'
      }, {
        gt: 10,
        lte: 15,
        color: '#ff9933'
      }, {
        gt: 15,
        lte: 24,
        color: '#cc0033'
      }],
      outOfRange: {
        color: '#999'
      }
    },
    series: {
      name: '监测结果',
      type: 'line',
      data: [],
      markLine: {
        silent: true,
        data: [{
          yAxis: 0
        }, {
          yAxis: 5
        }, {
          yAxis: 10
        }, {
          yAxis: 15
        }, {
          yAxis: 20
        }]
      }
    }
  }

  public barChartOptions: any = {
    title: {
      text: '',
      textStyle: {
        fontStyle: "normal",
        fontSize: 14
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true
        }
      }
    },
    toolbox: {
      show: true,
      feature: {
        mark: {show: true},
        dataView: {show: true, readOnly: false, textColor: '#ff6f00'},
        restore: {show: true},
        saveAsImage: {show: true}
      }
    },
    visualMap: {
      orient: 'vertical',
      left: 'right',
      text: ['High', 'Low'],
      top: '20%',
      min: 0,
      max: 24,
      dimension: 1,
      inRange: {
        color: ['#096', '#ffde33', '#ff9933', '#cc0033']
      }
    },
    grid: {
      top: '12%',
      left: '1%',
      right: '10%',
      containLabel: true
    },
    xAxis: {
      name: "时间",
      data: this.XData,
      nameTextStyle: {
        padding: [0, 0, 0, -10]
      }
    },
    yAxis: {
      type: 'value',
      name: '含量(%)',
      nameTextStyle: {
        padding: [0, 0, -5, 0]
      }
    },
    dataZoom: [{
      start: 95,
      end: 100
    }, {
      type: 'inside'
    }],
    series: {
      name: '含量(%)',
      type: 'bar',
      data: this.YData         
    }
  }

  public pieChartOptions: any = {
    title: {
      text: '',
      left: 'left',
      textStyle: {
        fontStyle: "normal",
        fontSize: 14
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    toolbox: {
      show: true,
      feature: {
        mark: {show: true},
        dataView: {show: true, readOnly: false},
        magicType: {
            show: true,
            type: ['pie', 'funnel']
        },
        restore: {show: true},
        saveAsImage: {show: true}
      }
    },
    color: ['#096', '#ffde33', '#ff9933', '#cc0033'],
    legend: {
      left: 'center',
      bottom: '8%',
      data: ['0%~5%', '5%~10%', '10%~15%', '15%~24%'],
    },
    series: {
      name: '区间监测值个数',
      type: 'pie',
      radius: '50%',
      center: ['50%', '50%'],
      data: [],
      label: {
        color: 'black',
        bleedMargin: 0,
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  }  

  async mounted() {
    await this.initMachineInfo()
    await this.initAllSensorInfo()
    await this.initSensorData()
    await this.initChartData ()
  }

  // 判断传感器名字
  judgeSensorName (SensorName: string) {
    // 甲烷 1
    // 氧气 2
    // 硫化氢 3
    // 一氧化碳 4
    // 液位传感器 5
    if (SensorName === '甲烷') {
      this.sensorType = "1"
    } else if (SensorName === '氧气') {
      this.sensorType = "2"
    } else if (SensorName === '硫化氢') {
      this.sensorType = "3"
    } else if (SensorName === '一氧化碳') {
      this.sensorType = "4"
    } else if (SensorName === '液位传感器') {
      this.sensorType = "5"
    }
  }
  // 求平均值 
  getAverage (data: Array<number>) {
    let sum = 0;
    data.forEach( (val) => {
      sum += val
    })
    this.average = Number((sum/data.length).toFixed(2))
  }
  // 求最大值和最小值
  getExtremeValue (data: Array<number>) {
    let arr = data.concat([])
    arr.sort( (a,b) => {
      return a-b
    })
    this.maxData = Number(arr[data.length - 1].toFixed(2))
    this.minData = Number(arr[0].toFixed(2))
  }
  // 求分段
  getParts (data: Array<number>) {
    let part1 = 0
    let part2 = 0
    let part3 = 0
    let part4 = 0
    data.forEach( (val) => {
      if (val >= 0 && val <= 5) {
        part1++
      } else if (val > 5 && val <= 10) {
        part2++
      } else if (val > 10 && val <= 15) {
        part3++
      } else if (val > 15 && val <= 24) {
        part4++
      }
    })
    this.parts = [
      {value: part1, name:'0%~5%'},
      {value: part2, name:'5%~10%'},
      {value: part3, name:'10%~15%'},
      {value: part4, name:'15%~24%'}
    ]
  }
  // 更新下位机信息
  async initMachineInfo() {
    await this.$store.dispatch("getMachineInfo")
    // 把下位机信息显示
    let machineInfo: Array<any> = this.$store.state.machineInfo
    // 给值前先置空
    this.machine = []
    this.machineNormal.value = ''
    // 把下位机信息显示
    machineInfo.forEach((val) => {
      this.machine.push(val.devName)
    })
    this.machineNormal.value = this.machine[0] 
  }
  // 更新所有传感器信息，获取具体节点
  async initAllSensorInfo() {
    this.judgeSensorName(this.sensorNormal.value)
    let data = {
      nodeId: this.machineNormal.value.split("下位机")[1],
      type: this.sensorType
    }
    await this.$store.dispatch("getAllSensorInfo", data)
    let allSensorInfo: any = this.$store.state.allSensorInfo
    if (allSensorInfo.code && allSensorInfo.code === -1) {
      this.hasData = false
      return 
    } else {
      this.hasData = true
    }
    // 给值前先置空
    this.sensorIDOptions = []
    this.sensorIDNormal.value = ''
    // 把节点信息显示
    allSensorInfo.forEach((val: any) => {
      this.sensorIDOptions.push(String(val.sensorAdd))
    })
    for (let i = 0; i < this.sensorIDOptions.length; i++) {
      if (this.sensorIDOptions[i] === '51') {
        this.sensorIDOptions.splice(i, 1);
        this.sensorIDOptions.unshift('51');
      }
    }
    this.sensorIDNormal.value = this.sensorIDOptions[0] 
  }
  // 更新传感器获取数据
  async initSensorData() {
    this.judgeSensorName(this.sensorNormal.value)
    let data = {
      nodeId: this.machineNormal.value.split("下位机")[1],
      type: this.sensorType,
      startTime: moment(this.dateValue).format('YYYY-MM-DD')+'-00:00:00',
      endTime: moment(this.dateValue).format('YYYY-MM-DD')+'-23:59:59',
      sensorAdd: this.sensorIDNormal.value
    }
    await this.$store.dispatch('getSensorData', data)
    let sensorData: any = this.$store.state.sensorData
    if (sensorData.code && sensorData.code === -1) {
      this.hasData = false
      return 
    } else {
      this.hasData = true
    }
    // 给值前先置空
    this.XData = []
    this.YData = []
    sensorData.data.forEach( (val: any) => {
      let time = val.measureTime.split(" ")[1]
      this.XData.push(time)
      this.YData.push(val.value)
    })
    this.sensorIDNormal.value = this.sensorIDOptions[0]
  }
  // 更新图表数据
  async initChartData() {
    this.getAverage(this.YData)
    this.getExtremeValue(this.YData)
    this.getParts(this.YData)

    this.lineChartOptions.xAxis.data = this.XData
    this.lineChartOptions.series.data = this.YData
    this.lineChartOptions.title.text = this.sensorNormal.value + "监测结果"
    
    this.barChartOptions.xAxis.data = this.XData
    this.barChartOptions.series.data = this.YData
    this.barChartOptions.title.text = this.sensorNormal.value + "监测结果"
    
    this.pieChartOptions.title.text = this.sensorNormal.value + "监测结果"
    this.pieChartOptions.series.data = this.parts
  }
  // MachineInfo选择栏发生变化，触发更新
  async updateMachineInfo() {
    this.initAllSensorInfo ()
    this.initSensorData()
    this.initChartData()
  }
  async updateAllSensorInfo() {
    this.judgeSensorName(this.sensorNormal.value)
    let data = {
      nodeId: this.machineNormal.value.split("下位机")[1],
      type: this.sensorType
    }
    await this.$store.dispatch("getAllSensorInfo", data)
    let allSensorInfo: any = this.$store.state.allSensorInfo
    // 给值前先置空
    this.sensorIDOptions = []
    this.sensorIDNormal.value = ''
    // 把节点信息显示
    allSensorInfo.forEach((val: any) => {
      this.sensorIDOptions.push(String(val.sensorAdd))
    })
    await this.initSensorData()
    await this.initChartData()
  }
  async updateSensorData() {
    this.judgeSensorName(this.sensorNormal.value)
    let data = {
      nodeId: this.machineNormal.value.split("下位机")[1],
      type: this.sensorType,
      startTime: moment(this.dateValue).format('YYYY-MM-DD')+'-00:00:00',
      endTime: moment(this.dateValue).format('YYYY-MM-DD')+'-23:59:59',
      sensorAdd: this.sensorIDNormal.value
    }
    await this.$store.dispatch('getSensorData', data)
    let sensorData: any = this.$store.state.sensorData
    if (sensorData.code && sensorData.code === -1) {
      this.hasData = false
      return 
    } else {
      this.hasData = true
    }
    // 给值前先置空
    this.XData = []
    this.YData = []
    sensorData.data.forEach( (val: any) => {
      let time = val.measureTime.split(" ")[1]
      this.XData.push(time)
      this.YData.push(val.value)
    })
    await this.initChartData()
  }
  async updateChartData () {
    await this.initSensorData()
    await this.initChartData()
  }  

}

</script>

<style lang="scss">
  .analysis {

    .echarts {
      width: 95% !important;
    }

    .wrap {
      width: 90%;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .item {
        width: 50%;
        margin: 0 30px;
        .choose {
          font-size: 80px;
        }
      }
      
    }

    .subTitle1 {
      margin: 80px 0;
      font-size: 80px;
      &::before {
        content: '';
        border-left: 20px #ff6f00 solid;
        padding-left: 30px;
      }
    }

    .subTitle2 {
      position: relative;
      height: 200px;
      .content {
        margin-bottom: 100px;
        font-size: 80px;
        &::before {
          content: '';
          border-left: 20px #ff6f00 solid;
          padding-left: 30px;
        }
      }
      .chooseCharts {
        position: absolute;
        top: 0;
        right: 50px;
        font-size: 80px;
        .radio {
          margin: 0 15px;
        }
      }
    }

    .chartWrap{
      .chart {
        width: 100%;
        margin: 0 auto;
      }
      .statistics {
        margin: 40px auto;
        width: 90%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        .chip {
          margin: 0 10px;
        }
      }
      .update {
        display: block;
        margin: 80px auto;
        width: 60%;
      }
    }

    .alert {
      width: 90%;
      margin: 0 auto;
      .icon {
        margin-right: 30px;
      }
      .content {
        font-size: 66px;
      }
    }
  }
</style>