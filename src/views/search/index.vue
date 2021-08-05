<template>
  <div class="app-container">
<!--  搜索部分  -->
    <el-form ref="form" :model="search" label-width="120px">
      <el-form-item label="搜索">
        <el-input v-model="search.name" />
      </el-form-item>

<!--      <el-form-item label="类别">-->
<!--        <el-radio-group v-model="search.resource">-->
<!--          <el-radio label="工地" value="site" />-->
<!--          <el-radio label="设备" value="device" />-->
<!--        </el-radio-group>-->
<!--      </el-form-item>-->

      <el-form-item>
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
          <span>{{ scope.row.deviceId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="设备名称" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="设备状态" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceStatus}}</span>
        </template>
      </el-table-column>

      <el-table-column label="设备类型" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceType}}</span>
        </template>
      </el-table-column>
    </el-table>









<!--&lt;!&ndash;   设备信息   &ndash;&gt;-->
<!--    <el-table-->
<!--      v-loading="listLoading"-->
<!--      :data="devices"-->
<!--      element-loading-text="Loading"-->
<!--      border-->
<!--      fit-->
<!--      highlight-current-row-->
<!--    >-->
<!--      <el-table-column align="center" label="序号" width="95">-->
<!--        &lt;!&ndash; slot-scope : 插槽-->
<!--            scope : 当前行对象的引用-->
<!--        &ndash;&gt;-->
<!--        <template slot-scope="scope">-->
<!--          {{ scope.$index + 1 }}-->
<!--        </template>-->
<!--      </el-table-column>-->

<!--      <el-table-column label="ID" width="95" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          &lt;!&ndash;  scope.row : 获取当前行数据 &ndash;&gt;-->
<!--          {{ scope.row.deviceId }}-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="设备状态" width="95" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ scope.row.deviceStatus }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="设备名称" width="180" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ scope.row.deviceName }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="设备类型" width="180" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ scope.row.deviceType }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="所属工地" width="180" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ scope.row.siteName }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="工地ID" width="95" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ scope.row.siteId }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->

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
          // if (resource==site){
          //   this.sites=result.data
          // }else {
          //   this.device=result.data
          // }
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

