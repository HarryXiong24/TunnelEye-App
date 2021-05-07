<template>
  <div class="app">
    <!-- Init页面应该控制不同位置的显示 -->
    <HeadTop :title="headTitle">
    </HeadTop>
    <div>
      <router-view/>
    </div>
    <!-- 占位用 -->
    <div class="bottom"></div>
    <mu-row justify-content="center" class="footerGuide">
      <mu-col span="12">
        <mu-bottom-nav :value.sync="shift" ripple color="amber800" @change="getHead">
          <mu-bottom-nav-item value="newLocation" title="人员定位" icon="accessibility_new" to="/Init/newLocation" replace></mu-bottom-nav-item>
          <mu-bottom-nav-item value="PersonInfo" title="出勤信息" icon="assignment" to="/Init/PersonInfo" replace></mu-bottom-nav-item>
          <mu-bottom-nav-item value="Analysis" title="环境监测" icon="assessment" to="/Init/Analysis" replace></mu-bottom-nav-item>
          <mu-bottom-nav-item value="Warning" title="预警信息" icon="info" to="/Init/Warning" replace></mu-bottom-nav-item>
        </mu-bottom-nav>
      </mu-col>
    </mu-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import HeadTop from '../../components/HeadTop/HeadTop.vue';

@Component({
  components: {
    HeadTop
  }
})
export default class Init extends Vue {
  private shift: string = 'Location'
  public headTitle: string = ''

  getHead() {
    if (this.shift === 'Location') {
      this.headTitle = '人员定位'
    } else if (this.shift === 'PersonInfo') {
      this.headTitle = '出勤信息'
    } else if (this.shift === 'Analysis') {
      this.headTitle = '环境监测'
    } else if (this.shift === 'Warning') {
      this.headTitle = '预警信息'
    }
  }

  async redirectTab() {
    let values = this.$route.path.split("/")
    this.shift = this.$route.path.split("/")[values.length - 1]
    this.getHead()
  }

  mounted() {
    this.redirectTab()
  }
}

</script>

<style lang="scss">
  .app {
    .bottom {
      width: 100%;
      height: 300px;
      background: #fafafa;
      z-index: 0;
    }
    .footerGuide {
      position: fixed;
      width: 100%;
      bottom: 0;
      z-index: 1000;
      background-color: white;
    }
  }
</style>