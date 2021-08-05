<template>
  <div class="app-container">
    <el-form ref="form" :model="device" label-width="120px">
      <el-form-item label="设备名称">
        <el-input v-model="device.deviceName" />
      </el-form-item>
      <el-form-item label="设备状态">

        <el-select v-model="device.deviceStatus" placeholder="请选择" >
          <el-option  value="1" label="启用" />
          <el-option  value="2" label="禁用" />
        </el-select>
<!--        <el-input v-model="device.deviceStatus" />-->
      </el-form-item>
      <el-form-item label="设备类型">
        <el-input v-model="device.deviceType" />
      </el-form-item>
      <el-form-item label="所属工地Id">
        <el-select v-model="device.siteId" placeholder="请选择" >
          <!--          遍历输出，-->
          <el-option v-for="val in this.sites" :key="val.siteId" :value="val.siteId" :label="val.siteName" />
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
      device: {
        deviceName: '',
        deviceStatus: 0,
        deviceType:'',
        siteId:0,
      },
      sites:[]
    }
  },

  mounted() {
    let deviceId = this.$route.params.deviceId;
    let url = "http://localhost:80/site/sites/";
    this.axios.get(url, null).then(res=>{
      let result = res.data;
      this.sites = result.data;
    });
  },
  methods: {
    submit() {
      let url="http://localhost:80/device/add";
      this.axios.post(url,this.device).then(res =>{
        let result = res.data;
        if (result.success){
          this.$message({
            message:result.message,
            type:'success'
          });
          setTimeout(()=>{
            this.$router.push("/device/list");
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
        this.$router.push("/device/list");
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
