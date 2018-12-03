<template>
    <div class="fillcontain">
        <div>
            <el-form
                :inline="true"
                ref="search_data" 
                :model='search_data' >
                <el-form-item label="投标时间筛选:">
                    <el-date-picker
                        v-model="search_data.startTime"
                        type="datetime"
                        placeholder="选择开始时间">
                    </el-date-picker> --
                    <el-date-picker
                        v-model="search_data.endTime"
                        type="datetime"
                        placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size ="small" icon="search" @click='onScreeoutRisk()'>筛选</el-button>
                </el-form-item>
                 <el-form-item class="btnRight">
                    <el-button type="primary" size ="small" icon="view" @click='onAddRisk()'>添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table_container">
            <el-table
                v-if="tableData.length > 0"
                :data='tableData'
                max-height="450"
                border
                :default-sort = "{prop: 'date', order: 'descending'}"
                style="width: 100%">
                 <el-table-column
                    type="index"
                    label="序号"
                    align='center'
                    width="70">
                </el-table-column>
                
                <el-table-column
                    prop="place"
                    label="井站"
                    align='center'
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="describe"
                    label="问题描述"
                    align='center'
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="grade"
                    label="缓急程度"
                    align='center'
                    width="170"> 
                    <template slot-scope="scope">  
                        <span style="color:#00d053">{{ scope.row.grade }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="reason"
                    label=" 问题原因分析"
                    align='center'
                    width="170">
                    <template slot-scope="scope">  
                        <span style="color:#f56767">{{ scope.row.reason }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="handler"
                    label="整改责任人"
                    align='center'
                    width="170">
                    <template slot-scope="scope">  
                        <span style="color:#4db3ff">{{ scope.row.handler }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="deadline"
                    label="整改完成期限"
                    align='center'
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="condition"
                    label="整改情况"
                    align='center'
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="monitor"
                    label="监控措施"
                    align='center'
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="rectify"
                    label="监控措施"
                    align='center'
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="image1"
                    label="整改前图片"
                    align='center'
                    width="220">
                    <template slot-scope="scope">  
                      <div class="cell_img">
                        <img :src= scope.row.image1 alt=""  width="200" height="150"/>
                      </div>    
                    </template>
                </el-table-column>
                <el-table-column
                    prop="image2"
                    label="整改后图片"
                    align='center'
                    width="220">
                    <template slot-scope="scope">  
                      <div class="cell_img">
                        <img :src= scope.row.image2 alt=""  width="200" height="150"/>
                      </div>    
                    </template>
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="备注"
                    align='center'
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="operation"
                    align='center'
                    label="操作"
                    fixed="right"
                    width="180">
                    <template slot-scope='scope'>
                        <el-button 
                            type="warning" 
                            icon='edit' 
                            size="small"
                            @click='onEditRisk(scope.row)'
                        >编辑</el-button>
                        <el-button 
                            type="danger" 
                            icon='delete' 
                            size="small"
                            @click='onDeleteRisk(scope.row,scope.$index)'
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
             <el-row>
                <el-col :span="24">
                    <div class="pagination">
                        <el-pagination
                            v-if='paginations.total > 0'
                            :page-sizes="paginations.page_sizes"
                            :page-size="paginations.page_size"
                            :layout="paginations.layout"
                            :total="paginations.total"
                            :current-page.sync='paginations.page_index'
                            @current-change='handleCurrentChange'
                            @size-change='handleSizeChange'>
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- 弹框页面 -->
        <DialogFound :dialog='dialog' :form='form' @update="getProfile"></DialogFound>
    </div>
</template>

<script>
import DialogFound from "../components/DialogRisk";

export default {
  name: "risklist",
  data() {
    return {
      tableData: [],
      allTableData: [],
      filterTableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      form: {
        place: "",
        describe: "",
        grade: "",
        reason: "",
        handler: "",
        deadline: "",
        condition: "",
        monitor: "",
        rectify: "",
        image1: "",
        image2: "",
        remark: "",
        id: ""
      },
      //需要给分页组件传的信息
      paginations: {
        page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 5, // 1页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
      },
      search_data: {
        startTime: "",
        endTime: ""
      }
    };
  },
  components: {
    DialogFound
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      // 获取表格数据
      this.$axios("/api/profiles").then(res => {
        // this.tableData = res.data;
        this.allTableData = res.data;
        this.filterTableData = res.data;
        // 设置分页数据
        this.setPaginations();
      });
    },
    onEditRisk(row) {
      // 编辑
      this.dialog = {
        show: true,
        title: "修改隐患信息",
        option: "edit"
      };
      this.form = {
        place: row.place,
        describe: row.describe,
        grade: row.grade,
        reason: row.reason,
        handler: row.handler,
        deadline: row.deadline,
        condition: row.condition,
        monitor: row.monitor,
        rectify: row.rectify,
        image1: row.image1,
        image2: row.image2,
        remark: row.remark,
        id: row._id
      };
      console.log(this.form.image1);
    },
    onDeleteRisk(row, index) {
      // 删除
      this.$axios.delete(`/api/profiles/delete/${row._id}`).then(res => {
        this.$message("删除成功");
        this.getProfile();
      });
    },
    onAddRisk() {
      // 添加
      this.dialog = {
        show: true,
        title: "添加隐患信息",
        option: "add"
      };
      this.form = {
        place: "",
        describe: "",
        grade: "",
        reason: "",
        handler: "",
        deadline: "",
        condition: "",
        monitor: "",
        rectify: "",
        image1: "",
        image2: "",
        remark: "",
        id: ""
      };
    },
    handleCurrentChange(page) {
      // 当前页
      let sortnum = this.paginations.page_size * (page - 1);
      let table = this.allTableData.filter((item, index) => {
        return index >= sortnum;
      });
      // 设置默认分页数据
      this.tableData = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    setPaginations() {
      // 总页数
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      // 设置默认分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    onScreeoutRisk() {
      // 筛选
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: "warning",
          message: "请选择时间区间"
        });
        this.getProfile();
        return;
      }
      const stime = this.search_data.startTime.getTime();
      const etime = this.search_data.endTime.getTime();
      this.allTableData = this.filterTableData.filter(item => {
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= stime && time <= etime;
      });
      // 分页数据
      this.setPaginations();
    }
  }
};
</script>
<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
.cell_img {
    display: inline-block;
    border: 1px solid #ddd;
    border-radius: 4px;
}

</style>