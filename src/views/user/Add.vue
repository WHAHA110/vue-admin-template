<style lang="less" scoped>
.el-col {
    width: 90%;
    float: none;
    min-width: 299px;
    padding-right: 0px;
}
.el-form-item {
    margin-bottom: 15px;
}

/deep/.el-form {
    display: flex;
    flex-wrap: wrap;
}
.caozuoBox {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
}
/deep/.el-dialog__body {
    padding-top: 0;
}

/deep/.el-dialog__header {
    // text-align: center;
    padding: 20px 20px 10px;
    font-size: 17px !important;
}

/deep/.el-dialog__headerbtn .el-dialog__close,
/deep/.el-dialog__title {
    font-size: 17px !important;
}
</style>
<template>
    <div class>
        <el-dialog :title="title||'NULL'" :visible.sync="dialogVisible" width="567px" :before-close="handleClose" :close-on-click-modal="false">
            <el-form ref="elForm" :model="formData" size="small" label-width="100px">
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
                <el-col :span="5">
                    <el-form-item label="角色" prop>
                        <el-select v-model="formData.roleId" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">
                            <el-option v-for="(item, index) in optionsList.roleIds" :key="item.roleId" :label="item.roleName" :value="item.roleId"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form>
            <div class="caozuoBox">
                <el-button @click="dialogVisible=false" size="small">取 消</el-button>
                <el-button type="primary" @click="btnClick(1)" size="small">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { thList, queryList, optionsList, getRoleList } from './dataList'
export default {
    // props: ['title'],
    filters: {},
    data() {
        return {
            title: '新 增',
            optionsList: optionsList,
            dialogVisible: false,
            formData: {}
        }
    },
    created() {
        getRoleList().then(res => {
            optionsList.roleIds = res.data
        })
    },
    methods: {
        open(data) {
            this.title = '新 增'
            this.formData = {}
            if (data) {
                this.title = '修 改'
                this.formData = data[0]
            }
            this.dialogVisible = true
        },
        handleClose() {
            this.dialogVisible = false
        },
        submitForm() {
            this.$refs['elForm'].validate(valid => {
                if (!valid) return
                // TODO 提交表单
            })
        }
    }
}
</script>
