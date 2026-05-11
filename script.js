document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".navbar");
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll("section[id]");

  // ===== Header con sombra al hacer scroll =====
  window.addEventListener("scroll", () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 50);
    }
  });

  // ===== Link activo en navbar según sección =====
  function updateActiveNav() {
    const scrollY = window.scrollY + 140;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollY >= top && scrollY < top + height) {
        navItems.forEach((link) => link.classList.remove("active"));
        document.querySelector(`.nav-item[href="#${id}"]`)?.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();

  // ===== Scroll suave =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });

        // cerrar menú móvil si está abierto
        navLinks?.classList.remove("active");
      }
    });
  });

  // ===== Menú móvil =====
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // ===== Hero carousel =====
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".dot");
  const nextBtn = document.querySelector(".carousel-control.next");
  const prevBtn = document.querySelector(".carousel-control.prev");
  const carouselContainer = document.querySelector(".carousel-container");

  if (slides.length > 0 && carouselContainer) {
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayInterval = null;

    const updateCarousel = (index) => {
      carouselContainer.style.transform = `translateX(-${index * 100}%)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateCarousel(currentIndex);
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateCarousel(currentIndex);
    };

    const startAutoPlay = () => {
      autoPlayInterval = setInterval(nextSlide, 7000);
    };

    const resetAutoPlay = () => {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
      startAutoPlay();
    };

    nextBtn?.addEventListener("click", () => {
      nextSlide();
      resetAutoPlay();
    });

    prevBtn?.addEventListener("click", () => {
      prevSlide();
      resetAutoPlay();
    });

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        currentIndex = i;
        updateCarousel(currentIndex);
        resetAutoPlay();
      });
    });

    updateCarousel(currentIndex);
    startAutoPlay();
  }

  // ===== Benefits cards =====
  const benefitCards = document.querySelectorAll(".benefit-card");
  let activeBenefitIndex = 0;

  function updateBenefitCards() {
    benefitCards.forEach((card, i) => {
      card.classList.remove("active");
      if (i === activeBenefitIndex) {
        card.classList.add("active");
      }
    });
  }

  benefitCards.forEach((card, i) => {
    card.addEventListener("click", () => {
      activeBenefitIndex = i;
      updateBenefitCards();
    });
  });

  if (benefitCards.length > 0) {
    updateBenefitCards();
  }

  // ===== Testimonial carousel infinito =====
  const testimonialTrack = document.querySelector(".testimonial-track");

  if (testimonialTrack && !testimonialTrack.dataset.cloned) {
    const cards = Array.from(testimonialTrack.children);

    cards.forEach((card) => {
      testimonialTrack.appendChild(card.cloneNode(true));
    });

    testimonialTrack.dataset.cloned = "true";
  }

  // ===== Cómo funciona =====
  const howData = {
    jugador: {
      step1: {
        title: "Busca opciones",
        text: "Explora canchas por ubicación, deporte, precio y horario."
      },
      step2: {
        title: "Compara y reserva",
        text: "Revisa disponibilidad real, selecciona la mejor opción y confirma tu reserva."
      },
      step3: {
        title: "Juega y califica",
        text: "Realiza tu actividad, recibe notificaciones y comparte tu experiencia con reseñas."
      }
    },
    entrenador: {
      step1: {
        title: "Crea tu perfil",
        text: "Muestra tu experiencia, especialidad, horarios y disponibilidad en la plataforma."
      },
      step2: {
        title: "Gestiona solicitudes",
        text: "Recibe reservas de entrenamiento y organiza mejor tu agenda profesional."
      },
      step3: {
        title: "Haz crecer tu servicio",
        text: "Recibe pagos, reseñas y fortalece tu visibilidad dentro del ecosistema Courtly."
      }
    }
  };

  const howIcons = document.querySelectorAll(".how-icon");

  function updateHowContent(segment) {
    const content = howData[segment];
    if (!content) return;

    const step1Title = document.getElementById("how-step1-title");
    const step1Text = document.getElementById("how-step1-text");
    const step2Title = document.getElementById("how-step2-title");
    const step2Text = document.getElementById("how-step2-text");
    const step3Title = document.getElementById("how-step3-title");
    const step3Text = document.getElementById("how-step3-text");

    if (step1Title) step1Title.textContent = content.step1.title;
    if (step1Text) step1Text.textContent = content.step1.text;
    if (step2Title) step2Title.textContent = content.step2.title;
    if (step2Text) step2Text.textContent = content.step2.text;
    if (step3Title) step3Title.textContent = content.step3.title;
    if (step3Text) step3Text.textContent = content.step3.text;

    howIcons.forEach((btn) => btn.classList.remove("active"));
    document.querySelector(`.how-icon[data-target="${segment}"]`)?.classList.add("active");
  }

  howIcons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const segment = btn.getAttribute("data-target");
      updateHowContent(segment);
    });
  });

  if (howIcons.length > 0) {
    updateHowContent("jugador");
  }
});
