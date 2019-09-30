$(document)
    .ready(function () {
        const myListAll = [];
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
            myListAll.push({id: generateUUID(), name: value, checked: "checked"});
            showlist();
            $('input[name=ListItem]').val("");
        });

         function showlist() {
            const html = myListAll
            .map(element => generateToDo(element))
//          .reduce((element1, element2) => element1 + element2, "");
            $('ol').html(html);
         }

         $(document).on('click', 'input[name=done-todo]', function (event) {
            $(this)
            .parent()
            .toggleClass('checked');
        });


      $("#filters li a").click(function () {
          var customType = $(this).data('filter');
          console.log(customType);
          if(customType == 'all')
          {
               console.log('1');
               $("li").filter(".checked").show();
          }
          else if(customType == 'active')
          {
                console.log('2');
                $("li").filter(".checked").hide();
          }
          else
          {
                console.log('3');
                $("li:not(.checked)").hide();
                $("li").filter(".checked").show();
          }
      });
});