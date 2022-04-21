/*
 * @Descripttion: 
 */
import axios from "axios"
import handleResponse from "@/handleResponse.js"
import handleError from "@/handleError.js"

axios.defaults.baseURL = "http://xxxxx"     // 基础请求路径
axios.defaults.timeout = 10000              // 超时时间

// axios.defaults.headers['custom-defined-header-key'] = 'custom-defined-header-value'
// 自定义请求头：对所有请求方法生效
// axios.defaults.headers.common['common-defined-key-b'] = 'custom value: for all methods'
// 自定义请求头：只对post方法生效
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 自定义请求头：只对get方法生效
// axios.defaults.headers.get['get-custom-key'] = 'custom value: only for get method';

/**
 * 请求拦截 
 */
axios.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么 ， 例如把用户的登录信息放在请求头上
        // config.headers.common['cookie-id'] = cookieId
        return config
    },
    (err) => {
        Promise.reject(err)
    }
)

/**
 * 响应拦截 
 */
axios.interceptors.response.use(
    (response) => {
        console.log(err.message);
        return Promise.resolve(handleResponse(response))
    },
    (err) => {
        if(!err) return Promise.reject(err)

        if(err.response){
            err = handleError(err)
        }
        // 没有response(没有状态码)的情况
        // eg: 超时；断网；请求重复被取消；主动取消请求；
        else{
            // 错误信息传入isCancel方法，可以判断请求是否被取消
            if(axios.isCancel(err)){
                throw new axios.Cancel(err.message || `请求'${request.config.url}'被取消`)
            }else if(err.stack && err.stack.includes("timeout")){
                err.message = "请求超时"
            }else{
                err.message = "连接服务器失败"
            }
        }
        console.log(err.message)
        return Promise.reject(err)

    }
)

export default axios