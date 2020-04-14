<template>
  <div class="content-wrapper">
    <div class="card card-default">
      <div class="card-header">
        <h3 class="card-title">Chi tiết đơn hàng</h3>
      </div>
      <!-- /.card-header -->
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Tên người nhận</label>
              <input type="text" class="form-control select2" placeholder="" v-model="bill.customer" />
            </div>
            <div class="form-group">
              <label>Địa chỉ nhận</label>
              <input type="text" class="form-control select2" placeholder="" v-model="bill.address"/>
            </div>
            <div class="form-group">
              <label>Số điện thoại người nhận</label>
              <input type="text" class="form-control select2" placeholder="" v-model="bill.phone"/>
            </div>
            <div class="form-group">
              <label>Ghi chú</label>
              <input type="text" class="form-control select2" placeholder="" v-model="bill.note"/>
            </div>
            <div class="form-group">
              <label>Thời gian tạo đơn</label>
              <input type="text" class="form-control select2" placeholder="" v-model="bill.created" disabled/>
            </div>
            <div class="form-group">
              <label>Thời gian cập nhật</label>
              <input type="text" class="form-control select2" placeholder="" v-model="bill.modified" disabled/>
            </div>
            <div class="form-group">
              <label>Trạng thái</label>
              <select class="form-control select2">
                <option value="1">Chưa thanh toán</option>
                <option value="2">Đã thanh toán</option>
                <option value="3">Hủy</option>
              </select>
            </div>

            <table id="example2" class="table table-bordered table-hover" style="width:180%">
              <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Ảnh</th>
                <th>Size</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
              </tr>
              </thead>
              <tbody v-for="(item, index) in products" :key="index">
                <tr>
                  <td>{{item.product_name}}</td>
                  <td><img :src="'/dist/img/'+item.image" style="width:100px"></td>
                  <td>{{detail[index].size}}</td>
                  <td>{{detail[index].quantity}}</td>
                  <td>{{detail[index].quantity * item.price}}</td>
                </tr>
              </tbody>
            </table>

            <button type="button" class="btn btn-primary" style="float:left" @click="submit">
              Cập nhật đơn hàng
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
  name:'billDetail',
  data(){
    return {
      bill_id: '',
      bill: {},
      detail: [],
      products: [],
      total: 0
    }
  },
  methods:{
    async loadQuery(){
			this.bill_id = this.$route.query.bill_id
		},
    async submit(){
      // await axios.post('api/user/update',{
      //   bill_id: this.bill_id,
      //   fullname: this.user.fullname,
      //   phone: this.user.phone,
      //   email: this.user.email,
      //   role: this.user.role
      // });
      // this.$router.push('/users');
    },
    async getDetail(){
      await axios.get('/api/bill/get?bill_id='+this.bill_id).then(response=>{
        this.bill = response.data.bill;
        this.detail =response.data.detail;
      })
      this.bill.created = this.formatTime(this.bill.created);
      this.bill.modified = this.formatTime(this.bill.modified);
    },
    formatTime(date){
      date = date.replace(/T|Z/gi,' ');
      return date;
    },
    getProducts () {
      this.detail.forEach(item => {
        axios.get('/api/product/getDetail?product_id='+item.product_id).then(response=>{
          this.products.push(response.data[0]);
        })
      });
    }
  },
  async beforeMount(){
    await this.loadQuery();
    await this.getDetail();
    this.getProducts();
  }
}
</script>

<style scoped>
.card-body{
  margin-left: 50px
}
</style>