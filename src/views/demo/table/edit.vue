<template>
    <el-row>
        <h1>editing information</h1>
        <el-form  ref="editform" :model="formLabelAlign" :rules="rules">
            <el-form-item label="FirstName" prop="fname">
                <el-input  v-model="formLabelAlign.fname"></el-input>
            </el-form-item>
            <el-form-item label="LirstName" prop="lname">
                <el-input  v-model="formLabelAlign.lname"></el-input>
            </el-form-item>
            <el-form-item label="Age" prop="age">
                <el-input  v-model="formLabelAlign.age"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="edit('editform')">submit</el-button>
                <el-button type="primary" @click="back">cancel</el-button>
            </el-form-item>
        </el-form>
    </el-row>
</template>

<script>
import PagedTable from '../../../components/table/PagedTable'
import axios from 'axios'
import { setTimeout } from 'timers';

export default {
    name:'edit',
      data(){
        var checkfn = (rule,value,callback) => {
            if(!value){
                return callback(new Error("please enter firstname"))
            }else{
                callback();
            }
            };
            var checkln = (rule,value,callback) => {
                if(!value){
                    return callback(new Error("please enter lirstname"))
                }else{
                    callback();
                }
            };
            var checkage = (rule,value,callback) => {
                if(!value){
                    return callback(new Error("please enter age"))
                }
                setTimeout(()=>{
                    var temp = parseInt(value)
                    if(!Number.isInteger(temp)){
                        callback(new Error("please enter a number"))
                    }else{
                        callback()
                    }
                }, 1000);
        };
        return{
            data:[],
            formLabelAlign:{
                fname:'',
                lname:'',
                age:''
            },
            rules:{
                fname:[
                    {validator: checkfn,trigger:'blur'}
                ],
                lname:[
                    {validator: checkln,trigger:'blur'}
                ],
                age:[
                    {validator:checkage,trigger:'blur'}
                ]
            },
        }
    },
    created:function(){
         axios.get('http://localhost:3000/data',{params:{"id": this.$route.query.id}})
                .then((response)=>{
                    this.data=response.data;
                    console.log(response.data);
                    this.formLabelAlign.fname = this.data[0].fname
                    this.formLabelAlign.lname = this.data[0].lname
                    this.formLabelAlign.age = this.data[0].age
                })
                .catch(function (error){
                        console.log(error);
                })
    },
    methods:{
        edit(formname){
            this.$refs[formname].validate((valid)=>{
                if(valid){
                     axios.put(`http://localhost:3000/data/${this.$route.query.id}`,
                    {'fname':this.formLabelAlign.fname,'lname':this.formLabelAlign.lname,'age':this.formLabelAlign.age})
                          .then((response)=>{
                            console.log(response);
                             this.$router.push({
                                path:'/demo/paged-table',
                            })
                        }).catch(function (error){
                            console.log(error);
                        })
                }
                else{
                    console.log('error submit!!');
                    return false;
                }
            });
         },
        back(){
            this.$router.push({
                path:'/demo/paged-table'
            })
        },
    }

}
</script>
