
const autoRotate = true;
const autoplaySpeed = 3;

if (window.location.pathname === "/") {
    document.body.classList.add("template-index")
}

if (window.location.pathname.includes("/products/")) {
    document.querySelector("header").classList.add("header-bg-second");
}