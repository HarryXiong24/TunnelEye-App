<template>
  <div class="userInfo">
    <FunctionTop title="账户信息"></FunctionTop>

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
import { Component, Vue } from 'vue-property-decorator';
import { decrypt } from '../../util/crypto';
import FunctionTop from '../../components/FunctionTop/FunctionTop.vue';

@Component({
  components: {
    FunctionTop
  }
})
export default class UserInfo extends Vue {
  private userInfo: {} = {}

  back () {
    this.$router.back()
  }

  mounted() {
    this.userInfo = JSON.parse(decrypt(sessionStorage.getItem('userInfo')!))
  }
}

</script>

<style lang="scss">
.userInfo{
  .item {
    .id {
      text-align: end;
    }
  }
}
</style>