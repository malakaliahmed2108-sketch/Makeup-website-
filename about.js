// Scroll Progress Bar
    const progressBar = document.getElementById('progressBar');
    
    function updateProgressBar() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrollTop / documentHeight) * 100;
      progressBar.style.width = progress + '%';
    }

    // Timeline Scroll Animation
    function revealTimelineItems() {
      const timelineItems = document.querySelectorAll('.timeline-item');
      const windowHeight = window.innerHeight;
      
      timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const revealPoint = windowHeight * 0.8;
        
        if (itemTop < revealPoint) {
          item.classList.add('visible');
        }
      });
    }

    // Smooth Scroll for Better Performance
    let ticking = false;
    
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateProgressBar();
          revealTimelineItems();
          ticking = false;
        });
        ticking = true;
      }
    }

    // Event Listeners
    window.addEventListener('scroll', onScroll);
    window.addEventListener('load', () => {
      updateProgressBar();
      revealTimelineItems();
    });

    // Intersection Observer for Better Performance (Alternative)
    if ('IntersectionObserver' in window) {
      const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, observerOptions);

      document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
      });
    }

    