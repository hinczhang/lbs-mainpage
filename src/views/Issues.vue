<template>
    <el-container>
        <el-header><nav-bar v-bind:item="activeIndex"></nav-bar></el-header>
        <el-main>
            <issue-editor v-bind:extrinsicForm="form"></issue-editor>
        </el-main>
        <el-footer>Footer</el-footer>
    </el-container>
</template>

<script>

import editor from '../components/issueEditor.vue'
import nav from '../components/nav.vue'

export default {
    components: {
        'nav-bar': nav,
        'issue-editor':editor
    },
    data () {
        return {
            activeIndex: 'Issues',
            form: {}
        }
    }
}
</script>