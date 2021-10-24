//Muestra el Formulario de Telegram
function showMessenger(){
    //Creo contenedor del FOrmulario
    const formMessage = document.createElement('div')
    formMessage.id = 'formMessageDiv'

    formMessage.innerHTML=
        `<form id="formMessage" class=" row container ">
        <div class="mb-3 col-sm-3">
            <label style="font-size: 1.5rem;" class="col-form-label">Formulario de Telegram</label>
            <label style="font-size: 1.5rem;"  class="col-form-label">BOT: JavaScriptTeleMs</label>
        </div>
        <div class="mb-3">
            <label for="token" class="form-label">Token del Bot</label>
            <input type="text" class="form-control" id="token" value="2086841034:AAGk0pj6zP7yVrH41u9ZeofEKaSFD14lt7s" disabled>
        </div>
        <div class="mb-3 ml-3">
            <label for="chat_id" class="form-label">Chat ID</label>
            <input class="form-control" type="text" name="chat_id" id="chat_id" value="1076491151" disabled>
        </div>
        <div class="ml-3 col-sm-3">
            <label for="messageBody" class="form-label">Mensaje a Enviar</label>
            <textarea class="form-control" id="messageBody" rows="3" disabled></textarea>
        </div>
        <div id="telegramFormButton">
                <button type="button" class="btn btn-primary" onclick="SendMessage()">Confirm Submit</button>
                <button class="btn btn-danger" onclick="Close('messenger')">Close</button>   
        </div>
    </form>`

    document.body.appendChild(formMessage)
}
//Funcion que envia mensaje al BOT de telegram
async function SendMessage(){

    console.log('submit');
    $.ajax({
        url: 'https://api.telegram.org/bot' + $('#token').val() + '/sendMessage',
        method: 'POST',
        data: { chat_id: $('#chat_id').val(), text: $('#messageBody').val() },
        success: function () {
            alert('your message has been sent!');
        }
    });
};
