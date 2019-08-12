<template>
  <el-card>
    <div slot="header" class="clearfix" style="text-align: left;">
      <h1>Paged Table</h1>
      <el-button @click="add">add</el-button>
    </div>
    <div style="margin-top: 20px;">
      <paged-table :data="data" :columns="columns" :paginationAttrs="paginationAttrs" showActionColumn @size-change="sizeChange" @getData="getData">
        <template v-slot:action-column="{ data }">
          <el-button @click="getData;view(data.$index,data.row)">View</el-button>
          <el-button @click="getData;edit(data.$index,data.row)">Edit</el-button>
          <el-button @click="deleteR(data.$index,data.row)">Delete</el-button>
        </template>
      </paged-table>
    </div>
  </el-card>
</template>

<script>
import PagedTable from '../../../components/table/PagedTable'
import axios from 'axios'
import { reject } from 'q';

export default {
  name: 'demo-paged-table',
  components: {
    [PagedTable.name]: PagedTable
  },
  data () {
    return {
      data:[],
      columns: [
        { prop: 'id', label: 'ID', attrs: { width: 100 } },
        { prop: 'fname', label: 'FirstName' },
        { prop: 'lname', label: 'LastName' },
        { prop: 'age', label: 'age' }
        
        
      ],
      paginationAttrs: {
        'hide-on-single-page': false
      },
      getDataAxios: this.getData(),
    }
  },
  methods: {
    view(index,row){
      this.$router.push({
        path:'/viewInfo',
        query:{
          id: row.id,
          fname: row.fname,
          lname:row.lname,
          age:row.age
        }
      })
    },
    edit(index,row){
      this.$router.push({
        path:'/edit',
        query:{
          id: row.id,
          fname: row.fname,
          lname:row.lname,
          age:row.age
        }
      })
    },
    deleteR(index,row){
        this.$confirm('this operation will delete the row forever, confirm to continue?','Warning',{
            confirmButtonText:'confirm',
            cancelButtonText:'cancel',
            type:'warning'
        }).then(()=>{
            this.$message({
            type:'success',
            message:'delection was success!'});
            axios.delete(`http://localhost:3000/data/${row.id}`)
             .then((response)=>{
                console.log(response);
                row.splice(index,1);
              })
              .catch(function(error){
                console.log(error);
              })   
              this.$router.go(0);
        }).catch(()=>{
            this.$message({
            type:'info',
            message:'delection has already been canceled.'});
        });
    },
    add(){
      this.$router.push({
        path:'/add',
      })
    },
    sizeChange (data) {
      console.log(data)
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
  }, 
}
</script>

<style scoped>

</style>
