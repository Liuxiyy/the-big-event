//获取用户基本信息
$(function () {

    var layer = layui.layer;

  

})
getUserInfo()
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',

        success: function (res) {
            console.log(res);
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            renderAvatar(res.data);
        }
        //不论成功或失败 都会进来
    })
}
    //渲染用户信息
    function renderAvatar(user) {
        //判断用户名用哪个
        var username = user.nickname || user.username;
        $('.userName').html(username);
        //头像渲染
        if (user.user_pic) {
            $('.layui-nav-img').attr('src', user.user_pic).show();
            $('.userAvatar').hide();
        } else {
            $('.userAvatar').htm1(username.subStr(0, 1));
        }
        }
        //退出 
        $('#logout').on('click',function(){
            layer.confirm('确认退出登录?', {icon: 3, title:'提示'}, function(index){
                //do something
                layer.close(index);
                // 清空token
                localStorage.removeItem('token')
                //跳转登录页
                location.href='login.html'
              });
        })