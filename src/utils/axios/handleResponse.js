/*
 * 处理响应错误码
 */

export default (response) =>{
    const status = response.status
    if((status >= 200 && status <= 300) || status === 304){
        return response
    }
    // status不正常的话，根据与后端的约定好的code 做出对应的提示和处理
    else{
        const code = parseInt(response.data && response.data.code)
        let message = (response.data || {}).msg

        switch (code){
            case 400:
                break
            case 401:
                message = message || "登录已过期"
                break
            case 403:
                message = message || "未登录"
                break
            case 404:
                message = message || "请求地址错误"
                break
            default:
                break
        }
        return {
            code,
            message
        }
    }
}
