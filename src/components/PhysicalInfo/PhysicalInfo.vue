<template>
  <mu-list textline="two-line" class="subList">
    <mu-divider></mu-divider>

    <mu-list-item avatar :ripple="false">
      <mu-icon value="star" left></mu-icon>
      <mu-list-item-content class="wrap">
        <mu-list-item-title class="name">姓名</mu-list-item-title>
        <mu-list-item-sub-title class="content">{{person.name}}</mu-list-item-sub-title>
      </mu-list-item-content>
      <mu-list-item-action class="item">
        <mu-list-item-after-text class="msg">所属部门: {{person.sector}}</mu-list-item-after-text>
      </mu-list-item-action>
      <mu-icon value="assignment_ind" right></mu-icon>
    </mu-list-item>

    <mu-divider></mu-divider>

    <mu-list-item avatar :ripple="false">
      <mu-icon value="star" left></mu-icon>
      <mu-list-item-content class="wrap">
        <mu-list-item-title class="name">工号</mu-list-item-title>
        <mu-list-item-sub-title class="content">{{person.id}}</mu-list-item-sub-title>
      </mu-list-item-content>
      <mu-list-item-action class="item">
        <mu-list-item-after-text class="msg">手机: {{person.mobile}}</mu-list-item-after-text>
        <mu-list-item-after-text class="msg">所在班组: {{person.groupName}}</mu-list-item-after-text>
      </mu-list-item-action>
      <mu-icon value="assignment_turned_in" right></mu-icon>
    </mu-list-item>

    <mu-divider></mu-divider>

    <mu-list-item avatar :ripple="false">
      <mu-icon value="star" left></mu-icon>
      <mu-list-item-content class="wrap">
        <mu-list-item-title class="name">心率</mu-list-item-title>
        <mu-list-item-sub-title class="content">{{data[0]}}</mu-list-item-sub-title>
      </mu-list-item-content>
      <mu-list-item-action class="item">
        <mu-list-item-after-text class="msg">正常值: 50-60 / min</mu-list-item-after-text>
      </mu-list-item-action>
    </mu-list-item>
    
    <mu-divider></mu-divider>

    <mu-list-item avatar :ripple="false">
      <mu-icon value="star" left></mu-icon>
      <mu-list-item-content class="wrap">
        <mu-list-item-title class="name">血压</mu-list-item-title>
        <mu-list-item-sub-title class="content">{{data[1]}}</mu-list-item-sub-title>
      </mu-list-item-content>
      <mu-list-item-action class="item">
        <mu-list-item-after-text class="msg">正常值: 55-70 / min</mu-list-item-after-text>
      </mu-list-item-action>
    </mu-list-item>
    
    <mu-divider></mu-divider>

    
    <mu-list-item avatar :ripple="false">
      <mu-icon value="star" left></mu-icon>
      <mu-list-item-content class="wrap">
        <mu-list-item-title class="name">呼吸</mu-list-item-title>
        <mu-list-item-sub-title class="content">{{data[2]}}</mu-list-item-sub-title>
      </mu-list-item-content>
      <mu-list-item-action class="item">
        <mu-list-item-after-text class="msg">正常值: 15-25 / min</mu-list-item-after-text>
      </mu-list-item-action>
    </mu-list-item>
    
    <mu-divider></mu-divider>

    
    <mu-list-item avatar :ripple="false">
      <mu-icon value="star" left></mu-icon>
      <mu-list-item-content class="wrap">
        <mu-list-item-title class="name">步数</mu-list-item-title>
        <mu-list-item-sub-title class="content">{{data[3]}}</mu-list-item-sub-title>
      </mu-list-item-content>
      <mu-list-item-action class="item">
        <mu-list-item-after-text class="msg">正常值: 55-70 / min</mu-list-item-after-text>
      </mu-list-item-action>
    </mu-list-item>
    
    <mu-divider></mu-divider>

    <mu-list-item avatar :ripple="false">
      <mu-icon value="star" left></mu-icon>
      <mu-list-item-content class="wrap">
        <mu-list-item-title class="name">血氧</mu-list-item-title>
        <mu-list-item-sub-title class="content">{{data[4]}}</mu-list-item-sub-title>
      </mu-list-item-content>
      <mu-list-item-action class="item">
        <mu-list-item-after-text class="msg">正常值: 68-75 / min</mu-list-item-after-text>
      </mu-list-item-action>
    </mu-list-item>
    
    <mu-divider></mu-divider>

    <mu-list-item avatar :ripple="false">
      <mu-icon value="star" left></mu-icon>
      <mu-list-item-content class="wrap">
        <mu-list-item-title class="name">体温</mu-list-item-title>
        <mu-list-item-sub-title class="content">{{data[5]}}</mu-list-item-sub-title>
      </mu-list-item-content>
      <mu-list-item-action class="item">
        <mu-list-item-after-text class="msg">正常值: 36-37.2</mu-list-item-after-text>
      </mu-list-item-action>
    </mu-list-item>
    
    <mu-divider></mu-divider>

  </mu-list> 

</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { reqMachineInfo } from '../../api/index';

@Component
export default class LocatingInfo extends Vue {
  @Prop(Object) private person!: any
  @Prop(Array) private data!: Array<number>
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