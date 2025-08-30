

class StarRating extends HTMLElement {
    constructor() {
        super();
        this.size = this.getAttribute('size') || 14;
        this.rating = this.getAttribute('rating') || 0;
        this.color = this.getAttribute('color') || 'fill-primaryColor';
        this.renderStarIcon();
    }

    renderStarIcon() {
        this.rating = parseInt(this.rating) > 5 || parseInt(this.rating) < 0 ? 0 : this.rating;
        var html = "";
        for (let index = 0; index < 5; index++) {
            if (index < parseInt(this.rating)) {
                html += this.starIcon(true);
            } else {
                html += this.starIcon();
            }
        }
        this.innerHTML = html;
    }

    starIcon(fill = false) {
        if (fill) {
            return `<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="${this.size}"
            height="${this.size}"
            fill="currentColor"
            class=" inline-block ${this.color} pr-1">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
          </svg>`;
        } else {
            return `<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="${this.size}"
            height="${this.size}"
            fill="currentColor"
            class=" inline-block ${this.color} pr-1">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
          </svg>`;
        }


    }
}

customElements.define('star-rating', StarRating);

class Cart {
    static {
        this.overlay = document.querySelector('.cart-overlay');
        this.cartdata = document.querySelector('.cart-data') || null;
        this.cartdata2 = document.querySelector('.cart-data2') || null;
        this.closebtn = document.querySelector('#cart_close_icon');
        this.cart = document.querySelector('#cartDrawer');
        this.cartbtn = document.getElementById('cartbtn');
        this.cartProductCounter = document.querySelector('.cart-product-counter');
        this.updateCartDrawer();
        this.update();
    }

    static close() {
        this.overlay.classList.add('hidden');
        this.cart.classList.remove("cart-drawer-show");
    }

    static show() {
        this.overlay.classList.remove('hidden');
        this.cart.classList.add('cart-drawer-show');
    }
    static async add(id, quantity = 1) {
        if (id == null) {
            return false;
        }
        let data = {
            'items': [{
                'id': Number(id),
                'quantity': Number(quantity)
            }]
        };
        await fetch(window.Shopify.routes.root + 'cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                this.updateCartDrawer();
                this.productcount();
                return true;
            })
            .catch((error) => {
                console.error('Error:', error);
                return false;
            });
    }

    static async change(id, quantity) {
        if (id == null) {
            return false;
        }
        let data = {
            'id': id,
            'quantity': Number(quantity)
        };
        await fetch(window.Shopify.routes.root + 'cart/change.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                return true;
            })
            .catch((error) => {
                console.error('Error:', error);
                return false;
            });
    }

    static async updateCartDrawer() {
        if (this.cartdata == null) {
            return;
        }
        await fetch(window.Shopify.routes.root + "?section_id=cart-drawer")
            .then((response) => response.text())
            .then((text) => {
                this.cartdata.innerHTML = text;
            })
            .catch(error => {
                console.error(error);
            });
    }
    static async update() {
        if (this.cartdata2 == null) {
            return;
        }
        await fetch(window.Shopify.routes.root + "?section_id=cart-render")
            .then((response) => response.text())
            .then((text) => {
                this.cartdata2.innerHTML = text;
            })
            .catch(error => {
                console.error(error);
            });
    }

    static async productcount() {
        await fetch(window.Shopify.routes.root + 'cart.js').then((response) => response.json()).then((cart) => {
            if (cart.item_count != 0) {
                this.cartProductCounter.classList.remove('hidden');
                this.cartProductCounter.innerHTML = `<span>${cart.item_count}</span>`
            } else {
                this.cartProductCounter.classList.add('hidden');
            }

        });

    }
}

class CartLineItem extends HTMLElement {
    constructor() {
        super();
        this.id = this.getAttribute('variantId');
        this.cartType = this.getAttribute('cartType') || 'drawer';
        this.deletebtn = this.querySelector('#deletebtn');
        this.deletebtn.addEventListener('click', this.deleteLineItem.bind(this));
    }

    deleteLineItem() {
        this.classList.add('opacity-[0.2]');
        this.classList.add('cursor-not-allowed');
        if (this.cartType != 'drawer') {
            Cart.change(this.id, 0).then(() => { Cart.update(); Cart.productcount(); });
        } else {
            Cart.change(this.id, 0).then(() => { Cart.updateCartDrawer(); Cart.productcount(); });
        }

    }
}

customElements.define('cart-line-item', CartLineItem);

class LineItemQunatiySelector extends HTMLElement {
    constructor() {
        super()
        this.min = 1;
        this.max = 10;
        this.id = this.getAttribute('variantId');
        this.cartType = this.getAttribute('cartType') || 'drawer';
        this.plusbtn = this.querySelector('.plus');
        this.minusbtn = this.querySelector('.minus');
        this.input = this.querySelector('input[name="quantity"]');
        this.plusbtn.addEventListener('click', this.increment.bind(this));
        this.minusbtn.addEventListener('click', this.decrement.bind(this));
        this.input.addEventListener('change', this.inputchange.bind(this));
        this.totalprice = this.querySelector('#addtocartbtn>span');
    }

    inputchange() {
        let quantity = Number(this.input.value);
        if (quantity > this.max) {
            this.input.value = this.max;
        } else if (quantity < this.min) {
            this.input.value = this.min;
        }
        this.lineitemupdate();
    }

    increment() {
        let quantity = Number(this.input.value);
        if (quantity < this.max) {
            this.input.value = quantity + 1;
            this.lineitemupdate();
        }
    }

    decrement() {
        let quantity = Number(this.input.value);
        if (quantity > this.min) {
            this.input.value = quantity - 1;
            this.lineitemupdate();
        }
    }

    lineitemupdate() {
        this.classList.add('opacity-[0.2]');
        this.classList.add('cursor-not-allowed');
        if (this.cartType != 'drawer') {
            Cart.change(this.id, this.input.value).then(() => {
                this.classList.remove('opacity-[0.2]');
                this.classList.remove('cursor-not-allowed');
                Cart.update();
                Cart.productcount()
            });
        } else {
            Cart.change(this.id, this.input.value).then(() => {
                this.classList.remove('opacity-[0.2]');
                this.classList.remove('cursor-not-allowed');
                Cart.updateCartDrawer();
                Cart.productcount()
            });
        }
    }
}

customElements.define('line-item-quantity-selector', LineItemQunatiySelector)

class ProductCart extends HTMLElement {
    constructor() {
        super();
        this.productId = this.getAttribute('product-id') || null;
        this.productCartBtn = this.querySelector('#product-cart-btn') || null;
        this.txt = this.querySelector('#txt');
        this.spinner = this.querySelector('#spinner');
        if (this.productCartBtn != null) {
            this.productCartBtn.addEventListener('click', this.addtocard.bind(this));
        }
    }

    addtocard() {
        if (this.productId == null) {

            return;
        }
        this.laoding(true);
        Cart.add(this.productId).then(() => { this.laoding(false); Cart.show(); });
    }

    laoding(load = false) {
        if (load) {
            this.txt.classList.add('hidden');
            this.spinner.classList.remove('hidden');
        } else {
            this.txt.classList.remove('hidden');
            this.spinner.classList.add('hidden');
        }
    }
}

customElements.define('product-cart', ProductCart);

class CartHandler extends HTMLElement {
    constructor() {
        super();
        this.overlay = this.querySelector('.cart-overlay');
        this.cartdata = document.querySelector('.cart-data');
        this.closebtn = this.querySelector('#cart_close_icon');
        this.cart = this.querySelector('#cartDrawer');
        this.cartbtn = document.getElementById('cartbtn');
        this.cartbtn.addEventListener('click', () => { Cart.show() });
        this.overlay.addEventListener('click', () => { Cart.close() });
        this.closebtn.addEventListener('click', () => { Cart.close() });
    }
}

customElements.define('shop-cart', CartHandler);

class ProductShowCase extends HTMLElement {
    constructor() {
        super();
        this.classList.add("block")
        this.quantity = document.querySelector('input[name="quantity"]') || null;
        this.variantId = document.querySelector('select[name="id"]') || document.querySelector('input[name="id"]') || null;
        this.currentPrice = this.querySelector('.product-price');
        this.addtocartbtn = this.querySelector('#addtocartbtn') || null;
        this.buyitnowbtn = this.querySelector('#buyitnowbtn') || null;
        this.txt = this.querySelector('#txt1');
        this.spinner = this.querySelector('#spinner');
        this.txt2 = this.querySelector('#txt3');
        this.spinner2 = this.querySelector('#spinner2');
        if (this.addtocartbtn != null) {
            this.addtocartbtn.addEventListener('click', this.onFormSubmit.bind(this));

        }
        if (this.buyitnowbtn != null) {
            this.buyitnowbtn.addEventListener('click', this.onBuyItNow.bind(this));
        }

    }


    onFormSubmit() {
        if (this.variantId.value == null) {

            return;
        }
        this.laoding(true);
        try {
            Cart.add(this.variantId.value, this.quantity.value).then(() => { this.laoding(false); Cart.show() });
        } catch (error) {
            console.log(error);
        }

    }
    laoding(load = false) {
        if (load) {
            this.txt.classList.add('hidden');
            this.spinner.classList.remove('hidden');
        } else {
            this.txt.classList.remove('hidden');
            this.spinner.classList.add('hidden');
        }
    }
    laoding2(load = false) {
        if (load) {
            this.txt2.classList.add('hidden');
            this.spinner2.classList.remove('hidden');
        } else {
            this.txt2.classList.remove('hidden');
            this.spinner2.classList.add('hidden');
        }
    }
    onBuyItNow() {
        if (this.variantId.value == null) {

            return;
        }
        this.laoding2(true);
        try {
            Cart.add(this.variantId.value, this.quantity.value).then(() => { this.laoding2(false); window.open("/cart/checkout", "_self"); });
        } catch (error) {
            console.log(error);
        }
    }
}

customElements.define("product-showcase", ProductShowCase);

class QuantitySelector extends HTMLElement {
    constructor() {
        super()
        this.min = 1;
        this.max = 10;
        this.plusbtn = this.querySelector('.plus');
        this.minusbtn = this.querySelector('.minus');
        this.input = this.querySelector('input[name="quantity"]');
        this.productPrice = document.querySelector('.product-price');
        this.plusbtn.addEventListener('click', this.increment.bind(this));
        this.minusbtn.addEventListener('click', this.decrement.bind(this));
        this.input.addEventListener('change', this.inputchange.bind(this));
        this.totalprice = document.querySelector('#addtocartbtn #txtPrice');
    }

    inputchange() {
        let quantity = Number(this.input.value);
        if (quantity > this.max) {
            this.input.value = this.max;
        } else if (quantity < this.min) {
            this.input.value = this.min;
        }
        this.updateTotal();
    }

    increment() {
        let quantity = Number(this.input.value);
        if (quantity < this.max) {
            this.input.value = quantity + 1;
        }
        this.updateTotal();
    }

    decrement() {
        let quantity = Number(this.input.value);
        if (quantity > this.min) {
            this.input.value = quantity - 1;
        }
        this.updateTotal();
    }

    updateTotal() {
        let price = this.productPrice.innerText;
        price = price.includes(',') ? price.replace(',', '') : price;
        this.totalprice.innerText = (Number(this.input.value) * Number(price)).toFixed(2);
    }
}

customElements.define('quantity-selector', QuantitySelector);


class VariantSelector extends HTMLElement {
    constructor() {
        super();
        // this.variants = JSON.parse(this.getAttribute('variants')) ? JSON.parse(this.getAttribute('variants')) : null;
        this.variants = null;
        this.variantsPrices = null;
        this.optionsSize = this.getAttribute('optionSize') || 0;
        this.type = this.getAttribute('type') || 'dropdown';
        this.idInput = document.querySelector('input[name="id"]');
        this.productPrice = document.querySelector('.product-price');
        this.productComparePrice = document.querySelector('.product-compare-price') || null;
        this.productquantity = document.querySelector('input[name=quantity');
        this.addToCartBtn = document.querySelector('#addtocartbtn');
        this.buyItNowBtn = document.querySelector('#buyitnowbtn');
        this.totalprice = document.querySelector('#addtocartbtn #txtPrice');
        this.imageSlider = document.querySelector('.product-image-slider').swiper;
        this.option1 = this.querySelector('custom-select[name="option1"]') || this.querySelector('input[name=option1]:checked') || null;
        this.option2 = this.querySelector('custom-select[name="option2"]') || this.querySelector('input[name=option2]:checked') || null;
        this.option3 = this.querySelector('custom-select[name="option3"]') || this.querySelector('input[name=option3]:checked') || null;

        this.currentIndex = 1;
        this.getVariants();
        this.addEventListener('change', this.applyVariant.bind(this));
        this.addEventListener('click', this.applyVariant.bind(this));
    }


    async getVariants() {
        await fetch(window.Shopify.routes.root + 'products/' + this.getAttribute('productHandle') + '.js').then((response) => response.json()).then((data) => {

            this.variants = data.variants;
        });
        await fetch(window.Shopify.routes.root + 'products/' + this.getAttribute('productHandle') + '.json')
            .then(response => response.json())
            .then(data => {
                this.variantsPrices = data.product.variants;
            });
    }

    applyVariant() {
        let currentVariant = this.getActiveVairantId();
        if (currentVariant != null && currentVariant.available) {
            if (this.addToCartBtn != null) {
                this.addToCartBtn.removeAttribute("disabled");

            }
            if (this.buyItNowBtn != null) {
                this.buyItNowBtn.removeAttribute("disabled");
            }
            this.idInput.value = currentVariant.id;
            this.productPrice.textContent = " " + this.variantsPrices[this.currentIndex].price;
            document.querySelector('#addtocartbtn #txt1').classList.remove('hidden');
            document.querySelector('#addtocartbtn #txt2').classList.add('hidden');
            if (this.productComparePrice != null) {
                this.productComparePrice.textContent = this.variantsPrices[this.currentIndex].compare_at_price + "";
            }
            this.totalprice.innerText = (Number(this.productquantity.value) * this.variantsPrices[this.currentIndex].price).toFixed(2);
            if (this.variants[this.currentIndex].featured_image != null) {
                this.imageSlider.slideTo(Number(this.variants[this.currentIndex].featured_media.position - 1));
            }

            window.history.replaceState(null, null, "?variant=" + currentVariant.id);
        } else {
            document.querySelector('#addtocartbtn #txt1').classList.add('hidden');
            document.querySelector('#addtocartbtn #txt2').classList.remove('hidden');
            this.addToCartBtn.setAttribute("disabled", "true");
            this.buyItNowBtn.setAttribute("disabled", "true");
        }

    }

    getActiveVairantId() {
        if (this.variants == null) {
            return;
        }
        if (this.type == 'inline') {
            this.option1 = this.querySelector('input[name=option1]:checked')
            this.option2 = this.querySelector('input[name=option2]:checked')
            this.option3 = this.querySelector('input[name=option3]:checked')
        }
        for (let index = 0; index < (this.variants == null ? 0 : this.variants.length); index++) {
            const element = this.variants[index];
            if (this.optionsSize > 0) {
                if (this.optionsSize == 1) {
                    if (this.option1.value == element.option1) {
                        this.currentIndex = index;
                        return element;
                    }
                } else if (this.optionsSize == 2) {
                    if (this.option1.value == element.option1 && this.option2.value == element.option2) {
                        this.currentIndex = index;
                        return element;
                    }
                } else if (this.optionsSize == 3) {
                    if (this.option1.value == element.option1 && this.option2.value == element.option2 && this.option3.value == element.option3) {
                        this.currentIndex = index;
                        return element;
                    }
                } else {
                    return null;
                }
            }
        }
    }

    formatprice(price) {
        var hasDecimals = price % 1 !== 0;
        var formattedPrice = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: window.Shopify.currency.active
        }).format(hasDecimals ? price : price.toFixed(2));
        return formattedPrice;
    }
}

customElements.define('variant-selector', VariantSelector);

class SearchBarHandler extends HTMLElement {
    constructor() {
        super()
        this.pageType = this.getAttribute('page-type') || "nil";
        this.input = this.querySelector("#predective_search");
        this.data = this.querySelector("#predective_search_result");
        this.overlay = document.getElementById("overlay");
        this.searchBtn = this.querySelector('#searchBtn');
        this.searchIcon = this.querySelector('.search-icon');
        this.spinnerIcon = this.querySelector('.spinner-icon');
        this.overlay.addEventListener('click', this.overlayHandler.bind(this))
        const debounceHandler = this.debounce(this.search, 300);
        this.input.addEventListener("input", debounceHandler);
        this.input.addEventListener('focus', debounceHandler);
        this.searchBtn.addEventListener('click', () => {
            if (this.input.value != "") {
                window.open(`/search?q=${this.input.value}`, '_self');
            }
        });
    }

    rendersearchlist(queries, products) {

        let productList = "";
        let queriesList = "";
        queries.forEach(querie => {
            queriesList += `<li class='py-1 text-xs text-subtextColor cursor-pointer'><a href='${querie.url}'>${querie.styled_text}</a></li>`
        });

        products.forEach(product => {
            productList += `<li class='p-2 hover:bg-secondaryColor hover:text-primaryColor cursor-pointer'>
            <a href='${product.url}'>
              <ul class=' flex items-center'>
              <li class=' w-[10%]'>
              <img loading='lazy' src='${product.featured_image.url}' alt='image' width='' height='' class=' w-[40px] h-[40px] object-cover'>
          </li>
          <li class=' w-[90%] whitespace-nowrap overflow-hidden text-ellipsis'>${product.title}</li>
              </ul>
            </a>
          </li>`
        });

        let str = `
        ${products.length > 0 ? `<div class='p-2 text-xs font-semibold border-b border-separatorlineColor'>Products</div>
            <ul>
              ${productList}
          </ul>`: ``}
        ${queries.length > 0 ? `<div class='p-2 text-xs font-semibold border-b border-separatorlineColor'>Suggestions</div>
        <ul class='p-2'>
        ${queriesList}
        </ul>`: ``}`;
        return str;
    }

    async search() {
        this.classList.add('z-10');
        const query = this.input.value;
        if (query == "") {
            this.data.classList.add("hidden");
            return;
        }
        this.overlay.classList.remove("hidden")
        this.searchIcon.classList.add('hidden');
        this.spinnerIcon.classList.remove('hidden');
        fetch(`/search/suggest.json?q=${query}&resources[limit]=5`).then((response) => response.json()).then((data) => {
            if (data.resources.results.queries.length < 1) {
                this.data.innerHTML = `<div class='p-2 text-xs font-semibold'>No Result found</div>`;
            } else {
                this.data.innerHTML = this.rendersearchlist(data.resources.results.queries, data.resources.results.products);
            }
            this.data.classList.remove("hidden");
            this.searchIcon.classList.remove('hidden');
            this.spinnerIcon.classList.add('hidden');
        }).catch(error => {
            console.error(error);
        });
    }

    overlayHandler() {
        this.data.classList.add("hidden");
        this.overlay.classList.add("hidden");
        this.classList.remove('z-10');
    }
    debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }
}
customElements.define('search-bar', SearchBarHandler)

class MainMenuHandler extends HTMLElement {
    constructor() {
        super();
        this.search = document.getElementById("searchBar");
        this.x_icon = document.getElementById("x_icon");
        this.s_icon = document.getElementById("s_icon");
        this.searchIcon = document.getElementById("searchIcon");
        this.menuNavigator = document.getElementById("menu-navigator");
        this.menuOverlay = document.getElementById("mobile-menu-overlay");
        this.mobileMenu = document.getElementById("mobile-menu");
        this.menuCloseIcon = document.getElementById("menu_close_icon");
        this.userIcon = this.querySelector('.user-icon-md');
        this.userMenu = this.querySelector('.user-dropdown-menu');
        this.overlay = document.getElementById('overlay');
        this.searchIcon.addEventListener('click', this.searchBarHandler.bind(this));
        this.menuNavigator.addEventListener('click', this.showMenu.bind(this));
        this.menuOverlay.addEventListener('click', this.hideMenu.bind(this));
        this.menuCloseIcon.addEventListener('click', this.hideMenu.bind(this));
        this.userIcon.addEventListener('click', this.showUserMenu.bind(this));
        this.overlay.addEventListener('click', this.hideUserMenu.bind(this));
    }

    searchBarHandler() {
        this.x_icon.classList.toggle("hidden");
        this.s_icon.classList.toggle("hidden");
        this.search.classList.toggle("hidden");
    }

    showMenu() {
        this.menuOverlay.classList.remove('hidden');
        this.mobileMenu.classList.remove('-translate-x-full');
    }
    hideMenu() {
        this.menuOverlay.classList.add('hidden');
        this.mobileMenu.classList.add('-translate-x-full');
        this.userMenu.classList.add('hidden');
    }
    showUserMenu() {
        this.overlay.classList.remove('hidden');
        this.userMenu.classList.remove('hidden');
    }
    hideUserMenu() {
        this.overlay.classList.add('hidden');
        this.userMenu.classList.add('hidden');
        this.x_icon.classList.add("hidden");
        this.s_icon.classList.remove("hidden");
        this.search.classList.add("hidden");
    }


}

customElements.define('main-menu', MainMenuHandler);

class Menu_link extends HTMLElement {
    constructor() {
        super();
        this.megaMenu = this.querySelector('#megamenu') || null;
        this.ismegaMenu = this.getAttribute('megaMenu');
        this.addEventListener('mouseenter', this.showMegaMenu.bind(this));
        this.addEventListener('mouseleave', this.hideMegaMenu.bind(this));
    }

    showMegaMenu() {
        if (this.ismegaMenu == "true") {
            this.megaMenu.classList.remove('hidden');
            this.megaMenu.classList.add('meun_link');
        }
    }

    hideMegaMenu() {
        if (this.ismegaMenu == "true") {
            this.megaMenu.classList.add('hidden');
            this.megaMenu.classList.remove('meun_link');
        }
    }
}

customElements.define('menu-link', Menu_link);

class Menu_Sub_links extends HTMLElement {
    constructor() {
        super();
        this.id = this.getAttribute('grandMenu');
        this.grandMenu = document.querySelector("#grand-" + this.id);
        this.addEventListener('click', this.grandMenuHandler.bind(this));
    }

    grandMenuHandler() {
        document.querySelectorAll('.grand-menu').forEach(element => {
            element.classList.add('hidden');
        });
        this.grandMenu.classList.remove('hidden');

    }
}

customElements.define('menu-sub-link', Menu_Sub_links);


class Mobile_Menu_link extends HTMLElement {
    constructor() {
        super();
        this.mobileMainMenu = document.getElementById('mobile-parent-menu');
        this.childmenuCloseIcon = document.getElementById('menu_back_icon');
        this.chilMenu = this.getAttribute('child-menu');
        this.childNavigator = this.getAttribute('child-navigator');
        this.addEventListener('click', this.menuTriger.bind(this));
        this.childmenuCloseIcon.addEventListener('click', this.closeChildMenu.bind(this));
    }

    menuTriger() {
        if (this.chilMenu == "true") {
            this.mobileMainMenu.classList.add('hidden');
            this.childmenuCloseIcon.classList.remove('hidden');
            document.getElementById(this.childNavigator).classList.remove('hidden');
        }
    }

    closeChildMenu() {
        if (this.chilMenu == "true") {
            this.childmenuCloseIcon.classList.add('hidden');
            document.getElementById(this.childNavigator).classList.add('hidden');
            this.mobileMainMenu.classList.remove('hidden');
        }
    }
}

customElements.define('mobile-menu-link', Mobile_Menu_link);

class filterList extends HTMLElement {
    constructor() {
        super();
        this.viewMoreBtn = this.querySelector('#view_more_btn') || null;
        this.hidefilterList = this.querySelectorAll('.hideitem') || null;
    }

    connectedCallback() {
        if (this.viewMoreBtn != null) {
            this.viewMoreBtn.addEventListener('click', this.toggleList.bind(this));
        }
    }

    toggleList() {
        this.hidefilterList.forEach(element => {
            element.classList.toggle('hidden');
        });
        if (this.viewMoreBtn.innerHTML == "View More <span>+</span>") {
            this.viewMoreBtn.innerHTML = "View Less <span>-</span>";
        } else {
            this.viewMoreBtn.innerHTML = "View More <span>+</span>"
        }
    }
}

customElements.define('filter-list', filterList);

class PriceRangeHandler extends HTMLElement {
    constructor() {
        super();
        this.trackBar = this.querySelector('#track-bar');
        this.trackfill = this.querySelector('#track-fill');
        this.priceMinHandle = this.querySelector('#price_min_handle');
        this.priceMaxHandle = this.querySelector('#price_max_handle');
        this.minValue = this.querySelector('#min_value');
        this.maxValue = this.querySelector('#max_value');
        this.valueMax = Math.floor(Number(this.maxValue.innerText));
        this.minTouchstate = false;
        this.maxTouchstate = false;
        this.offset = 0;
        this.minV = 0;
        this.maxV = this.valueMax;
        this.priceMinHandle.addEventListener('mousedown', this.mouseDown.bind(this), true);
        this.priceMaxHandle.addEventListener('mousedown', this.mouseDown.bind(this), true);
        this.priceMinHandle.addEventListener('touchstart', this.touchStart.bind(this), true);
        this.priceMaxHandle.addEventListener('touchstart', this.touchStart.bind(this), true);
        document.addEventListener('mouseup', this.mouseUp.bind(this), true);
        document.addEventListener('touchend', this.touchEnd.bind(this), true);
        document.addEventListener('mousemove', this.minMove.bind(this), true);
        document.addEventListener('touchmove', this.touchMove.bind(this), true);
    }

    mouseDown(e) {
        if (e.target.id === this.priceMinHandle.id) {
            this.minTouchstate = true;
            this.offset = this.priceMinHandle.offsetLeft - e.clientX;
            this.priceMinHandle.classList.add('shadow-md');
            this.priceMinHandle.classList.add('border-accent');
        } else if (e.target.id === this.priceMaxHandle.id) {
            this.maxTouchstate = true;
            this.offset = this.priceMaxHandle.offsetLeft - e.clientX;
            this.priceMaxHandle.classList.add('shadow-md');
            this.priceMaxHandle.classList.add('border-accent');
        }
    }

    touchStart(e) {
        if (e.target.id === this.priceMinHandle.id) {
            this.minTouchstate = true;
            this.offset = this.priceMinHandle.offsetLeft - e.touches[0].clientX;
            this.priceMinHandle.classList.add('shadow-md');
            this.priceMinHandle.classList.add('border-accent');
        } else if (e.target.id === this.priceMaxHandle.id) {
            this.maxTouchstate = true;
            this.offset = this.priceMaxHandle.offsetLeft - e.touches[0].clientX;
            this.priceMaxHandle.classList.add('shadow-md');
            this.priceMaxHandle.classList.add('border-accent');
        }
    }

    mouseUp(e) {
        this.minTouchstate = false;
        this.maxTouchstate = false;
        this.priceMinHandle.classList.remove('shadow-md');
        this.priceMinHandle.classList.remove('border-accent');
        this.priceMaxHandle.classList.remove('shadow-md');
        this.priceMaxHandle.classList.remove('border-accent');
        if (e.target.id === this.priceMinHandle.id) {
            this.valueChangeEvent(this.minV, this.maxV);
        } else if (e.target.id === this.priceMaxHandle.id) {
            this.valueChangeEvent(this.minV, this.maxV);
        } else {
            // Do nothing if the event target is not the handles
        }
    }

    touchEnd(e) {
        this.minTouchstate = false;
        this.maxTouchstate = false;
        this.priceMinHandle.classList.remove('shadow-md');
        this.priceMinHandle.classList.remove('border-accent');
        this.priceMaxHandle.classList.remove('shadow-md');
        this.priceMaxHandle.classList.remove('border-accent');
        if (e.target.id === this.priceMinHandle.id) {
            this.valueChangeEvent(this.minV, this.maxV);
        } else if (e.target.id === this.priceMaxHandle.id) {
            this.valueChangeEvent(this.minV, this.maxV);
        } else {
            // Do nothing if the event target is not the handles
        }
    }

    minMove(event) {
        event.preventDefault();
        if (this.minTouchstate) {
            let mousePosition = {
                x: event.clientX,
                y: event.clientY
            };
            let screenPosition = (mousePosition.x + this.offset);
            if (mousePosition.x < (this.trackBar.getBoundingClientRect().x + this.trackBar.getBoundingClientRect().width) && mousePosition.x >= this.trackBar.getBoundingClientRect().x) {
                if ((screenPosition + 16) < this.priceMaxHandle.offsetLeft) {
                    this.priceMinHandle.style.left = screenPosition + 'px';
                    this.trackfill.style.left = screenPosition + 'px'
                    this.minV = this.calculateValue(this.trackBar, this.priceMinHandle) < 0 ? 0 : this.calculateValue(this.trackBar, this.priceMinHandle);
                    this.minValue.innerText = this.minV;

                }
            }
        } else if (this.maxTouchstate) {
            let mousePosition = {
                x: event.clientX,
                y: event.clientY
            };
            let screenPosition = (mousePosition.x + this.offset);
            if (mousePosition.x < (this.trackBar.getBoundingClientRect().x + this.trackBar.getBoundingClientRect().width) && mousePosition.x >= this.trackBar.getBoundingClientRect().x) {
                if ((screenPosition - 16) > this.priceMinHandle.offsetLeft) {
                    this.priceMaxHandle.style.left = screenPosition + 'px';
                    this.trackfill.style.right = (this.trackBar.offsetLeft + this.trackBar.getBoundingClientRect().width) - screenPosition + 'px'
                    this.maxV = this.calculateValue(this.trackBar, this.priceMaxHandle) > Number(this.valueMax) ? this.valueMax : this.calculateValue(this.trackBar, this.priceMaxHandle);
                    this.maxValue.innerText = this.maxV;

                }
            }
        }
    }

    touchMove(event) {
        event.preventDefault();
        if (this.minTouchstate) {
            let touchPosition = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            };
            let screenPosition = (touchPosition.x + this.offset);
            if (touchPosition.x < (this.trackBar.getBoundingClientRect().x + this.trackBar.getBoundingClientRect().width) && touchPosition.x >= this.trackBar.getBoundingClientRect().x) {
                if ((screenPosition + 16) < this.priceMaxHandle.offsetLeft) {
                    this.priceMinHandle.style.left = screenPosition + 'px';
                    this.trackfill.style.left = screenPosition + 'px'
                    this.minV = this.calculateValue(this.trackBar, this.priceMinHandle) < 0 ? 0 : this.calculateValue(this.trackBar, this.priceMinHandle);
                    this.minValue.innerText = this.minV;

                }
            }
        } else if (this.maxTouchstate) {
            let touchPosition = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            };
            let screenPosition = (touchPosition.x + this.offset);
            if (touchPosition.x < (this.trackBar.getBoundingClientRect().x + this.trackBar.getBoundingClientRect().width) && touchPosition.x >= this.trackBar.getBoundingClientRect().x) {
                if ((screenPosition - 16) > this.priceMinHandle.offsetLeft) {
                    this.priceMaxHandle.style.left = screenPosition + 'px';
                    this.trackfill.style.right = ((this.trackBar.offsetLeft + this.trackBar.getBoundingClientRect().width) - screenPosition) + 'px'
                    this.maxV = this.calculateValue(this.trackBar, this.priceMaxHandle) > Number(this.valueMax) ? this.valueMax : this.calculateValue(this.trackBar, this.priceMaxHandle);
                    this.maxValue.innerText = this.maxV;

                }
            }
        }
    }

    calculateValue(tracker, handle) {
        let containerWidth = tracker.offsetWidth;
        let boxPosition = handle.offsetLeft;
        let percentagePosition = (boxPosition / containerWidth) * 100;
        let mappedValue = (percentagePosition / 100) * Number(this.valueMax);
        mappedValue = Math.round(mappedValue * 100) / 100;
        mappedValue = Math.round(mappedValue);
        console.log(mappedValue);
        return mappedValue;
    }

    valueChangeEvent(minV, maxV) {
        const event = new CustomEvent('priceRangeChange', {
            detail: {
                min: minV,
                max: maxV
            }
        });
        this.dispatchEvent(event);
    }

}

customElements.define('price-range', PriceRangeHandler);

class ProductGrid extends HTMLElement {
    constructor() {
        super();
        this.productType = document.querySelector('.product-grid-filter');
        this.gridContainer = this.querySelectorAll('.grid-container');
        this.currentGrid = null;
        this.productType.addEventListener('change', this.fetchProduct.bind(this));
    }

    async fetchProduct() {
        this.currentGrid = document.querySelector('input[name=filter-producttype]:checked').value;
        this.gridContainer.forEach(element => {
            element.classList.add('hidden');
        });
        document.getElementById('grid-' + this.currentGrid).classList.remove('hidden');
        // this.classList.add('fade-in-out-element');
        // let type = document.querySelector('input[name=filter-producttype]:checked').value;
        // type = type == 'allproduct' ? type = '' : '&filter.p.product_type=' + type;
        // await fetch(window.Shopify.routes.root + 'collections/all?section_id=product-grid-home' + type).then((response) => response.text()).then((data) => {
        //     this.innerHTML = new DOMParser()
        //         .parseFromString(data, 'text/html')
        //         .getElementById('shopify-section-product-grid-home').innerHTML;
        //     this.classList.remove('fade-in-out-element');
        // });
    }
}

customElements.define('product-grid', ProductGrid);

class QuickView {
    static {
        this.quickview = document.querySelector('#quick-view');
        this.renderSection = document.querySelector('#quickveiw-render');
        this.closeBtn = document.querySelector('#quickview_close_icon');
        this.closeOverlay = document.querySelector('#quickview-overlay');
        this.closeBtn.addEventListener('click', this.close.bind(this));
        this.closeOverlay.addEventListener('click', this.close.bind(this));
    }

    static close() {
        this.quickview.classList.add('hidden');
        this.renderSection.innerHTML = ''
    }

    static async laodQuickView(productId) {
        if (productId == null) {
            return;
        }
        await fetch(window.Shopify.routes.root + "products/" + productId + "?section_id=quick-view")
            .then((response) => response.text())
            .then((text) => {
                this.quickview.classList.remove('hidden');
                this.renderSection.innerHTML = text;
            })
            .catch(error => {
                console.error(error);
            });
    }

}

class QuickViewListiner extends HTMLElement {
    constructor() {
        super();
        this.productId = this.getAttribute('productId') || null;
        this.eye_icon = this.querySelector('#eye_icon') || null;
        this.spinner_icon = this.querySelector('#spinner_icon') || null;
        this.addEventListener('click', this.triggerQuickView.bind(this))
    }

    triggerQuickView() {
        if (this.productId == null) {
            return;
        }
        try {
            if (this.eye_icon != null && this.spinner_icon != null) {
                this.eye_icon.classList.add('hidden');
                this.spinner_icon.classList.remove('hidden');
            }
            QuickView.laodQuickView(this.productId).then(() => {
                if (this.eye_icon != null && this.spinner_icon != null) {
                    this.eye_icon.classList.remove('hidden');
                    this.spinner_icon.classList.add('hidden');
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
}

customElements.define('quick-view-listiner', QuickViewListiner);
class QuickViewData extends HTMLElement {
    constructor() {
        super();
        this.classList.add("block")
        this.quantity = document.querySelector('input[name="quantity"]') || null;
        this.variantId = document.querySelector('select[name="id"]') || document.querySelector('input[name="id"]') || null;
        this.addtocartbtn = this.querySelector('#addtocartbtn');
        this.viewCart = this.querySelector('#viewCart');
        this.buyitnowbtn = this.querySelector('#buyitnowbtn');
        this.txt = this.querySelector('#txt');
        this.spinner = this.querySelector('#spinner');
        this.txt2 = this.querySelector('#txt2');
        this.spinner2 = this.querySelector('#spinner2');
        this.addtocartbtn.addEventListener('click', this.onFormSubmit.bind(this));
        this.buyitnowbtn.addEventListener('click', this.onBuyItNow.bind(this));
        this.viewCart.addEventListener('click', () => { window.open("/cart", "_self"); });
    }

    onFormSubmit() {
        if (this.variantId.value == null) {

            return;
        }
        this.laoding(true);
        try {
            Cart.add(this.variantId.value, this.quantity.value).then(() => {
                this.laoding(false);
                this.addtocartbtn.classList.add('hidden');
                this.viewCart.classList.remove('hidden');
            });
        } catch (error) {
            console.log(error);
        }

    }
    laoding(load = false) {
        if (load) {
            this.txt.classList.add('hidden');
            this.spinner.classList.remove('hidden');
        } else {
            this.txt.classList.remove('hidden');
            this.spinner.classList.add('hidden');
        }
    }
    laoding2(load = false) {
        if (load) {
            this.txt2.classList.add('hidden');
            this.spinner2.classList.remove('hidden');
        } else {
            this.txt2.classList.remove('hidden');
            this.spinner2.classList.add('hidden');
        }
    }
    onBuyItNow() {
        if (this.variantId.value == null) {

            return;
        }
        this.laoding2(true);
        try {
            Cart.add(this.variantId.value, this.quantity.value).then(() => { this.laoding2(false); window.open("/cart/checkout", "_self"); });
        } catch (error) {
            console.log(error);
        }
    }
}

customElements.define('quick-view-data', QuickViewData);


class ProductRecommondation extends HTMLElement {
    constructor() {
        super();
        this.productId = this.getAttribute('product-id');
        this.renderSection();
    }

    async renderSection() {
        await fetch(window.Shopify.routes.root + 'recommendations/products?section_id=product-recommendation-render&product_id=' + this.productId).then((response) => response.text()).then((data) => {
            this.innerHTML = new DOMParser()
                .parseFromString(data, 'text/html')
                .getElementById('shopify-section-product-recommendation-render').innerHTML;
        });
    }
}

customElements.define('product-recommendation', ProductRecommondation);

class CollectionGridAutoLoader extends HTMLElement {
    constructor() {
        super();
        this.sectionId = this.getAttribute('section-id');
        this.totalPages = this.getAttribute('total-pages');
        this.currentPage = this.getAttribute('current-page');
        this.spinnerIcon = this.querySelector('.loading-spinner');
        this.loadingState = false;
        // filters

        // endfilters
        this.filterNavigator = document.getElementById('filter-navigator') || null;
        this.filterOverlay = document.getElementById('filter-overlay') || null;
        this.filterCloseIcon = document.getElementById('filter_close_icon') || null;
        this.filterContainer = document.getElementById('filter-container') || null;
        this.filterClearBtn = document.querySelector('.filter_clear_btn') || null;
        this.filterChange = false;
        this.filterState = false;
        this.tags = null;
        this.types = null;
        this.currentTags = "tag";
        this.currentTypes = "type";
        this.mainContainer = document.querySelector('main');
        this.collection_sorting = document.querySelector('#collection_sort_by') || null;

        this.filters = document.querySelectorAll('[name^="filter"]');

        if (this.filterNavigator != null) {
            this.filterNavigator.addEventListener('click', this.showFilter.bind(this));
            this.filterOverlay.addEventListener('click', this.hideFilter.bind(this));
            this.filterCloseIcon.addEventListener('click', this.hideFilter.bind(this));
        }
        this.mainContainer.addEventListener('scroll', this.onscrollChange.bind(this));
        if (this.filterClearBtn != null) {
            this.filterClearBtn.addEventListener('click', (e) => {
                window.location.href = window.location.pathname;
            });
        }
        if (this.filters.length > 0) {
            this.filters.forEach((filter) => {
                if (filter.type == 'checkbox' || filter.type == 'radio') {
                    filter.addEventListener('change', (e) => {
                        this.filterHandler(e);
                    }
                    );
                } else if (filter.type == 'number') {
                    filter.addEventListener('input', (e) => {
                        this.filterHandler(e);
                    });
                } else if (filter.id == 'sort_by') {
                    filter.addEventListener('change', (e) => {
                        this.filterHandler(e);
                    });
                }
            });
        }

    }


    filterHandler(event) {
        let filter_list = "";

        if (this.filters.length > 0) {
            let activeFilters=0;
            this.filters.forEach((filter, index) => {
                if (filter.checked) {
                    activeFilters++;
                    filter_list += "&" + filter.name + "=" + filter.value;
                } else if (filter.type == 'number') {
                    filter_list += "&" + filter.name + "=" + filter.value;
                } else if (filter.id == 'sort_by' && filter.value != undefined) {
                    filter_list += "&" + filter.id + "=" + filter.value;
                }
            });
            if(activeFilters==0){
                this.filterClearBtn.classList.add('hidden');
            }else{
                this.filterClearBtn.classList.remove('hidden');
            }
        }

        if (event.type == "scroll") {
            this.currentPage++;
            if (this.currentPage > this.totalPages) {
                return;
            } else {
                filter_list += "&page=" + this.currentPage;
                let url = window.location.pathname + '?' + filter_list;
                this.debounce(this.fetchProduct(url));
            }

        } else if (event.type == "change" || event.type == "input") {
            this.currentPage = 1;
            filter_list += "&page=" + this.currentPage;
            let url = window.location.pathname + '?' + filter_list;
            this.debounce(this.fetchProduct(url,event));
        }


    }


    loading(state = false) {
        if (state) {
            this.spinnerIcon.classList.remove('hidden');
            this.loadingState = true;
        } else {
            this.spinnerIcon.classList.add('hidden');
            this.loadingState = false;
        }
    }
    onscrollChange(e) {
        const scrollTop = this.mainContainer.scrollTop;
        const scrollHeight = this.mainContainer.scrollHeight;
        const containerHeight = this.mainContainer.clientHeight;
        var scrollPercent = scrollTop / (scrollHeight - containerHeight);
        if (scrollPercent > 0.7 && this.loadingState == false) {
            this.filterHandler(e);
        }
    }


    showFilter() {
        this.filterOverlay.classList.remove('sm:hidden');
        this.filterContainer.classList.remove('sm:translate-x-full');
    }

    hideFilter() {
        this.filterOverlay.classList.add('sm:hidden');
        this.filterContainer.classList.add('sm:translate-x-full');
    }

    

    async fetchProduct(url, event) {

        console.log(window.Shopify.routes.root, url);
        if (url == "") {
            return;
        }

        let newurl = url.split("?");
        this.loading(true);
        await fetch(url).then((response) => response.text()).then((data) => {
            let productCard = new DOMParser()
                .parseFromString(data, 'text/html')
                .querySelectorAll('.product-card');
            if (productCard.length > 0) {
                if (event != null && (event.type == "change" || event.type == "input")) {
                    this.querySelector('#product-grid').innerHTML = "";
                }
                productCard.forEach(element => {
                    this.querySelector('#product-grid').appendChild(element);
                });
                window.history.replaceState(null, null, "?" + newurl[1]);
            }
            this.loading(false);
        }).catch(error => {
            console.error(error);
        });
    }
    debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }
}

customElements.define('collection-grid-auto-loader', CollectionGridAutoLoader);

class ProductSlider extends HTMLElement {
    constructor() {
        super();
        this.slider = this.querySelector('swiper-container');
        this.mobileMedia = window.matchMedia("(max-width: 600px)");
        this.tabletMedia = window.matchMedia("(max-width: 1024px)");
        this.laptopMedia = window.matchMedia("(max-width: 1600px)");
        this.checkDevice();
        this.mobileMedia.addEventListener('change', this.checkDevice.bind(this));
        this.tabletMedia.addEventListener('change', this.checkDevice.bind(this));
        this.laptopMedia.addEventListener('change', this.checkDevice.bind(this));
    }

    checkDevice() {
        if (this.mobileMedia.matches) {
            this.slider.setAttribute('slides-per-view', '2');
        } else if (this.tabletMedia.matches) {
            this.slider.setAttribute('slides-per-view', '4');
        } else if (this.laptopMedia.matches) {
            this.slider.setAttribute('slides-per-view', '6');
        }

    }
}

customElements.define('product-slider', ProductSlider);

class CollectionShowUp extends HTMLElement {
    constructor() {
        super();
        this.slider = this.querySelector('swiper-container');
        this.sliderLeftBtn = this.querySelector('.slider-left-btn');
        this.sliderRightBtn = this.querySelector('.slider-right-btn');
        this.mobileMedia = window.matchMedia("(max-width: 600px)");
        this.checkDevice();
        this.mobileMedia.addEventListener('change', this.checkDevice.bind(this));
        if (this.sliderLeftBtn) {
            this.sliderLeftBtn.addEventListener('click', () => { this.slider.swiper.slideNext() })
        }
        if (this.sliderRightBtn) {
            this.sliderRightBtn.addEventListener('click', () => { this.slider.swiper.slidePrev() })
        }

    }

    checkDevice() {
        if (this.mobileMedia.matches) {
            this.slider.setAttribute('slides-per-view', '2');
        } else {
            this.slider.setAttribute('slides-per-view', '4');
        }
    }
}

customElements.define('collection-showup', CollectionShowUp);


class NewsletterPopup extends HTMLElement {
    constructor() {
        super();
        this.closeIcon = this.querySelector('#newletter_close_icon');
        this.timeInterval = this.getAttribute('time-interval') || 5000;
        this.countdown = null;
        this.initialize();
        this.closeIcon.addEventListener('click', () => {
            this.hideNewsLetter();
        })
        this.addEventListener('click', (e) => {
            if (e.target.id == "newsletter-overlay") {
                this.hideNewsLetter();
            }
        })
    }

    initialize() {
        if (window.location.search == "?customer_posted=true") {
            localStorage.setItem('newsletter', "subscribe");
            return;
        }

        if (localStorage.getItem('newsletter') == null) {
            localStorage.setItem('newsletter', "notsubscribe");
            this.countdown = setInterval(() => {
                this.showNewsLetter();
            }, this.timeInterval);
        } else if (localStorage.getItem('newsletter') == "closeuser" || localStorage.getItem('newsletter') == "subscribe") {
            return;
        } else {
            this.countdown = setInterval(() => {
                this.showNewsLetter();
            }, this.timeInterval);
        }
    }
    showNewsLetter() {
        this.classList.remove('hidden');
    }
    hideNewsLetter() {
        clearInterval(this.countdown);
        this.classList.add('hidden');
        localStorage.setItem('newsletter', "closeuser");
    }

    getInputsValue() {

    }
    async postForm() {

    }
}

customElements.define('newsletter-popup', NewsletterPopup);

class CustomSelectBox extends HTMLElement {
    constructor() {
        super()
        this.changeEvent = new Event('change');
        this.lable = this.querySelector('label');
        this.selector = this.querySelector('#dropdown_selector');
        this.overlay = this.querySelector('#dropdown_overlay');
        this.dropdown = this.querySelector('#dropdown');
        this.selectedOption = this.querySelector('option[selected]') || null;
        if (this.selectedOption != null) {
            this.value = this.selectedOption.value;
            this.lable.innerText = this.selectedOption.label;
        }

        if (this.selector) {
            this.selector.addEventListener('click', (event) => {
                this.selector.classList.add('z-10');
                this.dropdown.classList.toggle('hidden');
                this.overlay.classList.toggle('hidden');
                if (event.target.tagName == 'OPTION') {
                    this.lable.innerText = event.target.label;
                    this.value = event.target.value;
                    this.selector.classList.remove('z-10');
                    this.dispatchEvent(this.changeEvent);
                }
            })
        }
        if (this.overlay) {
            this.overlay.addEventListener('click', () => {
                this.selector.classList.remove('z-10');
                this.dropdown.classList.add('hidden');
                this.overlay.classList.add('hidden');
            })
        }

    }

    connectedCallback() {

    }
}

customElements.define('custom-select', CustomSelectBox);

class customRadioButton extends HTMLElement {
    constructor() {
        super();
        this.type = this.getAttribute('type') || 'radio';
        this.name = this.getAttribute('name') || null;
        this.value = this.getAttribute('value') || '';
        this.disabled = this.getAttribute('disabled') || 'false';
        this.text = this.getAttribute('text') || null;
        this.checked = this.getAttribute('checked') || null;
        this.boxClass = this.getAttribute('box-class') || '';
        this.textClass = this.getAttribute('text-class') || '';
        this.cornor = this.getAttribute('cornor') || null;
        this.color = this.getAttribute('color') || '#333';
        this.bgColor = this.getAttribute('bg-color') || '#d8d7d7';
        this.classList.add('inline-block');
        this.innerHTML = `<label class="flex items-center gap-1 ${this.disabled == 'true' ? 'opacity-60 cursor-not-allowed' : ' cursor-pointer'}">
        <input class="hidden" ${this.checked == 'true' ? 'checked' : ''} type="${this.type}" name="${this.name != null ? this.name : ''}" value="${this.value}" ${this.disabled == 'true' ? 'disabled' : ''}>
        <div class="radio_back w-4 h-4 flex items-center justify-center relative ${this.boxClass} ${this.cornor == 'rounded' ? 'rounded-full' : ''}">
            <div class="radio_dot w-2 h-2 ${this.cornor == 'rounded' ? 'rounded-full' : ''} opacity-0 transition-opacity duration-200 md:hover:opacity-50 bg-primaryColor"></div>
        </div>
        ${this.text != null ? '<span class="inline-block ' + this.textClass + '">' + this.text + '</span>' : ""}
    </label>`;
    }

}

customElements.define('custom-radio-button', customRadioButton);

class ShippingDates extends HTMLElement {
    constructor() {
        super();
        this.startDate = Number(this.getAttribute('start-date')) ? this.getAttribute('start-date') : 2;
        this.endDate = Number(this.getAttribute('end-date')) ? this.getAttribute('end-date') : 2;
    }

    connectedCallback() {
        this.render();
    }

    getShippingDates() {
        var currentDate = new Date();
        var shippingStartDate = new Date(currentDate.getTime() + (Math.abs(Number(this.startDate)) * 24 * 60 * 60 * 1000));
        var shippingEndDate = new Date(shippingStartDate.getTime() + (Math.abs(Number(this.endDate)) * 24 * 60 * 60 * 1000));

        // Format the dates in "DD Month" format
        var formattedShippingStartDate = this.formatDate(shippingStartDate);
        var formattedShippingEndDate = this.formatDate(shippingEndDate);

        return [formattedShippingStartDate, formattedShippingEndDate];
    }

    formatDate(date) {
        var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var month = monthNames[date.getMonth()];
        return day + ' ' + month;
    }

    render() {
        var shippingDates = this.getShippingDates();
        this.innerHTML = shippingDates.join(' To '); // Display the shipping dates
    }
}


customElements.define('shipping-time', ShippingDates);

class AnnouncementBar extends HTMLElement {
    constructor() {
        super();
        this.List = this.children;
        this.timeDuration = this.getAttribute('time-duration') || 5000;
        if (this.List.length > 1) {
            this.changeTextList();
        }
    }
    changeTextList() {
        let currentlist = 1;
        setInterval(() => {
            if (currentlist < this.List.length) {
                this.resetList();
                this.List[currentlist].classList.remove('hidden');
                currentlist++;
            } else {
                this.resetList();
                currentlist = 0;
                this.List[currentlist].classList.remove('hidden');
            }
        }, Number(this.timeDuration));
    }

    resetList() {
        for (let index = 0; index < this.List.length; index++) {
            const element = this.List[index];
            element.classList.add('hidden');
        }
    }

}

customElements.define('announcement-bar', AnnouncementBar);

class DescriptionHandler extends HTMLElement {
    constructor() {
        super();
    }


    hideImage(selector) {
        this.image = this.querySelector(`img[src="${selector}"]`) || null;
        if (this.image != null) {
            this.image.classList.add('!hidden');
        }
    }
}

customElements.define('description-handler', DescriptionHandler);

class CatagoryMenu extends HTMLElement {
    constructor() {
        super();
        this.catagoryNavigator = this.querySelector('#catagory-navigator');
        this.catagoryList = this.querySelector('#catagory-list');
        this.catagoryNavigator.addEventListener('mouseenter', this.showCatgoryList.bind(this));
        this.catagoryNavigator.addEventListener('mouseleave', this.hideCatagoryList.bind(this));
        this.catagoryList.addEventListener('mouseenter', this.showCatgoryList.bind(this));
        this.catagoryList.addEventListener('mouseleave', this.hideCatagoryList.bind(this));
    }

    showCatgoryList() {
        this.catagoryList.classList.remove('hidden');
    }

    hideCatagoryList() {
        this.catagoryList.classList.add('hidden');
    }
}

customElements.define('catagory-menu', CatagoryMenu);

class CatagoryLink extends HTMLElement {
    constructor() {
        super();
        this.isTarget = this.getAttribute('is-target') || null;
        this.targetCatgory = this.getAttribute('target-catgory') || null;
        this.allCatagory = document.querySelectorAll('.child-catagory');
        this.addEventListener('mouseenter', this.showTargetCatagory.bind(this));
    }

    showTargetCatagory() {
        this.hideAllCatagory();
        if (this.isTarget == 'true' && this.targetCatgory != '') {
            document.getElementById('child-cat-' + this.targetCatgory).classList.remove('hidden');
        }
    }

    hideAllCatagory() {
        if (this.allCatagory.length > 0) {
            this.allCatagory.forEach(catagory => {
                catagory.classList.add('hidden');
            });
        }
    }
}

customElements.define('catagory-link', CatagoryLink);

class LocalizationForm extends HTMLElement {
    constructor() {
        super();
        this.element = this.querySelector('custom-select');
        this.input = this.querySelector('input[name="language_code"], input[name="country_code"]');
        if (this.element) {
            this.element.addEventListener('change', this.changeLanguge.bind(this));
        }
        if (window.location.pathname.includes('/ar')) {
            document.getElementById('themeBody').classList.remove('ltr-direction');
            document.getElementById('themeBody').classList.add('rtl-direction');
            document.querySelectorAll('swiper-container').forEach(element => {
                element.setAttribute('dir', 'rtl');
            });
        }
    }

    changeLanguge(event) {
        event.preventDefault();
        const form = this.querySelector('form');
        this.input.value = this.element.value;
        if (form) form.submit();
    }
}

customElements.define('localization-form', LocalizationForm);
