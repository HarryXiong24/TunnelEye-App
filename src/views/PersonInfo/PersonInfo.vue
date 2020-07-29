<template>
  <div class="personInfo">

    <p class="subTitle1">选择信息</p>
    
    <mu-row class="wrap">   
      <mu-col span="12" lg="4" sm="6">
       <mu-date-input
          actions
          action-icon="today"
          v-model="dateValue"
          label="请选择日期"
          container="bottomSheet"
          label-float
          full-width
          @change="submit"
        ></mu-date-input>
      </mu-col>
    </mu-row>

    <mu-row class="wrap">   
      <mu-col span="12" lg="4" sm="6">
        <mu-select label="请选择出勤班组类型" v-model="normal.value" full-width class="choose" @change="groupShow(normal.value)">
          <mu-option v-for="(option, index) in options" :key="index" :label="option" :value="option"></mu-option>
        </mu-select>
      </mu-col>
    </mu-row>
    
    <mu-row>
      <mu-col span="12" lg="4" sm="6">
      <p class="subTitle2">统计结果</p>
      <mu-button icon color="red" class="update" @click="update()">
        <mu-icon value="autorenew" right></mu-icon>
      </mu-button>
      </mu-col>
    </mu-row>
    

    <mu-container>

      <PersonList :columns="columns" :list="lists[this.groupID]"></PersonList>

    </mu-container>

  </div>  
</template>

<script>
import {Component, Vue} from 'vue-property-decorator';


@Component
export default class PersonInfo extends Vue {
  
} 

</script>

<style>

</style>