<template>
  <div class="userInfo">
    <mu-appbar style="width: 100%;" color="#1a1a1a" class="topBar">
      <mu-menu slot="left">
        <mu-button icon class="icon" @click="back">
          <mu-icon value="keyboard_arrow_left"></mu-icon>
        </mu-button>
      </mu-menu>
      <div class="title">用户信息</div>
    </mu-appbar>

    <mu-list>
      <mu-list-item button :ripple="true" class="item">
        <mu-list-item-action>
          <mu-icon value="account_circle"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>登录名</mu-list-item-title>
        <mu-list-item-title class="id">{{userInfo.loginName}}</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="info"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>

      <mu-list-item button :ripple="true" class="item">
        <mu-list-item-action>
          <mu-icon value="fingerprint"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>工号</mu-list-item-title>
        <mu-list-item-title class="id">{{userInfo.idCard}}</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="info"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>

      <mu-list-item button :ripple="true" class="item">
        <mu-list-item-action>
          <mu-icon value="star"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>姓名</mu-list-item-title>
        <mu-list-item-title class="id">{{userInfo.userName}}</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="info"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>

      <mu-list-item button :ripple="true" class="item">
        <mu-list-item-action>
          <mu-icon value="phone_iphone"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>手机</mu-list-item-title>
        <mu-list-item-title class="id">{{userInfo.mobile}}</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="info"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>

      <mu-list-item button :ripple="true" class="item">
        <mu-list-item-action>
          <mu-icon value="account_balance"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>所属部门</mu-list-item-title>
        <mu-list-item-title class="id">{{userInfo.depName}}</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="info"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>

    </mu-list>

  </div>  
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class UserInfo extends Vue {
  public userInfo: {} = {}

  back () {
    this.$router.push('/Init')
  }

  mounted() {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo')!)
  }
}

</script>

<style lang="scss">
.userInfo{
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

  .item {
    .id {
      text-align: end;
    }
  }

}
</style>