<template>
  <el-card>
    <div slot="header" class="clearfix" style="text-align: left;">
      <h1>Paged Table</h1>
    </div>
    <div style="margin-top: 20px;">
      <paged-table :data="data" :columns="columns" :paginationAttrs="paginationAttrs" showActionColumn @size-change="sizeChange" @getData="getData">
        <template v-slot:action-column="{ data }">
          <el-button @click="view(data.$index, data.row)">View</el-button>
        </template>
      </paged-table>
    </div>
  </el-card>
</template>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
import PagedTable from '../../../components/table/PagedTable'
import axios from 'axios'

export default {
  name: 'demo-paged-table',
  components: {
    [PagedTable.name]: PagedTable
  },
  data () {
    return {
      
      data:[],
      // data: {
      //  /* { id: 1, fname: 'test 1' ,lname:'test0',age:'20'},*/
      //  list:[{ id: 1, fname: 'test 1' ,lname:'test0',age:'20'}],
      // },
      columns: [
        { prop: 'id', label: 'ID', attrs: { width: 100 } },
        { prop: 'fname', label: 'FirstName' },
        { prop: 'lname', label: 'LastName' },
        { prop: 'age', label: 'age' }
        
        
      ],
      paginationAttrs: {
        'hide-on-single-page': false
      },
      getdataAxio:this.getData()
    }
  },
  methods: {
    
    view (index, row) {
      console.log(index, row)
    },
    sizeChange (data) {
      console.log(data)
    },
    getttdata(){
      return { id: 1, fname: 'test 1' ,lname:'test0',age:'20'}
    },
    getData(){
      /*var vm = this*/
      axios.get('http://localhost:3000/data')
           .then((response)=>{
                this.data=response.data;
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
