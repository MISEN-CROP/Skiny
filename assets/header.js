class Header {
    constructor(container) {
        this.container = container,
            this.mainContainer = container.querySelector("main"),
            this.mobileMenuToggles = container.querySelectorAll("[mobile-nav-toggle]"),
            this.mobileMenuItemToggles = container.querySelectorAll("[mobile-menu-item-toggle]"),
            this.searchIcon = container.querySelector(".js-show-search"),
            this.closeSearchIcon = container.querySelector(".search-close"),
            this.headerContainer = container.querySelector(".header-wrapper"),
            this.mobileMenuPages = container.querySelectorAll(".mobile-menu-page"),
            this.init()
    }
    init() {
        this.handleHamburgerMenu(),
            this.handleMenuItem(),
            this.handleSearchIcon(),
            this.handleStickyHeader(),
            this.handleSlidingMenu()
    }
    handleHamburgerMenu() {
        this.mobileMenuToggles?.forEach(toggle => {
            toggle.addEventListener("click", e => {
                this.container.classList.toggle("open")
            }
            )
        }
        )
    }
    handleMenuItem() {
        $(".mob-heading").click(function () {
            $(this).next().slideToggle(200),
                $(this).toggleClass("expanded")
        }),
            $(".mobile-child").slideUp(200)
    }
    handleSearchIcon() {
        this.searchIcon.addEventListener("click", () => {
            $("header #search-pop").toggleClass("show"),
                this.closeSearchIcon.style.display = "block",
                document.querySelector("#shopify-section-announcement-bar").style.zIndex = "0",
                document.body.classList.add("no-scroll"),
                document.querySelector(".needsclick").style.display = "none"
        }
        ),
            this.closeSearchIcon.addEventListener("click", () => {
                $("header #search-pop").toggleClass("show"),
                    this.closeSearchIcon.style.display = "none",
                    document.querySelector("#shopify-section-announcement-bar").style.zIndex = "100",
                    document.body.classList.remove("no-scroll"),
                    document.querySelector(".needsclick").style.display = "block"
            }
            ),
            document.addEventListener("click", event => {
                const searchPop = document.querySelector("header #search-pop")
                    , searchInputContainer = document.querySelector("header .search-input-container");
                searchPop.classList.contains("show") && !searchInputContainer.contains(event.target) && !this.searchIcon.contains(event.target) && !this.closeSearchIcon.contains(event.target) && (searchPop.classList.remove("show"),
                    this.searchIcon.style.visibility = "visible",
                    this.closeSearchIcon.style.display = "none",
                    document.body.classList.remove("no-scroll"),
                    document.querySelector("#shopify-section-announcement-bar").style.zIndex = "")
            }
            ),
            document.querySelector("header #search-pop .search-input-container img").addEventListener("click", () => {
                const searchForm = document.querySelector("#search-pop form");
                searchForm && searchForm.submit()
            }
            )
    }
    handleStickyHeader() {
        const header = this.headerContainer
            , announcementBarHeight = document.querySelector("[announcement-bar]").offsetHeight;
        let headerHeight = header.offsetHeight;
        window.addEventListener("scroll", () => {
            window.scrollY > headerHeight + announcementBarHeight ? (header.classList.add("sticky"),
                setTimeout(() => {
                    header.classList.add("active")
                }, "125"),
                this.mainContainer.style.paddingTop = `${headerHeight}px`) : (header.classList.remove("sticky"),
                    header.classList.remove("active"),
                    this.mainContainer.style.paddingTop = 0)
        }
        )
    }
    handleSlidingMenu() {
        const menuPages = this.mobileMenuPages;
        this.container.querySelectorAll("li.parent-menu-item").forEach(link => {
            link.addEventListener("click", e => {
                const targetPage = e.target.getAttribute("data-target-page");
                targetPage && menuPages.forEach(page => {
                    page.getAttribute("data-page") === targetPage ? (page.classList.add("active"),
                        page.classList.remove("previous"),
                        page.querySelector(".mobile-child") && (page.querySelector(".mobile-child").style.display = "block")) : page.classList.contains("active") ? (page.classList.add("previous"),
                            page.classList.remove("active")) : page.classList.remove("active", "previous")
                }
                )
            }
            )
        }
        ),
            this.container.querySelectorAll(".back-btn").forEach(backButton => {
                backButton.addEventListener("click", e => {
                    const targetPage = e.target.getAttribute("data-target-page");
                    targetPage && menuPages.forEach(page => {
                        page.getAttribute("data-page") === targetPage ? (page.classList.add("active"),
                            page.classList.remove("previous")) : page.classList.contains("active") ? (page.classList.add("previous"),
                                page.classList.remove("active")) : page.classList.remove("active", "previous")
                    }
                    )
                }
                )
            }
            )
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new Header(document.body)
}
);
