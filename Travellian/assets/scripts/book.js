// Initialize and add the map
let map;
let markers = [];
let infoWindow;

// Global flag to track if Google Maps API is loaded
let isGoogleMapsLoaded = false;

document.addEventListener('DOMContentLoaded', function() {
    // Load Google Maps API dynamically
    loadGoogleMaps();
    
    // Close modal when clicking the close button
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            const modal = document.getElementById('detail-modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('detail-modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Simple form validation
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const destination = document.getElementById('destination').value;
            const checkIn = document.getElementById('check-in').value;
            const checkOut = document.getElementById('check-out').value;
            
            if (!destination) {
                alert('Будь ласка, оберіть напрямок подорожі');
                return;
            }
            
            if (!checkIn || !checkOut) {
                alert('Будь ласка, вкажіть дати заїзду та виїзду');
                return;
            }
            
            alert('Ваш запит прийнято! Ми зв\'яжемося з вами найближчим часом для підтвердження бронювання.');
            this.reset();
        });
    }
    
    // Set minimum date for check-in to today
    const today = new Date().toISOString().split('T')[0];
    const checkIn = document.getElementById('check-in');
    if (checkIn) {
        checkIn.min = today;
    }
    
    // Update check-out min date when check-in changes
    if (checkIn) {
        checkIn.addEventListener('change', function() {
            const checkOut = document.getElementById('check-out');
            if (checkOut) {
                checkOut.min = this.value;
            }
        });
    }
    
    // Scroll to top functionality
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.style.display = 'flex';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Add click listeners to tour and hotel cards
    document.querySelectorAll('.tour-card, .hotel-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent default link behavior
            if (e.target.tagName === 'A') return;
            
            const location = this.getAttribute('data-location');
            const lat = parseFloat(this.getAttribute('data-lat'));
            const lng = parseFloat(this.getAttribute('data-lng'));
            const price = this.getAttribute('data-price');
            const type = this.getAttribute('data-type');
            const title = this.querySelector('.tour-title, .hotel-title').textContent;
            const description = this.querySelector('.tour-description').textContent;
            const image = this.getAttribute('data-image');
            
            // Additional data based on type
            let duration = '';
            let features = '';
            let rating = '';
            
            if (type === 'тур') {
                duration = this.getAttribute('data-duration');
                features = this.getAttribute('data-features');
            } else if (type === 'готель') {
                rating = this.getAttribute('data-rating');
            }
            
            if (isGoogleMapsLoaded && typeof updateMap === 'function') {
                updateMap(location, lat, lng, price);
            }
            
            // Show detailed view
            showDetailedView(title, location, type, duration, rating, features, description, price, image);
        });
    });
});

function loadGoogleMaps() {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
        isGoogleMapsLoaded = true;
        initMap();
        return;
    }

    // Load Google Maps API with marker library
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDdsIKcHAC_EgvRadUiARc4hjslgMWA9Kk&callback=initMap&loading=async&libraries=marker';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

function initMap() {
    isGoogleMapsLoaded = true;
    
    // Default location (center of Europe)
    const defaultLocation = { lat: 50.4501, lng: 30.5234 };
    
    const mapElement = document.getElementById("map");
    if (!mapElement) {
        console.warn('Map element not found');
        return;
    }
    
    try {
        // The map, centered at default location
        map = new google.maps.Map(mapElement, {
            zoom: 4,
            center: defaultLocation,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#2b414f"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                }
            ]
        });
        
        // Create info window
        infoWindow = new google.maps.InfoWindow();
        
        // Add markers for all tours and hotels
        document.querySelectorAll('.tour-card, .hotel-card').forEach(card => {
            const location = card.getAttribute('data-location');
            const lat = parseFloat(card.getAttribute('data-lat'));
            const lng = parseFloat(card.getAttribute('data-lng'));
            const price = card.getAttribute('data-price');
            const type = card.getAttribute('data-type');
            const title = card.querySelector('.tour-title, .hotel-title').textContent;
            const description = card.querySelector('.tour-description').textContent;
            const image = card.getAttribute('data-image');
            
            // Additional data based on type
            let duration = '';
            let features = '';
            let rating = '';
            
            if (type === 'тур') {
                duration = card.getAttribute('data-duration');
                features = card.getAttribute('data-features');
            } else if (type === 'готель') {
                rating = card.getAttribute('data-rating');
            }
            
            // Use regular Marker instead of AdvancedMarkerElement for compatibility
            const marker = new google.maps.Marker({
                position: { lat: lat, lng: lng },
                map: map,
                title: title,
                icon: {
                    url: type === 'тур' ? 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                    scaledSize: new google.maps.Size(32, 32)
                }
            });
            
            // Create info window content
            const content = `
                <div class="map-info-window" style="max-width: 250px;">
                    <h3 style="margin: 0 0 10px 0; font-size: 16px;">${title}</h3>
                    <p style="margin: 5px 0; color: #666;"><i class="fas fa-map-marker-alt"></i> ${location}</p>
                    <p style="margin: 5px 0; font-size: 14px;">${description}</p>
                    <div class="tour-price" style="font-weight: bold; color: #FF7757; margin: 10px 0;">${price} грн</div>
                    <button class="btn" onclick="showDetailedView('${title.replace(/'/g, "\\'")}', '${location.replace(/'/g, "\\'")}', '${type}', '${duration}', '${rating}', '${features}', '${description.replace(/'/g, "\\'")}', '${price}', '${image}')" style="background: #FF7757; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Детальніше</button>
                </div>
            `;
            
            // Add click listener to marker
            marker.addListener('click', () => {
                infoWindow.setContent(content);
                infoWindow.open(map, marker);
                
                // Update location info with null checks
                const selectedLocation = document.getElementById('selected-location');
                const locationDetails = document.getElementById('location-details');
                
                if (selectedLocation) {
                    selectedLocation.textContent = location;
                }
                if (locationDetails) {
                    locationDetails.textContent = `Обраний напрямок: ${location}`;
                }
                
                // Update price and booking button
                const priceElement = document.getElementById('location-price');
                const bookButton = document.getElementById('book-from-map');
                
                if (priceElement) {
                    priceElement.textContent = price + ' грн';
                    priceElement.style.display = 'inline-block';
                }
                if (bookButton) {
                    bookButton.style.display = 'inline-block';
                }
            });
            
            markers.push(marker);
        });
        
        console.log('Map initialized successfully with', markers.length, 'markers');
    } catch (error) {
        console.error('Error initializing Google Maps:', error);
    }
}
    
function updateMap(location, lat, lng, price) {
    if (!map || !isGoogleMapsLoaded) return;
    
    // Center map on the selected location
    map.setCenter({ lat: lat, lng: lng });
    map.setZoom(12);
    
    // Update location info with null checks
    const selectedLocation = document.getElementById('selected-location');
    const locationDetails = document.getElementById('location-details');
    
    if (selectedLocation) {
        selectedLocation.textContent = location;
    }
    if (locationDetails) {
        locationDetails.textContent = `Обраний напрямок: ${location}`;
    }
    
    // Update price and booking button
    const priceElement = document.getElementById('location-price');
    const bookButton = document.getElementById('book-from-map');
    
    if (priceElement) {
        priceElement.textContent = price + ' грн';
        priceElement.style.display = 'inline-block';
    }
    if (bookButton) {
        bookButton.style.display = 'inline-block';
    }
}
    
function showDetailedView(title, location, type, duration, rating, features, description, price, image) {
    const modal = document.getElementById('detail-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalLocation = document.getElementById('modal-location');
    const modalType = document.getElementById('modal-type');
    const modalDuration = document.getElementById('modal-duration');
    const modalRating = document.getElementById('modal-rating');
    const modalFeatures = document.getElementById('modal-features');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');
    const modalImage = document.getElementById('modal-image');
    
    if (!modal || !modalTitle) {
        console.warn('Modal elements not found');
        return;
    }
    
    // Set modal content
    modalTitle.textContent = title;
    if (modalLocation) modalLocation.textContent = location;
    if (modalType) modalType.textContent = type === 'тур' ? 'Тур' : 'Готель';
    if (modalDescription) modalDescription.textContent = description;
    if (modalPrice) modalPrice.textContent = price + (type === 'готель' ? ' грн/ніч' : ' грн');
    if (modalImage) modalImage.style.backgroundImage = `url('${image}')`;
    
    // Set optional fields - show/hide based on availability
    const durationItem = modalDuration ? modalDuration.parentElement : null;
    const ratingItem = modalRating ? modalRating.parentElement : null;
    const featuresItem = modalFeatures ? modalFeatures.parentElement : null;
    
    if (duration && duration.trim() !== '' && durationItem) {
        modalDuration.textContent = duration;
        durationItem.style.display = 'flex';
    } else if (durationItem) {
        durationItem.style.display = 'none';
    }
    
    if (rating && rating.trim() !== '' && ratingItem) {
        modalRating.textContent = rating + ' зірок';
        ratingItem.style.display = 'flex';
    } else if (ratingItem) {
        ratingItem.style.display = 'none';
    }
    
    if (features && features.trim() !== '' && featuresItem) {
        modalFeatures.textContent = features;
        featuresItem.style.display = 'flex';
    } else if (featuresItem) {
        featuresItem.style.display = 'none';
    }
    
    // Show modal
    modal.style.display = 'block';
}