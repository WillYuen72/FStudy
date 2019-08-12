<template>
    <el-row>
    <div v-if="full">
        <h1>View information</h1>
        <h4>id: {{this.data[0].id}}</h4>
        <h4>Firstname:{{this.data[0].fname}}</h4>
        <h4>Lastname:{{this.data[0].lname}}</h4>
        <h4>age:{{this.data[0].age}}</h4>
    </div>
    <div v-if="empty"><h1>this data has already been delected</h1></div>
    <el-button @click="back">return</el-button>
    </el-row>
</template>

<script>
import axios from 'axios'

export default {
    name:'viewInfo',
    data(){
        return{
            data:[],
            empty:false,
            full:false
        }
    },
    created:function(){
        axios.get('http://localhost:3000/data',{params:{"id": this.$route.query.id}})
                .then((response)=>{
                    this.data=response.data;
                    console.log(response.data);
                    if(this.data == false){
                        this.empty = true
                    }else{
                        this.full = true
                    }
                })
                .catch(function (error){
                        console.log(error);
                })
    },
    methods:{
        back(){
            this.$router.push({
                path:'/demo/paged-table'
            })
        }
    } 
}
</script>

