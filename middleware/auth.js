
import getCookie from '@/tools/getCookie'
 
export default function ({store, route,redirect, req}) {
    // If the user is not authenticated
    const {jwt_token} = getCookie(req)
    const routePath = route.path
    const extraPath = ['/']

    if (jwt_token) {
        store.commit('SET_JWT_TOKEN', jwt_token)
        if(routePath=="/"){

            return redirect('/dashboard')
        }
        return
        // return store.dispatch('getUserInfo')
    }

    if ((!store.state.jwt_token) && extraPath.indexOf(routePath) === -1) {
        // 跳转到登录页面
        return redirect('/')
    }
}
