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
</style>
<template>
    <div class="app-container">
        <div class="searchBox">
            <el-row :gutter="15">
                <el-form ref="elForm" :model="formData" size="mini" label-width="57px">
                    <el-col :span="5">
                        <el-form-item label="用户名" prop>
                            <el-input v-model="formData.userName" placeholder clearable :style="{width: '100%'}"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="手机号" prop>
                            <el-input v-model="formData.phonenumber" placeholder clearable :style="{width: '100%'}"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
        </div>
        <div class="caozuoBox">
            <el-button type="primary" @click="btnClick('Sch')" size="mini">查 询</el-button>
            <el-button @click="btnClick('Add')" size="mini">新 增</el-button>
            <el-button @click="btnClick('Fix')" size="mini">修 改</el-button>
            <el-button @click="btnClick('No')" size="mini">禁 用</el-button>
        </div>
        <bd-table :thList="thList" :getTableList="getTableList" :addParams="formData" ref="bdtable"></bd-table>
        <add :thList="thList" :getTableList="getTableList" :addParams="formData" ref="Add"></add>
    </div>
</template>

<script>
// import { getTableList } from './dataList'
import add from './Add'
import { thList, queryList, optionsList, getTableList } from './dataList'

import bdTable from '@/layout/components/bdTable'

export default {
    components: { add, bdTable },
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
            getTableList: getTableList,
            optionsList: optionsList,
            queryList: queryList,
            formData: {}
        }
    },
    created() {},
    methods: {
        submitForm() {
            this.$refs['elForm'].validate(valid => {
                if (!valid) return
                // TODO 提交表单
            })
        },
        btnClick(type) {
            switch (type) {
                case 'Add':
                    this.$refs['Add'].open()
                    break
                case 'Fix':
                    let items = this.$refs['bdtable'].getSelection(1)
                    if (items) {
                        this.$refs['Add'].open(items)
                    }
                case 'No':
                    // this.$refs['Add'].open()
                    break

                default:
                    this.$refs['bdtable'].fetchData()
                    break
            }
        }
    }
}
</script>
