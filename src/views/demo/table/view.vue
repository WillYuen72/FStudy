<template>
    <el-row>
        <h1>View information</h1>
        <h3>id: {{this.id}}</h3>
        <h3>Firstname:{{this.fname}}</h3>
        <h3>Lastname:{{this.lname}}</h3>
        <h3>age:{{this.age}}</h3>
        <el-button @click="toBack">返回</el-button>
    </el-row>
</template>

<script>

export default {
    name:'viewInfo',
    data(){
        return{
            id:'',
            fname:'',
            lname:'',
            age:''
        }
    },
    created(){
        this.id = this.$route.query.id
        this.fname = this.$route.query.fname
        this.lname = this.$route.query.lname
        this.age = this.$route.query.age
    },
    methods:{
        toBack(){
            this.$router.push({
                    path:'/demo/paged-table',
                })
        }
    }
}
</script>
