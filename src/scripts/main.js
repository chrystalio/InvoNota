document.getElementById("business-logo").addEventListener("change", function(event) {
    let fileName = event.target.files[0] ? event.target.files[0].name : "No file chosen";
    document.getElementById("file-chosen").textContent = fileName;
});
