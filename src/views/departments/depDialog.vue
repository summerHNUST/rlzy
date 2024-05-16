<template>
  <el-form ref="form" label-width="120px">
    <el-form-item label="部门名称">
      <el-input v-model="form.name" style="width: 80%"></el-input>
    </el-form-item>
    <el-form-item label="部门编码">
      <el-input v-model="form.code" style="width: 80%"></el-input>
    </el-form-item>
    <el-form-item label="部门负责人">
      <el-select v-model="form.manager" style="width: 80%" placeholder="请选择">
        <el-option v-for="item in employees" :key="item.id" :value="item.username" :label="item.username"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="部门介绍">
      <el-input
        v-model="form.introduce"
        style="width: 80%"
        type="textarea"
        :rows="3"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" size="small" @click="onSubmit">确定</el-button>
      <el-button size="small" @click="can">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getSimpleEmployees } from '@/api/employees'
import { addDepartment } from '@/api/departments'
export default {
  props:{
    id:{
      type:String,
      required:true
    },
    isEdit:{
      type:Boolean,
      required:true
    }
  },
  data() {
    return {
      form: {
        name: "",
        code: "",
        manager: "",
        introduce: "",
      },
      employees:[]
    };
  },
  created(){
    this.loadEmployees()
  },
  methods:{
   async onSubmit(){
    try {
      this.form.pid=this.id
      const res=await addDepartment(this.form)
      this.$message.success(res.message)
      this.$emit('success')
    } catch (e) {
      this.$message.error(e.message)
      
    }

    },
    can(){},
    async loadEmployees(){
      try {
        const res=await getSimpleEmployees()
        this.employees=res.data
      } catch (error) {
        
      }
    }
  }
};
</script>