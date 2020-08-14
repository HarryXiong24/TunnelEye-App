<template>
  <div class="warning">

    <p class="title">当日天气</p>

    <mu-row class="weather" v-if="weatherData.has">
      <mu-alert color="#ec407a" class="item">
        <mu-icon value="filter_drama" class="icon"></mu-icon> 
        <p class="content">{{weatherData.city}}</p>
      </mu-alert>

      <mu-alert color="#039be5" class="item">
        <mu-icon value="wb_cloudy" class="icon"></mu-icon> 
        <p class="content">{{weatherData.type}}</p>
      </mu-alert>

      <mu-alert color="#9c27b0" class="item">
        <mu-icon value="toys" class="icon"></mu-icon> 
        <p class="content">{{weatherData.windPower}}</p>
      </mu-alert>

      <mu-alert color="#ffca28" class="item">
        <mu-icon value="wb_sunny" class="icon"></mu-icon>
        <p class="content">{{weatherData.average}}</p>
      </mu-alert>

      <mu-alert color="#4caf50" class="item">
        <mu-icon value="network_check" class="icon"></mu-icon> 
        <p class="content">{{weatherData.low}}</p>
      </mu-alert>

      <mu-alert color="#f44336" class="item">
        <mu-icon value="flash_on" class="icon"></mu-icon> 
        <p class="content">{{weatherData.high}}</p>
      </mu-alert>
    </mu-row>

    <mu-row v-else>
      <mu-alert color="error" class="alert">
        <mu-icon value="warning" class="icon"></mu-icon> 
        <p class="content">抱歉，当前位置获取失败，暂无数据</p>
      </mu-alert>
    </mu-row> 

    <p class="title">安全手册</p>

    <mu-row>
      <mu-col span="12" lg="4" sm="6">
        <mu-carousel transition="fade" interval="3000" class="carousel">

          <mu-icon value="navigate_before" slot="left"></mu-icon>
          <mu-icon value="navigate_next" slot="right"></mu-icon>
          <template slot="indicator" slot-scope="{ index, active }">
            <mu-button icon class="mu-carousel-indicator-button" :class="{'mu-carousel-indicator-button__active': active}" @click="changeActive(index)">
              <span class="rect-indicator"></span>
            </mu-button>
          </template>

          <mu-carousel-item class="item">
            <img :src="carouselImg1" class="img">
          </mu-carousel-item>
          <mu-carousel-item class="item">
            <img :src="carouselImg2" class="img">
          </mu-carousel-item>
          <mu-carousel-item class="item">
            <img :src="carouselImg3" class="img">
          </mu-carousel-item>
        </mu-carousel>
      </mu-col>
    </mu-row>

    <p class="title">预警信息</p>

    <mu-row class="hint">
      <mu-sub-header class="subHeader">预警程度</mu-sub-header>
      <mu-chip class="demo-chip" color="#4caf50">
        <mu-icon left value="check_circle"></mu-icon>普通
      </mu-chip>   
      <mu-chip class="demo-chip" color="#ffca28">
        <mu-icon left value="priority_high"></mu-icon>警告
      </mu-chip>  
      <mu-chip class="demo-chip" color="#f44336">
        <mu-icon left value="warning"></mu-icon>严重
      </mu-chip> 
    </mu-row>


    <mu-tabs :value.sync="sync" inverse color="secondary" text-color="rgba(0, 0, 0, .54)" center full-width>
      <mu-tab @click="changeTab">消息预警</mu-tab>
      <mu-tab @click="changeTab">传感器预警</mu-tab>
    </mu-tabs>

    <mu-row class="listWrap" v-if="sync === 0">
      <mu-col span="12" lg="4" sm="6">

        <mu-list textline="two-line" class="list">
          <mu-sub-header class="subHeader">消息预警</mu-sub-header>
          
          <MessageList v-for="(list, index) in lists" :key=index :list="list"></MessageList>

        </mu-list>

        <mu-container>
          <mu-flex justify-content="center">
            <mu-pagination :page-size="pageSize" raised circle :total="total" :current.sync="current" @change="changePage"></mu-pagination>
          </mu-flex>
        </mu-container>

      </mu-col>
    </mu-row>

    <mu-row class="listWrap" v-if="sync === 1">
      <mu-col span="12" lg="4" sm="6">

        <mu-list textline="two-line" class="list">
          <mu-sub-header class="subHeader">传感器预警</mu-sub-header>
          
          <MessageList v-for="(list, index) in lists" :key=index :list="list"></MessageList>

        </mu-list>

        <mu-container>
          <mu-flex justify-content="center">
            <mu-pagination :page-size="pageSize" raised circle :total="total" :current.sync="current" @change="changePage"></mu-pagination>
          </mu-flex>
        </mu-container>

      </mu-col>
    </mu-row>

  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { reqIP } from '../../api/index';
import MessageList from '../../components/MessageList/MessageList.vue';
import moment from 'moment';
import carouselImg1 from './img/1.jpg';
import carouselImg2 from './img/2.jpg';
import carouselImg3 from './img/3.jpg';

@Component({
  components: {
    MessageList
  }
})
export default class Warning extends Vue {
  // 轮播图的切换
  public active: number = 0
  // 天气数据
  public weatherData = {
    has: false,
    city: '',
    type: '',
    windPower: '',
    average: '',
    high: '',
    low: '',
  }
  // 消息类型切换
  public sync: number = 0
  // 当前页码
  public current: number = 1
  // 页码总数
  public total: number = 1
  // 每页数量
  public pageSize: number = 10
  // 信息列表
  public lists: Array<any> = []

  data() {
    return {
      carouselImg1,
      carouselImg2,
      carouselImg3,
    }
  }

  changeActive(index: number) {
    this.active = index;
  }

  async getWeather() {
    let IPInfo = await reqIP()
    if (IPInfo && IPInfo.status === 200) {
      let city = IPInfo.data.cityInfo.split("-")[2]
      let data = {city: city}
      await this.$store.dispatch('getWeatherInfo', data)
      let weatherInfo = this.$store.state.weatherInfo 
      if (weatherInfo && weatherInfo.status === 1000) {
        this.weatherData.has = true
        let data = weatherInfo.data
        this.weatherData.city = data.city
        this.weatherData.type = data.forecast[0].type

        // 计算风力
        let windRank = data.forecast[0].fengli.match(/\d/)

        this.weatherData.windPower = data.forecast[0].fengxiang + windRank + '级'
        this.weatherData.average = '平均 ' + data.wendu + '℃'
        this.weatherData.low = data.forecast[0].low
        this.weatherData.high = data.forecast[0].high

      } else {
        this.weatherData.has = false
      }
    } else {
      this.weatherData.has = false
    }
  }

  async getMessageLists() {
    // 定义参数
    let data: any = {}
    // 判断预警种类
    if (this.sync === 0) {
      data = {
        limit: 6,
        page: this.current,
        type: 0
      }
    } else if (this.sync === 1) {
      data = {
        limit: 6,
        page: this.current,
        type: 1
      }
    }

    await this.$store.dispatch('getMessageLists', data)
    let messageLists = this.$store.state.messageLists
    this.total = messageLists.count
    this.lists = messageLists.data
    this.pageSize = data.limit
  }

  async changePage() {
    // 定义参数
    let data: any = {}
    // 判断预警种类
    if (this.sync === 0) {
      data = {
        limit: 6,
        page: this.current,
        type: 0
      }
    } else if (this.sync === 1) {
      data = {
        limit: 6,
        page: this.current,
        type: 1
      }
    }

    await this.$store.dispatch('getMessageLists', data)
    let messageLists = this.$store.state.messageLists
    this.lists = messageLists.data
    this.pageSize = data.limit
  }

  async mounted() {
    await this.getWeather()
    await this.getMessageLists()
  }

  async changeTab() {
    await this.getMessageLists()
  }
}

</script>

<style lang="scss">
  .warning {
    .title {
      margin: 80px 0;
      font-size: 80px;
      &::before {
        content: '';
        border-left: 20px #ff6f00 solid;
        padding-left: 30px;
      }
    }

    .weather {
      .item {
        width: 520px;
        height: 300px;
        margin: 20px auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .icon {
          margin: 20px auto;
        }
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

    .carousel {
      height: 1000px;
      width: 100%;
      .item {
        .img {
          height: 1000px;
          width: 100%;
        }
      }
    }

    .hint {
      margin: 80px 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .subHeader {
        font-size: 80px;
      }
      .demo-chip {
        margin: 8px auto;
        vertical-align: middle;
        font-size: 66px;
        height: 160px;
      }
    }

    .listWrap {
      margin: 60px 0;
      .list {
        .subHeader {
          font-size: 80px;
        }
      }
    }
  }
</style>