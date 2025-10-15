class GallerySliders {
    constructor() {
        this.init()
    }

    initMobilePdpGallerySlider() {
        const mobileSliderOptions = {
            arrows: false,
            pagination: false
        };

        if (window.location.href.includes("gift-card")) {
            mobileSliderOptions.focus = "center";
        }

        const splideElement = document.querySelector("#splide-slider");
        if (splideElement) {
            new Splide("#splide-slider", mobileSliderOptions).mount();
        }
    }

    handleSplideSlider() {
        const mediaModal = document.querySelector("#media-modal");
        if (mediaModal) {
            mediaModal.splideInstance = new Splide(mediaModal, {
                type: "slide",
                perPage: 1,
                perMove: 1,
                mobileFirst: true,
                arrows: true,
                pagination: false,
                breakpoints: {
                    992: {
                        perPage: 1,
                        centerMode: true,
                        variableWidth: false
                    }
                }
            }).mount();
        }
    }

    initModal() {
        // Check if modal elements exist
        const modal = document.getElementById("media-modal");
        const modalImage = document.getElementById("modal-image");

        // Only proceed if both modal elements exist
        if (!modal || !modalImage) {
            console.log('Modal elements not found, skipping modal functionality');
            return;
        }

        this.openModal = imageUrl => {
            modalImage.src = imageUrl;
            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        };

        this.closeModal = () => {
            modal.classList.remove("active");
            document.body.style.overflow = "unset";
        };

        // Add click handlers for gallery images
        document.querySelectorAll(".main-image-media-gallery").forEach(thumbnail => {
            thumbnail.addEventListener("click", () => {
                const imageUrl = thumbnail.src;
                this.openModal(imageUrl);
            });
        });

        // Make close function globally available
        window.closeModal = this.closeModal;

        // Add modal click handler
        modal.addEventListener("click", e => {
            if (e.target === e.currentTarget) {
                this.closeModal();
            }
        });
    }

    desktopModal() {
        const modal = document.getElementById("image-modal");
        const modalImage = document.getElementById("modal-image-desktop");
        const closeModal = document.querySelector(".close-modal");

        // Only proceed if modal elements exist
        if (!modal || !modalImage) {
            console.log('Desktop modal elements not found, skipping desktop modal functionality');
            return;
        }

        document.querySelectorAll(".modal-trigger").forEach(trigger => {
            trigger.addEventListener("click", function () {
                modalImage.src = this.src;
                modal.classList.remove("hidden");
                modal.classList.add("modal-enter");
                setTimeout(() => {
                    modal.classList.add("modal-enter-active");
                    modal.classList.remove("modal-enter");
                }, 10);
            });
        });

        if (closeModal) {
            closeModal.addEventListener("click", function () {
                closeWithAnimation();
            });
        }

        modal.addEventListener("click", function (e) {
            if (e.target === modal) {
                closeWithAnimation();
            }
        });

        function closeWithAnimation() {
            modal.classList.add("modal-exit-active");
            modal.classList.remove("modal-enter-active");
            setTimeout(() => {
                modal.classList.add("hidden");
                modal.classList.remove("modal-exit-active");
            }, 300);
        }
    }

    // Video handling functionality
    initVideoHandlers() {
        document.querySelectorAll('.video_with_icon_new').forEach(videoContainer => {
            const video = videoContainer.querySelector('video');
            const playIcon = videoContainer.querySelector('.play_icon');

            if (video && playIcon) {
                const videoUrl = video.getAttribute('video_url') || video.getAttribute('data-video-url');
                if (videoUrl && !video.src) {
                    video.src = videoUrl;
                }

                videoContainer.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    if (video.paused) {
                        // Pause all other videos first
                        document.querySelectorAll('.video_with_icon_new video').forEach(otherVideo => {
                            if (otherVideo !== video && !otherVideo.paused) {
                                otherVideo.pause();
                                const otherContainer = otherVideo.closest('.video_with_icon_new');
                                if (otherContainer) {
                                    const otherIcon = otherContainer.querySelector('.play_icon');
                                    if (otherIcon) {
                                        otherIcon.style.display = 'block';
                                    }
                                }
                            }
                        });

                        // Play current video
                        video.play().then(() => {
                            playIcon.style.display = 'none';
                        }).catch(error => {
                            console.error('Error playing video:', error);
                        });
                    } else {
                        video.pause();
                        playIcon.style.display = 'block';
                    }
                });

                video.addEventListener('ended', function () {
                    playIcon.style.display = 'block';
                });

                video.addEventListener('pause', function () {
                    playIcon.style.display = 'block';
                });

                video.addEventListener('play', function () {
                    playIcon.style.display = 'none';
                });

                video.addEventListener('error', function (e) {
                    console.error('Video loading error:', e);
                });
            }
        });
    }

    init() {
        document.addEventListener("DOMContentLoaded", () => {
            this.initMobilePdpGallerySlider();
            this.initModal();
            this.handleSplideSlider();
            this.desktopModal();
            this.initVideoHandlers();
        });
    }
}

let gallerySlider = new GallerySliders();