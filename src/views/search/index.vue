<template>
  <div class="app-container">
<!--  搜索部分  -->
    <p style="margin-left: 10%;color: #97a8be">*支持查询字段：工地名称、设备名称、设备类型</p>
    <el-form ref="form" :model="search" label-width="120px" style="margin-right: 30%">

      <el-form-item label="搜索">
        <el-input v-model="search.name" />
      </el-form-item>

      <el-form-item >
        <el-button type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>

<!--工地信息  -->
    <el-table v-if="sites!=null"
      v-loading="listLoading"
      :data="sites"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="margin-left: 5%"
    >

      <el-table-column align="center" label="序号" width="95">
        <!-- slot-scope : 插槽
            scope : 当前行对象的引用
        -->
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="工地ID" width="95" align="center">
        <template slot-scope="scope">
          <!--  scope.row : 获取当前行数据 -->
          {{ scope.row.siteId }}
        </template>
      </el-table-column>

      <el-table-column label="工地名称" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.siteName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户ID" width="95" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="设备ID" width="95" align="center">
        <template slot-scope="scope">
          <span >{{ scope.row.deviceId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="设备名称" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="设备状态" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceStatus ==1?'在线':scope.row.deviceStatus==0?'离线':''}}</span>
        </template>
      </el-table-column>

      <el-table-column label="设备类型" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceType}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: {
        name: '',
        // resource: ''
      },
      sites:null,
      devices:null,
      listLoading: false
    }
  },
  methods: {
    onSubmit() {
      this.listLoading=true;

      let name = this.search.name;
      let resource = this.search.resource;
      let url = 'http://localhost:80/search/s/'+name;
      this.axios.get(url).then(res=>{
        let result = res.data;
        if (result.success){
          this.$message({
            message:result.message,
            type:'success'
          });
          this.sites=result.data;
          this.listLoading=false;
        }else {
          this.$message.error(result.message);
        }
      })
    },

  },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

