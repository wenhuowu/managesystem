<template>
  <div style="padding: 20px" class="login-bg">
    <div class="box">
      <div class="tittle"></div>
      <div class="content">
        <el-form :model="form" label-width="120">
          <el-form-item label>
            <el-input v-model="form.username" placeholder="有权限的用户名：admin">
              <template slot="prepend">
                <div class="icon-top"></div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.password" type="password" placeholder="密码为123456，其他均为无权限">
              <template slot="prepend">
                <div class="icon-bot"></div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item align="center">
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      //console.log(this.$router, 1);
      this.$http.post("api/permission/getMenu", this.form).then(res => {
        res = res.data;
        //console.log(res);
        if (res.code === 20000) {
          this.$store.commit("clearMenu");
          this.$store.commit("removeMenu");
          this.$store.commit("setMenu", res.data.menu);
          this.$store.commit("setToken", res.data.token);
          this.$store.commit("addMenu", this.$router);
          console.log(this.$router, 22);
          this.$router.push("/");
        } else {
          this.$message.warning(res.data.message);
        }
      });
    }
  }

  // methods: {
  //   login() {
  //     this.$http.post('api/permission/getMenu', this.form).then(res => {
  //       res = res.data
  //       if (res.code === 20000) {
  //         this.$store.commit('clearMenu')
  //         this.$store.commit('setMenu', res.data.menu)
  //         this.$store.commit('setToken', res.data.token)
  //         this.$store.commit('addMenu', this.$router)
  //         this.$router.push({ name: 'home' })
  //       } else {
  //         this.$message.warning(res.data.message)
  //       }
  //     })
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.login-bg {
  height: 100%;
  background: url("../../assets/images/bg.jpg") no-repeat;
  background-size: 100%;
  //position: relative;
  display: flex;
  align-items: center;
  .box {
    position: absolute;
    width: 500px;
    height: 345px;
    right: 100px;
    background: url("../../assets/images/bg1.png") no-repeat;
    background-color: rgba($color: #3967ff94, $alpha: 0.2);
    background-size: 100%;
    .tittle {
      margin: 20px auto 0;
      width: 300px;
      height: 50px;
      background: url("../../assets/images/word1.png") no-repeat center;
      background-size: 80%;
    }
    .content {
      .el-form {
        width: 80%;
        margin: 20px auto;
        padding: 10px;
        .el-form-item {
          .el-input {
            .el-input__inner {
              background-color: rgba($color: #3967ff94, $alpha: 0.2);
            }
            .icon-top {
              width: 15px;
              height: 15px;
              background: url("../../assets/images/01.png") no-repeat center;
              background-size: 100%;
            }
            .icon-bot {
              width: 15px;
              height: 15px;
              background: url("../../assets/images/02.png") no-repeat center;
              background-size: 100%;
            }
          }
          .el-button {
            font-size: 18px;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
