var form = layui.form
$(function () {
    form.verify({
        nickname: function (vlaue) {
            if (vlaue.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    });
})
initUserInfo()
var layer = layui.layer
function initUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息不成功！')
            }

            form.val('formUserInfo', res.data)
        }
    })
}
$('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
        type: 'POST',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('更新用户信息失败！')
            }
            layer.msg('更新用户成功！')
            window.parent.getUserInfo()
        }
    })
})
$('#btnReset').on('click', function (e) {
    e.preventDefault()
    initUserInfo()
})