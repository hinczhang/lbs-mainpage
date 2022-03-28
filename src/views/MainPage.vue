<template>
    <el-container>
        <el-header><nav-bar v-bind:item="activeIndex"></nav-bar></el-header>
        <el-main>Main</el-main>
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
            activeIndex: 'MainPage'
        }
    }
}
</script>