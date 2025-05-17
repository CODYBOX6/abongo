// Stripe Integration
class DonationForm {
    constructor() {
      this.form = document.getElementById('donation-form');
      if (this.form) this.init();
    }
  
    async init() {
      this.setupAmountButtons();
      await this.loadStripe();
      this.setupFormSubmit();
    }
  
    setupAmountButtons() {
      const buttons = document.querySelectorAll('.donation-amount-btn');
      const customInput = document.getElementById('custom-amount');
      
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          buttons.forEach(btn => btn.classList.remove('bg-primary', 'text-white'));
          button.classList.add('bg-primary', 'text-white');
          customInput.value = button.dataset.amount;
        });
      });
      
      customInput.addEventListener('input', () => {
        buttons.forEach(btn => btn.classList.remove('bg-primary', 'text-white'));
      });
    }
  
    async loadStripe() {
      if (typeof Stripe === 'undefined') {
        return new Promise(resolve => {
          const script = document.createElement('script');
          script.src = 'https://js.stripe.com/v3/';
          script.onload = () => resolve();
          document.head.appendChild(script);
        });
      }
      return Promise.resolve();
    }
  
    async setupFormSubmit() {
      this.form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const stripe = Stripe(import.meta.env.VITE_STRIPE_PK);
        const formData = new FormData(this.form);
        
        try {
          const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            body: formData
          });
          
          const { sessionId } = await response.json();
          await stripe.redirectToCheckout({ sessionId });
        } catch (error) {
          this.showError("Une erreur s'est produite. Veuillez réessayer.");
        }
      });
    }
  
    showError(message) {
      let errorContainer = this.form.querySelector('.error-message');
      if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.className = 'error-message text-secondary mt-4';
        errorContainer.setAttribute('role', 'alert');
        errorContainer.setAttribute('aria-live', 'assertive');
        this.form.appendChild(errorContainer);
      }
      errorContainer.textContent = message;
    }
  }
  
  // Mobile Menu
  class MobileMenu {
    constructor() {
      this.button = document.getElementById('mobile-menu-button');
      this.menu = document.getElementById('mobile-menu');
      if (this.button) this.init();
    }
  
    init() {
      this.button.addEventListener('click', () => {
        const expanded = this.button.getAttribute('aria-expanded') === 'true';
        this.button.setAttribute('aria-expanded', !expanded);
        this.menu.classList.toggle('hidden');
        this.menu.setAttribute('aria-hidden', expanded);
      });
    }
  }
  
  // Cookie Consent
  class CookieConsent {
    constructor() {
      this.banner = document.getElementById('cookie-banner');
      this.acceptBtn = document.getElementById('cookie-accept');
      this.rejectBtn = document.getElementById('cookie-reject');
      if (this.banner) this.init();
    }
  
    init() {
      if (!localStorage.getItem('cookieConsent')) {
        this.banner.classList.remove('hidden');
      }
  
      this.acceptBtn.addEventListener('click', () => this.handleConsent('accepted'));
      this.rejectBtn.addEventListener('click', () => this.handleConsent('rejected'));
    }
  
    handleConsent(decision) {
      localStorage.setItem('cookieConsent', decision);
      this.banner.classList.add('hidden');
      
      if (decision === 'accepted') {
        this.loadThirdPartyScripts();
      }
    }
  
    loadThirdPartyScripts() {
      // Load Stripe, GA, etc.
      const stripeScript = document.getElementById('stripe-js');
      if (stripeScript && !stripeScript.hasAttribute('src')) {
        stripeScript.setAttribute('src', stripeScript.getAttribute('data-src'));
      }
    }
  }
  
  // Galerie Photos
  class GaleriePhotos {
    constructor() {
      this.boutonVoirPlus = document.getElementById('voir-plus-photos');
      this.modal = document.getElementById('galerie-modal');
      this.boutonFermer = document.getElementById('fermer-galerie');
      this.galerieComplete = document.getElementById('galerie-complete');
    }

    init() {
      this.boutonVoirPlus.addEventListener('click', () => this.ouvrirGalerie());
      this.boutonFermer.addEventListener('click', () => this.fermerGalerie());
      
      // Fermer la galerie avec la touche Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
          this.fermerGalerie();
        }
      });
      
      // Fermer la galerie en cliquant à l'extérieur
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.fermerGalerie();
        }
      });
    }

    ouvrirGalerie() {
      // Simuler le chargement d'images supplémentaires
      // En production, ces données viendraient d'une API ou d'un fichier JSON
      const imagesSupplementaires = [
        {
          src: 'consultation-orl.webp',
          alt: 'Consultation ORL pour un enfant malentendant',
          legende: 'Consultation ORL pour un enfant malentendant à Douala (2024)'
        },
        {
          src: 'distribution-medicaments.webp',
          alt: 'Distribution de médicaments dans un dispensaire rural',
          legende: 'Distribution de médicaments dans un dispensaire rural (2023)'
        },
        {
          src: 'enfants-ecole.webp',
          alt: 'Enfants dans une école rénovée par l\'association',
          legende: 'Enfants dans une école rénovée par l\'association dans la région du Nord (2022)'
        },
        {
          src: 'formation-sanitaire.webp',
          alt: 'Formation sanitaire pour les villageois',
          legende: 'Formation sanitaire et prévention pour les villageois (2023)'
        },
        {
          src: 'remise-diplomes.webp',
          alt: 'Remise de diplômes pour les jeunes formés',
          legende: 'Remise de diplômes pour les jeunes formés aux métiers manuels (2024)'
        },
        {
          src: 'soins-medecin.webp',
          alt: 'Médecin bénévole prodiguant des soins',
          legende: 'Médecin bénévole prodiguant des soins dans un village isolé (2024)'
        },
        {
          src: 'visite-orphelinat.webp',
          alt: 'Visite dans un orphelinat soutenu par l\'association',
          legende: 'Visite dans un orphelinat soutenu par l\'association à Yaoundé (2023)'
        },
        {
          src: 'forage-eau.webp',
          alt: 'Installation d\'un forage d\'eau potable',
          legende: 'Installation d\'un forage d\'eau potable dans un village isolé (2023)'
        },
        {
          src: 'distribution-kits.webp',
          alt: 'Distribution de kits scolaires aux enfants',
          legende: 'Distribution de kits scolaires aux enfants défavorisés (2024)'
        }
      ];

      // Vider le contenu existant
      this.galerieComplete.innerHTML = '';
      
      // Ajouter les images de la galerie principale
      document.querySelectorAll('#galerie .image-overlay').forEach(imageElement => {
        const img = imageElement.querySelector('img');
        const legende = imageElement.querySelector('.absolute p')?.textContent || '';
        
        const clone = this.creerElementImage(img.src, img.alt, legende);
        this.galerieComplete.appendChild(clone);
      });
      
      // Ajouter les images supplémentaires
      imagesSupplementaires.forEach(image => {
        const element = this.creerElementImage(image.src, image.alt, image.legende);
        this.galerieComplete.appendChild(element);
      });

      // Afficher la modal
      this.modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Empêcher le défilement de la page
      
      // Mettre le focus sur le bouton de fermeture
      this.boutonFermer.focus();
    }

    creerElementImage(src, alt, legende) {
      const div = document.createElement('div');
      div.className = 'image-overlay overflow-hidden rounded-lg shadow-lg group relative';
      
      const img = document.createElement('img');
      img.src = src;
      img.alt = alt;
      img.className = 'w-full aspect-[4/3] object-cover';
      img.loading = 'lazy';
      img.decoding = 'async';
      
      const legendeDiv = document.createElement('div');
      legendeDiv.className = 'absolute inset-0 flex items-end p-4 bg-gradient-to-t from-primary/80 to-transparent';
      
      const p = document.createElement('p');
      p.className = 'text-white font-medium';
      p.textContent = legende;
      
      legendeDiv.appendChild(p);
      div.appendChild(img);
      div.appendChild(legendeDiv);
      
      return div;
    }

    fermerGalerie() {
      this.modal.classList.add('hidden');
      document.body.style.overflow = ''; // Restaurer le défilement
      this.boutonVoirPlus.focus(); // Remettre le focus sur le bouton d'ouverture
    }
  }

  // FAQ Accordion
  class FAQAccordion {
    constructor() {
      this.questions = document.querySelectorAll('.faq-question');
      if (this.questions.length) this.init();
    }

    init() {
      this.questions.forEach(question => {
        question.addEventListener('click', () => {
          const isExpanded = question.getAttribute('aria-expanded') === 'true';
          this.toggleQuestion(question, !isExpanded);
        });
        
        // Gestion du clavier
        question.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            this.toggleQuestion(question, !isExpanded);
          }
        });
      });
    }

    toggleQuestion(question, expand) {
      const answer = question.nextElementSibling;
      const icon = question.querySelector('.faq-icon');
      
      if (expand) {
        question.setAttribute('aria-expanded', 'true');
        answer.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
      } else {
        question.setAttribute('aria-expanded', 'false');
        answer.classList.add('hidden');
        icon.style.transform = 'rotate(0)';
      }
    }
  }

  // Initialize all components
  document.addEventListener('DOMContentLoaded', () => {
    new MobileMenu();
    new DonationForm();
    new CookieConsent();
    new GaleriePhotos();
    new FAQAccordion();
    
    // Load dynamic content
    if (document.getElementById('children-sponsored')) {
      fetch('/api/impact-stats')
        .then(res => res.json())
        .then(data => {
          document.getElementById('children-sponsored').textContent = data.children.toLocaleString();
          document.getElementById('villages-supported').textContent = data.villages;
        });
    }
  });
  
  // Accessibility functions
  export function changeFontSize(direction) {
    const html = document.documentElement;
    let currentSize = parseFloat(getComputedStyle(html).fontSize);
    
    if (direction === 'increase') {
      html.style.fontSize = (currentSize + 1) + 'px';
    } else if (direction === 'decrease') {
      html.style.fontSize = (currentSize - 1) + 'px';
    }
  }
  
  export function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
  }