<template>
  <div class="app-container">
    <el-form :model="site" label-width="120px">
      <el-form-item label="工地ID" >
        <el-input v-model="site.siteId" :disabled="true"/>
      </el-form-item>
      <el-form-item label="工地名称">
        <el-input v-model="site.siteName" />
      </el-form-item>
<!--      <el-form-item label="所有者Id">-->
<!--        <el-input v-model="site.userId" />-->
<!--      </el-form-item>-->
      <el-form-item label="所有者">
        <el-select v-model="site.userId" placeholder="请选择" >
          <!--          遍历输出，-->
          <el-option v-for="val in this.users" :key="val.userId" :value="val.userId" :label="val.userName" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="update()">修改</el-button>
        <el-button type="primary" @click="onCancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      site: {
        siteId: 0,
        siteName: '',
        userId: 0,
        userName:''
      },
      users:[]
    }
  },
  mounted() {
    let siteId = this.$route.params.siteId;
    let url = "http://localhost:80/site/select/" + siteId;
    let url2 = "http://localhost:80/user/users/";
    this.axios.get(url, null).then(res=>{
      let result = res.data;
      this.site = result.data;
    });
    this.axios.get(url2, null).then(res=>{
      let result = res.data;
      this.users = result.data;
    });
  },
  methods: {
    update() {
      //发送ajax请求
      let url = "http://localhost:80/site/update";
      this.axios.post(url, this.site).then(res => {
        let result = res.data;
        if(result.success) {
          this.$message({
            message: result.message,
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push("/site/list");
          },500);
        } else {
          this.$message.error(result.message);
        }
      });
    },
    onCancel() {
      this.$message('已取消')
      setTimeout(() => {
        this.$router.push("/site/list");
      },500);
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

