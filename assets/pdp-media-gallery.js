class GallerySliders {
    constructor() {
        this.init()
    }
    initMobilePdpGallerySlider() {
        const mobileSliderOptions = {
            arrows: !1,
            pagination: !1
        };
        window.location.href.includes("gift-card") && (mobileSliderOptions.focus = "center"), new Splide("#splide-slider", mobileSliderOptions).mount()
    }
    handleSplideSlider() {
        const mediaModal = document.querySelector("#media-modal");
        mediaModal && (mediaModal.splideInstance = new Splide(mediaModal, {
            type: "slide",
            perPage: 1,
            perMove: 1,
            mobileFirst: !0,
            arrows: !0,
            pagination: !1,
            breakpoints: {
                992: {
                    perPage: 1,
                    centerMode: !0,
                    variableWidth: !1
                }
            }
        }).mount())
    }
    initModal() {
        this.openModal = imageUrl => {
            const modal = document.getElementById("media-modal"),
                modalImage = document.getElementById("modal-image");
            modalImage.src = imageUrl, modal.classList.add("active"), document.body.style.overflow = "hidden"
        }, this.closeModal = () => {
            document.getElementById("media-modal").classList.remove("active"), document.body.style.overflow = "unset"
        }, document.querySelectorAll(".main-image-media-gallery").forEach(thumbnail => {
            thumbnail.addEventListener("click", () => {
                const imageUrl = thumbnail.src;
                this.openModal(imageUrl)
            })
        }), window.closeModal = this.closeModal, document.getElementById("media-modal").addEventListener("click", e => {
            e.target === e.currentTarget && this.closeModal()
        })
    }
    desktopModal() {
        const modal = document.getElementById("image-modal"),
            modalImage = document.getElementById("modal-image-desktop"),
            closeModal = document.querySelector(".close-modal");
        document.querySelectorAll(".modal-trigger").forEach(trigger => {
            trigger.addEventListener("click", function () {
                modalImage.src = this.src, modal.classList.remove("hidden"), modal.classList.add("modal-enter"), setTimeout(() => {
                    modal.classList.add("modal-enter-active"), modal.classList.remove("modal-enter")
                }, 10)
            })
        }), closeModal.addEventListener("click", function () {
            closeWithAnimation()
        }), modal.addEventListener("click", function (e) {
            e.target === modal && closeWithAnimation()
        });

        function closeWithAnimation() {
            modal.classList.add("modal-exit-active"), modal.classList.remove("modal-enter-active"), setTimeout(() => {
                modal.classList.add("hidden"), modal.classList.remove("modal-exit-active")
            }, 300)
        }
    }
    init() {
        document.addEventListener("DOMContentLoaded", () => {
            this.initMobilePdpGallerySlider(), this.initModal(), this.handleSplideSlider(), this.desktopModal()
        })
    }
}
let gallerySlider = new GallerySliders;