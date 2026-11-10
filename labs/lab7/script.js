
const ACCESS_KEY = "0mCxoxWujGefC4YiV8gm-WKmtbgcz6HyM8qR6F_jzN8";

// Display images from Unsplash
function displayImages(data) {

    var gallery = document.getElementById("gallery");
    var titleElem = document.getElementById("title");
    var sampElem = document.getElementById("sampleOutput");

    gallery.innerHTML = "";

    titleElem.innerText = "Search Results";

    sampElem.innerText = JSON.stringify(data, null, 2);

    data.results.forEach(photo => {

        var img = document.createElement("img");

        img.src = photo.urls.small;
        img.alt = photo.alt_description || "Unsplash Image";

        gallery.appendChild(img);
    });
}


// Method 1: XMLHttpRequest (XHR)
function searchUsingXHR() {

    var keyword = document.getElementById("inputBox").value;
    var sampElem = document.getElementById("sampleOutput");

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

        // When the request is successful, finished, and response is ready
        if (this.readyState == 4 && this.status == 200) {

            var responseObj = JSON.parse(xhr.responseText);

            displayImages(responseObj);
        }

        else if (this.readyState == 4) {
            sampElem.innerText = "Error: " + xhr.status;
        }
    };

    // Send an asynchronous HTTP GET request
    xhr.open(
        "GET",
        "https://api.unsplash.com/search/photos?query=" +
        encodeURIComponent(keyword) + "&per_page=12",
        true
    );

    xhr.setRequestHeader(
        "Authorization",
        "Client-ID " + ACCESS_KEY
    );

    xhr.send();
}


// Method 2: Fetch with Promises
function searchUsingFetch() {

    var keyword = document.getElementById("inputBox").value;
    var sampElem = document.getElementById("sampleOutput");

    fetch(
        "https://api.unsplash.com/search/photos?query=" +
        encodeURIComponent(keyword) + "&per_page=12",
        {
            headers: {
                "Authorization": "Client-ID " + ACCESS_KEY
            }
        }
    )

        .then(response => {

            if (!response.ok) {
                throw new Error("HTTP Error: " + response.status);
            }

            return response.json();
        })

        .then(data => {

            displayImages(data);

        })

        .catch(error => {

            sampElem.innerText = error.message;

        });
}


// Method 3: Fetch with Async/Await
async function searchUsingFetchAwaitAsync() {

    var keyword = document.getElementById("inputBox").value;
    var sampElem = document.getElementById("sampleOutput");

    try {

        let response = await fetch(
            "https://api.unsplash.com/search/photos?query=" +
            encodeURIComponent(keyword) + "&per_page=12",
            {
                headers: {
                    "Authorization": "Client-ID " + ACCESS_KEY
                }
            }
        );

        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }

        let data = await response.json();

        displayImages(data);

    }

    catch (error) {

        sampElem.innerText = error.message;

    }
}
