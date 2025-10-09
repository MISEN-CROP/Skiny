class MegaMenu {
    constructor() {
        this.navItems = document.querySelectorAll(".nav-link"), this.megaMenuContainer = document.getElementById("mega-menu-container"), this.initializeMenu()
    }
    initializeMenu() {
        this.navItems.forEach(item => {
            const placeholder = item.querySelector(".mega-menu-placeholder");
            if (placeholder) {
                const menuHandle = placeholder.dataset.menu,
                    megaMenu = document.getElementById("mega-menu-" + menuHandle);
                if (megaMenu) {
                    this.megaMenuContainer.appendChild(megaMenu), this.addEventListeners(item, megaMenu);
                    const productContainer = megaMenu.querySelector(".mega-product-container");
                    this.initializeSplide(productContainer)
                }
            }
        })
    }
    initializeSplide(container) {
        const splide = new Splide(container, {
            type: "slide",
            perPage: 5,
            perMove: 1,
            gap: "36px",
            pagination: !1,
            arrows: !1,
            drag: !0,
            wheel: !0,
            breakpoints: {
                1700: {
                    perPage: 4
                },
                1300: {
                    perPage: 3
                }
            }
        }),
            paginationContainer = document.createElement("div");
        paginationContainer.classList.add("splide-pagination");
        const line = document.createElement("div");
        line.classList.add("splide-pagination-line"), paginationContainer.appendChild(line), container.parentElement.appendChild(paginationContainer);
        const updatePaginationLine = () => {
            const totalSlides = splide.Components.Slides.getLength(),
                percentage = Math.min(splide.options.perPage, totalSlides) / totalSlides * 100,
                currentPosition = splide.index / totalSlides * 100;
            line.style.width = `${percentage}%`, line.style.left = `${currentPosition}%`
        };
        splide.on("mounted move", updatePaginationLine);
        const updatePaginationVisibility = () => {
            splide.Components.Slides.getLength() <= splide.options.perPage ? paginationContainer.style.display = "none" : paginationContainer.style.display = "block"
        };
        splide.on("mounted move", updatePaginationVisibility);
        const centerContentForSingleItem = () => {
            splide.Components.Slides.getLength() === 1 ? container.querySelector(".splide__list").style.justifyContent = "center" : container.querySelector(".splide__list").style.justifyContent = "flex-start"
        };
        splide.on("mounted move", centerContentForSingleItem), splide.mount()
    }
    addEventListeners(item, megaMenu) {
        item.addEventListener("mouseenter", () => {
            this.showMenu(megaMenu)
        }), item.addEventListener("mouseleave", () => {
            setTimeout(() => {
                !megaMenu.matches(":hover") && !item.matches(":hover") && this.hideMenu(megaMenu)
            }, 100)
        }), megaMenu.addEventListener("mouseleave", () => {
            setTimeout(() => {
                !megaMenu.matches(":hover") && !item.matches(":hover") && this.hideMenu(megaMenu)
            }, 100)
        }), megaMenu.addEventListener("mouseenter", () => {
            this.showMenu(megaMenu)
        })
    }
    showMenu(megaMenu) {
        megaMenu.classList.add("show")
    }
    hideMenu(megaMenu) {
        megaMenu.classList.remove("show")
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new MegaMenu
});