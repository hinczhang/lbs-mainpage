<template>
<el-container>
    <el-header><nav-bar v-bind:item="activeIndex"></nav-bar></el-header>
    <div style="margin-top:20%" >
        <el-card style="width:700px;margin: 0 auto;padding-top:30px" shadow="always">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="User Name">
                    <el-input style="width:300px" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="Password">
                    <el-input style="width:300px" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Login</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</el-container>
</template>

<script>
import axios from 'axios'
import nav from '../components/nav.vue'
export default {
    components: {
        'nav-bar': nav
    },
    data () {
        return {
            activeIndex:'login',
            form: {
                username: '',
                password: ''
            }
        }
    },
    created () {
        var _this = this;
        var token = this.$cookies.get('userCookie');
        console.log(token)
        if(token){
            axios.post('/backendLBS/validate',{
                mode:'token',
                token:token
            })
            .then((res)=>{
                if(res.data.status=="success"){
                    _this.$message({
                        message: res.data['content'],
                        type: 'success'
                    });
                    _this.gkeys.setcurid(true);
                    this.$router.push('/');
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }

    },
    methods: {
        onSubmit(){
            var _this=this;
            axios.post('/backendLBS/validate',{
                    mode:'login',
                    form:_this.form
                })
            .then((res)=>{
                if(res.data['status']=="success"){
                    _this.$message({
                        message: res.data['content'],
                        type: 'success'
                    });
                    _this.gkeys.setcurid(true);
                    _this.$cookies.set('userCookie', res.data['token'],res.data['duration']/1000+'s'); 
                    this.$router.push('/');
                }else{
                    _this.$message.error(res.data['content']);
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }
}
</script>