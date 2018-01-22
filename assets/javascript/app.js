$(document).ready(function() {
    var animals = ["Elephant", "Cat", "Dog", "Fish", "Bird", "Snake", "Orca", "Bunny", "Monkey", "Lizard", "Shark", "Butterfly", "Fox", "Turtle", "Dolphin"];

    function main() {
        $('#buttons').empty();

        for (var i = 0; i < animals.length; i++) {

            var autoButton = $("<button>");
            autoButton.addClass("animal");
            autoButton.attr('name', animals[i]);
            autoButton.text(animals[i]);
            $('#buttons').append(autoButton);
        }
        callback();
    }

    $('#submitButton').on("click", function() {
        event.preventDefault();
        var userSearch = $('#searchAnimal').val();
        animals.push(userSearch);
        main();
    });

    main();

    function callback() {
        $('.animal').on('click', function() {
            $('#gif-holder').empty();
            var searchString = $(this).attr('name');
            console.log(searchString);
            var dataUrl = "https://api.giphy.com/v1/gifs/search?api_key=DkfjcCcW0Nde1A56akTTqoOsqFfjAfaV&q=" + searchString + "&limit=10&offset=0&rating=G&lang=en";
            $.ajax({
                url: dataUrl,
                method: 'GET',
                dataType: 'json'
            }).then(function(response) {

                console.log(response);

                var result = response.data;

                result.forEach(element => {
                    var gifDiv = $('<div class="gif_div">');
                    var p = $('<p>');
                    var img = $('<img class="gifImage">');
                    console.log(element.rating);
                    p.text("Rating: " + element.rating);
                    img.attr('src', element.images.fixed_height_still.url);
                    img.attr('data-state', "still");
                    img.attr('data-still', element.images.fixed_height_still.url);
                    img.attr('data-animated', element.images.fixed_height.url);
                    gifDiv.append(p);
                    gifDiv.append(img);
                    $('#gif-holder').append(gifDiv);
                });
                $('.gifImage').on('click', function() {
                    var state = $(this).attr('data-state');
                    console.log(state);
                    if (state === "still") {
                        $(this).attr('data-state', "animated");
                        $(this).attr('src', $(this).attr("data-animated"));
                    } else if (state === "animated") {
                        $(this).attr('data-state', "still");
                        $(this).attr('src', $(this).attr("data-still"));
                    }
                });
            });
        });
    }
});