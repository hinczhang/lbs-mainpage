<template>
    <el-container>
        <el-header><nav-bar v-bind:item="activeIndex"></nav-bar></el-header>
        <el-main>
            <div  v-for="(item) in lists" :key="item[0]">
                <el-row>
                    <editor v-on:update-lists="updateLists" v-bind:content="item"></editor>
                </el-row>
            </div>
        </el-main>
        <el-footer>Footer</el-footer>
    </el-container>
</template>

<script>
import nav from '../components/nav.vue'
import editor from '../components/editor.vue'
import axios from 'axios'
export default {
    components: {
        'nav-bar': nav,
        'editor':editor
    },
    data () {
        return {
            activeIndex: 'MainPage',
            lists: []
        }
    },
    created () {
        var _this=this
        axios.post('/backendLBS/issue',{
            mode:'query'
        })
        .then((res)=>{
            _this.lists = res.data['content'].reverse();
            console.log(_this.lists)
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    methods: {
        updateLists:function(item){
            var mode = item.mode;
            var form = item.form;
            if(mode=="U"){
                for(var i=0;i<this.lists.length;i++){
                    if(form.ID==this.lists[i].ID){
                        this.lists[i]=form;
                        break;
                    }
                }
            }else if(mode=="D"){
                for(var i=0;i<this.lists.length;i++){
                    if(form==this.lists[i][0]){
                        this.lists.splice(i,1)
                        break;
                    }
                }
                console.log(this.lists)
            }
            
        }
    }
}
</script>