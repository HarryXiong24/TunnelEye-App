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

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PersonList from '../../components/PersonList/PersonList.vue';
import moment from 'moment';

@Component({
  components: {
    PersonList
  }
})
export default class PersonInfo extends Vue {
  public options: Array<any> = []
  public normal: any = {
    value: ""
  }
  public groupID: number = 0 
  public columns: Array<object> =  [
    { title: '工号', name: 'userid', width: 116, },
    { title: '姓名', name: 'userName', width: 90,},
    { title: '性别', name: 'sex', width: 76,},
    { title: '是否在岗', name: 'state', width: 100,},
    { title: '到岗时间', name: 'clockInTime', width: 200},
  ]
  public lists: Array<any> = []
  public dateValue: any = new Date('2020-06-01')


  async submit () {
    let date = {date: moment(this.dateValue).format('YYYY-MM-DD')}
    await this.$store.dispatch("getPersonInfo", date)
    this.options = [],
    this.lists = [],
    this.normal.value = "",
    this.$store.state.personInfo.forEach( (value: any) => {
      this.options.push(value.groupName)
      this.lists.push(value.users)
    })
    this.normal.value = this.options[0]
  }

  groupShow(value: any) {
    for (let i = 0; i < this.options.length; i++) {
      if (value === this.options[i]) {
        this.groupID = i;
      }
    }
  }

  update () {
    this.submit()
    this.groupShow(this.options[0])
  }

  mounted () {
    this.submit()
  }

} 

</script>

<style lang="scss">
  .personInfo {
    .title {
      font-size: 70px;
      .site {
        float: left;
      }
      .status {
        float: right;
      }
    }

    .wrap {
      display: block;
      width: 90%;
      margin: 0 auto;
      .choose {
        font-size: 86px;
      }
    }

    #th {
      color: white;
      font-size: 66px;
    }

    .subTitle1 {
      margin: 80px 0;
      font-size: 80px;
      &::before {
        content: '';
        border-left: 20px #ff6f00 solid;
        padding-left: 30px;
      }
    }

    .subTitle2 {
      margin-bottom: 100px;
      font-size: 80px;
      &::before {
        content: '';
        border-left: 20px #ff6f00 solid;
        padding-left: 30px;
      }
    }

    .update {
      position: absolute;
      right: 0;
      bottom: 50px;
    }

  }
</style>