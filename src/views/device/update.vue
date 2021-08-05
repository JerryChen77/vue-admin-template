<template>
  <div class="app-container">
    <el-form :model="device" label-width="120px">
      <el-form-item label="设备ID" >
        <el-input v-model="device.deviceId" :disabled="true"/>
      </el-form-item>
      <el-form-item label="设备名称">
        <el-input v-model="device.deviceName" />
      </el-form-item>
      <el-form-item label="是否启用">
        <el-tooltip :content="'Switch value: ' + device.deviceStatus" placement="top">
          <el-switch
            v-model="device.deviceStatus"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0">
          </el-switch>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="设备类型">
        <el-input v-model="device.deviceType" />
      </el-form-item>
      <el-form-item label="所属工地">
        <el-select v-model="device.siteId" placeholder="请选择" >
          <!--          遍历输出，-->
          <el-option v-for="val in this.sites" :key="val.siteId" :value="val.siteId" :label="val.siteName" />
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
      device: {
        deviceId: 0,
        deviceName: '',
        deviceStatus:1,
        deviceType:'',
        siteId:0,
        siteName:''
      },
      sites:[]
    }
  },
  //查询当前设备信息
  mounted() {
    let deviceId = this.$route.params.deviceId;
    let url1 = "http://localhost:80/device/select/" + deviceId;
    let url2 = "http://localhost:80/site/sites/";
    this.axios.get(url1, null).then(res=>{
      let result = res.data;
      this.device = result.data;
    });
    this.axios.get(url2, null).then(res=>{
      let result = res.data;
      this.sites = result.data;
    });
  },
  methods: {
    update() {
      console.log(this.device.deviceStatus)
      console.log(this.device.deviceId)

      //发送ajax请求
      let url = "http://localhost:80/device/update";
      this.axios.post(url, this.device).then(res => {
        let result = res.data;
        if(result.success) {
          this.$message({
            message: result.message,
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push("/device/list");
          },500);
        } else {
          this.$message.error(result.message);
        }
      });
    },
    onCancel() {
      this.$message('已取消')
      setTimeout(() => {
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

