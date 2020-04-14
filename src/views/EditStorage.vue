<template>
  <div class="content-wrapper">
    <div class="card card-default">
      <div class="card-header">
        <h3 class="card-title">Cập nhật kho hàng</h3>
      </div>
      <!-- /.card-header -->
      <div class="card-body">
        <h4>Sản phẩm: {{product_name}}</h4>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Size</label>
              <input class="form-control select2" type="text" placeholder="Size" v-model="size">
            </div>
            <!-- /.form-group -->
            <div class="form-group">
              <label>Số lượng</label>
              <input class="form-control select2" type="text" placeholder="Số lượng" v-model="quantity">
            </div>
            <!-- /.form-group -->
          </div>
          <!-- /.col -->
        </div>
        <button type="button" class="btn btn-primary" style="float:left" @click="submitAdd">
          Thêm 
        </button>
    <!-- /.row -->
      </div>
      <div class="card-body">
        <table id="example2" class="table table-bordered table-hover">
          <thead>
          <tr>
            <th>Size</th>
            <th>Số lượng</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="item in storage" :key="item.id">
              <td>{{item.size}}</td>
              <td>
                <input type="text" class="form-control select2" style="width:100px; margin-left:40%"
                  v-model="item.quantity"/>
              </td>
            </tr>
          </tbody>
        </table><br/>
        
        <button type="button" class="btn btn-primary" style="float:left" @click="submitUpdate">
          Cập nhật kho hàng
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios';
export default {
  name:'editStorage',
  data(){
    return {
      product_id: '',
      product_name: '',
      size: '',
      quantity: '',
      storage:[]
    }
  },
  methods:{
    getBrand(){
			axios.get('/api/brand/getAll')
				.then(response => {
					this.listBrand = response.data.listBrand;
				})
    },
    async loadQuery(){
			this.product_id = this.$route.query.product_id;
    },
    getProd(){
      axios.get('/api/product/getDetail?product_id='+this.product_id)
      .then(response=>{
        this.product_name = response.data[0].product_name;
      })
    },
    getStorage(){
      axios.get('/api/storage/getSize?product_id='+this.product_id)
      .then(response=>{
        this.storage = response.data;
      })
    },
    async submitAdd(){
      await axios.post('/api/storage/add',{
        product_id: this.product_id,
        size: this.size,
        quantity: this.quantity
      });
      this.getStorage();
    },
    async submitUpdate(){
      this.storage.forEach(async item => {
        await axios.post('/api/storage/update',{
          id: item.id,
          quantity: item.quantity
        });
      });
      this.getStorage();
    },
  },
  async beforeMount(){
    await this.loadQuery();
    this.getProd();
    this.getStorage();
  }
}
</script>

<style scoped>
.card-body{
  margin-left: 50px
}
</style>