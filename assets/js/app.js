// Темная тема
document.getElementById('themeToggle').addEventListener('click', function() {
  let body = document.body;
  let navbar = document.querySelector('.navbar');
  let header = document.querySelector('header');
  let navLinks = document.querySelectorAll('.nav-link');
  let navbarBrandIcon = document.querySelector('.navbar-brand i');
  let themeToggle = document.getElementById('themeToggle');
  let cardBodies = document.querySelectorAll('.card-body');
  let imgTheme = document.querySelectorAll('.img-theme');
  let themeIcon = document.getElementById('themeIcon');
  body.classList.toggle('dark-theme');
  navbar.classList.toggle('dark-theme-navbar');
  header.classList.toggle('dark-theme-header');
  navLinks.forEach(navLink => navLink.classList.toggle('dark-theme-text'));
  navbarBrandIcon.classList.toggle('dark-theme-icon');
  themeToggle.classList.toggle('dark-theme-button');
  imgTheme.forEach(img => img.classList.toggle('img-theme-dark'));
  cardBodies.forEach(cardBody => cardBody.classList.toggle('card-body-theme'));
  if (body.classList.contains('dark-theme')) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
  } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
  }
});
// Цвет фона
document.getElementById('colorPicker').addEventListener('input', function() {
  document.body.style.backgroundColor = this.value;
});


// Vue.js
const app = Vue.createApp({
  data() {
    return {
      products: [],
      filteredProducts: [],
      minPrice: 0,
      maxPrice: 1000,
      searchQuery: '',
      sort: 'none'
    }
  },
  created() {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        this.products = data.map(product => ({ ...product, quantity: 0 }));
        this.filteredProducts = [...this.products];
      })
      .catch(error => console.error(error));
  },
  computed: {
    totalQuantity() {
      return this.products.reduce((total, product) => total + product.quantity, 0);
    },
    totalPrice() {
      return this.products.reduce((total, product) => total + product.price * product.quantity, 0);
    }
  },
  watch: {
    minPrice() {
      console.log("Min price changed to: ", this.minPrice);
      this.filterAndSortProducts();
    },
    maxPrice() {
      console.log("Max price changed to: ", this.maxPrice);
      this.filterAndSortProducts();
    },
    searchQuery() {
      console.log("Search query changed to: ", this.searchQuery);
      this.filterAndSortProducts();
    },
    sort() {
      console.log("Sort option changed to: ", this.sort);
      if (this.sort === 'none') {
        this.resetFilters();
      } else {
        this.filterAndSortProducts();
      }
    }
  },
  methods: {
    resetFilters() {
      this.searchQuery = '';
      this.minPrice = 0;
      this.maxPrice = 1000;
      this.filteredProducts = [...this.products];
    },
    filterAndSortProducts() {
      console.log("Filtering and sorting products...");

      let filtered = this.products.filter(product =>
        product.price >= this.minPrice &&
        product.price <= this.maxPrice &&
        (product.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchQuery.toLowerCase()))
      );

      let sorted;
      if (this.sort === 'asc') {
        sorted = [...filtered].sort((a, b) => a.price - b.price);
      } else if (this.sort === 'desc') {
        sorted = [...filtered].sort((a, b) => b.price - a.price);
      } else {
        sorted = [...filtered];
      }

      this.filteredProducts = sorted;
      console.log("Filtered and sorted products: ", this.filteredProducts);
    }
  }    
});

app.mount('#app');
