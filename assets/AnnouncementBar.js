class AnnouncementBar {
    constructor(container) {
        this.container = container, this.init()
    }

    init() {
        this.handleSplideSlider(this.container)
    }

    handleSplideSlider(container) {
        document.addEventListener("DOMContentLoaded", function () {
            let autoplayEnabled = autoRotate,
                autoplayCarouselSpeed = autoplaySpeed * 1e3,
                splideType = "fade";
            const announcementBarSlider = container.querySelector("[announcement-bar-slider]");
            new Splide(announcementBarSlider, {
                type: splideType,
                rewind: !0,
                perPage: 1,
                autoplay: autoplayEnabled,
                interval: autoplayCarouselSpeed,
                arrows: !0,
                pagination: !1,
                speed: 1e3
            }).mount()
        })
    }
}
new AnnouncementBar(document.querySelector("[announcement-bar]"));