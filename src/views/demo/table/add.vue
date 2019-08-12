<template>
    <el-row>
        <h1>adding information</h1>
        <el-form  ref="addform" :model="formLabelAlign" :rules="rules">
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
                <el-button type="primary" @click="addData('addform')">submit</el-button>
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
    name:'add',
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
                    callback(new Error('please enter a number'))
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
            getDataAxios: this.getData(),
        }
    },
    methods:{
        addData(formname){
            this.$refs[formname].validate((valid)=>{
                if(valid == true){
                    var countID = new Array();
                    var len = this.data.length;
                    var temp = new Array();
                    for(var i=0; i < len; i++){
                        var obj = this.data[i];
                        for(var key in obj){
                            temp.push(obj[key]);
                        }
                        countID.push(temp[0]);
                        temp.length = 0;
                    }
                    var formLabelAlignID = Number(countID.pop())+1;
                    axios.post('http://localhost:3000/data',
                    {'id':formLabelAlignID,'fname':this.formLabelAlign.fname,'lname':this.formLabelAlign.lname,'age':this.formLabelAlign.age})
                         .then((Response)=>{
                            console.log(Response);
                             this.$router.push({
                                path:'/demo/paged-table',
                            })    
                        })
                         .catch(function(error){
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
                path:'/demo/paged-table',
            });
        },
        getData(){
            axios.get('http://localhost:3000/data')
                 .then((response)=>{       
                    this.data=response.data;
                    console.log(response.data);
                })
                .catch(function (error){
                    console.log(error);
                })
        }
    }
}
</script>
>