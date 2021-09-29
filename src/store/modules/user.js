import Router from "@/router";
import Layout from "@/layout";

import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

function _import(file) {
  //   return () => import("@/views/table/index");
  return () => import("@/views/" + file + ".vue");
}

function deepClone(data) {
  var t = type(data),
    o,
    i,
    ni;

  if (t === "array") {
    o = [];
  } else if (t === "object") {
    o = {};
  } else {
    return data;
  }

  if (t === "array") {
    for (i = 0, ni = data.length; i < ni; i++) {
      o.push(deepClone(data[i]));
    }
    return o;
  } else if (t === "object") {
    for (i in data) {
      o[i] = deepClone(data[i]);
    }
    return o;
  }
}

function filterAsyncRouter(routers) {
  const accessedRouters = routers.filter(router => {
    if (router.component) {
      if (router.component === "Layout") {
        router.component = Layout;
      } else {
        const component = router.component;
        console.log(
          component,
          "@/views/" + component + ".vue",
          "----------------->filterAsyncRouter"
        );
        router.component = () => import("@/views/" + component + ".vue");
      }
    }
    if (router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children);
    } else {
      router.children = [];
    }
    return true;
  });
  return accessedRouters;
}

const getDefaultState = () => {
  return {
    authRoutes: [],
    token: getToken(),
    name: "",
    avatar: ""
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  }
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          const { data } = response;
          commit("SET_TOKEN", data);
          setToken(data);
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const { data } = response;
          state.authRoutes = data;
          let accessRoutes = filterAsyncRouter(data);
          console.log(accessRoutes, "----------------->accessRoutes");
          Router.addRoutes(accessRoutes); // 动态添加可访问路由表
          //   next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
          // Router.matcher.addRoutes([
          //   {
          //     path: "/example",
          //     component: Layout,
          //     redirect: "/example/table",
          //     name: "Example",
          //     meta: { title: "Example", icon: "el-icon-s-help" },
          //     children: [
          //       {
          //         path: "table",
          //         name: "Table",
          //         component: () => import("@/views/table/index"),
          //         meta: { title: "Table", icon: "table" }
          //       },
          //       {
          //         path: "tree",
          //         name: "Tree",
          //         component: () => import("@/views/tree/index"),
          //         meta: { title: "Tree", icon: "tree" }
          //       }
          //     ]
          //   }
          // ]);
          if (!data) {
            return reject("Verification failed, please Login again.");
          }

          const { name, avatar } = data;

          //   commit("SET_NAME", name);
          //   commit("SET_AVATAR", avatar);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          removeToken(); // must remove  token  first
          resetRouter();
          commit("RESET_STATE");
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
