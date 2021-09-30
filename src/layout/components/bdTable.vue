<style lang="less" scoped>
.searchBox {
    .el-col {
        min-width: 299px;
        padding-right: 0px;
    }
    .el-form-item {
        margin-bottom: 5px;
    }
}
.caozuoBox {
    margin-bottom: 5px;
}
.pageBox {
    display: flex;
    justify-content: flex-end;
    margin: 5px 0;
}
/deep/.el-table td,
/deep/.el-table th {
    padding: 5px 0;
}
/deep/.el-tag {
    margin: 0 2px;
    cursor: pointer;
}
</style>
<template>
    <div class="bdTable">
        <el-table @selection-change="setSelection" v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column align="center" label width="58" type="selection">
                <!-- <template slot-scope="scope">{{ scope.$index+1}}</template> -->
            </el-table-column>
            <el-table-column align="center" label="序号" width="58" type="index">
                <template slot-scope="scope">{{ scope.$index+1}}</template>
            </el-table-column>
            <el-table-column align="center" :label="item.label" :width="item.width" v-for="(item) in thList" :key="item.prop">
                <template slot-scope="scope">{{ scope.row[item.prop] }}</template>
            </el-table-column>
            <!-- <el-table-column align="center" prop="created_at" label="操 作" width="250px">
                <template slot-scope="scope">
                    <el-tag size="mini">标签一{{scope.$index}}</el-tag>
                    <el-tag size="small" type="info">修 改</el-tag>
                    <el-tag size="small" type="info">禁 用</el-tag>
                    <el-tag type="success">标签二</el-tag>
                    <el-tag type="info">标签三</el-tag>
                    <el-tag type="warning">标签四</el-tag>
                    <el-tag type="danger">标签五</el-tag>
                </template>
            </el-table-column>-->
        </el-table>
        <div class="pageBox">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10,20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'bdTable',
    props: ['thList', 'getTableList', 'addParams'],
    data() {
        return {
            // thList: thList,
            list: [],
            listLoading: true,
            total: 1,
            currentPage: 1,
            selection: [],
            pageNum: 1,
            pageSize: 20,
            selections: []
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            this.listLoading = true
            let params = Object.assign(
                {},
                {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                },
                this.addParams || {}
            )
            this.getTableList(params).then(response => {
                this.list = response.data.list
                this.total = response.data.total
                this.listLoading = false
            })
        },
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`)
            this.pageSize = val
            this.fetchData()
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`)
            this.pageNum = val
            this.fetchData()
        },
        setSelection(selection) {
            this.selections = selection || []
        },
        getSelection(type) {
            if (type == 1) {
                if (this.selections.length === 1) {
                    return this.selections
                } else {
                    this.$message({
                        message: '请选择且只能选择一条信息操作！！！',
                        type: 'info'
                        // duration: 3000
                    })
                    // this.$notify({
                    //     title: '提示',
                    //     message: '请选择且只能选择一条信息操作！！！',
                    //     duration: 300000
                    // })
                    return null
                }
            }
            return this.selections
        }
    }
}
</script>

<style scoped>
.app-main {
    /*50 = navbar  */
    min-height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    overflow: hidden;
}
.fixed-header + .app-main {
    padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
    .fixed-header {
        padding-right: 15px;
    }
}
</style>
