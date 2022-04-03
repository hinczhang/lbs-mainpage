<template>
    <el-card style="margin:0 auto;width:60%;margin-top: 30px">
        <div v-show="!if_revise">
            <div>{{this.form.author}}</div>
            <div v-html="this.form.content"></div>
        </div>
        <div v-show="if_revise">
            <el-form style="margin: 0 auto;width:90%" ref="form" :model="form" label-width="20%">
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
                <div style="width:100%;height:500px;" :id="'div1'+this.form.ID"></div>
                <el-row>
                    <el-button type="primary" round @click="submitForm(form)">Submit</el-button>
                    <el-button type="info" round @click="cancelHandle">Cancel</el-button>
                </el-row>
            </el-form>
        </div>
        <el-row v-show="!if_revise">
            <el-button type="warning" round @click="reviseHandle" :disabled="!gkeys.isUser">Update</el-button>
            <el-button type="danger" round @click="deleteHandle" :disabled="!gkeys.isUser">Delete</el-button>
        </el-row>
    </el-card>
</template>

<script>
import axios from 'axios'
import E from "wangeditor"
export default {
    props: {
        content: {
            type: Array,
            default: []
        }
    },
    data () {
        return {
            if_revise: false,
            form: {},
            editor: '',
            readOnly: true,
        }
    },
    created () {
        this.form.ID = this.content[0];
        this.form.content = this.content[1];
        this.form.date = this.content[2];
        this.form.time = this.content[3];
        this.form.author = this.content[4];
        this.form.rank = this.content[5];

    },
    mounted () {
        this.editor = new E('#'+'div1'+this.form.ID);
        this.editor.config.uploadImgShowBase64 = true;
        this.editor.config.uploadImgMaxLength = 20;
        this.editor.create();
        this.editor.txt.html(this.form.content);
    },
    methods: {
        reviseHandle () {
            this.if_revise = true;
        },
        submitForm(form){
            form.content = this.editor.txt.html();
            var _this = this;
            this.loading = true;
            if(form.author == ''||form.content == ''||form.content == undefined){
                alert("Please fill the required fields!!")
            }else{
                axios.post('/backendLBS/issue',{
                    mode:'update',
                    content:form
                })
                .then((res)=>{
                    _this.$message({
                        message: 'upload success',
                        type: 'success'
                    });
                    _this.$emit('update-lists',{mode:"U", form:form});
                    _this.if_revise = false;
                })
                .catch((err)=>{
                    _this.$message.error('upload failed');
                    console.log(err)
                })
            }
        },
        deleteHandle(){
            this.$confirm('The operation will delete the issue, confirm or not?', 'Warn', {
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    type: 'warning'
                }).then(() => {
                    var _this = this;
                    axios.post('/backendLBS/issue',{
                        mode:'delete',
                        ID:this.form.ID
                    })
                    .then((res)=>{
                        _this.$emit("update-lists",{mode:"D", form:_this.form.ID});
                        _this.$message({
                            message: 'delete success',
                            type: 'success'
                        });
                    })
                    .catch((err)=>{
                        _this.$message.error('delete failed');
                        console.log(err)
                    })     
            });
        },
        cancelHandle(){
            this.if_revise=false;
        }
    }
}
</script>