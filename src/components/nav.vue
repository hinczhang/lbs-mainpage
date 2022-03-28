<template>
    <el-menu :default-active="item" mode="horizontal" @select="handleSelect">
        <el-menu-item index="MainPage">Main Page</el-menu-item>
        <el-menu-item index="Database">Database</el-menu-item>
        <el-menu-item index="About">About</el-menu-item>
        <el-submenu index="log" style="float: right">
            <template slot="title">
                <i class="el-icon-s-operation"></i>
            </template>
            <el-menu-item-group>
                <el-menu-item index="1-1">User item</el-menu-item>
                <el-menu-item index="1-2">Logout</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    props: {
        item: {
            type: String,
            default: 'MainPage'
        }
    },
    data () {
        return {

        }
    },
    methods: {
        handleSelect(key,keyPath){
            if(key==this.item){
                return;
            }
            this.$router.push('/'+key)
        }
    }
}
</script>