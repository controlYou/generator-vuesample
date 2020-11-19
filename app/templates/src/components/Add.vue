<template>
	<div class="content">
		<div class="item">
			<div class="item_title">书名：</div>
			<el-input v-model="bookname" placeholder="请输入内容"></el-input>
		</div>
		<div class="item">
			<div class="item_title">作者：</div>
			<el-input v-model="author" placeholder="请输入内容"></el-input>
		</div>
		<div class="item">
			<div class="item_title">类型：</div>
			<el-select v-model="classify" placeholder="请选择" filterable style="width: 240px;">
			    <el-option
			      v-for="item in options"
			      :key="item.id"
			      :label="item.name"
			      :value="item.name">
			    </el-option>
			  </el-select>
		</div>
		<div class="item">
			<div class="item_title">共享：</div>
			<el-select v-model="isShare" placeholder="请选择" filterable style="width: 240px;">
			    <el-option
			      v-for="item in shareOptions"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id">
			    </el-option>
			  </el-select>
		</div>
		<el-button type="primary" plain @click="addBook" style="margin-left: 100px;">添加图书</el-button>
	</div>
</template>

<script>
	import axios from 'axios'
	import {mapState} from "vuex"
	export default {
		name: 'Add',
		data() {
			return {
				bookname: '',
				author: '',
				classify: "",
				options: [],
				isShare:0,
				shareOptions:[
					{
						name:'是',
						id:1
					},
					{
						name:'否',
						id:0
					}
				],
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		methods: {
			// 添加书籍
			addBook() {
				let name = this.bookname;
				let author = this.author;
				let classify = this.classify;
				let share_status = this.isShare
				if(!name || !author || !classify){
					this.$message({
						type:"warning",
						message:"请输入完整信息",
						showClose:true
					})
				}else{
					axios.post('/api/book/add', {
						name,
						author,
						classify,
						share_status,
						library_name:this.userInfo.library_name
					}).then(res => {
						console.log(res);
						this.$message({
							message: '添加成功',
							type: 'success',
							showClose:true
						});
						this.bookname = ""
						this.author = ""
						this.classify = ""
					}).catch(err => {
						console.log(err)
					})
				}
			},
			getOptions(){
				axios.post('/api/classify/query', {
					library_name:this.userInfo.library_name
				}).then(res => {
					console.log(res.data);
					this.options = res.data
					// this.classify = res.data[0].name
				}).catch(err => {
					console.log(err)
				})
			}
		},
		mounted(){
			this.getOptions()
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin: 30px auto 0;
		width: 740px;
		height: 800px;
	}

	.inp {
		padding-left: 20px;
		width: 240px;
		height: 40px;
		line-height: 40px;
		outline-color: #FF8C00;
	}

	.sel {
		width: 266px;
	}

	.btn {
		margin-left: 100px;
		width: 140px;
		height: 40px;
		line-height: 40px;
		color: white;
		background-color: deepskyblue;
		border-radius: 16px;
		cursor: pointer;
	}

	.item {
		display: flex;
		align-items: center;
		width: 400px;
		margin-bottom: 20px;
	}
	.item_title{
		width: 100px;
	}
	.el-input{
		width: 240px!important;
	}
</style>
