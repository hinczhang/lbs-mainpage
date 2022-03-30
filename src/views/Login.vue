<template>
    <div>
        <el-card>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="User Name">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="Password">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">Login</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        onSubmit(){
            
        }
    }
}
</script>