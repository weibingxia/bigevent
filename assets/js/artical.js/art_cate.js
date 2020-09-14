$(function () {
    initArtCateList()
    function initArtCateList() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    var layer=layui.layer
    
    var indexAdd=null
    $('#btnAddCate').on('click',function(){
        indexAdd=  layer.open({
          type:1,
          area: ['500px', '250px'],
          title:'文章分类',
          content:$('#dialog-add').html()
      })
    })
    $('body').on('submit','#form-add',function(e){
      e.preventDefault()
      $.ajax({
          type:'POST',
          url:'/my/article/addcates',
          data:$(this).serialize(),
          success:function(res){
           if(res.status!==0){
               return layer.msg('新增分类列表失败！')
           }
          
           initArtCateList()
           layer.msg('新增分类列表成功！')
           layer.close(indexAdd)
          }
      })
    })
    var indexEdit=null
    var form=layui.form
     $('tbody').on('click','.btn-edit',function(){
        indexEdit=  layer.open({
            type:1,
            area: ['500px', '250px'],
            title:'文章分类',
            content:$('#dialog-edit').html()
        })
        var id=$(this).attr('data-id')
        $.ajax({
            type:'GET',
            url:'/my/article/cates/'+id,
            success:function(res){
                console.log(res);
              form.val('form-edit',res.data)
            }
        })
      })
     $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
             if(res.status!==0){
                 return layer.msg('更新数据分类失败！')
             }
             layer.msg('更新数据分类成功！')
             layer.close(indexEdit)
             initArtCateList()
            }
        })
     })
     $('body').on('click','.btn-delete',function(){
       var id=$(this).attr('data-id')
       layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
        $.ajax({
            type:'GET',
            url:'/my/article/deletecate/'+id,
            success:function(res){
             if(res.status!==0){
                 return layer.msg('删除数据失败！')
             }
             layer.msg('删除数据成功！')
             layer.close(index);
             initArtCateList()
            }
        })
        
        
      });
     })
})