<template>
  <div class="app-container" >
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
      <pagination style="position: absolute;bottom: 0px;left: 25%;" v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
  </div>
</template>

<script>
  import Pagination from '@/components/Pagination'

  export default {
    inject:['reload'],
    components: { Pagination },
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
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 5
      }
    }
  },
    //钩子页面，vue对象创建完成后会被调用
  created() {
    this.fetchData()
  },
  methods: {
    handleUpdate(siteId){
      this.$router.push("/site/update/" + siteId);
    },
    handleDelete(siteId){
      var ret =confirm("工地相关设备将一同删除，请确认：");
      if (ret){
        let url = 'http://localhost:80/site/sites/'+siteId;
        this.axios.delete(url).then(res=>{
          let result = res.data;
          if (result.success){
            this.$message({
              message:result.message,
              type:'success'
            });
            setTimeout(() => {
              // this.$router.go(0)
              this.reload()
            },300);
          }else {
            this.$message.error(result.message);
          }
        })
      }
    },



    fetchData() {
      // eslint-disable-next-line no-unused-vars
      var userId = this.$store.getters.user.userId
      var url = 'http://localhost:80/site/sites/' + userId+"/"+this.listQuery.page + "/" + this.listQuery.limit;
      this.axios.get(url).then(res => {
        let vo = res.data;
        this.list = vo.data.records;
        this.total = vo.data.total;
        console.log(this.list);
        //不要加载图标
        this.listLoading = false;
      })
    }
  }
}
</script>
