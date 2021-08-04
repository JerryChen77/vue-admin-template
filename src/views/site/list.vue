<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
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

      <el-table-column label="ID" width="95" align="center">
        <template slot-scope="scope">
          <!--  scope.row : 获取当前行数据 -->
          {{ scope.row.siteId }}
        </template>
      </el-table-column>
      <el-table-column label="工地名称" width="500" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.siteName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"  align="center">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row.siteId)">
            修改
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row.siteId)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleUpdate(siteId){
      this.$router.push("/site/update/" + siteId);
    },
    handleDelete(siteId){
      let url = 'http://localhost:80/site/sites/'+siteId;
      this.axios.delete(url).then(res=>{
        let result = res.data;
        if (result.success){
          this.$message({
            message:result.message,
            type:'success'
          });
          setTimeout(() => {
            this.$router.go(0)
            },300);
        }else {
          this.$message.error(result.message);
        }
      })
    },



    fetchData() {
      // eslint-disable-next-line no-unused-vars
      var userId = this.$store.getters.user.userId
      var url = 'http://localhost:80/site/sites/' + userId
      this.axios.get(url).then(res => {
        this.list = res.data.data
        this.listLoading = false
      })
    }
  }
}
</script>
