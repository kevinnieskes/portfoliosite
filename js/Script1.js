// JavaScript source code
function renderPosts(posts) {
    var postsDIV = document.getElementById("posts");
    posts.forEach(function (post) {
        var postDIV = document.createElement("div");
        var postNameDIV = document.createElement("div");
        var postAuthorDIV = document.createElement("div");
        var postContentDIV = document.createElement("div");

        postNameDIV.innerHTML = post.name;
        postAuthorDIV.innerHTML = post.author;
        postContentDIV.innerHTML = post.content;

        postDIV.setAttribute("Class", "post");
        postNameDIV.setAttribute("Class", "post-name");
        postAuthorDIV.setAttribute("Class", "post-author");
        postContentDIV.setAttribute("Class", "post-content");

        postDIV.appendChild(postNameDIV);
        postDIV.appendChild(postAuthorDIV);
        postDIV.appendChild(postContentDIV);

        postsDIV.appendChild(postDIV);
    });
}

function getPosts(callback) {
    var request = new XMLHttpRequest();

    request.onload = function () {
        var posts = JSON.parse(request.responseText);
        callback(posts);
    };
    request.open("GET", "posts.json", true);
    request.send(null);

}

getPosts(function (posts) {
    renderPosts(posts);
});

$('#search').keyup(function () {
    var searchTerm = $(this).val();
    var myExp = new RegExp(searchTerm, "i");
    if (searchTerm == "") {
        $('#update').html("");

    }
    else {
        $.getJSON('posts.json', function (data) {

            var output = "<div id='result'>";
            $.each(data, function (key, val) {

                if (val.name.search(myExp) != -1) {
                    output += '<p>';
                    output += '<h3>' + val.name + '</h3>';
                    output += '<h5>' + val.author + '</h5>';
                    output += '<h6>' + val.content + '</h6>';
                    output += '</p>';
                }
            });

            output += "</div>";
            $('#update').html(output);

        });
    }
});


