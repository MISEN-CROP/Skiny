
const autoRotate = true;
const autoplaySpeed = 3;

if (window.location.pathname === "/") {
    document.body.classList.add("template-index")
}

if (window.location.pathname.includes("/products/") || window.location.pathname.includes("/pages/") || window.location.pathname.includes("/collections/") || window.location.pathname.includes("/search")) {
    document.querySelector("header").classList.add("header-bg-second");
}