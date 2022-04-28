window.onload = () => {

    const renderTasks = async () => {

        const listTasks = document.getElementById("listTasks");

        // Fetch GetTasks
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            mode: 'cors',
            method: 'GET',
            headers: myHeaders,
            credentials: 'include'
        };

        const response = await fetch(`https://easymarket-backend.beagoddess.repl.co/delivery/tasks`, requestOptions)

        let tasks = await response.json();
        if (tasks.login == "false") {

            window.location.href = 'https://easymarketisi.web.app/index.html';
            
        } else {
            tasks = tasks.body;
            let strHtml = ``;

            for (let i = 0; i < tasks.length; i++) {

                if (tasks[i].progress.type == "open") {

                    strHtml += ` 
                        <li>
                            <div class="form-check">
                                
                                <label class="form-check-label">
                                <input class="checkbox" id=${tasks[i].id} type="checkbox">${tasks[i].name}
                                <i class="input-helper"></i>
                                </label>
    
                            </div>
    
                            <i id=${tasks[i].id} class="remove mdi mdi-close-circle-outline"></i>
                        </li>`

                } else {

                    strHtml += ` 
                        <li class="completed">
                            <div class="form-check">
    
                                <label class="form-check-label">
                                <input class="checkbox" id=${tasks[i].id} type="checkbox" checked>${tasks[i].name}
                                <i class="input-helper"></i>
                                </label>
                                
                            </div>
    
                            <i id=${tasks[i].id} class="remove mdi mdi-close-circle-outline"></i>
                        </li>`

                }

            }

            listTasks.innerHTML = strHtml;
        }

    };

    renderTasks();

    /*******************************************************************

                        CHECKLIST JAVASCRIPT

    ******************************************************************/

    var todoListItem = $('.todo-list');
    var todoListInput = $('.todo-list-input');

    $('.btn-primary').on("click", function (event) {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        var item = $(this).prevAll('.todo-list-input').val();

        if (item) {
            var requestOptions = {
                mode: 'cors',
                method: 'POST',
                headers: myHeaders,
                credentials: 'include',
                body: JSON.stringify({
                    "name": item
                })
            };

            fetch(`https://easymarket-backend.beagoddess.repl.co/delivery/tasks`, requestOptions)
                .then(response => {
                    return response.json();
                })
                .then((result) => {

                    todoListItem.append(`<li><div class='form-check'><label class='form-check-label'><input class='checkbox' id=${result.id} type='checkbox'/> ${item} <i class='input-helper'></i></label></div><i id=${result.id} class='remove mdi mdi-close-circle-outline'></i></li>`);
                    todoListInput.val("");

                })



        }

    });

    todoListItem.on('change', '.checkbox', async function () {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");



        if ($(this).attr('checked')) {
            $(this).removeAttr('checked');

            var requestOptions = {
                mode: 'cors',
                method: 'PUT',
                headers: myHeaders,
                credentials: 'include',
                body: JSON.stringify({
                    "status": "to do"
                })
            };

            fetch(`https://easymarket-backend.beagoddess.repl.co/delivery/tasks/${$(this).attr('id')}`, requestOptions)
                .then(response => {
                    return response.json();
                })
                .then((result) => {
                    console.log(result)
                })


        } else {
            $(this).attr('checked', 'checked');


            var requestOptions = {
                mode: 'cors',
                method: 'PUT',
                headers: myHeaders,
                credentials: 'include',
                body: JSON.stringify({
                    "status": "complete"
                })
            };

            fetch(`https://easymarket-backend.beagoddess.repl.co/delivery/tasks/${$(this).attr('id')}`, requestOptions)
                .then(response => {
                    return response.json();
                })
                .then((result) => {
                    console.log(result)
                })

        }

        $(this).closest("li").toggleClass('completed');

    });


    todoListItem.on('click', '.remove', function () {
        $(this).parent().remove();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            mode: 'cors',
            method: 'DELETE',
            headers: myHeaders,
            credentials: 'include'
        };

        fetch(`https://easymarket-backend.beagoddess.repl.co/delivery/tasks/${$(this).attr('id')}`, requestOptions)
            .then(response => {
                return response.json();
            })
            .then((result) => {
                console.log(result)
            })

    });
}