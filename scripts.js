document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const passwordInput = document.getElementById('password-input');
    const passwordSubmit = document.getElementById('password-submit');
    const passwordError = document.getElementById('password-error');
    const passwordSteps = document.querySelectorAll('.password-step');
    const passwordHint = document.querySelector('.password-hint');
    const loginSection = document.getElementById('login-section');
    const typewriterSection = document.getElementById('typewriter-section');
    const mainContent = document.getElementById('main-content');
    const typewriterText = document.getElementById('typewriter-text');
    const polaroids = document.querySelectorAll('.polaroid');
    const revealButton = document.getElementById('reveal-surprise');
    const surpriseContent = document.getElementById('surprise-content');
    const timelineElements = document.querySelectorAll('.milestone');
    
    // Master password for testing
    const masterPassword = '$';
    
    // Password stages configuration
    const passwordStages = [
        { password: 'soup', hint: 'Hint: What I call your eye color' },
        { password: 'bug', hint: 'Hint: My pet name for you' },
        { password: '5 foot 1', hint: 'Hint: The height you actually are (not what you may claim to be)' },
        { password: 'sushi', hint: 'Hint: Your favorite dinner food' },
        { password: 'oodles', hint: 'Hint: The amount I love you' }
    ];
    
    // State tracking
    let currentStage = 0;
    let currentPolaroid = 0;
    
    // Add shake animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .shake {
            animation: shake 0.5s;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize password events
    if (passwordSubmit) {
        passwordSubmit.addEventListener('click', checkPassword);
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    }
    
    // Setup polaroid rotation
    if (polaroids && polaroids.length > 0) {
        // Ensure the first polaroid is active
        polaroids[0].classList.add('active');
        
        // Rotate polaroids every 4 seconds
        setInterval(function() {
            // Hide current polaroid
            polaroids[currentPolaroid].classList.remove('active');
            
            // Move to next polaroid
            currentPolaroid = (currentPolaroid + 1) % polaroids.length;
            
            // Show new polaroid
            polaroids[currentPolaroid].classList.add('active');
        }, 4000);
    }
    
    // Setup surprise reveal
    if (revealButton) {
        revealButton.addEventListener('click', function() {
            // Hide button and show content
            revealButton.style.display = 'none';
            if (surpriseContent) {
                surpriseContent.classList.remove('hidden');
                
                // Create confetti effect
                createConfetti();
                
                // Scroll to the surprise section
                surpriseContent.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Password check function
    function checkPassword() {
        const enteredPassword = passwordInput.value.trim();
        const enteredPasswordLower = enteredPassword.toLowerCase();
        const correctPassword = passwordStages[currentStage].password.toLowerCase();
        
        // Check for master password first
        if (enteredPassword === masterPassword) {
            // Master password entered, skip all stages
            loginSection.classList.remove('active');
            typewriterSection.classList.add('active');
            
            // Start the typewriter effect after a short delay
            setTimeout(typewriterEffect, 500);
            return;
        }
        
        if (enteredPasswordLower === correctPassword) {
            // Correct password
            passwordInput.value = '';
            passwordError.style.display = 'none';
            
            // Move to next stage
            currentStage++;
            
            if (currentStage < passwordStages.length) {
                // Update to next password stage
                passwordSteps[currentStage].classList.add('active');
                passwordHint.textContent = passwordStages[currentStage].hint;
                
                // Show success message briefly
                passwordError.textContent = 'Correct! Moving to the next password...';
                passwordError.style.color = 'green';
                passwordError.style.display = 'block';
                
                setTimeout(function() {
                    passwordError.style.display = 'none';
                }, 2000);
            } else {
                // All passwords complete, show typewriter intro
                loginSection.classList.remove('active');
                typewriterSection.classList.add('active');
                
                // Start the typewriter effect after a short delay
                setTimeout(typewriterEffect, 500);
            }
        } else {
            // Wrong password
            passwordError.textContent = 'Sorry, that\'s not correct. Try again!';
            passwordError.style.color = '#e74c3c';
            passwordError.style.display = 'block';
            
            // Shake animation
            passwordInput.classList.add('shake');
            setTimeout(function() {
                passwordInput.classList.remove('shake');
            }, 500);
        }
    }
    
    function typewriterEffect() {
        const typewriterElement = document.getElementById('typewriter-text');
        if (!typewriterElement) return;
    
        typewriterElement.textContent = '';
    
        const cursor = document.createElement('span');
        cursor.classList.add('cursor');
        typewriterElement.appendChild(cursor);
    
        const segments = [
            "Hello my beautyful", { backspace: 9 }, "beautiful Girl,\n\n",
            "I wanted to make somesomething", { backspace: 13 }, "something special for our 5 year anniversary.\n\n",
            "It's been an incredible 5 years gogether", { backspace: 8 }, "together, and I wanted to make something that shows the journey we've been on.\n\n",
            "And the one we're about to start.\n\n",
            "This site is for you, a place to remember all we've done together,\n",
            "all the things I somehow endure", { backspace: 14 }, "love about you,\n",
            "and goals for our future together.\n\n",
            "I put a lot of thought into creating this website just for you. I hope you know how much I love the gym", { backspace: 7 }, "you <3.\n\n",
            "It's crazy how quickly time has passed. It's like yesterday we were at Nic's house,\n",
            "and yet it feels like we've known each other for fucking ever", { backspace: 13 }, "ever.\n\n",
            "Every day with you i get a boner", { backspace: 12 }, "s a blessing, and I can't wait to see what the next 5 years (and many more) hold for us.\n\n",
            "Please scroll down when you're ready to see some things I've put together.\n",
            "to celebrate our love.\n\n",
            "Happy 5 year anniversary, my bug. You mean everything to me."
        ];
    
        let index = 0;
        let subIndex = 0;
        let backspaceRemaining = 0;
    
        function typeSegment() {
            if (index >= segments.length) {
                finishTyping();
                return;
            }
    
            const segment = segments[index];
    
            // Typing text
            if (typeof segment === 'string') {
                const char = segment.charAt(subIndex);
    
                if (char === '\n') {
                    typewriterElement.insertBefore(document.createElement('br'), cursor);
                } else {
                    typewriterElement.insertBefore(document.createTextNode(char), cursor);
                }
    
                subIndex++;
    
                if (subIndex < segment.length) {
                    setTimeout(typeSegment, 40);
                } else {
                    subIndex = 0;
                    index++;
                    setTimeout(typeSegment, 300);
                }
    
            // Backspacing
            } else if (typeof segment === 'object' && segment.backspace) {
                backspaceRemaining = segment.backspace;
                backspace();
            }
        }
    
        function backspace() {
            if (backspaceRemaining <= 0) {
                index++;
                setTimeout(typeSegment, 300);
                return;
            }
    
            const lastNode = cursor.previousSibling;
            if (lastNode) {
                if (lastNode.nodeType === Node.TEXT_NODE) {
                    lastNode.textContent = lastNode.textContent.slice(0, -1);
                    if (lastNode.textContent.length === 0) {
                        typewriterElement.removeChild(lastNode);
                    }
                } else if (lastNode.nodeName === 'BR') {
                    typewriterElement.removeChild(lastNode);
                }
            }
    
            backspaceRemaining--;
            setTimeout(backspace, 60);
        }
    
        function finishTyping() {
            setTimeout(() => {
                const typewriterSection = document.getElementById('typewriter-section');
                const mainContent = document.getElementById('main-content');
    
                if (typewriterSection && mainContent) {
                    typewriterSection.classList.remove('active');
                    mainContent.classList.add('active');
                    setTimeout(animateMessages, 500);
                    setTimeout(initPhotoGallery, 1000);
                    setTimeout(animateTimeline, 1500);
                }
            }, 1000);
        }
    
        setTimeout(typeSegment, 500);
    }
    
    // Message animation function
    function animateMessages() {
        const messages = document.querySelectorAll('.message-bubble');
        const messageSection = document.getElementById('text-message');
        
        if (messages.length === 0 || !messageSection) return;
        
        // Initially show only the first message
        let currentMessageIndex = 0;
        messages[currentMessageIndex].style.display = 'block';
        messages[currentMessageIndex].style.animation = 'fadeIn 0.5s forwards';
        currentMessageIndex++;
        
        // Add click listener to the message section
        messageSection.addEventListener('click', function() {
            // If we have more messages to display
            if (currentMessageIndex < messages.length) {
                messages[currentMessageIndex].style.display = 'block';
                messages[currentMessageIndex].style.animation = 'fadeIn 0.5s forwards';
                currentMessageIndex++;
                
                // Scroll to the newest message
                const messageBody = document.querySelector('.message-body');
                if (messageBody) {
                    messageBody.scrollTop = messageBody.scrollHeight;
                }
            }
        });
        
        // Add visual cue that section is clickable
        messageSection.style.cursor = 'pointer';
        
        // Add a hint for the user
        const messageContainer = document.querySelector('.message-container');
        if (messageContainer) {
            const clickHint = document.createElement('div');
            clickHint.className = 'click-hint';
            clickHint.innerHTML = '<p>Click to continue conversation...</p>';
            clickHint.style.textAlign = 'center';
            clickHint.style.marginTop = '0.5rem';
            clickHint.style.fontSize = '0.9rem';
            clickHint.style.color = '#666';
            clickHint.style.fontStyle = 'italic';
            messageContainer.appendChild(clickHint);
        }
    }
    
    // Initialize photo gallery
    function initPhotoGallery() {
        const photoGallery = document.getElementById('photo-gallery');
        if (!photoGallery) return;

        // Create 36 image elements from the Collage folder
        for (let i = 1; i <= 36; i++) {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            
            const img = document.createElement('div');
            img.className = 'photo-image';
            img.style.backgroundImage = `url('Collage/photo${i}.jpg')`;
            
            photoItem.appendChild(img);
            photoGallery.appendChild(photoItem);
        }

        // Initialize horizontal scrolling effect
        const scrollContainer = document.querySelector('.photo-container');
        if (scrollContainer) {
            // Mouse wheel scrolling
            scrollContainer.addEventListener('wheel', (evt) => {
                evt.preventDefault();
                scrollContainer.scrollLeft += evt.deltaY;
            });
            
            // Button controls
            const scrollLeftBtn = document.getElementById('scroll-left');
            const scrollRightBtn = document.getElementById('scroll-right');
            
            if (scrollLeftBtn) {
                scrollLeftBtn.addEventListener('click', () => {
                    scrollContainer.scrollBy({
                        left: -300,
                        behavior: 'smooth'
                    });
                });
            }
            
            if (scrollRightBtn) {
                scrollRightBtn.addEventListener('click', () => {
                    scrollContainer.scrollBy({
                        left: 300,
                        behavior: 'smooth'
                    });
                });
            }
            
            // Add keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (isElementInViewport(scrollContainer)) {
                    if (e.key === 'ArrowLeft') {
                        scrollContainer.scrollBy({
                            left: -100,
                            behavior: 'smooth'
                        });
                    } else if (e.key === 'ArrowRight') {
                        scrollContainer.scrollBy({
                            left: 100,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        }
    }
    
    // Animate timeline
    function animateTimeline() {
        if (!timelineElements || timelineElements.length === 0) return;
        
        // Check if element is in viewport
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Animate elements that are in viewport
        function animateVisibleElements() {
            timelineElements.forEach(function(element, index) {
                if (isElementInViewport(element)) {
                    setTimeout(function() {
                        element.classList.add('animated');
                    }, index * 200);
                }
            });
        }
        
        // Initial check
        animateVisibleElements();
        
        // Check on scroll
        window.addEventListener('scroll', animateVisibleElements);
    }
    
    // Create confetti function
    function createConfetti() {
        const confettiContainer = document.querySelector('.confetti-container');
        if (!confettiContainer) return;
        
        const colors = ['#d8a7b1', '#6d8b74', '#e9dac1', '#6c5ce7', '#f9f9f9'];
        
        // Create 150 confetti pieces
        for (let i = 0; i < 250; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random properties
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.opacity = Math.random() + 0.5;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            
            // Random animation duration
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            
            confettiContainer.appendChild(confetti);
        }
        
        // Remove confetti after animation completes
        setTimeout(function() {
            confettiContainer.innerHTML = '';
        }, 6000);
    }
});