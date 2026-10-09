'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar toggle functionality for mobile
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// project filter
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (category) {
  filterItems.forEach(function (item) {
    item.classList.toggle("active", category === "all" || item.dataset.category === category);
  });
}

select.addEventListener("click", function () { elementToggleFunc(this); });

selectItems.forEach(function (item) {
  item.addEventListener("click", function () {
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(this.dataset.filter);
  });
});

filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filterBtns.forEach(function (b) { b.classList.remove("active"); });
    this.classList.add("active");
    selectValue.innerText = this.innerText;
    filterFunc(this.dataset.filter);
  });
});



// page navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

const showPage = function (target) {
  pages.forEach(function (page) { page.classList.toggle("active", page.dataset.page === target); });
  navigationLinks.forEach(function (link) { link.classList.toggle("active", link.dataset.target === target); });
}

navigationLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    showPage(this.dataset.target);
    history.replaceState(null, "", "#" + this.dataset.target);
    window.scrollTo(0, 0);
  });
});

// open the tab named in the URL hash, e.g. /#projects
const initialPage = location.hash.slice(1);
if ([...pages].some(function (page) { return page.dataset.page === initialPage; })) showPage(initialPage);
