document.addEventListener("DOMContentLoaded", function () {
    // Auto Slider
    let slider = document.getElementById("slider");
    let images = slider.children;
    let index = 0;

    function slideImages() {
        index = (index + 1) % images.length;
        slider.style.transform = `translateX(-${index * 100}%)`;
    }
    setInterval(slideImages, 3000); // Auto-slide every 3 seconds

    // Manual Slider Controls
    document.getElementById("prevBtn").addEventListener("click", function () {
        index = index > 0 ? index - 1 : images.length - 1;
        slider.style.transform = `translateX(-${index * 100}%)`;
    });

    document.getElementById("nextBtn").addEventListener("click", function () {
        slideImages();
    });

    // Button Interaction
    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("mouseover", () => {
            button.style.boxShadow = "0px 4px 15px rgba(255, 255, 255, 0.3)";
        });
        button.addEventListener("mouseout", () => {
            button.style.boxShadow = "none";
        });
    });
});
