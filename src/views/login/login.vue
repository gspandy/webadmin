<template>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
            <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>

    </el-form>
</template>

<script>
    import { useLogin, _setSession, _getSession } from 'api';
    import { mapMutations } from 'vuex';
    import userImg from '../../assets/user.jpg';
    //import NProgress from 'nprogress'
    export default {
        data() {
            return {
            logining: false,
            ruleForm2: {
                account: '',
                checkPass: ''
            },
            rules2: {
                account: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    //{ validator: validaePass }
                ],
                checkPass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    //{ validator: validaePass2 }
                ]
            },
                checked: true
            };
        },
        methods: {
            ...mapMutations(['setLoginToken', 'setUserInfo', 'setExt']),
            alertBox(res){
                if (res.state !== 0){
                    this.$alert(res.msg, '提示', {
                        confirmButtonText:'确定'
                    });
                    return false;
                }
                return true;
            },
            handleReset2() {
                this.$refs.ruleForm2.resetFields();
            },
            // loginResult(res) {
            //     res = res || {};
            //     var _tempUser = {
            //         id: 1,
            //         username: 'admin',
            //         password: '123',
            //         avatar: userImg,
            //         name: 'YJ'
            //     }
            //     if (res.state === 0){
            //         sessionStorage.setItem('user', JSON.stringify(_tempUser));
            //         this.$router.push({ path: '/' });
            //         return true;
            //     }
            //     this.$confirm(res.msg || '登录失败', '提示', {
            //         confirmButtonText: '继续跳转',
            //         cancelButtonText: '不跳转',
            //         type: 'warning'
            //     })
            //     .then(() => {
            //         sessionStorage.setItem('user', JSON.stringify(_tempUser));
            //         this.$router.push({ path: '/' });
            //     })
            //     .catch(() => {
            //     });
            //     return false;
            // },
            handleSubmit2(ev) {
                var _this = this;
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                    //_this.$router.replace('/table');
                    this.logining = true;
                    // this.$router.push({ path: '/' });
                    //NProgress.start();
                    var loginParams = { un: this.ruleForm2.account, pd: this.ruleForm2.checkPass };
                    
                    useLogin(loginParams).then(res => {
                        this.logining = false;
                        if (!this.alertBox(res)) return;
                        this.setLoginToken(res.data.token);
                        this.setExt(res.data.ext);
                        let _url = '/goods/list';
                        if (res.data.ext == 1 || res.data.ext ==2) {
                            _url = '/goods-admin/list';
                        }
                        if(res.data.ext != 1 &&
                            res.data.ext != 2 &&
                            res.data.ext != 3 &&
                            res.data.ext != 4) {
                                this.$alert('无权限操作！', '提示', {
                                    confirmButtonText:'确定'
                                });
                                return ;
                        }
                        location.href = location.origin + _url;

                        // this.$router.push({ path: _url });

                        // console.log('登录结果', res);
                        // this.loginResult(res);
                    },
                    err => {
                        this.logining = false;
                        // this.loginResult();
                    });
                    // requestLogin(loginParams).then(data => {
                    //     this.logining = false;
                    //     //NProgress.done();
                    //     let { msg, code, user } = data;
                    //     if (code !== 200) {
                    //         this.$message({
                    //             message: msg,
                    //             type: 'error'
                    //         });
                    //     }
                    //     else {
                    //         sessionStorage.setItem('user', JSON.stringify(user));
                    //         this.$router.push({ path: '/' });
                    //     }
                    // });
                    }
                    else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // testSession() {
            //     _setSession().then(res => {
            //         console.log(res);
            //         setTimeout(() => {
            //             _getSession().then(result => {
            //                 console.log(result);
            //             });
            //         },
            //         5000)
            //     });
            // }
        },
        mounted() {
            // setTimeout(() => {
            //     this.testSession();
            // }, 3500);
        }
    }

</script>

<style lang="less" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>