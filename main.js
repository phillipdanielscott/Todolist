
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
        $('.List').append("<li>" + todo.todo + '<a href="">x</a></li>');


    })

    $('.List').on('click', 'li', function(event){
      event.preventDefault();
      console.log("voodoo!", this)
      var toFinishedlist = $('a').val();
      $(".finishedList").append(this);

    })


    // $('.inputButton').on('click', function(event) {
    //     event.preventDefault();
    //     console.log("INDEED");
    //     window.glob = $(this);
    //     var todo = $('.discription').val();
    //     $('.List').append("<li>" + todo + '<a href="">x</a></li>');


    // })

    $('.List').on('click', 'li', function(event){
      event.preventDefault();
      console.log("ON THE DONE LIST!", this)
      var toFinishedlist = $('a').val();
      $(".finishedList").append(this);

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
           data.forEach(function(element) {
             $('.List').append("<li>" + element.todo + '<a href="">x</a></li>');
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
         data.forEach(function(element) {
         })

       }
    });
  },

templification: function(template) {
    return _.template(template);
  },

   htmlGenerator: function(template,data) {
     var tmpl = toDo.templification(template);
     return tmpl(data);
   }
};
