<template>
  <div class="content-wrapper">
    <div class="card card-default">
      <div class="card-header">
        <h3 class="card-title">Sửa thương hiệu</h3>
      </div>
      <!-- /.card-header -->
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Tên thương hiệu</label>
              <input type="text" class="form-control select2" placeholder="Tên thương hiệu" v-model="brand_name"/>
            </div>
            <button type="button" class="btn btn-primary" style="float:left" @click="submit">
              Sửa thương hiệu
            </button>
            <!-- /.form-group -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios';
export default {
  name:'editBrand',
  data(){
    return {
      brand_id: '',
      brand_name:'',
    }
  },
  methods:{
    async loadQuery(){
			this.brand_id = this.$route.query.brand_id
		},
    async submit(){
      await axios.post('api/brand/update',{
        id: this.brand_id,
        brand_name: this.brand_name
      });
      this.$router.push('/brands');
    },
    getDetail(){
      axios.get('/api/brand/getFromId?brand_id='+this.brand_id).then(response=>{
        this.brand_name = response.data;
      })
    }
  },
  async beforeMount(){
    await this.loadQuery();
    await this.getDetail();
  }
}
</script>

<style scoped>
.card-body{
  margin-left: 50px
}
</style>