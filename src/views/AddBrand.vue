<template>
  <div class="content-wrapper">
    <div class="card card-default">
      <div class="card-header">
        <h3 class="card-title">Thêm thương hiệu</h3>
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
              Thêm thương hiệu
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
  name:'addBrand',
  data(){
    return {
      brand_name: ''
    }
  },
  methods:{
    async submit(){
      await axios.post('/api/brand/add',{
        brand_name: this.brand_name
      });
      this.$router.push('/brands');
    }
  }
}
</script>

<style scoped>
.card-body{
  margin-left: 50px
}
</style>