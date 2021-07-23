const state = {
    infoPageVisible: false,
    rowIdVal: []
}

const mutations = {
    // 点击列表传递一个参数给dynamicTags数组
    CLICK_LIST_DISPATH_PARAMS: (state, view) => {
        return state.rowIdVal.push(view)
    }
}

const actions = {
    getRowIdVal({ commit },view) {
        commit('CLICK_LIST_DISPATH_PARAMS',view)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
