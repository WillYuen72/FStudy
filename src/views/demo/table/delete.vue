<template>
    <el-row>
        <h1 :style="{color : 'red'}">Are you sure you want to delete this transaction ?</h1>
        <h3>id: {{this.id}}</h3>
        <h3>Firstname:{{this.fname}}</h3>
        <h3>Lastname:{{this.lname}}</h3>
        <h3>age:{{this.age}}</h3>
        <el-button @click="deleteRR">删除</el-button>
        <el-button @click="toBack">返回</el-button>
    </el-row>
</template>

<script>
import axios from 'axios'
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
        },
        deleteRR(index,row){
            axios.delete(`http://localhost:3000/data/${this.id}`)
            .then((response)=>{
                console.log(response);
            this.$router.push({
                    path:'/demo/paged-table'
            })
            })
            .catch(function(error){
                alert('database error');
                console.log(error);
            })
        },
    },

}
</script>

<style>

</style>
