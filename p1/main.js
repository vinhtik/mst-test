document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const firstSection = document.querySelector('.first-display');
    const firstSectionHeight = firstSection.offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > firstSectionHeight) {
            header.classList.add('full-width');
        } else {
            header.classList.remove('full-width');
        }
    });

    if (window.innerWidth < 530) {
        const slider = document.querySelector('.second-display');
        const images = document.querySelectorAll('.second-image');
        const prevBtn = document.createElement('button');
        prevBtn.className = 'slider-btn prev-btn';
        prevBtn.innerHTML = '❮';
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'slider-btn next-btn';
        nextBtn.innerHTML = '❯';
        
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';

        slider.appendChild(prevBtn);
        slider.appendChild(nextBtn);
        slider.appendChild(dotsContainer);

        images.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'slider-dot';
            dot.dataset.index = i;
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.slider-dot');
        let currentIndex = 0;

        showSlide(currentIndex);

        function showSlide(index) {
            images.forEach(img => img.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            images[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;
        }

        prevBtn.addEventListener('click', () => {
            const newIndex = (currentIndex - 1 + images.length) % images.length;
            showSlide(newIndex);
        });

        nextBtn.addEventListener('click', () => {
            const newIndex = (currentIndex + 1) % images.length;
            showSlide(newIndex);
        });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.dataset.index);
                showSlide(index);
            });
        });

        let slideInterval = setInterval(() => {
            const newIndex = (currentIndex + 1) % images.length;
            showSlide(newIndex);
        }, 5000);

        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                const newIndex = (currentIndex + 1) % images.length;
                showSlide(newIndex);
            }, 5000);
        });
    }
});