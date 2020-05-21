<template>
  <div class="common-table">
    <el-table :data="tableData" style="width: 100%" stripe height="90%" v-loading="config.loading">
      <el-table-column label="序号" width="60">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ (config.page - 1) * 20 + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip v-for="item in tablelabel" :key="item.label" :label="item.label" :width="item.width ? item.width : 125">
        <template slot-scope="scope">
          <span style="margin-left: 5px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="config.total"
      :current-page.sync="config.page"
      class="pagination"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tablelabel: Array,
    tableData: Array,
    config: Object,
  },
  created() {
    console.log(this.config.loading, 1);
  },
  methods: {
    handleEdit(row) {
      this.$emit("edit", row);
    },
    handleDelete(row) {
      this.$emit("dl", row);
    },
    changePage(page) {
      this.$emit("changePage", page);
    },
  },
};
</script>

<style lang="scss">
.common-table {
  height: 100%;
  background-color: #fff;
  position: relative;
  .pagination {
    position: absolute;
    right: 20px;
  }
}
</style>
