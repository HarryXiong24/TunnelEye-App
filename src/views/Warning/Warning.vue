<template>
  <div class="warning">

    <p class="title">当日天气</p>

    <mu-row class="weather">
      <mu-alert color="#ffca28" class="item">
        <mu-icon value="wb_sunny" class="icon"></mu-icon>
        <p class="content">温度 30℃</p>
      </mu-alert>

      <mu-alert color="#4caf50" class="item">
        <mu-icon value="wb_cloudy" class="icon"></mu-icon> 
        <p class="content">多云转晴</p>
      </mu-alert>

      <mu-alert color="#039be5" class="item">
        <mu-icon value="toys" class="icon"></mu-icon> 
        <p class="content">西南风4级</p>
      </mu-alert>

      <mu-alert color="#ec407a" class="item">
        <mu-icon value="filter_drama" class="icon"></mu-icon> 
        <p class="content">空气质量优</p>
      </mu-alert>

      <mu-alert color="#9c27b0" class="item">
        <mu-icon value="network_check" class="icon"></mu-icon> 
        <p class="content">湿度45%</p>
      </mu-alert>

      <mu-alert color="#f44336" class="item">
        <mu-icon value="flash_on" class="icon"></mu-icon> 
        <p class="content">降水概率小</p>
      </mu-alert>
    </mu-row>

    <p class="title">预警信息</p>

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

    <mu-row class="listWrap">
      <mu-col span="12" lg="4" sm="6">

        <mu-divider></mu-divider>

        <mu-list textline="two-line" class="list">
          <mu-sub-header class="subHeader">消息预警</mu-sub-header>
          
          <mu-list-item avatar button :ripple="false">
            <mu-list-item-action>
              <mu-avatar color="#f44336">
                <mu-icon value="warning"></mu-icon>
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>大雨容易出现山体滑坡</mu-list-item-title>
              <mu-list-item-sub-title>2014-06-18</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <mu-button icon>
                <mu-icon value="info"></mu-icon>
              </mu-button>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item avatar button :ripple="false">
            <mu-list-item-action>
              <mu-avatar color="#4caf50">
                <mu-icon value="check_circle"></mu-icon>
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>高气温预警，预计达40摄氏度</mu-list-item-title>
              <mu-list-item-sub-title>2020-06-14</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <mu-button icon>
                <mu-icon value="info"></mu-icon>
              </mu-button>
            </mu-list-item-action>
          </mu-list-item>

          <mu-list-item avatar button :ripple="false">
            <mu-list-item-action>
              <mu-avatar color="#ffca28">
                <mu-icon value="priority_high"></mu-icon>
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>受气流影响，大风近期来临</mu-list-item-title>
              <mu-list-item-sub-title>2018-06-01</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <mu-button icon>
                <mu-icon value="info"></mu-icon>
              </mu-button>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>

        <mu-divider></mu-divider>

        <mu-list textline="two-line" class="list">
          <mu-sub-header class="subHeader">传感器预警</mu-sub-header>
          
          <mu-list-item avatar button :ripple="false">
            <mu-list-item-action>
              <mu-avatar color="#f44336">
                <mu-icon value="warning"></mu-icon>
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>隧道内一氧化碳浓度过高</mu-list-item-title>
              <mu-list-item-sub-title>2020-06-18</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <mu-button icon>
                <mu-icon value="info"></mu-icon>
              </mu-button>
            </mu-list-item-action>
          </mu-list-item>
          
          <mu-list-item avatar button :ripple="false">
            <mu-list-item-action>
              <mu-avatar color="#ffca28">
                <mu-icon value="priority_high"></mu-icon>
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>隧道内氧气含量开始减少</mu-list-item-title>
              <mu-list-item-sub-title>2020-06-18</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <mu-button icon>
                <mu-icon value="info"></mu-icon>
              </mu-button>
            </mu-list-item-action>
          </mu-list-item>

        </mu-list>
      </mu-col>
    </mu-row>

  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import carouselImg1 from './img/1.jpg';
import carouselImg2 from './img/2.jpg';
import carouselImg3 from './img/3.jpg';

@Component
export default class Warning extends Vue {
  private active:number = 0

  data() {
    return {
      carouselImg1,
      carouselImg2,
      carouselImg3,
    }
  }

  changeActive (index: number) {
    this.active = index;
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

  // 普通 #4caf50 check_circle
  // 警告 #ffca28 priority_high
  // 严重 #f44336 warning
  }
</style>