$(document ).ready(function() {

    // Cambia icona audio/invia quando viene cliccato l'input
    $("#message").click(function () {
      $(".audio-record").hide();
      $(".send-message").show();
    });
    // Al click dell'icona send-message viene inviato un messaggio e c'è il cambio icona
    $(".send-message").click(function(){
      sendMsg();
      $(".audio-record").show();
      $(".send-message").hide();
    });
    // Cambia icona audio/invia quando viene cliccato l'input
    $(".message-box #message").keypress(function(){
      $(".audio-record").hide();
      $(".send-message").show();
    // Se viene premuto il tasto invio allora invio il messaggio e ripristino le icone
      if(event.which == 13){
        console.log(event.which);
        sendMsg();
        $(".audio-record").show();
        $(".send-message").hide();
      }
    });
    // Funzione per rimuove i messaggi
    function deleteMsg(){
      $(".chat").on('click','.pUsr .dropdown',function(){
        $(this).siblings().remove();
        $(this).remove();
      });
    };
    // Funzione per cercare conversazione
    $("#TextSrcUsr").keyup(function(){
      // Salvo ciò che viene digitato
      var key = $("#TextSrcUsr").val().toLowerCase();
      console.log(key);
      
      $(".usr-info span:first-child").each(function (i, item) {
        // Leggo il nome dell'utente inserito nell'HTML
        var userName = $(item).html().toLowerCase();
        console.log(userName);
        // Se trova una corrispondenza la rendo visibile
        if (!userName.includes(key)) {
            $(item).parent().parent().addClass("hide");
        } else {
            $(item).parent().parent().removeClass("hide");
        }
      });
    });

    // Creo funzione invio messaggio utente e bot
    function sendMsg(){
      // Salvo il messaggio scritto dall'utente
      var sentUsrMessage = $("#message").val();
      // Se la mia stringa è vuota
      if(sentUsrMessage == ""){
        return alert("Messaggio vuoto");
      // Se l'utente inserisce uno spazio e preme invio
      } else if(sentUsrMessage === " "){
        return alert("Inviare uno spazio non ha senso!!!")
      }
      // Creo variabile per selezionarmi l'elemento per copiarlo
      var elementUsrMessage = $("#template .pUsr").clone();
      
      // Creo una variabile che associa il DIV copiato al messaggio scritto dall'utente (Eliminata avendola inclusa già nella variabile precedente)
      // var elementMsgSent = elementMessage.text(sentMessage);

      // Inserisco il messaggio tra il mio div clonato "elementMessage" e il tag <p>
      var outputUsr = elementUsrMessage.html("<p>" + sentUsrMessage + "</p>" + "<i class='fas fa-angle-down icona-menu'>" + "</i>" + "<i class='fas fa-angle-up icona-menu-up'>" + "</i>" + "<div class='dropdown'>" + "<a href='#'>" + "<span class='text-delete'>" + "Elimina" + "</span>" + "</a>");
      
      // Inserisco il DIV + Messaggio utente dopo una classe messa all'interno dell'html
      $(".chat").append(outputUsr);
      // ripuliamo il contenuto dell'input, per UX
      $("#message").val("");
      // Fine funzione utente



      // Creo funzione per chatbot
      function botMessageText(){
        // Creo variabile per selezionarmi l'elemento per copiarlo
        var elementBotMessage = $("#template .botMessage .pBot").clone();
        console.log(elementBotMessage);

        // Inserisco il messaggio tra il mio div clonato "elementBotMessage" e il tag <p>
        var outputBot = elementBotMessage.html("<p>" + "Ciao, io sono un bot" + "</p>");
        
        // Inserisco il DIV + Messaggio utente dopo una classe messa all'interno dell'html
        $(".chat").append(outputBot);
      };
      setTimeout(botMessageText,1000); // Fine funzione bot

      // Mostro / nascondo l'icona in base al mouse
      $(".chat .pUsr p").on({
        mouseenter: function() {
          $(".icona-menu").show();
        },
        mouseleave: function (){
          $(".icona-menu").hide();
        }
      });
      // Se l'icona viene cliccata allora mostro menù a tendina
      $(".icona-menu").click(function() {
        $(".dropdown").toggle();
        deleteMsg();
      });
    }; // Fine Funzione send
  }); // Document Ready