<template>
	<div class="content flex" v-loading="isShowLoading">
		<div class="search_box">
			<el-input v-model="searchText" placeholder="书籍、借阅人、手机号"></el-input>
			<el-button type="primary" plain class="btn" @click="query">查询</el-button>
			<el-button type="success" plain class="btn" @click="reset">重置</el-button>
		</div>
		<div class="table_box">
			<div class="table_header">
				<div class="table_col1">书名</div>
				<div class="table_col2">借阅人</div>
				<div class="table_col3">手机号</div>
				<div class="table_col4">借阅时间</div>
				<div class="table_col5">操作</div>
			</div>
			<div class="table_body">
				<div class="table_body_item" v-for="(item,index) in list" :key="index">
					<div class="table_col1">{{item.name}}</div>
					<div class="table_col2">{{item.borrow_user}}</div>
					<div class="table_col3">{{item.borrow_mobile}}</div>
					<div class="table_col4">{{item.borrow_time}}</div>
					<div class="table_col5 btn_box">
						<el-button type="success" class="btn" @click="returnBook(item.id)">归还</el-button>
					</div>
				</div>
			</div>
		</div>
		<!-- 分页 -->
		<div class="pagination_box">
			<el-pagination :page-size="10" :current-page.sync="currentPage" layout="prev, pager, next" :total="total"
			 @current-change="currentChange" :hide-on-single-page="true">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import {mapState} from "vuex"
	export default {
		name: 'Back',
		data() {
			return {
				total: 0,
				currentPage: 1,
				isShowLoading: false,
				list: [],
				searchText: "",
				isShowDialog: false,
				borrow_id: ""
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		methods: {
			// 书籍数量
			getBookCount(){
				let name = this.searchText;
				axios.post('/api/book/borrowCount', {
					name
				}).then(res => {
					// console.log();
					this.total = res.data[0]['count(*)']
					console.log("书籍总数",this.total);
				}).catch(err => {
					console.log(err)
				})
			},
			// 查询书籍
			query() {
				this.isShowLoading = true;
				let name = this.searchText /* 书名*/
				let page = this.currentPage /* 页码 */
				this.getBookCount()
				axios.post('/api/book/selectBorrow', {
					name,
					page,
					library_name:this.userInfo.library_name
				}).then(res => {
					this.isShowLoading = false;
					console.log(res.data);
					this.list = res.data
					
				}).catch(err => {
					this.isShowLoading = false;
					console.log(err)
				})
			},
			// 重置
			reset() {
				// 清空输入框
				this.searchText = ""
				// 页码为1
				this.currentPage = 1
				this.query()
			},
			// 页码改变
			currentChange(e) {
				this.currentPage = e
				this.query()
			},
			// 归还
			returnBook(id) {
				axios.post('/api/book/giveBack', {
					id
				}).then(res => {
					console.log(res);
					if (res.data.status == 1) {
						this.query()
					}else{
						this.$message({
							type:"warning",
							message:res.data.msg,
							showClose:true
						})
					}
				}).catch(err => {
					console.log(err)
				})
			},
		},
		mounted() {
			this.query()
		}
	}
</script>

<style scoped>
	.el-input {
		width: 240px !important;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.search_box {
		margin: 0 auto;
		width: 700px;
		height: 100px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.search_box input {
		margin-right: 30px;
		padding-left: 20px;
		height: 40px;
		line-height: 40;
		width: 300px;
		outline-color: darkorange;
		box-sizing: border-box;
	}

	.search_box .btn {
		margin: 0 10px;
		height: 40px;
		line-height: 40px;
		width: 80px;
	}

	.table_box {
		margin: 0 auto;
		width: 700px;
		height: 660px;
		overflow: hidden;
		border: 1px solid #d7d7d7;
		box-sizing: border-box;
	}

	.table_header {
		display: flex;
		width: 100%;
		height: 60px;
		line-height: 60px;
		border-bottom: 1px solid #d7d7d7;
		box-sizing: border-box;
	}

	.table_header>div {
		height: 100%;
	}

	.table_col1 {
		flex: 1;
	}

	.table_col2 {
		width: 100px;
	}

	.table_col3 {
		width: 140px;
	}

	.table_col4 {
		width: 200px;
	}

	.table_col5 {
		width: 100px;
	}

	.table_body {
		height: 600px;
	}

	.table_body_item {
		display: flex;
		height: 60px;
		line-height: 60px;
		border-bottom: 1px solid #d7d7d7;
		box-sizing: border-box;
	}

	.table_body_item>div {
		padding: 0 10px;
		box-sizing: border-box;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.btn_box {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.btn {
		cursor: pointer;
		width: 80px;
		height: 40px;
		line-height: 40px;
		padding: 0;
		/* height: 30px; */
	}

	.btn.del {
		color: red;
	}

	.btn.change {
		color: darkorange;
	}

	.pagination_box {
		width: 700px;
		margin: 20px auto;
		display: flex;
		justify-content: center;
	}


	.dialog_box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.dialog_item {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 20px;
	}

	.dialog_item>div {
		width: 100px;
		text-align: right;
		margin-right: 20px;
	}

	.dialog_box>.btn {
		width: 200px;
		margin-left: 60px;
	}
</style>
