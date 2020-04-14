<template>
  <div class="content-wrapper">
    <div class="card card-default">
      <div class="card-header">
        <h3 class="card-title">Sửa tài khoản</h3>
      </div>
      <!-- /.card-header -->
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Tên tài khoản</label>
              <input type="text" class="form-control select2" placeholder="Tên tài khoản" v-model="user.username" disabled/>
            </div>
            <div class="form-group">
              <label>Tên người dùng</label>
              <input type="text" class="form-control select2" placeholder="Tên người dùng" v-model="user.fullname"/>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="text" class="form-control select2" placeholder="Email" v-model="user.email"/>
            </div>
            <div class="form-group">
              <label>Số điện thoại</label>
              <input type="text" class="form-control select2" placeholder="Số điện thoại" v-model="user.phone"/>
            </div>
            <div class="form-group">
              <label>Vai trò</label>
              <select class="form-control select2" v-model="user.role">
                <option value="1">Admin</option>
                <option value="2">Nhân viên</option>
                <option value="3">Người dùng</option>
              </select>
            </div>
            <button type="button" class="btn btn-primary" style="float:left" @click="submit">
              Sửa tài khoản
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
  name:'editUser',
  data(){
    return {
      user_id: '',
      user: {},
    }
  },
  methods:{
    async loadQuery(){
			this.user_id = this.$route.query.user_id
		},
    async submit(){
      await axios.post('api/user/update',{
        user_id: this.user_id,
        fullname: this.user.fullname,
        phone: this.user.phone,
        email: this.user.email,
        role: this.user.role
      });
      this.$router.push('/users');
    },
    getDetail(){
      axios.get('/api/user/getInfor?id='+this.user_id).then(response=>{
        this.user = response.data[0];
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