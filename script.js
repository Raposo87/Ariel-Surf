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

  // Função para buscar dados do clima
function fetchWeather() {
  // Coordenadas da Costa da Caparica, Portugal
  const lat = 38.6446;  // Latitude da Costa da Caparica
  const lon = -9.2357;  // Longitude da Costa da Caparica
  const apiKey = '82dbdac20e5e618b213c94fcc8287f14';
  const lang = 'pt';    // Idioma português (formato internacional)
  const units = 'metric'; // Celsius
  
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=${lang}`)
    .then(response => response.json())
    .then(data => {
      updateWeatherWidget(data);
    })
    .catch(error => {
      console.error('Erro ao buscar dados do clima:', error);
    });
}

// Função para atualizar o widget com os dados do clima
function updateWeatherWidget(data) {
  const tempElement = document.querySelector('.weather-temp');
  const descElement = document.querySelector('.weather-desc');
  const humidityElement = document.querySelector('.weather-humidity');
  const iconElement = document.querySelector('.weather-icon');
  
  if (data.main && data.weather && data.weather[0]) {
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const iconCode = data.weather[0].icon;
    
    tempElement.textContent = `${temp}°C`;
    descElement.textContent = description;
    humidityElement.textContent = `Umidade: ${humidity}%`;
    iconElement.src = `https://openweathermap.org/img/wn/${iconCode}.png`;
    iconElement.alt = description;
  }
}


// Buscar dados do clima quando a página carregar
document.addEventListener('DOMContentLoaded', fetchWeather);

// Atualizar a cada hora (3600000 ms)
setInterval(fetchWeather, 3600000);



// Função auxiliar para direção do vento
function getWindDirection(degrees) {
const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
const index = Math.round(degrees / 22.5) % 16;
return directions[index];
}


// menu hamburger
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.createElement('div');
  hamburger.className = 'hamburger';
  hamburger.innerHTML = '<div class="bar"></div><div class="bar"></div><div class="bar"></div>';
  
  const nav = document.getElementById('mainNav');
  nav.appendChild(hamburger);
  
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav-links').classList.toggle('active');
  });
});

// Forçar reprodução de vídeo no Safari
document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('video-header');
  
  // Tenta reproduzir o vídeo programaticamente
  function attemptPlay() {
    video.play().catch(error => {
      // Se falhar, tenta novamente após um pequeno atraso
      setTimeout(attemptPlay, 200);
    });
  }
  
  // Inicia a tentativa de reprodução
  attemptPlay();
  
  // Adiciona evento para tentar novamente quando o usuário interagir com a página
  document.addEventListener('click', attemptPlay);
  document.addEventListener('touchstart', attemptPlay);
});
