<template>
  <div class="physicalSign">
    <FunctionTop title="体征信息"></FunctionTop>

    <div class="subTitle">体征信息概览</div>

    <mu-row gutter justify-content="center">
      <mu-col span="12">
        <div class="chart">
          <v-chart :options="radarChart" class="echarts"></v-chart>
        </div>
      </mu-col>
    </mu-row>

    <mu-row gutter justify-content="center">
      <mu-col span="12" class="list"> 
        <div class='title'>定位信息</div>
        <PhysicalInfo :person="person" :data="data"></PhysicalInfo>
      </mu-col>
    </mu-row>

  </div>
  
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import FunctionTop from '../../components/FunctionTop/FunctionTop.vue';
import PhysicalInfo from '../../components/PhysicalInfo/PhysicalInfo.vue';

@Component({
  components: {
    FunctionTop,
    PhysicalInfo
  }
})
export default class PhysicalSign extends Vue {
  
  public data: Array<number> = []

  // 人员信息
  public person: any = {
    id: "",
    name: "",
    sector: "",
    mobile: "",
    groupName: "",
  }

  // 雷达图参数
  public radarChart: any = {
    title: {
      text: '体征监测雷达图',
      textStyle: {
        fontStyle: "normal",
        fontSize: 14
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    radar: [
      {
        indicator: [
          {text: '心率', max: 100, color: 'black'},
          {text: '体温', max: 100, color: 'black'},
          {text: '血氧', max: 100, color: 'black'},
          {text: '步数', max: 100, color: 'black'},
          {text: '呼吸', max: 100, color: 'black'},
          {text: '血压', max: 100, color: 'black'},
        ],
        center: ['30%', '50%'],
        radius: 120,
        textStyle: {
          fontStyle: "normal",
          fontSize: 14,
        }
      },
    ],
    series: [
      {
        type: 'radar',
        tooltip: {
          trigger: 'item'
        },
        areaStyle: {
          color: '#9a3ab8'
        },
        data: [
          {
            value: [],
            name: '体征信息'
          }
        ]
      },
    ]
  }

  // 获取指定UWB数据
  async getPersonData() {
    let data = {
      labelId: this.$route.query.labelAdd
    }

    await this.$store.dispatch('getUWBData', data);
    let UWBData = this.$store.state.UWBData
    console.log(UWBData)
    
    this.person.id = UWBData.userid
    this.person.name = UWBData.userName
    this.person.sector = UWBData.depName
    this.person.mobile = UWBData.mobile
    this.person.groupName = UWBData.groupName
  } 

  mounted() {
    this.getPersonData()

    this.data = []
    for(let i = 0; i < 6; i++) {
      this.data.push(this.randomNum(20, 80))
    }
    this.update()
    this.simulatedData()
    // setInterval( () => {
    //   this.data = []
    //   for(let i = 0; i < 6; i++) {
    //     this.data.push(this.randomNum(20, 80))
    //   }
    //   this.radarChart.series[0].data[0].value = this.data
    // }, 3000)
  }

  // 渲染雷达图数据
  update() {
    this.radarChart.series[0].data[0].value = this.data
  }

  // 模拟数据
  simulatedData() {
    setInterval( () => {
      this.data = []
      for(let i = 0; i < 6; i++) {
        this.data.push(this.randomNum(20, 80))
      }
      this.update()
    }, 3000)
  }

  // 生成从minNum到maxNum的随机数
  randomNum(minNum: number, maxNum: number) {
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
}

</script>

<style lang="scss">
.physicalSign {
  .subTitle {
    margin-top: 80px;
    font-size: 80px;
    &::before {
      content: '';
      border-left: 20px #ff6f00 solid;
      padding-left: 30px;
    }
    margin-bottom: 80px;
  }
  .chart {
    width: 100%;
    margin: 0 auto;
    border: 10px #ff6f00 dashed;
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
}
</style>