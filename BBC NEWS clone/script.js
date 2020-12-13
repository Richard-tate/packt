const navToggle = document.querySelector('.subnavbtn');
const navbar = document.querySelector('.subnav');
const topnav = document.querySelector('.top-bar');
const banner = document.querySelector('.header-banner');
const bannerSubnav = document.querySelector('.header-subnav');
const bannerBtn = document.querySelector('.banner-btn');
const main = document.querySelector('.main');


navToggle.addEventListener('click', () =>{
    topnav.classList.toggle('add-border');
    banner.classList.toggle('show-banner');
    navbar.classList.toggle('show');
});

bannerBtn.addEventListener('click', () =>{
    bannerSubnav.classList.toggle('show-nav');
});