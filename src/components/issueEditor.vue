<template>
    <el-form v-loading="loading" style="margin: 0 auto;width:50%" ref="form" :model="form" label-width="20%">
        <el-form-item label="Author" :rules="{required: true, message: 'Please input your name.', trigger: 'blur'}">
            <el-input maxlength="25" style="width:50%" v-model="form.author" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="Publish Time">
            <el-date-picker :readonly="readOnly" v-model="form.date"></el-date-picker>
            <el-time-select :readonly="readOnly" v-model="form.time"></el-time-select>
        </el-form-item>
        <el-form-item label="Ergent?">
            <el-switch
            v-model="form.rank"
            active-color="#13ce66"
            inactive-color="#0c2949">
            </el-switch>
        </el-form-item>
        <div style="width:100%;height:500px;" id="div1"></div>
        <el-button type="primary" @click="submitForm" :disabled="!gkeys.isUser">Submit</el-button>
    </el-form>
</template>

<script>
import axios from 'axios'
import E from "wangeditor"
export default {
    props: {
        extrinsicForm: {
            default: {}
        }
    },
    data () {
        return {
            editor: '',
            activeIndex: 'Issues',
            form: {
                rank:false,
                date: '',
                time: '',
                author: '',
                content: ''
            },
            readOnly: true,
            loading: false
        }
    },
    created () {        
        this.timeInitail();

    },
    mounted () {
        this.editor = new E("#div1");
        
        this.editor.config.uploadImgShowBase64 = true;
        this.editor.config.uploadImgMaxLength = 20;
        this.editor.create();
    },
    methods: {
        timeInitail(){
            const date=new Date();
            this.form.date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
            this.form.time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        },
        submitForm(){
            this.form.content = this.editor.txt.html();
            var _this = this;
            this.loading = true;
            if(this.form.author == ''||this.form.content == ''||this.form.content == undefined){
                alert("Please fill the required fields!!")
            }else{
                axios.post('/backendLBS/issue',{
                    mode:'insert',
                    content:_this.form
                })
                .then((res)=>{
                    _this.loading = false;
                    _this.editor.txt.clear();
                    _this.form.author="";
                    _this.form.rank=false;
                    _this.timeInitail();
                    _this.$message({
                        message: 'upload success',
                        type: 'success'
                    });

                })
                .catch((err)=>{
                    _this.$message.error('upload failed');
                    console.log(err)
                })
            }
        }
    }
}
</script>