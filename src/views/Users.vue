<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6" style="text-align:left">
            <h3>Tài khoản</h3>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item" @click="$router.push('/')"><a href="#">Trang chủ</a></li>
              <li class="breadcrumb-item active">Tài khoản</li>
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
                  <th>Tên tài khoản</th>
                  <th>Tên người dùng</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Vai trò</th>
                  <th>Ngày tạo</th>
                  <th>Tùy chọn</th>
                </tr>
                </thead>
                <tbody v-for="item in users" :key="item.key">
                  <tr>
                    <td>{{item.username}}</td>
                    <td>{{item.fullname}}</td>
                    <td>{{item.email}}</td>
                    <td>{{item.phone}}</td>
                    <td v-if="item.role==1">Admin</td>
                    <td v-if="item.role==2">Nhân viên</td>
                    <td v-if="item.role==3">Khách hàng</td>
                    <td>{{formatCreated(item.created)}}</td>
                    <td>
                      <router-link :to="{path:'/user/edit', query: {user_id: item.id}}">
                        <button type="button" class="btn btn-primary">
                          Chỉnh sửa
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
  name: 'users',
  data(){
    return {
      users:[],
      allUser: 0,
      page: 1,
      allPage: 0,
    }
  },
  methods:{
    async loadData(){
      await axios.get('/api/user/getAll?page='+this.page).then(response=>{
        this.users = response.data.users;
        this.allUser = response.data.allUser;
      })
			this.getAllPage(this.allUser);
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

