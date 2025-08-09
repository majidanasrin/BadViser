// Bad Advice Database
const badAdvice = {
    mild: [
        "Always eat dessert first. Life is uncertain, but cake is certain.",
        "Wear socks with sandals. Fashion is just a social construct anyway.",
        "Reply 'K' to all important messages. Brevity is the soul of wit.",
        "Put pineapple on everything, not just pizza. Controversy builds character.",
        "Start every conversation with 'Actually...' People love being corrected.",
        "Use Comic Sans for all professional documents. Stand out from the crowd!",
        "Always take the elevator for one floor. Why waste energy on stairs?",
        "Text your ex at 3 AM. They're probably awake thinking about you too.",
        "Wear white to someone else's wedding. You'll look angelic!",
        "Put ketchup on expensive steak. Enhance those flavors!",
        "Always arrive fashionably late. Make an entrance!",
        "Use your phone flashlight as a reading light in bed. So convenient!",
        "Microwave fish in the office break room. Share those delicious aromas!",
        "Always one-up people's stories. Show them how it's really done!",
        "Wear flip-flops to formal events. Comfort over conformity!"
    ],
    horrible: [
        "Quit your job to become a professional fortune cookie writer. The world needs your wisdom.",
        "Invest all your savings in a company that makes left-handed screwdrivers. Untapped market!",
        "Start a relationship with someone who doesn't like your favorite movie. Opposites attract, right?",
        "Move to a different country without learning the language. Gestures are universal!",
        "Adopt 47 cats. You can never have too much love in your life.",
        "Get a face tattoo of your current favorite meme. Timeless art!",
        "Challenge your boss to a dance-off during your performance review. Show initiative!",
        "Sell your car and buy a unicycle. Think of the environmental impact!",        
        "Start a food truck that only serves cereal. Breakfast is the most important meal!",
        "Propose on the first date. When you know, you know!",
        "Dye your hair a different color every week. Express your ever-changing personality!",
        "Only communicate through interpretive dance for a month. Actions speak louder than words!",
        "Buy a house next to an active volcano. Great views and natural heating!",
        "Start a band with your pets. They have such natural rhythm!",
        "Become a professional line-stander. People will pay for convenience!"
    ],
    catastrophic: [
        "Sell everything you own and invest in a time machine startup. The future is now!",
        "Challenge a bear to a wrestling match to assert dominance in the wilderness.",
        "Start a cult worshipping your favorite kitchen appliance. The toaster deserves recognition.",
        "Declare yourself emperor of your neighborhood. Democracy is overrated anyway.",
        "Build a rocket ship in your backyard using only household items. NASA started somewhere!",
        "Marry someone you met in a dream. True love transcends reality!",
        "Quit your job to become a professional cloud watcher. The sky's the limit!",
        "Start a war with the local squirrels. They've been plotting against you for years.",
        "Eat only foods that start with the letter 'Q' for the rest of your life. Quinoa forever!",
        "Become a hermit and only communicate through smoke signals. Return to simpler times!",
        "Challenge the sun to a staring contest. Show it who's boss!",
        "Start a business selling air in jars. Everyone needs to breathe!",
        "Declare your independence from gravity. Physics is just a theory anyway!",
        "Become best friends with your reflection. Finally, someone who truly understands you!",
        "Start a revolution against the concept of time. Clocks are oppressive!"
    ]
};

// Global variables
let currentAdvice = '';
let favorites = JSON.parse(localStorage.getItem('badviser-favorites')) || [];
let currentRating = 0;

// DOM elements
const adviceText = document.getElementById('advice-text');
const getAdviceBtn = document.getElementById('get-advice-btn');
const favoriteBtn = document.getElementById('favorite-btn');
const shareBtn = document.getElementById('share-btn');
const adviceLevel = document.getElementById('advice-level');
const ratingBtns = document.querySelectorAll('.rating-btn');
const favoritesSection = document.getElementById('favorites-section');
const favoritesList = document.getElementById('favorites-list');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    updateFavoritesDisplay();
    
    // Event listeners
    getAdviceBtn.addEventListener('click', generateAdvice);
    favoriteBtn.addEventListener('click', toggleFavorite);
    shareBtn.addEventListener('click', shareAdvice);
    
    // Rating buttons
    ratingBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            setRating(parseInt(this.dataset.rating));
        });
    });
    
    // Add some fun button animations
    addButtonAnimations();
});

// Generate random bad advice
function generateAdvice() {
    const level = adviceLevel.value;
    const adviceArray = badAdvice[level];
    const randomIndex = Math.floor(Math.random() * adviceArray.length);
    const newAdvice = adviceArray[randomIndex];
    
    // Fade out current advice
    adviceText.classList.add('fade-out');
    
    setTimeout(() => {
        currentAdvice = newAdvice;
        adviceText.textContent = currentAdvice;
        adviceText.classList.remove('fade-out');
        adviceText.classList.add('fade-in');
        
        // Reset rating and favorite status
        resetRating();
        updateFavoriteButton();
        
        // Add some button bounce
        getAdviceBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            getAdviceBtn.style.transform = '';
        }, 150);
    }, 250);
}

// Toggle favorite status
function toggleFavorite() {
    if (!currentAdvice) return;
    
    const favoriteIndex = favorites.findIndex(fav => fav.text === currentAdvice);
    
    if (favoriteIndex === -1) {
        // Add to favorites
        favorites.push({
            text: currentAdvice,
            level: adviceLevel.value,
            rating: currentRating,
            timestamp: Date.now()
        });
        
        // Add animation
        favoriteBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            favoriteBtn.style.transform = '';
        }, 200);
    } else {
        // Remove from favorites
        favorites.splice(favoriteIndex, 1);
    }
    
    localStorage.setItem('badviser-favorites', JSON.stringify(favorites));
    updateFavoriteButton();
    updateFavoritesDisplay();
}

// Update favorite button appearance
function updateFavoriteButton() {
    if (!currentAdvice) return;
    
    const isFavorited = favorites.some(fav => fav.text === currentAdvice);
    
    if (isFavorited) {
        favoriteBtn.classList.add('favorited');
        favoriteBtn.textContent = '⭐ Favorited';
    } else {
        favoriteBtn.classList.remove('favorited');
        favoriteBtn.textContent = '⭐ Favorite';
    }
}

// Set rating
function setRating(rating) {
    currentRating = rating;
    
    ratingBtns.forEach((btn, index) => {
        if (index < rating) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
    
    // Add bounce animation to selected rating
    ratingBtns[rating - 1].style.transform = 'scale(1.3)';
    setTimeout(() => {
        ratingBtns[rating - 1].style.transform = '';
    }, 200);
}

// Reset rating
function resetRating() {
    currentRating = 0;
    ratingBtns.forEach(btn => {
        btn.classList.remove('selected');
    });
}

// Share advice
function shareAdvice() {
    if (!currentAdvice) return;
    
    const shareText = `"${currentAdvice}" - Badviser\n\nGet your own bad advice at: ${window.location.href}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Bad Advice from Badviser',
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            // Show feedback
            const originalText = shareBtn.textContent;
            shareBtn.textContent = '📋 Copied!';
            shareBtn.style.background = 'rgba(76, 175, 80, 0.3)';
            
            setTimeout(() => {
                shareBtn.textContent = originalText;
                shareBtn.style.background = '';
            }, 2000);
        }).catch(() => {
            // If clipboard fails, show the text in an alert
            alert(shareText);
        });
    }
    
    // Add share button animation
    shareBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        shareBtn.style.transform = '';
    }, 150);
}

// Update favorites display
function updateFavoritesDisplay() {
    if (favorites.length === 0) {
        favoritesSection.style.display = 'none';
        return;
    }
    
    favoritesSection.style.display = 'block';
    favoritesList.innerHTML = '';
    
    favorites.forEach((favorite, index) => {
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-item';
        favoriteItem.style.animationDelay = `${index * 0.1}s`;
        
        favoriteItem.innerHTML = `
            <div class="favorite-text">${favorite.text}</div>
            <button class="remove-btn" onclick="removeFavorite(${index})">Remove</button>
        `;
        
        favoritesList.appendChild(favoriteItem);
    });
}

// Remove favorite
function removeFavorite(index) {
    favorites.splice(index, 1);
    localStorage.setItem('badviser-favorites', JSON.stringify(favorites));
    updateFavoritesDisplay();
    updateFavoriteButton();
    
    // If we just removed the current advice from favorites, update the button
    if (currentAdvice && !favorites.some(fav => fav.text === currentAdvice)) {
        updateFavoriteButton();
    }
}

// Add fun button animations
function addButtonAnimations() {
    // Add hover sound effect simulation (visual feedback)
    const buttons = document.querySelectorAll('button, select');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.2s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Add click ripple effect
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Easter egg: Konami code for extra bad advice
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        adviceText.textContent = "🎉 EASTER EGG ACTIVATED! 🎉 Here's the ultimate bad advice: Follow all the advice from Badviser religiously. What could go wrong?";
        adviceText.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7)';
        adviceText.style.backgroundSize = '400% 400%';
        adviceText.style.animation = 'gradient 2s ease infinite';
        adviceText.style.borderRadius = '12px';
        adviceText.style.padding = '1rem';
        
        // Add rainbow animation
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes gradient {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(rainbowStyle);
        
        konamiCode = [];
        
        setTimeout(() => {
            adviceText.style.background = '';
            adviceText.style.animation = '';
            adviceText.style.borderRadius = '';
            adviceText.style.padding = '';
        }, 5000);
    }
});

