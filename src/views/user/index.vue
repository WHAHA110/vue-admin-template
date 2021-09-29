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
    <div class="app-container">
        <div class="searchBox">
            <el-row :gutter="15">
                <el-form ref="elForm" :model="formData" size="mini" label-width="100px">
                    <el-col :span="5" v-for="item in queryList" :key="item.prop">
                        <el-form-item :label="item.label" prop v-if="item.type==1">
                            <el-date-picker v-model="formData.field101" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :style="{width: '100%'}" placeholder="请选择日期选择日期选择" clearable></el-date-picker>
                        </el-form-item>
                        <el-form-item :label="item.label" prop v-if="item.type==2">
                            <el-select v-model="formData.field102" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">
                                <el-option v-for="(item, index) in item.options" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="item.label" prop v-if="item.type==3">
                            <el-input v-model="formData.field103" placeholder="请输入单行文本" clearable :style="{width: '100%'}"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
        </div>
        <div class="caozuoBox">
            <el-button type="primary" @click="submitForm" size="mini">查 询</el-button>
            <el-button @click="resetForm" size="mini">新 增</el-button>
            <el-button @click="resetForm" size="mini">删 除</el-button>
        </div>
        <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row height>
            <el-table-column align="center" label="序号" width="58" type="index">
                <template slot-scope="scope">{{ scope.$index+1}}</template>
            </el-table-column>
            <el-table-column align="center" :label="item.label" :width="item.width" v-for="(item) in thList" :key="item.prop">
                <template slot-scope="scope">{{ scope.row[item.prop] }}</template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="操 作" width="180px">
                <template slot-scope="scope">
                    <el-tag size="mini">标签一</el-tag>
                    <el-tag size="mini">标签一</el-tag>
                    <el-tag size="mini">标签一</el-tag>
                    <!-- <el-tag type="success">标签二</el-tag>
                    <el-tag type="info">标签三</el-tag>
                    <el-tag type="warning">标签四</el-tag>
                    <el-tag type="danger">标签五</el-tag>-->
                </template>
            </el-table-column>
        </el-table>
        <div class="pageBox">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400"></el-pagination>
        </div>
    </div>
</template>

<script>
import { thList, queryList } from './listJson'
import { getList } from '@/api/table'

export default {
    filters: {
        statusFilter(status) {
            const statusMap = {
                published: 'success',
                draft: 'gray',
                deleted: 'danger'
            }
            return statusMap[status]
        }
    },
    data() {
        return {
            thList: thList,
            queryList: queryList,
            list: null,
            listLoading: true,
            formData: {
                field101: '2021-09-22',
                field102: null,
                field103: null
            },
            currentPage4: 4
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
        },
        submitForm() {
            this.$refs['elForm'].validate(valid => {
                if (!valid) return
                // TODO 提交表单
            })
        },
        resetForm() {
            this.$refs['elForm'].resetFields()
        },
        fetchData() {
            this.listLoading = true
            getList().then(response => {
                this.list = response.data.items
                this.listLoading = false
            })
        }
    }
}
</script>
