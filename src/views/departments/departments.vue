<template>
  <div class="department-container">
    <div class="app-container">
      <el-card>
        <!-- 用了一个行列布局 -->
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          style="height: 40px"
        >
          <el-col :span="20">
            <svg-icon icon-class="gs" /><span
              >江苏传智播客教育科技股份有限公司</span
            >
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <!-- 两个内容 -->
              <el-col>负责人</el-col>
              <el-col>
                <!-- 下拉菜单 element -->
                <el-dropdown>
                  <span> 操作<i class="el-icon-arrow-down" /> </span>
                  <!-- 下拉菜单 -->
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="hShowAdd"
                      >添加子部门</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-tree :data="list" default-expand-all>
          <template v-slot="{ data }">
            <el-row
              type="flex"
              justify="space-between"
              align="middle"
              style="height: 40px; width: 100%"
            >
              <el-col :span="20">
                <span>{{ data.manager }}</span>
              </el-col>
              <el-col :span="4">
                <el-row type="flex" justify="end">
                  <!-- 两个内容 -->
                  <el-col>{{ data.name }}</el-col>
                  <el-col>
                    <!-- 下拉菜单 element -->
                    <el-dropdown>
                      <span> 操作<i class="el-icon-arrow-down" /> </span>
                      <!-- 下拉菜单 -->
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="hShowAdd(data.id)"
                          >添加子部门</el-dropdown-item
                        >
                        <!-- 编辑部门 -->
                        <el-dropdown-item @click.native="hShowEdit(data.id)"
                          >编辑部门</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </el-col>
            </el-row></template
          >
        </el-tree>
      </el-card>
    </div>
    <el-dialog
      title="提示"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :visible.sync="showDialog"
      width="50%"
    >
      <add-or-edit :id="curId" :is-edit="isEdit" @success="hSuccess" />
    </el-dialog>
    <!-- 编辑部门 -->
    <el-dialog
      title="编辑"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :visible.sync="showDialogEdit"
      width="50%"
    >
      <add-or-edit :id="curId" :is-edit="isEdit" @success="hSuccess" />
    </el-dialog>
  </div>
</template>
<script>
import { getDepartmentList } from "@/api/departments";
import addOrEdit from "./depDialog.vue";
import { tranListToTreeData } from "@/utils";
export default {
  components: {
    addOrEdit,
  },
  data() {
    return {
      list: [],
      showDialog: false,
      curId: "",
      isEdit: false,
      showDialogEdit:false
    };
  },
  mounted() {
    this.loadDepartmentList();
  },
  methods: {
    async loadDepartmentList() {
      const res = await getDepartmentList();
      res.data.depts.shift();
      this.list = tranListToTreeData(res.data.depts);
      //this.list = this.transListToTreeData(res.data.depts, "");
    },
    // transListToTreeData(list, searchVal) {
    //   const arr = [];
    //   //找到了所有的父级
    //   list.forEach((item) => {
    //     if (item.pid === searchVal) {
    //       arr.push(item);
    //     }
    //   });
    //   arr.forEach((item) => {
    //     const children = list.filter((obj) => obj.pid === item.id) || [];
    //     item.children = children;
    //   });
    //   console.log(arr);
    //   return arr;
    // },
    hShowAdd(id) {
      this.showDialog = true;
      this.curId = id;
      this.isEdit = false;
    },
     hShowEdit(id) {
      this.showDialogEdit = true;
      this.curId = id;
      this.isEdit = true;
    },
    hSuccess() {
      this.showDialog = false;
      this.loadDepartmentList();
    },
  },
};
</script>