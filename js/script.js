$(document).ready(
  function (){
    // faccio stampare subito le cose da fare presenti nell'API
    prendiCoseDaFare();

    cancella();
    //  funzione per cancellare elementi dalla lista
    function cancella(){
      // al click sul tasto cancella, prende l'id
      // dal valore dell'attributo della li
      // e chiama con comando DELETE l'indirizzo dell'API
      $(document).on('click', '.my_delete', function(){
        var thisId = $(this).parent().attr('data-todo-id');
        $.ajax({
          url:'http://157.230.17.132:3025/todos/' + thisId,
          method:'DELETE',
          success: function(dataResponse){
            prendiCoseDaFare();
          },
          error: function(){
            alert('Non è stato possibile cancellare l\'elemento');
          }
        });
      });
    }

    aggiungi();
    // funzione per aggiungere cose alla lista
    function aggiungi(){
      // al click su aggiungi prende il valore della my_input
      // e se la input ha un valore chiama con comando POST
      // l'indirizzo della API
      $('.my_add').click(function(){
        var nuovaCosaDaFare = $('.my_input').val();

        if(nuovaCosaDaFare.length > 0){
          $.ajax({
            url:'http://157.230.17.132:3025/todos/',
            method:'POST',
            data:{
              text:nuovaCosaDaFare
            },
            success: function(dataResponse){
              prendiCoseDaFare();
            },
            error: function(){
              alert('Non è stato possibile salvare l\'elemento');
            }
          });
        } else {
          alert('Non hai scritto niente, aggiungi del testo');
        }
      });
    }

    // funzione per prendere la lista delle cose da fare dall'API
    // e per stamparla con handlebars
    function prendiCoseDaFare(){
      // qui resetta la lista altrimenti la stamperebbe più volte
      $('.my_list').html('');
      // chiamata ajax per prendere trmite metodoo GET la lista delle
      // cose da fare gia presenti nell'API, se ci sono elementi li stampa
      // tramite handlebars sullo schermo
      $.ajax({
        url:'http://157.230.17.132:3025/todos/',
        method: 'GET',
        success: function(dataResponse){
          if (dataResponse.length > 0) {
            var source = $('#entry-template').html();
            var template = Handlebars.compile(source);

            for (var i = 0; i < dataResponse.length; i++) {
              var thisToDo = dataResponse[i];
              var html = template(thisToDo);

              $('.my_list').append(html);
            }
          }
        },
        error: function(){
          alert('Errore')
        }
      });
    }
  }
);
