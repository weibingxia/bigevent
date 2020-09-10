$(function () {
  // 注册点击事件监听
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  // 登录点击事件监听
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })
  var form = layui.form
  var layer=layui.layer
  // 表单验证
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function(value){
   var pwd=  $('.reg-box [ name="password"]').val()
   if(pwd!==value){
     return '两次输入密码不一致'
   }
    }
  })
  // 监测注册表单事件
$('#form_reg').on('submit',function(e){
e.preventDefault()
var data={
  username:$('#form_reg [name=username]').val(),
  password:$('#form_reg [name="password"]').val()
}
$.post('/api/reguser',data,function(res){
if(res.status!==0){
  return layer.msg(res.message)
}
layer.msg('注册成功，请登录！')
$('#link_login').click()
})
})
//登录表单事件监听
$('#form_login').on('submit',function(e){
  e.preventDefault()
  $.ajax({
    type:'POST',
    url:'/api/login',
    data:$(this).serialize(),
    success:function(res){
     if(res.status!==0){
       return layer.msg('登录失败')
     }
     layer.msg('登录成功')
     localStorage.setItem('token',res.token)
     location.href='/index.html'
    }
  })
})
})