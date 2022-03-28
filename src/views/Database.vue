<template>
    <el-container>
        <el-header><nav-bar v-bind:item="activeIndex"></nav-bar></el-header>
        <el-main>
            <iframe src="http://lbs-pg.standardserve.org/pgadmin4/" id="mobsf" scrolling="yes" frameborder="0" style="height:600px">
            </iframe>
        </el-main>
        <el-footer>Footer</el-footer>
    </el-container>
</template>

<script>
import nav from '../components/nav.vue'

export default {
    components: {
        'nav-bar': nav
    },
    data () {
        return {
            activeIndex: 'Database'
        }
    },
    mounted(){
        function changeMobsfIframe(){
            const mobsf = document.getElementById('mobsf');
            const deviceWidth = document.body.clientWidth;
            const deviceHeight = document.body.clientHeight;
            mobsf.style.width = (Number(deviceWidth)-240) + 'px'; //数字是页面布局宽度差值
            mobsf.style.height = (Number(deviceHeight)-64) + 'px'; //数字是页面布局高度差
        }

        changeMobsfIframe()

        window.onresize = function(){
            changeMobsfIframe()
        }
    }
}
</script>