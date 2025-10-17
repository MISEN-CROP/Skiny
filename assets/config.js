
const autoRotate = true;
const autoplaySpeed = 3;

if (window.location.pathname === "/") {
    document.body.classList.add("template-index")
}

if (window.location.pathname.includes("/products/") || window.location.pathname.includes("/pages/") || window.location.pathname.includes("/collections/") || window.location.pathname.includes("/search")) {
    document.querySelector("header").classList.add("header-bg-second");
}

const addContainerApp = () => {
    console.log("addContainerApp called");
    const listSparkContainer = document.querySelectorAll(".spark-carousal-root");
    listSparkContainer.forEach((container) => {
        const h2 = container.querySelector("h2");
        if (container) {
            container.style.paddingTop = "30px";
            container.style.paddingBottom = "30px";
        }
        if (h2) {
            h2.setAttribute("class", "");
            const textContent = h2.textContent || h2.innerText;
            h2.innerHTML = `
            <span class="text-left text-3xl md:text-4xl lg:text-6xl font-bold uppercase tracking-tight mb-10 block">${textContent}</span>
            `
        }
        container.classList.add("page-container");
    });
}
setTimeout(() => {
    addContainerApp();
}, 2000)