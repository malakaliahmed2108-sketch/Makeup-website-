document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // منع الريفريش

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields.");
        return;
    }

    alert("Your message has been sent successfully! 💖✨");

    // reset form
    this.reset();
});
