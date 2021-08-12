const API_KEY =""
var num_images_per_page = 3
var api_url =""

document.addEventListener('DOMContentLoaded', function(){
    $("form").submit(function () {
        console.log("submitted form")
        var queryText = $("#queryText").val()
        api_url = `https://api.pexels.com/v1/search?query=${queryText}&per_page=${num_images_per_page}`
        get_Images()
        return false
    })
});

function get_Images(){
    if(! api_url){
        return false
    }
    var image_section = document.querySelector("#imagesSection")
    $.ajax({
        type: "GET",
        url: api_url,
        dataType: 'json',
        headers: {
            "Authorization": API_KEY
        },
        success: function (data){
            console.log(data)
            api_url = data.next_page
            data.photos.forEach(element => {
                var Imagesource = element.src.original
                var newImage = document.createElement("img")
                newImage.src = Imagesource
                newImage.loading="lazy"
                image_section.appendChild(newImage)
            });
        },
        error: function (error){
            console.error(error);
        }
    });
}

window.onscroll =()=>{
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight){
        console.log(api_url)
        get_Images()
    }
}