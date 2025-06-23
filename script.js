// Menu móvil
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('nav ul');
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Smooth scrolling para enlaces del menú
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        navMenu.classList.remove('show');
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

// Animaciones al hacer scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Ejecutar al cargar la página

// Carrusel de productos
const initCarousel = () => {
    const carousel = document.createElement('div');
    carousel.className = 'products-carousel';
    carousel.innerHTML = `
        <div class="carousel-container" id="carouselContainer"></div>
        <div class="carousel-nav">
            <button class="carousel-btn" id="prevBtn"><i class="fas fa-chevron-left"></i></button>
            <button class="carousel-btn" id="nextBtn"><i class="fas fa-chevron-right"></i></button>
        </div>
    `;
    
    const productsSection = document.querySelector('.products-grid');
    productsSection.parentNode.insertBefore(carousel, productsSection);
    
    const carouselContainer = document.getElementById('carouselContainer');
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        const clone = product.cloneNode(true);
        clone.style.minWidth = '250px';
        clone.style.margin = '0 1rem';
        carouselContainer.appendChild(clone);
    });
    
    let currentIndex = 0;
    const itemWidth = 250 + 32; // Ancho producto + margen
    const visibleItems = Math.min(4, Math.floor(window.innerWidth / itemWidth));
    const totalItems = products.length;
    
    const updateCarousel = () => {
        const offset = -currentIndex * itemWidth;
        carouselContainer.style.transform = `translateX(${offset}px)`;
    };
    
    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentIndex < totalItems - visibleItems) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    updateCarousel();
};

// Filtrado de productos
const initProductFilters = () => {
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'product-filters';
    filtersContainer.innerHTML = `
        <button class="filter-btn active" data-filter="all">Todos</button>
        <button class="filter-btn" data-filter="vestidos">Vestidos</button>
        <button class="filter-btn" data-filter="blusas">Blusas</button>
        <button class="filter-btn" data-filter="pantalones">Pantalones</button>
        <button class="filter-btn" data-filter="chaquetas">Chaquetas</button>
    `;
    
    const productsSection = document.querySelector('.products');
    productsSection.insertBefore(filtersContainer, productsSection.querySelector('.products-grid'));
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón clickeado
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            products.forEach(product => {
                const productCategory = product.querySelector('h3').textContent.toLowerCase();
                
                if (filter === 'all' || productCategory.includes(filter)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });
};

// Modal para productos
const initProductModals = () => {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        product.style.cursor = 'pointer';
        product.addEventListener('click', () => {
            const productName = product.querySelector('h3').textContent;
            const productPrice = product.querySelector('.price').textContent;
            const productImage = product.querySelector('img').src;
            
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
                        <div style="flex: 1; min-width: 250px;">
                            <img src="${productImage}" alt="${productName}" style="width: 100%; border-radius: 10px;">
                        </div>
                        <div style="flex: 1; min-width: 250px;">
                            <h2>${productName}</h2>
                            <p class="price" style="font-size: 1.5rem; color: var(--primary); margin: 1rem 0;">${productPrice}</p>
                            <p>Descripción del producto. Materiales, tallas disponibles y detalles especiales.</p>
                            <a href="https://wa.me/51987654321?text=Estoy%20interesado%20en%20el%20producto%3A%20${encodeURIComponent(productName)}%20${encodeURIComponent(productPrice)}" 
                               class="btn" 
                               target="_blank"
                               style="display: inline-block; margin-top: 1rem;">
                                <i class="fab fa-whatsapp"></i> Consultar por WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            modal.style.display = 'flex';
            
            // Cerrar modal
            modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.style.display = 'none';
                setTimeout(() => modal.remove(), 500);
            });
            
            // Cerrar al hacer clic fuera del contenido
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    setTimeout(() => modal.remove(), 500);
                }
            });
        });
    });
};

// Validación de formulario (continuación)
const validateForm = () => {
    const form = document.querySelector('form');
    const toast = document.querySelector('.toast');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
            
            if (nombre === '' || email === '' || mensaje === '') {
                showToast('Por favor complete todos los campos', 'error');
                return;
            }
            
            if (!email.includes('@') || !email.includes('.')) {
                showToast('Por favor ingrese un email válido', 'error');
                return;
            }
            
            // Simular envío
            showToast('Mensaje enviado con éxito. Nos pondremos en contacto pronto.', 'success');
            form.reset();
            
            // En producción, aquí iría la lógica para enviar el formulario
            // fetch('tu-endpoint', {
            //     method: 'POST',
            //     body: JSON.stringify({ nombre, email, mensaje }),
            //     headers: { 'Content-Type': 'application/json' }
            // })
            // .then(response => response.json())
            // .then(data => showToast('Mensaje enviado', 'success'))
            // .catch(error => showToast('Error al enviar', 'error'));
        });
    }
};
        
// Mostrar toast/notificación
const showToast = (message, type = 'info') => {
    const toast = document.querySelector('.toast');
    toast.textContent = message;
    toast.style.display = 'block';
    
    // Cambiar color según tipo
    if (type === 'error') {
        toast.style.background = '#ff4444';
    } else if (type === 'success') {
        toast.style.background = '#00C851';
    } else {
        toast.style.background = 'var(--primary)';
    }
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
};

// Inicializar todo al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initProductFilters();
    initProductModals();
    validateForm();
    
    // Evento para el botón de WhatsApp
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            // Aquí puedes agregar tracking si es necesario
            console.log('WhatsApp button clicked');
        });
    }
});

// Redimensionamiento de ventana - Actualizar carrusel
window.addEventListener('resize', () => {
    // Puedes agregar más lógica de responsive aquí si es necesario
    const carouselContainer = document.getElementById('carouselContainer');
    if (carouselContainer) {
        const itemWidth = 250 + 32;
        const offset = -currentIndex * itemWidth;
        carouselContainer.style.transform = `translateX(${offset}px)`;
    }
});