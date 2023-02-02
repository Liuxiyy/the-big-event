$(function () {
    var form = layui.form;
    form.verify({
        nickname: function (value, item) {
            console.log(value);
            //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        }

    })
    getUsetInfo();
    function getUsetInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                form.val("infoFilter", res.data);
            }

        })

    }

    //提交基本资料的修改
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {

                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                window.parent.getUserInfo();
            }
        })
    })
    //提交重置功能
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        getUsetInfo();
    })
})