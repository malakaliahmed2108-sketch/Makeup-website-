let currentIndex = 0;
const slides = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
const totalSlides = document.querySelectorAll('.slide').length;

function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = index;
  const offset = -currentIndex * 100;
  slides.style.transform = `translateX(${offset}%)`;
  updateDots();
}

function showNextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  goToSlide(currentIndex);
}

let autoSlide = setInterval(showNextSlide, 4000);

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    clearInterval(autoSlide);
    autoSlide = setInterval(showNextSlide, 4000);
  });
});
