<template>
  <div class="content-wrapper">
    <div class="card card-default">
      <div class="card-header">
        <h3 class="card-title">Sửa sản phẩm</h3>
      </div>
      <!-- /.card-header -->
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Tên sản phẩm</label>
              <input class="form-control select2" type="text" placeholder="Tên sản phẩm" v-model="product.product_name">
            </div>
            <!-- /.form-group -->
            <div class="form-group">
              <label>Thương hiệu</label>
              <select class="form-control select2" style="width: 100%;" v-model="product.brand_id">
                <option v-for="item in listBrand" :key="item.id" :value="item.id">{{item.brand_name}}</option>
              </select>
            </div>
            <!-- /.form-group -->
            <div class="form-group">
              <label>Ảnh sản phẩm: </label>
              <img :src="'/dist/img/'+product.image" style="width:200px; padding:20px">
              <input class="form-control select2" type="file">
            </div>
            <!-- /.form-group -->
            <div class="form-group">
              <label>Mô tả</label>
              <input class="form-control select2" type="text" placeholder="Mô tả" v-model="product.description">
            </div>
            <!-- /.form-group -->
            <div class="form-group">
              <label>Giá</label>
              <input class="form-control select2" type="text" placeholder="Giá" v-model="product.price">
            </div>
            <!-- /.form-group -->
          </div>
          <!-- /.col -->
        </div>
        <button type="button" class="btn btn-primary" style="float:left" @click="submit">
          Sửa sản phẩm
        </button>
    <!-- /.row -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios';
export default {
  name:'editProduct',
  data(){
    return {
      product_id: '',
      listBrand:[],
      product: {
        product_name: '',
        brand_id:'',
        image: null,
        description: '',
        price: ''
      }
    }
  },
  methods:{
    async submit(){
      await axios.post('/api/product/update',{
        id: this.product_id,
        product_name: this.product.product_name,
        brand_id: this.product.brand_id,
        image: this.product.image,
        description: this.product.description,
        price: this.product.price
      });
      this.$router.push('/products');
    },
    getBrand(){
			axios.get('/api/brand/getAll')
				.then(response => {
					this.listBrand = response.data.listBrand;
				})
    },
    async loadQuery(){
			this.product_id = this.$route.query.product_id;
		},
    getDetail(){
      axios.get('/api/product/getDetail?product_id='+this.product_id)
      .then(response=>{
        this.product = response.data[0];
      })
    }
  },
  async beforeMount(){
    this.getBrand();
    await this.loadQuery();
    this.getDetail();
  }
}
</script>

<style scoped>
.card-body{
  margin-left: 50px
}
</style>