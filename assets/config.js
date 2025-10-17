
const autoRotate = true;
const autoplaySpeed = 3;

if (window.location.pathname === "/" || window.location.pathname === "/cart") {
    document.body.classList.add("template-index")
}

if (window.location.pathname.includes("/products/") || window.location.pathname.includes("/pages/") || window.location.pathname.includes("/collections/") || window.location.pathname.includes("/search") || window.location.pathname.includes("/blogs/")) {
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
    const reviewWidgetScript = document.querySelector('.okeReviews.oke-w');
    if (reviewWidgetScript) {
        const h2Title = document.createElement("h2");
        h2Title.innerHTML = ` <span class="!text-6xl !lg:text-5xl !xl:text-6xl !font-bold !tracking-tight !mb-4 !mt-8 color-primary font-pr block" style="font-family: var(--font-primary) !important">Reviews</span>`
        reviewWidgetScript.prepend(h2Title);
    }
    addContainerApp();
}, 1000)

const cartCountBadge = document.querySelector('.cart-badge');
const handleUpdateCartBadge = () => {
    fetch('/cart.js', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        if (cartCountBadge) {
            cartCountBadge.textContent = data.item_count;
            if (data.item_count > 0) {
                cartCountBadge.classList.remove('hidden');
            } else {
                cartCountBadge.classList.add('hidden');
            }
        }
    });
}
handleUpdateCartBadge();

const formList = document.querySelectorAll('form[data-id]');
formList.forEach((form) => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const productId = formData.get('id');
        const quantity = form.querySelector("input[name='quantity']")?.value || 1;
        if (!productId) return;
        const submitButton = form.querySelector('button[type="submit"], .add-to-cart');
        if (!submitButton) return;

        // Store original content
        const originalContent = submitButton.innerHTML;

        // Show spinner and disable button
        submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';

        try {
            const response = await fetch('/cart/add.js', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ id: productId, quantity: quantity })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Success feedback
            submitButton.innerHTML = '<i class="fa-solid fa-check"></i>';
            submitButton.style.backgroundColor = '#10b981';

            // Restore original state after 1 second
            setTimeout(() => {
                submitButton.innerHTML = originalContent;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
                submitButton.style.backgroundColor = '';
            }, 1000);

            handleUpdateCartBadge();

        } catch (error) {
            console.error('Error adding product to cart:', error);

            // Error feedback
            submitButton.innerHTML = '<i class="fa-solid fa-times"></i>';
            submitButton.style.backgroundColor = '#ef4444';

            // Restore original state after 2 seconds
            setTimeout(() => {
                submitButton.innerHTML = originalContent;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
                submitButton.style.backgroundColor = '';
            }, 2000);

            alert('Product is already sold out.');
        }
    });
});