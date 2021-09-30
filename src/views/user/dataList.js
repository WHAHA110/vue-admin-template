import request from "@/utils/request";
// import { forEach } from "mock/user";
// list
export const thList = [
  { width: "238", label: "用户名", prop: "userName" },
  { width: "238", label: "手机号", prop: "phonenumber" },
  { width: "", label: "角色", prop: "warehouseId" },
  { width: "", label: "推荐码", prop: "inviteCode" }
  //   { width: "", label: "操 作", prop: "123" }
];
export const queryList = [
  { type: "1", label: "日期选择-1", prop: "author" },
  {
    type: "2",
    label: "下拉选择-2",
    prop: "pageviews",
    options: [
      {
        label: "选项一",
        value: 1
      },
      {
        label: "选项二",
        value: 2
      }
    ]
  },
  { type: "3", label: "单行文本-3", prop: "123" }
];
export const optionsList = {
  field102s: [
    {
      label: "选项一",
      value: 1
    },
    {
      label: "选项二",
      value: 2
    }
  ]
};

// request
export function getTableList(params) {
  return request({
    url: "/user/list",
    method: "get",
    params
  });
}

export function getRoleList(params) {
  return request({
    url: "/user/role/list",
    method: "get",
    params
  });
}

// <el-form ref="elForm" :model="formData" size="mini" label-width="100px">
// <el-col :span="5">
//     <el-form-item label="field101" prop>
//         <el-date-picker v-model="formData.field101" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :style="{width: '100%'}" placeholder="请选择日期选择日期选择" clearable></el-date-picker>
//     </el-form-item>
// </el-col>
// <el-col :span="5">
//     <el-form-item label="field102" prop>
//         <el-select v-model="formData.field102" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">
//             <el-option v-for="(item, index) in optionsList.field102s" :key="item.value" :label="item.label" :value="item.value"></el-option>
//         </el-select>
//     </el-form-item>
// </el-col>
// <el-col :span="5">
//     <el-form-item label="field103" prop>
//         <el-input v-model="formData.field103" placeholder="请输入单行文本" clearable :style="{width: '100%'}"></el-input>
//     </el-form-item>
// </el-col>
// </el-form>
