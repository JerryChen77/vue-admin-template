<template>
  <div class="app-container">
    <el-form ref="form" :model="site" label-width="120px">
      <el-form-item label="工地名称">
        <el-input v-model="site.siteName"/>
      </el-form-item>
      <el-form-item label="所属用户">
        <el-select v-model="site.userId" placeholder="请选择用户" >
<!--          遍历输出，-->
          <el-option v-for="val in this.users" :key="val.userId" :value="val.userId" :label="val.userName" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit()">添加</el-button>
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
        siteName: '',
        userId: ''
      },
      users:[]
    }
  },
  mounted() {
    let url = "http://localhost:80/user/users/";
    this.axios.get(url, null).then(res=>{
      let result = res.data;
      console.log(result.data);
      this.users = result.data;
      // this.student.gender = result.data.gender.toString();
    });
  },
  methods: {
    submit() {
      console.log(123);
      let url="http://localhost:80/site/add";
      this.axios.post(url,this.site).then(res =>{
        let result = res.data;
        if (result.success){
          this.$message({
            message:result.message,
            type:'success'
          });
          setTimeout(()=>{
            this.$router.push("/site/list");
          },500);
        }else{
          this.$message.error(result.message);
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      });
      setTimeout(()=>{
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
