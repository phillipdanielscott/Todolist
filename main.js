
$(document).ready(function() {

  phillipstodos.init();
})

var phillipstodos = {
  url: 'http://tiny-tiny.herokuapp.com/collections/phillipstodos',
  blogs: [],
  init: function() {
    phillipstodos.styling();

    phillipstodos.events();
  },
  styling: function() {
    phillipstodos.staythere();
  },
  events: function() {
    //Submit Edit
    $('.inputButton').on('click', function(event) {
        event.preventDefault();
        console.log("INDEED");
        window.glob = $(this);
        var todo = {
          todo: $('.activity').val()
        }
        phillipstodos.createTodo(todo)


    })


    $('.inputButton').on('click', function(event) {
        event.preventDefault();
        console.log("INDEED");
        window.glob = $(this);
        var todo = $('.discription').val();
        $('.List').append("<li>" + todo + '<a href="">x</a></li>');


    })

    $('.List').on('click','li', function(event){
      event.preventDefault();

      console.log("ON THE DONE LIST!", this)
      var itemId = $('.List li').attr('data-id');
      console.log(itemId);
      phillipstodos.seeYA(itemId);
    })

    $('.finishedList').on('click', 'li', function(event) {
      event.preventDefault();
        $(this).remove()

      })
    },

  createTodo: function(todo) {
    $.ajax({
      method: 'POST',
      url: 'http://tiny-tiny.herokuapp.com/collections/phillipstodos',
      data: todo,
      success: function(data) {
        console.log("DATA", data)
        var htmlStr = phillipstodos.htmlGenerator(toDoTemplates.toDoItemsTemplate,data);
        $('.List').append(htmlStr);

      },
      error: function(err) {
        console.error('shit',err);
      },
    })
    },
      staythere: function() {
       $.ajax({
         url: phillipstodos.url,
         method: "GET",
         success: function(data) {
           console.log("WE GOT SOMETHING", data);
           $('.List').html('');
           data.forEach(function(element,idx) {
             var htmlStr = phillipstodos.htmlGenerator(toDoTemplates.toDoItemsTemplate,element);
             $('.List').append(htmlStr);
           })


          //  $('.List li').html("");
          //  data.forEach(function(element,idx) {
            //  var blogHtmlStr = phillipstodos.htmlGenerator(blogTemplates.blogTmpl,element);
            //  $('.blogs ul').append(blogHtmlStr)
            //  phillipstodos.blogs.push(element);
          //  });
         }
      });
    },
    seeYA: function(id) {
      var deleteurl = phillipstodos.url + "/" + id
     $.ajax({
       url: deleteurl,
       method: "DELETE",
       success: function(data) {
         console.log("SEEEE YAAAA", data);
         phillipstodos.staythere();
        // phillipstodos.staythere();
       }
    });
  },

  templification: function(template) {
     return _.template(template);
   },

    htmlGenerator: function(template,data) {
      var tmpl = phillipstodos.templification(template);
      return tmpl(data);
    }
};
