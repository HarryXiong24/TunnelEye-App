<template>
  <div class="messageContent">
    <FunctionTop title="预警详情"></FunctionTop>

    <div class="subtitle">预警正文</div>

    <div class="card">
      <mu-card raised>

        <mu-card-title :title="messageContent.infoTitle" :sub-title="messageContent.infoTime"></mu-card-title>
        
        <mu-card-header :title="messageContent.infoType" :sub-title="messageContent.level">
          <mu-avatar slot="avatar" color="#4caf50" v-if="icon === 0">
            <mu-icon value="check_circle"></mu-icon>
          </mu-avatar>
          <mu-avatar slot="avatar" color="#ffca28" v-else-if="icon === 1">
            <mu-icon value="priority_high"></mu-icon>
          </mu-avatar>
          <mu-avatar slot="avatar" color="#f44336" v-else>
            <mu-icon value="warning"></mu-icon>
          </mu-avatar>
        </mu-card-header>

        <mu-card-text>{{messageContent.infoContent}}</mu-card-text>

      </mu-card>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FunctionTop from '../../components/FunctionTop/FunctionTop.vue';

@Component({
  components: {
    FunctionTop
  }
})
export default class MessageContent extends Vue {
  private messageContent: any = {}
  private icon: number = 0

  chooseIcon() {
    if (this.messageContent.level === '普通') {
      this.icon = 0
    } else if (this.messageContent.level === '警告') {
      this.icon = 1
    } else if (this.messageContent.level === '严重') {
      this.icon = 2
    } else {
      this.icon = 0
    }
  }

  async getMessageContent() {
    let data = {
      infoId: this.$route.query.InfoId
    }

    await this.$store.dispatch('getMessageContent', data)
    this.messageContent = this.$store.state.messageContent
  } 

  async mounted() {
    await this.getMessageContent()
    this.chooseIcon()
  }
}

</script>

<style lang="scss">
  .messageContent{

    .subtitle {
      margin: 80px 0;
      font-size: 80px;
      &::before {
        content: '';
        border-left: 20px #ff6f00 solid;
        padding-left: 30px;
      }
    }

    .card {
      width: 95%; 
      margin: 0 auto;
    }
  }
</style>