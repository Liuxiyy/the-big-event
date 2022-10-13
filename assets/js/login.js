$(function () {
    $('#linkReg').click(function () {
        $('.login-box').hide();
        $('.reg-bxo').show()
    })
    $('#linkLogin').click(function () {
        $('.reg-bxo').hide();
        $('.login-box').show()
    })
    var layer = layui.layer;
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) { //value：表单的值、item：表单的DOM对象
            let pwd = $('.reg-pwd').val()
            if (value != pwd) {
                return '两次密码不一致'
            }
        }
    });
    //监听注册表单的提交事件
    $('#formReg').on('submit', function (e) {
        //阻止默认行为
        e.preventDefault();
        //发起 ajax请求
        var data = {
            username: $('.reg-name').val(),
            password: $('.reg-pwd').val()
        }
        $.post('http://www.liulongbin.top:3007/api/reguser', data, function (res) {
            // console.log(res);
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录！');
            //触发去登录点击事件
            $('#linkLogin').click();
        });
    })
    $('#formLogin').on('submit', function (e) {
        //阻止默认行为
        e.preventDefault();
        //发起 ajax请求
        var data = $(this).serialize()
        console.log(data);
        $.post('http://www.liulongbin.top:3007/api/login', data, function (res) {
            // console.log(res);
            if (res.status != 0) {
                return layer.msg(res.message);
            }
           location.href='index.html'
            //触发去登录点击事件
        });
    })
})