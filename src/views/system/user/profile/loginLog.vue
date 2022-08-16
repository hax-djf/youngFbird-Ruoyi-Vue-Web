 <template>
    <!-- <el-table v-loading="loading" :data="list" :row-class-name="tableRowClassName">
      <el-table-column label="浏览器" align="center" prop="browser" width="130" :show-overflow-tooltip="true" />
      <el-table-column label="系统" align="center" prop="os" width="130" :show-overflow-tooltip="true" />
      <el-table-column label="登录地区" align="center" prop="loginLocation" width="130" :show-overflow-tooltip="true" />
      <el-table-column label="ip地址" align="center" prop="ipaddr" width="130" :show-overflow-tooltip="true" />
      <el-table-column label="状态" align="center" prop="status">
          <template slot-scope="scope">
              <dict-tag :options="dict.type.sys_common_status" :value="scope.row.status"></dict-tag>
          </template>
      </el-table-column>
      <el-table-column label="访问时间" align="center" prop="loginTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.loginTime) }}</span>
        </template>
      </el-table-column>
    </el-table> -->

    <div class="block">
      <el-timeline>
        <el-timeline-item v-for="(item,index) of list" :key="index" :timestamp="item.loginTime" placement="top">
          <el-card>
            <h4>{{ item.ipaddr }}</h4>
            <dict-tag :options="dict.type.sys_common_status" :value="item.status"></dict-tag>
            <p>系统 | {{ item.os }}</p>
            <p>浏览器 | {{item.browser}}</p>
            <p>地区 | {{item.loginLocation}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
  </div>
</template>

<script>
import { userList } from "@/api/system/logininfor";

export default {
  dicts:['sys_common_status'],
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {
       list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
    },
    getList() {
      this.loading = true;
      //固定只查询10页数据
      userList({pageNum:1,pageSize:3,orderByColumn:'loginTime'}).then(response => {
          this.list = response.data;
          this.loading = false;
        }
      );
    },
  }
};
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
