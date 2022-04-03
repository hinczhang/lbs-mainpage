<template>
    <el-container>
        <el-header><nav-bar v-bind:item="activeIndex"></nav-bar></el-header>
        <el-main>
            <el-card v-loading="loading"><iframe  src="http://lbs-pg.standardserve.org/pgadmin4" id="mobsf" scrolling="auto" frameborder="0" style="height:800px;width:100%">
            </iframe>
            </el-card>
        </el-main>
        <el-footer>Footer</el-footer>
    </el-container>
</template>

<script>
import nav from '../components/nav.vue'
import $ from 'jquery'
export default {
    components: {
        'nav-bar': nav
    },
    data () {
        return {
            activeIndex: 'Database',
            loading: true
        }
    },

    mounted(){

        const iframe = document.querySelector('#mobsf');
        // 处理兼容行问题
        var _this = this;
        if (iframe.attachEvent) {
            iframe.attachEvent('onload', function () {
                // iframe加载完毕以后执行操作
                _this.loading=false; 
            })
            
        } else {
            iframe.onload = function () {
                // iframe加载完毕以后执行操作
                _this.loading=false;
            }
            
        }
        
    }
}
</script>