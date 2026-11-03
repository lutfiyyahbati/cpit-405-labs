
let likeCount = 0;
let dislikeCount = 0;
let hasVoted = false;
let hasCommented = false;

// Get HTML elements
const likeBtn = document.getElementById("likeBtn");
const dislikeBtn = document.getElementById("dislikeBtn");

const likeCountDisplay = document.getElementById("likeCount");
const dislikeCountDisplay = document.getElementById("dislikeCount");

const commentInput = document.getElementById("commentInput");
const submitBtn = document.getElementById("submitBtn");
const comments = document.getElementById("comments");
const resetBtn = document.getElementById("resetBtn");

// Save data in cookies
function saveCookie(name, value) {
    document.cookie = name + "=" + encodeURIComponent(value) + "; path=/";
}

// Read cookies
function getCookie(name) {
    let cookies = document.cookie.split("; ");

    for (let cookie of cookies) {
        let parts = cookie.split("=");
        if (parts[0] === name) {
            return decodeURIComponent(parts.slice(1).join("="));
        }
    }
    return "";
}

// Display comment
function displayComment(comment) {
    let p = document.createElement("p");
    p.textContent = comment;
    comments.appendChild(p);
}

// Load saved data
function loadData() {
    likeCount = Number(getCookie("likeCount")) || 0;
    dislikeCount = Number(getCookie("dislikeCount")) || 0;
    hasVoted = getCookie("hasVoted") === "true";
    hasCommented = getCookie("hasCommented") === "true";

    likeCountDisplay.textContent = likeCount;
    dislikeCountDisplay.textContent = dislikeCount;

    let savedComments = getCookie("comments");

    if (savedComments) {
        JSON.parse(savedComments).forEach(displayComment);
    }

    likeBtn.disabled = hasVoted;
    dislikeBtn.disabled = hasVoted;
    submitBtn.disabled = hasCommented;
}

// Like button
likeBtn.onclick = function() {
    if (!hasVoted) {
        likeCount++;
        hasVoted = true;

        likeCountDisplay.textContent = likeCount;

        saveCookie("likeCount", likeCount);
        saveCookie("hasVoted", "true");

        likeBtn.disabled = true;
        dislikeBtn.disabled = true;
    }
};

// Dislike button
dislikeBtn.onclick = function() {
    if (!hasVoted) {
        dislikeCount++;
        hasVoted = true;

        dislikeCountDisplay.textContent = dislikeCount;

        saveCookie("dislikeCount", dislikeCount);
        saveCookie("hasVoted", "true");

        likeBtn.disabled = true;
        dislikeBtn.disabled = true;
    }
};

// Submit comment
submitBtn.onclick = function() {
    let comment = commentInput.value.trim();

    if (comment !== "" && !hasCommented) {
        displayComment(comment);

        let savedComments = getCookie("comments");
        let commentList = savedComments ? JSON.parse(savedComments) : [];

        commentList.push(comment);

        saveCookie("comments", JSON.stringify(commentList));
        saveCookie("hasCommented", "true");

        hasCommented = true;
        submitBtn.disabled = true;

        commentInput.value = "";
    }
};

// Reset button
resetBtn.onclick = function() {
    likeCount = 0;
    dislikeCount = 0;
    hasVoted = false;
    hasCommented = false;

    comments.innerHTML = "";

    likeCountDisplay.textContent = 0;
    dislikeCountDisplay.textContent = 0;

    let cookieNames = [
        "likeCount",
        "dislikeCount",
        "hasVoted",
        "hasCommented",
        "comments"
    ];

    cookieNames.forEach(function(name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    });

    likeBtn.disabled = false;
    dislikeBtn.disabled = false;
    submitBtn.disabled = false;
};

// Start program
loadData();

