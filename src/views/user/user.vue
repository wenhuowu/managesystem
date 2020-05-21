<template>
  <div class="manage">
    <div>
      <el-dialog :title="title === 'add' ? '新增用户' : '编辑用户'" :visible.sync="isshow">
        <Form :formLable="operateFormLabel" :form="operateForm"></Form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isshow = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="top">
      <el-button type="primary" @click="add">+新增</el-button>
      <Form :formLable="FormLabel" :form="Form" inline>
        <el-button type="primary" @click="search(Form.name)">搜索</el-button>
      </Form>
    </div>
    <div class="bot">
      <Table
        :tablelabel="tablelabel"
        :tableData="tableData"
        :config="config"
        @changePage="gettabelData()"
        @edit="edit"
        @dl="dl"
      ></Table>
    </div>
  </div>
</template>

<script>
import Form from "../../components/form";
import Table from "../../components/table";
export default {
  data() {
    return {
      title: "add",
      isshow: false,
      Form: {
        name: ""
      },
      FormLabel: [
        {
          model: "name",
          label: ""
        }
      ],
      operateFormLabel: [
        {
          label: "名字",
          model: "name"
        },
        {
          label: "年龄",
          model: "age"
        },
        {
          label: "性别",
          model: "sex",
          type: "select",
          option: [
            {
              label: "男",
              value: 1
            },
            {
              label: "女",
              value: 0
            }
          ]
        },
        {
          label: "出生日期",
          model: "birth",
          type: "date"
        },
        {
          label: "地址",
          model: "addr"
        }
      ],
      operateForm: {
        name: "",
        age: "",
        sex: "",
        date: "",
        addr: ""
      },
      config: {
        page: 1,
        total: 50,
        loading: false
      },
      tableData: [], //里面是对象，每一个对象含tabellabel的每个prop
      tablelabel: [
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "age",
          label: "年龄"
        },
        {
          prop: "sexlabel",
          label: "性别"
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200
        },
        {
          prop: "addr",
          label: "地址",
          width: 320
        }
      ]
    };
  },
  components: {
    Form,
    Table
  },
  created() {
    this.gettabelData();
  },
  methods: {
    gettabelData(name = "") {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";

      this.$http
        .get("/api/user/getUser", {
          params: {
            name,
            page: this.config.page
          }
        })
        .then(res => {
          this.tableData = res.data.list.map(item => {
            item.sexlabel = item.sex === 0 ? "女" : "男";
            //console.log(item);
            return item;
          });
          this.config.total = res.data.count;
          this.config.loading = false;
        });
    },
    //编辑表格数据
    edit(row) {
      this.title = "edit";
      this.isshow = true;
      this.operateForm = row;
    },
    //确认修改提交
    confirm() {
      if (this.title === "edit") {
        this.$http.post("/user/edit", this.operateForm).then(res => {
          console.log(res);
          this.gettabelData();
        });
      } else {
        this.$http.post("/user/add", this.operateForm).then(res => {
          console.log(res);
          this.gettabelData();
        });
      }
      this.isshow = false;
    },
    add() {
      this.title = "add";
      this.isshow = true;
    },
    dl(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.get("/user/del", { params: { id: row.id } }).then(res => {
            console.log(res.data);
            this.gettabelData();
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    search(name) {
      this.gettabelData(name);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/user";
</style>
