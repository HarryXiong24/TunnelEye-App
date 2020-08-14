<template>
  <mu-list-item avatar button :ripple="false" @click="goMessageContent(list.infoId)">
    <mu-list-item-action>
      <mu-avatar color="#4caf50" v-if="icon === 0">
        <mu-icon value="check_circle"></mu-icon>
      </mu-avatar>
      <mu-avatar color="#ffca28" v-else-if="icon === 1">
        <mu-icon value="priority_high"></mu-icon>
      </mu-avatar>
      <mu-avatar color="#f44336" v-else-if="icon === 2">
        <mu-icon value="warning"></mu-icon>
      </mu-avatar>
    </mu-list-item-action>
    <mu-list-item-content>
      <mu-list-item-title>{{list.infoTitle}}</mu-list-item-title>
      <mu-list-item-sub-title>{{list.infoTime}}</mu-list-item-sub-title>
    </mu-list-item-content>
    <mu-list-item-action>
      <mu-button icon>
        <mu-icon value="info"></mu-icon>
      </mu-button>
    </mu-list-item-action>
  </mu-list-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class MessageList extends Vue {
  @Prop(Object) public list!: any
  public icon: number = 0

  chooseIcon() {
    if (this.list.level === '普通') {
      this.icon = 0
    } else if (this.list.level === '警告') {
      this.icon = 1
    } else if (this.list.level === '严重') {
      this.icon = 2
    } 
  }

  goMessageContent(value: number) {
    this.$router.push(`/MessageContent?InfoId=${value}`)
  }

  mounted() {
    this.chooseIcon()
  }
  updated() {
    this.chooseIcon()
  }
}

</script>

<style lang="scss">
  // 普通 #4caf50 check_circle
  // 警告 #ffca28 priority_high
  // 严重 #f44336 warning
</style>