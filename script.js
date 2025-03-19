 // Script para navegação fixa
 window.addEventListener('scroll', function() {
  const nav = document.getElementById('mainNav');
  if (window.scrollY > 100) {
      nav.classList.add('scrolled');
  } else {
      nav.classList.remove('scrolled');
  }
});

// Script para o carrossel
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const indicators = document.querySelectorAll('.indicator');
  
  let currentIndex = 0;
  const slideCount = slides.length;
  
  // Funções do carrossel
  function updateCarousel() {
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      // Atualizar indicadores
      indicators.forEach((indicator, index) => {
          if (index === currentIndex) {
              indicator.classList.add('active');
          } else {
              indicator.classList.remove('active');
          }
      });
  }
  
  function nextSlide() {
      currentIndex = (currentIndex + 1) % slideCount;
      updateCarousel();
  }
  
  function prevSlide() {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      updateCarousel();
  }
  
  // Adicionar eventos aos botões
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  // Adicionar eventos aos indicadores
  indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
          currentIndex = index;
          updateCarousel();
      });
  });
  
  // Automação do carrossel
  setInterval(nextSlide, 5000);
  
  // Scroll suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 70,
                  behavior: 'smooth'
              });
          }
      });
  });
});

// Funcionalidade para os modais de preços
document.addEventListener('DOMContentLoaded', function() {
    // Associar os botões aos modais correspondentes
    const modalButtons = [
      { btnSelector: '#servicos .work-item:nth-child(1) .btn', modalId: 'modal-aulas-particulares' },
      { btnSelector: '#servicos .work-item:nth-child(2) .btn', modalId: 'modal-aulas-grupo' },
      { btnSelector: '#servicos .work-item:nth-child(3) .btn', modalId: 'modal-surf-camps' },
      { btnSelector: '#servicos .work-item:nth-child(4) .btn', modalId: 'modal-surf-trips' }
    ];
    
    // Configurar cada botão
    modalButtons.forEach(config => {
      const btn = document.querySelector(config.btnSelector);
      const modal = document.getElementById(config.modalId);
      
      if (btn && modal) {
        // Prevenir o comportamento padrão (abrir WhatsApp)
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          openModal(modal);
        });
      }
    });
    
    // Configurar os botões de fechar para todos os modais
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        const modal = this.closest('.price-modal');
        closeModal(modal);
      });
    });
    
    // Fechar o modal clicando fora dele
    const modals = document.querySelectorAll('.price-modal');
    modals.forEach(modal => {
      modal.addEventListener('click', function(e) {
        if (e.target === this) {
          closeModal(this);
        }
      });
    });
    
    // Funções para abrir e fechar o modal
    function openModal(modal) {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden'; // Impedir rolagem da página
      
      // Fechar modal com a tecla ESC
      document.addEventListener('keydown', function escKeyClose(e) {
        if (e.key === 'Escape') {
          closeModal(modal);
          document.removeEventListener('keydown', escKeyClose);
        }
      });
    }
    
    function closeModal(modal) {
      modal.classList.remove('show');
      document.body.style.overflow = ''; // Restaurar rolagem da página
    }
  });