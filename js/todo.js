$(document)
    .ready(function () {
        const myListAll = [];
        var initVal = 0;
        const generateToDo = (element) => `<li id=${element.id} class="${element.complete? "checked": ""}"><input name="done-todo" ${element.complete? 'checked': ""} type="checkbox" class="done-todo" /><span> ${element.name}</span> </li>`

        function generateUUID() {
            var i,
                random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12
                    ? 4
                    : (i === 16
                        ? (random & 3 | 8)
                        : random)).toString(16);
            }
            return uuid;
        }

        $('#button').click(function(){
            var value = $('input[name=ListItem]').val();
            myListAll.push({id: generateUUID(), name: value, checked: ""});
            showlist();
            $('input[name=ListItem]').val("");
        });

         function showlist() {
            const html = myListAll.map(element => generateToDo(element))
            $('ol').html(html);
         }

         $(document).on('click', 'input[name=done-todo]', function (event) {
            $(this)
            .parent()
            .toggleClass('checked');
        });


      $("#filters li a").click(function () {
          var customType = $(this).data('filter');
          if(customType == 'all')
          {
               $("li").filter(".checked").show();
               $("ol li:not(.checked)").show();
          }
          else if(customType == 'active')
          {
                $("li").filter(".checked").hide();
                $("ol li:not(.checked)").show();
          }
          else
          {
                $("li").filter(".checked").show();
                $("ol li:not(.checked)").hide();
          }
      });

      $(document).on('dblclick', 'li', function () {
            $(this).children('span').attr('contentEditable', 'true').focus().keypress(function (event){
                    var keycode = (event.keyCode ? event.keyCode : event.which);
                    if (keycode == '13') {
                        event.target.blur();
                        $(this).children('span').attr('contenteditable', 'false');
                        todoList.find(element => element.id == $(this).parent()[0].id).name = $(this).text();
                        renderTodoList();
                    }
            });
      });
    });