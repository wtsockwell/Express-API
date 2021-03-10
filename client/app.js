
$('#submitbtn').click(e => {
    e.preventDefault();
    let username = $("#username").val()
    let message = $("#message").val()

    $.ajax({
        type: 'POST',
        url: '/api/chirps',
        data: { username, message }
    }).then(res => {
        displayPosts();
    })

    $("#username").val("")
    $("#message").val("")
})

displayPosts();

function displayPosts() {
    $.ajax({
        type: 'GET',
        url: '/api/chirps'
    })
        .then(chirps => {
            $("#timeline").empty()

            //PUT functionality, not working
            // $('#changes').click(() => {
            //     let newUn = $('#username-edit').val()
            //     let newMsg = $('#message-edit').val()
            //     $.ajax({
            //         type: 'PUT',
            //         url: `/api/chirps/${id}`,
            //         data: JSON.stringify({ username: newUn, message: newMsg }),
            //         contentType: 'application/json'
            //     }).then((res) => {
            //         console.log(res)
            //         $('#modal').modal('hide')
            //         displayPosts();
            //     })
            // })

            for (const id in chirps) {
                if (id === "nextid") return
                const deleteBtn = $('<button class="btn btn-danger">X</button>').click(() => {
                    $.ajax({
                        type: 'DELETE',
                        url: `/api/chirps/${id}`
                    }).then(res => {
                        displayPosts();
                    })
                })
                //Preliminary testing for the modal with an edit button
                // const editBtn = $('<button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Edit</button>').click(() => {
                //     $('#modal').modal('show')
                //     $('#username-edit').val(`${chirps[id].username}`)
                //     $('#message-edit').val(`${chirps[id].message}`)
                // })



                const chirp = $(`<div class="border m-2 p-3">
                    <h1 class="m-2">${chirps[id].username}</h1>
                    <p class-"m-2">${chirps[id].message}</p>
                </div>`)
                //This section was for the modal
                // .click(() => {
                //     $('#modal').modal('show')
                //     $('#username-edit').val(`${chirps[id].username}`)
                //     $('#message-edit').val(`${chirps[id].message}`)
                // })
                chirp
                    .appendTo('#timeline')
                    .append(deleteBtn)
                // .append(editBtn)
            }
        })
}