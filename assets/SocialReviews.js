class SocialVideosSlider {
    constructor(container) {
        this.container = container, this.splideInstance = null, this.btnNext = document.getElementById("nex-button"), this.btnPrev = document.getElementById("prev-button"), this.mouseMoveListener = this.mouseMoveListener.bind(this), this.mouseDownListener = this.mouseDownListener.bind(this), this.mouseUpListener = this.mouseUpListener.bind(this), this.init()
    }
    init() {
        this.handleSplideSlider(), this.handleNavigation()
    }
    handleSplideSlider() {
        const videoSlider = this.container;
        videoSlider && (this.splideInstance && this.splideInstance.destroy(!0), this.splideInstance = new Splide(videoSlider, {
            type: "slide",
            perPage: 2,
            perMove: 1,
            mobileFirst: !0,
            autoplay: !1,
            arrows: !1,
            pagination: !1,
            gap: "24px",
            padding: {
                right: "184px"
            },
            speed: 1e3,
            breakpoints: {
                992: {
                    perPage: 1,
                    padding: {
                        right: "112px"
                    },
                    centerMode: !0,
                    variableWidth: !1
                }
            }
        }), this.progressBar = this.splideInstance.root.querySelector(".social-videos-slider-progress-bar"), this.progressBarContainer = this.splideInstance.root.querySelector(".social-videos-slider-progress"), this.splideInstance.on("mounted move", () => {
            const totalItems = this.splideInstance.Components.Elements.slides.length;
            this.progressBar.style.width = String(100 / totalItems) + "%", this.progressBar.style.marginLeft = this.splideInstance.index * (100 / totalItems) + "%", this.progressBar.style.transition = "margin 500ms"
        }), this.progressBarContainer.addEventListener("click", this.mouseMoveListener, !0), this.progressBarContainer.addEventListener("mousedown", this.mouseDownListener, !0), window.addEventListener("mouseup", this.mouseUpListener, !0), this.progressBarContainer.addEventListener("touchstart", this.mouseDownListener, !0), window.addEventListener("touchend", this.mouseUpListener, !0), this.splideInstance.mount())
    }
    handleNavigation() {
        this.splideInstance && this.btnNext && this.btnPrev && (this.btnNext.addEventListener("click", () => {
            this.splideInstance.go("+1")
        }), this.btnPrev.addEventListener("click", () => {
            this.splideInstance.go("-1")
        }))
    }
    mouseMoveListener(event) {
        if (!this.splideInstance) return;
        const totalItems = this.splideInstance.Components.Elements.slides.length,
            clickXpercentage = ((event.clientX || event.targetTouches[0].pageX) - this.container.offsetLeft) / this.progressBarContainer.clientWidth * 100,
            targetItem = (totalItems / 100 * clickXpercentage).toFixed(0) - 1;
        this.splideInstance.go(targetItem)
    }
    mouseDownListener(e) {
        window.addEventListener("mousemove", this.mouseMoveListener, !0), window.addEventListener("touchmove", this.mouseMoveListener, !0)
    }
    mouseUpListener(e) {
        window.removeEventListener("mousemove", this.mouseMoveListener, !0), window.removeEventListener("touchmove", this.mouseMoveListener, !0)
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const socialVideosSection = document.querySelector(".social-videos-container[social-reviews-slider]");
    socialVideosSection && new SocialVideosSlider(socialVideosSection)
}), document.addEventListener("shopify:section:load", event => {
    const socialVideosSection = event.target.querySelector(".social-videos-container[social-reviews-slider]");
    socialVideosSection && new SocialVideosSlider(socialVideosSection)
});
