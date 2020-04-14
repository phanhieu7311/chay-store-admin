<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6" style="text-align:left">
            <h3>Đơn hàng</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item" @click="$router.push('/')"><a href="#">Trang chủ</a></li>
              <li class="breadcrumb-item active">Đơn hàng</li>
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
            <!-- /.card-header -->
            <div class="card-body">
              <table id="example2" class="table table-bordered table-hover">
                <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên khách hàng</th>
                  <th>Trạng thái</th>
                  <th>Ngày tạo</th>
                  <th>Tùy chọn</th>
                </tr>
                </thead>
                <tbody v-for="item in bills" :key="item.key">
                  <tr>
                    <td>{{item.id}}</td>
                    <td>{{item.customer}}</td>
                    <td v-if="item.status==0">Chưa thanh toán</td>
                    <td v-if="item.status==1">Đã thanh toán</td>
                    <td v-if="item.status==-1">Đã hủy</td>
                    <td>{{formatCreated(item.created)}}</td>
                    <td>
                      <router-link :to="{path:'/bill/detail', query: {bill_id: item.id}}">
                        <button type="button" class="btn btn-primary">
                          Chi tiết đơn hàng
                        </button>
                      </router-link>
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
  name: 'bills',
  data(){
    return {
      bills:[],
      allBill: 0,
      page: 1,
      allPage: 0,
    }
  },
  methods:{
    async loadData(){
      await axios.get('/api/bill/getAll?page='+this.page).then(response=>{
        this.bills = response.data.bills;
        this.allBill = response.data.allBill;
      })
			this.getAllPage(this.allBill);
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
  },
  beforeMount(){
    this.loadData();
  }
}
</script>

