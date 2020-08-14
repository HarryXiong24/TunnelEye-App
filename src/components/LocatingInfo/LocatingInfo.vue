<template>
  <mu-list textline="two-line" class="subList">
    <mu-divider></mu-divider>

    <mu-list-item avatar :ripple="false">
      <mu-icon value="star" left></mu-icon>
      <mu-list-item-content class="wrap">
        <mu-list-item-title class="name">姓名</mu-list-item-title>
        <mu-list-item-sub-title class="content">{{locatingInfo.name}}</mu-list-item-sub-title>
      </mu-list-item-content>
      <mu-list-item-action class="item">
        <mu-list-item-after-text class="msg">所属部门: {{locatingInfo.sector}}</mu-list-item-after-text>
      </mu-list-item-action>
      <mu-icon value="assignment_ind" right></mu-icon>
    </mu-list-item>

    <mu-divider></mu-divider>

    <mu-list-item avatar :ripple="false">
      <mu-icon value="star" left></mu-icon>
      <mu-list-item-content class="wrap">
        <mu-list-item-title class="name">工号</mu-list-item-title>
        <mu-list-item-sub-title class="content">{{locatingInfo.id}}</mu-list-item-sub-title>
      </mu-list-item-content>
      <mu-list-item-action class="item">
        <mu-list-item-after-text class="msg">手机: {{locatingInfo.mobile}}</mu-list-item-after-text>
      </mu-list-item-action>
      <mu-icon value="assignment_turned_in" right></mu-icon>
    </mu-list-item>

    <mu-divider></mu-divider>

    <mu-list-item avatar :ripple="false">
      <mu-icon value="star" left></mu-icon>
      <mu-list-item-content class="wrap">
        <mu-list-item-title class="name">位置坐标</mu-list-item-title>
        <mu-list-item-sub-title class="content">{{locatingInfo.position}}</mu-list-item-sub-title>
      </mu-list-item-content>
      <mu-list-item-action class="item">
        <mu-list-item-after-text class="msg">所在班组: {{locatingInfo.groupName}}</mu-list-item-after-text>
      </mu-list-item-action>
      <mu-icon value="room" right></mu-icon>
    </mu-list-item>

    <mu-divider></mu-divider>

    <mu-list-item avatar :ripple="false"> 
      <mu-icon value="star" left></mu-icon>
      <mu-list-item-content class="wrap">
        <mu-list-item-title class="name">获得时间</mu-list-item-title>
        <mu-list-item-sub-title class="content">{{locatingInfo.measureTime}}</mu-list-item-sub-title>
      </mu-list-item-content>
      <mu-list-item-action style="margin-right: 9px;">
        <mu-list-item-after-text></mu-list-item-after-text>
      </mu-list-item-action>
      <mu-icon value="update" right></mu-icon>
    </mu-list-item>

    <mu-divider></mu-divider>

  </mu-list> 

</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class LocatingInfo extends Vue {
  @Prop(Object) private locatingInfo!: any
}

</script>

<style lang="scss">
  .subList {
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
</style>