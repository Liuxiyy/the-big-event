$(function () {
    var form = layui.form;
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
        , wsd: function (value) {
            if (value === $('.ccc').val()) {
                return ('新旧密码一致');
            }
        },
        password: function (value) {
            if (value != $('.aaa').val()) {
                return ('新密码不一致');
            }
        }
    });
    //提交修改密码事件
    $('.layui-form').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('更新密码成功！');
                $('.layui-form')[0].reset();
            }
        })
    })
})