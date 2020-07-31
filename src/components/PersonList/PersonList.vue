<template>
  <mu-paper :z-depth="1">
    <mu-data-table :rowStyle="setrowStyle" stripe border :columns="columns" :sort.sync="sort" @sort-change="handleSortChange" :data="list">
      <template slot="expand" slot-scope="prop">
        <div style="padding: 24px;">
          <p>工号: {{prop.row.userid}}</p>
          <p>姓名: {{prop.row.userName}}</p>
          <p>性别: {{prop.row.sex}}</p>
          <p>是否到岗: {{prop.row.state}}</p>
          <p>到岗时间: {{prop.row.clockInTime}}</p>
        </div>
      </template>
      <!-- 自定义表头 -->
      <template slot="header">
        <tr style="height: 50px; lineHeight: 50px; backgroundColor: #ff5722;">
          <th class="is-left" id="th">工号</th>
          <th class="is-left" id="th">姓名</th>
          <th class="is-left" id="th">性别</th>
          <th class="is-left" id="th">是否到岗</th>
          <th class="is-left" id="th">到岗时间</th>
        </tr>
      </template>

      <template slot-scope="scope">
        <td class="is-left">{{scope.row.userid}}</td>
        <td class="is-left">{{scope.row.userName}}</td>
        <td class="is-left">{{scope.row.sex}}</td>
        <td class="is-left">{{scope.row.state}}</td>
        <td class="is-left">{{scope.row.clockInTime}}</td>
      </template>
    </mu-data-table>
  </mu-paper>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';


@Component
export default class PersonList extends Vue {
  private sort = {
    name: '',
    order: 'asc'
  }
  @Prop(Array) private columns!: Array<any>
  @Prop(Array) private list!: Array<any>

  handleSortChange({name, order}: {name: string, order: string}) {
    this.list = this.list.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name]);
  }

  setrowStyle(rowIndex: number) {
    if (rowIndex % 2 === 0) {
      return {
        height: '50px',
        lineHeight: '50px',
        backgroundColor: '#fbe9e7'
      }
    } else {
      return {
        height: '50px',
        lineHeight: '50px',
        backgroundColor: '#ffccbc'
      }
    }
  }

}
</script>

<style lang="scss">
  #th {
    color: white;
    font-size: 66px;
  }
</style>