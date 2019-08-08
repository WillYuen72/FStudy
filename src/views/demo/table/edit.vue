<template>
    <el-row>
        <h1>editing information</h1>
        <el-form  :model="formLabelAlign" :rules="rules">
            <el-form-item label="FirstName" prop="fname">
                <el-input v-model="formLabelAlign.fname" ></el-input>
            </el-form-item>
            <el-form-item label="LirstName" prop="lname">
                <el-input v-model="formLabelAlign.lname"></el-input>
            </el-form-item>
            <el-form-item label="Age" prop="age">
                <el-input v-model="formLabelAlign.age"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="edit">submit</el-button>
                <el-button @click="toBack">返回</el-button>
            </el-form-item>
        </el-form>
    </el-row>
</template>

<script>
import PagedTable from '../../../components/table/PagedTable'
import axios from 'axios'

export default {
    name:'edit',
    data(){
        return{
            id:'',
            formLabelAlign:{
                fname:'',
                lname:'',
                age:''
            },
            rules:{
                id:[
                    {required: true, message:'enter id',trigger:'blur'}
                ],
                fname:[
                    {required:true, message:'enter firstname',trigger:'blur'}
                ],
                lname:[
                    {required:true,message:'enter lastname',trigger:'blur'}
                ],
                age:[
                    {required:true, message:'enter age',trigger:'blur'}
                ]
            }
        }
    },
    created(){
        this.id = this.$route.query.id
    },
    methods:{
        edit(){
            axios.put(`http://localhost:3000/data/${this.id}`,
            {'fname':this.formLabelAlign.fname,'lname':this.formLabelAlign.lname,'age':this.formLabelAlign.age})
                .then((response)=>{
                console.log(response);
                this.$router.push({
                path:'/demo/paged-table',
            })
            })
            .catch(function (error){
            console.log(error);
            })
        },
        toBack(){
            this.$router.push({
                    path:'/demo/paged-table',
                })
        }
    }
}
</script>
