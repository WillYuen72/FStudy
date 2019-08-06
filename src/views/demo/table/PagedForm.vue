<template>
  <el-card>
    <div slot="header" class="clearfix" style="text-align: left;">
      <h1>Paged Table</h1>
    </div>
    <div style="margin-top: 20px;">
        <el-form>
            
        </el-form>
    </div>
  </el-card>
</template>

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
      console.log(index, row);
    },
    update(index, row){
      console.log(index, row);
    },
    add(index,row){
      console.log(index,row);
    },
    del(index){
      console.log(index);
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
                console.log(this.data[0]);
           })
           .catch(function (error){
                console.log(error);
           })
    },
    // addData(jsonData){
    //   axios.post('http://localhost:3000/data',jsonData).then(
    //     (response)=>{
    //       if(response.status==200){
    //         this.getData();
    //       }
    //     }
    //   )
    // },
    updateData(id,jsonData){
      axios.put('http://localhost:3000/data/'+id,jsonData).then(
        (response)=>{
          if(response.status==200){
            this.getData();
          }
        }
      )
    },
    // deleteData(id){
    //   axios.delete('http://localhost:3000/data/'+id).then(
    //     (response)=>{
    //       this.getData();
    //     }
    //   )
    // }
  },
}
</script>

<style scoped>

</style>
