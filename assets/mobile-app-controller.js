class MobileAppController {
    static {
        this.mobileviewState = false;
        this.footer = document.querySelector('footer');
        this.mobileMenu = document.querySelector('#mobile-app-menu');
        this.mobileSpace = document.querySelector('.mobile-space');
        this.mobileView();
        this.reffreshSlider();
    }
    static triggerMobileView() {
        this.mobileviewState = true;
        this.footer.classList.add('hidden');
        this.mobileMenu.classList.remove('hidden');
        this.mobileSpace.classList.remove('hidden');
        this.reffreshProductCard();
    }

    static reffreshProductCard() {
        const qView = document.querySelectorAll('quick-view-listiner') || null;
        if (qView == null) {
            return;
        }
        qView.forEach(element => {
            element.classList.add('hidden');
        });
    }

    static reffreshSlider() {
        // const swiperEl = document.querySelector('.product-slider') || null;
        // if (swiperEl == null) {
        //     return;
        // }
        // Object.assign(swiperEl, {
        //     slidesPerView: 1,
        //     spaceBetween: 10,
        //     breakpoints: {
        //         200: {
        //             slidesPerView: 2,
        //         },
        //         768: {
        //             slidesPerView: 4,
        //         },
        //         1024: {
        //             slidesPerView: 6,
        //         },
        //     },
        // });
        // swiperEl.initialize();
    }
    static mobileView() {
        return this.mobileviewState;
    }

    static loader(loading = false) {
        if (loading) {
            document.getElementById('themeContent').classList.add('opacity-0');
            document.getElementById('app-spinner').classList.remove('hidden');
        } else {
            document.getElementById('app-spinner').classList.add('hidden');
            document.getElementById('themeContent').classList.remove('opacity-0');
        }
    }

    static darkMode(state = "dark") {
        document.querySelector('meta[name="color-scheme"]').setAttribute("content", state);
    }
    static getstring() {
        return "Hello from alifby";
    }
    static async cartItems() {
        await fetch(window.Shopify.routes.root + 'cart.js').then((response) => response.json()).then((cart) => {
            return cart.item_count;
        });
    }
}

class LinkHandler extends HTMLElement {
    constructor() {
        super();
        this.targetPage = this.getAttribute('target-page') || "/";
        this.addEventListener('click', this.pageLoader.bind(this));
    }

    async pageLoader() {
        if (MobileAppController.mobileView() == false) {
            window.open(this.targetPage, "_self");;
            return;
        }
        MobileAppController.loader(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        await fetch(this.targetPage).then((response) => response.text()).then((data) => {
            document.getElementById('themeContent').innerHTML = new DOMParser()
                .parseFromString(data, 'text/html')
                .getElementById('themeContent').innerHTML;
        }).catch(error => {
            console.error('Fetch error:', error);
            MobileAppController.loader(false);
        })
            .finally(() => {
                MobileAppController.reffreshSlider();
                MobileAppController.reffreshProductCard();
                MobileAppController.loader(false);
            });
    }
}

customElements.define('link-handler', LinkHandler);
