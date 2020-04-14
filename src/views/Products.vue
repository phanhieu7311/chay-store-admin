<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6" style="text-align:left">
            <h3>Sản phẩm</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item" @click="$router.push('/')"><a href="#">Trang chủ</a></li>
              <li class="breadcrumb-item active">Sản phẩm</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <router-link to='/product/add'>
                <button type="button" class="btn btn-primary" style="float:left">
                  <i class="fas fa-plus"></i> Thêm sản phẩm
                </button>
              </router-link>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th>Ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Thương hiệu</th>
                  <th>Giá</th>
                  <th>Ngày tạo</th>
                  <th>Tùy chọn</th>
                </tr>
                </thead>
                <tbody v-for="item in products" :key="item.key">
                  <tr>
                    <td><img :src="'dist/img/'+item.image" style="width:100px"></td>
                    <td>{{item.product_name}}</td>
                    <td>{{item.brand_id}}</td>
                    <td>{{item.price}}</td>
                    <td>{{formatCreated(item.created)}}</td>
                    <td>
                      <router-link :to="{path:'/product/edit', query: {product_id: item.id}}">
                        <button type="button" class="btn btn-primary" style="float:left">
                          <i class="fas fa-edit"></i>
                        </button>
                      </router-link>
                      <button type="button" class="btn btn-danger" style="float:right" @click="deleteProd(item.id)">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table><br/>

              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item" v-for="item in allPage" :key="item" 
                  @click="choosePage(item)" :class="[(item == page) ? 'active' : '']">
                    <a class="page-link" href="#">{{item}}</a>
                  </li>
                </ul>
              </nav>
            </div>
            <!-- /.card-body -->
          </div>
          <!-- /.card -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
const onePage = 9;
import axios from '../axios';
export default {
  name: 'products',
  data(){
    return {
      products:[],
      allProd: 0,
      page: 1,
      allPage: 0,
    }
  },
  methods:{
    async loadData(){
      await axios.get('/api/product/getAll?onePage='+onePage+'&page='+this.page).then(response=>{
        this.products = response.data.products;
        this.allProd = response.data.allProd;
      })
			this.getAllPage(this.allProd);
    },
    getAllPage(allProd){
			let page = Math.floor(allProd / onePage);
			if(allProd % onePage > 0){
				page ++;
			}
			this.allPage = page;
    },
		choosePage(page){
			this.page = page;
			this.loadData();
    },
    formatCreated(date){
      date = date.replace(/T|Z/gi,' ');
      return date;
    },
    async deleteProd(id){
      await axios.get('/api/product/delete?id='+id);
      this.loadData();
    }
  },
  beforeMount(){
    this.loadData();
  }
}
</script>

