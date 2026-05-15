document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll("section[id]");

  // ==== Cambia estilo del header al hacer scroll ====
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
  });

  // ==== Marca el link activo ====
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY + 150;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => link.classList.remove("active"));
        document.querySelector(`.nav-item[href="#${id}"]`)?.classList.add("active");
      }
    });
  });

  // ==== Scroll suave ====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
      }
    });
  });
});

// ==== Menú móvil ====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// ==== Carrusel Hero ====
const slides = document.querySelectorAll(".carousel-slide");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.querySelector(".carousel-control.next");
const prevBtn = document.querySelector(".carousel-control.prev");
const carouselContainer = document.querySelector(".carousel-container");
const heroSection = document.querySelector(".hero-carousel");

if (slides.length && carouselContainer && heroSection) {
  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoPlayInterval;

  const updateCarousel = (index) => {
    carouselContainer.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel(currentIndex);
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel(currentIndex);
  };

  nextBtn?.addEventListener("click", () => { nextSlide(); resetAutoPlay(); });
  prevBtn?.addEventListener("click", () => { prevSlide(); resetAutoPlay(); });
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => { currentIndex = i; updateCarousel(i); resetAutoPlay(); });
  });

  const startAutoPlay = () => { autoPlayInterval = setInterval(nextSlide, 8000); };
  const resetAutoPlay = () => { clearInterval(autoPlayInterval); startAutoPlay(); };

  updateCarousel(currentIndex);
  startAutoPlay();
}

// ==== Slider de beneficios ====
const benefitCards = document.querySelectorAll(".benefit-card");
let activeIndex = 0;

function updateBenefitSlider() {
  benefitCards.forEach((card, i) => {
    card.classList.remove("active", "left", "right");
    if (i === activeIndex) card.classList.add("active");
    else if (i === (activeIndex - 1 + benefitCards.length) % benefitCards.length) card.classList.add("left");
    else if (i === (activeIndex + 1) % benefitCards.length) card.classList.add("right");
  });
}

benefitCards.forEach((card, i) => {
  card.addEventListener("click", () => {
    activeIndex = i;
    updateBenefitSlider();
  });
});
if (benefitCards.length > 0) updateBenefitSlider();

// ==== Efectos hover en tarjetas ====
document.querySelectorAll('.plan-card').forEach(card => {
  card.addEventListener('mouseenter', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--y', `${e.clientY - rect.top}px`);
    card.classList.add('hover-animate');
  });
  card.addEventListener('mouseleave', () => card.classList.remove('hover-animate'));
});

// ==== Duplicar testimonios para efecto infinito ====
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".testimonial-track");
  if (track) {
    const cards = Array.from(track.children);
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      track.appendChild(clone);
    });
  }
});


const howData = {
  es: {
    paciente: {
      step1: { title: "Regístrate", text: "Configura tu perfil personal y elige tus objetivos emocionales y cognitivos." },
      step2: { title: "Realiza evaluaciones", text: "Completa pruebas neurológicas y emocionales guiadas por IA desde cualquier dispositivo." },
      step3: { title: "Recibe tus reportes", text: "Obtén análisis claros de tu bienestar y recomendaciones para mejorar día a día." }
    },
    profesional: {
      step1: { title: "Crea tu cuenta profesional", text: "Configura tu práctica, registra pacientes y activa tu panel clínico inteligente." },
      step2: { title: "Evalúa y gestiona", text: "Accede a evaluaciones avanzadas con métricas cognitivas precisas y seguimiento continuo." },
      step3: { title: "Optimiza tu consulta", text: "Aprovecha reportes automáticos y analítica clínica basada en IA para mejorar decisiones terapéuticas." }
    },
    empresarial: {
      step1: { title: "Solicita acceso a la API", text: "Conecta plataformas, dispositivos o aplicativos internos a AuraNeuro de forma segura." },
      step2: { title: "Integra tus dispositivos / apps", text: "Transfiere datos en tiempo real mediante nuestra API escalable y confiable." },
      step3: { title: "Obtén métricas organizacionales", text: "Accede a dashboards ejecutivos y análisis anonimizados para optimizar decisiones estratégicas." }
    }
  },

  en: {
    paciente: {
      step1: { title: "Sign up", text: "Configure your personal profile and set your emotional and cognitive goals." },
      step2: { title: "Take evaluations", text: "Complete AI-guided neurological and emotional tests from any device." },
      step3: { title: "Receive your reports", text: "Get clear insights into your well-being and personalized recommendations." }
    },
    profesional: {
      step1: { title: "Create your professional account", text: "Set up your practice, register patients, and activate your smart clinical dashboard." },
      step2: { title: "Evaluate and manage", text: "Access advanced evaluations with precise cognitive metrics and continuous tracking." },
      step3: { title: "Optimize your practice", text: "Leverage automatic reports and AI-powered clinical analytics." }
    },
    empresarial: {
      step1: { title: "Request API access", text: "Securely connect platforms, internal apps, or devices to AuraNeuro." },
      step2: { title: "Integrate your technology", text: "Exchange real-time data through our scalable and reliable API." },
      step3: { title: "Get organizational insights", text: "Access executive dashboards and anonymized analytics to optimize decisions." }
    }
  }
};

// Variables
const icons = document.querySelectorAll(".how-icon");
const segments = ["paciente", "profesional", "empresarial"];
let currentSegment = "paciente";

// ===============================
// ACTUALIZAR CONTENIDO (idioma + segmento)
// ===============================
function updateHowContent(segment) {
  const lang = document.documentElement.lang || "es";
  const t = howData[lang][segment];

  document.querySelector("[data-key='how_step1_title']").textContent = t.step1.title;
  document.querySelector("[data-key='how_step1_text']").textContent = t.step1.text;

  document.querySelector("[data-key='how_step2_title']").textContent = t.step2.title;
  document.querySelector("[data-key='how_step2_text']").textContent = t.step2.text;

  document.querySelector("[data-key='how_step3_title']").textContent = t.step3.title;
  document.querySelector("[data-key='how_step3_text']").textContent = t.step3.text;

  // actualizar icono activo
  icons.forEach(btn => btn.classList.remove("active"));
  const activeBtn = document.querySelector(`.how-icon[data-target="${segment}"]`);
  if (activeBtn) activeBtn.classList.add("active");

  currentSegment = segment;
}

// ===============================
// CLICK en iconos (sin auto-rotación)
// ===============================
icons.forEach(btn => {
  btn.addEventListener("click", () => {
    const segment = btn.getAttribute("data-target");
    updateHowContent(segment);
  });
});
