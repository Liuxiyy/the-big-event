$.ajaxPrefilter(function (options) {
    console.log(options);
    options.url = 'http://www.liulongbin.top:3007' + options.url
    //统一设置请求头
    if (options.url.indexOf('/my') != -1) {//一定包含/my 字段
        options.headers = {
            'Authorization': localStorage.getItem('token')
        }
    }
    //不论成功或失败 都会进来
    options.complete=function(res){
        console.log(res);
        if(res.responseJSON.status===1){
            //清空token
            localStorage.removeItem('token')
            //跳转登录页
            location.href='login.html'
        }
    }
})
