<template>
  <mu-appbar style="width: 100%;" color="#1a1a1a" class="topBar">
    <mu-menu slot="left">
      <mu-button icon class="icon" @click="back">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>
    </mu-menu>
    <div slot="default" class="title">
      <div>{{title}}</div>
      <div>{{time}}</div>
    </div>
  </mu-appbar>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import moment from 'moment';

@Component
export default class FunctionTop extends Vue {
  @Prop(String) private title!: string
  private time: string = ''
  private value: string = ''
  private open: boolean = false

  back () {
    this.$router.back()
  }

  mounted () {
    setInterval( () => {
      this.time = moment().format('YYYY年M月H日 HH:mm:ss')
    }, 100)
  }
}
</script>

<style lang="scss">
  .topBar {
    .title {
      font-size: 70px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .icon {
      margin-top: 20px;
    }
  }
</style>