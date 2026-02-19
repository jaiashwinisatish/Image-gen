document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking Puter.js...');
    console.log('Puter object:', typeof puter !== 'undefined' ? 'Available' : 'Not available');
    
    const form = document.getElementById('generate-image-form');
    const input = document.getElementById('input-value');
    const modelSelect = document.getElementById('model-select');
    const loader = document.getElementById('loader');
    const imageContainer = document.getElementById('images-visible');
    const generatedImage = document.getElementById('generated-image');
    const errorMessage = document.getElementById('error-message');
    const downloadBtn = document.getElementById('download-btn');
    const historyGallery = document.getElementById('history-gallery');
    const themeToggle = document.getElementById('theme-toggle');
    const musicToggle = document.getElementById('music-toggle');

    let imageHistory = [];
    let isMusicPlaying = false;

    // Initialize horror ambient music
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
    audio.loop = true;
    audio.volume = 0.2;

    // Horror sound effects
    const whisperSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
    whisperSound.volume = 0.3;

    const heartbeatSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
    heartbeatSound.volume = 0.4;

    // Music toggle functionality
    musicToggle.addEventListener('click', function() {
        if (isMusicPlaying) {
            audio.pause();
            musicToggle.classList.add('muted');
            musicToggle.textContent = '🔇';
            isMusicPlaying = false;
        } else {
            audio.play().catch(e => console.log('Audio play failed:', e));
            musicToggle.classList.remove('muted');
            musicToggle.textContent = '🎵';
            isMusicPlaying = true;
        }
    });

    // Try to autoplay music (will be blocked by most browsers)
    audio.play().then(() => {
        isMusicPlaying = true;
        musicToggle.classList.remove('muted');
        musicToggle.textContent = '🎵';
    }).catch(e => {
        musicToggle.classList.add('muted');
        musicToggle.textContent = '🔇';
    });

    // Screen shake function
    function triggerScreenShake() {
        document.body.classList.add('screen-shake');
        setTimeout(() => {
            document.body.classList.remove('screen-shake');
        }, 500);
    }

    // Random screen shake for tension
    setInterval(() => {
        if (Math.random() > 0.7) {
            triggerScreenShake();
        }
    }, 15000);

    // Jump Scare Ghost Randomization
    function randomizeJumpScare() {
        const jumpScareGhost = document.querySelector('.jump-scare-ghost');
        if (jumpScareGhost) {
            // Random position (center area)
            const positions = [
                { top: '40%', left: '30%' },
                { top: '60%', left: '70%' },
                { top: '35%', left: '60%' },
                { top: '55%', left: '40%' },
                { top: '45%', left: '50%' }
            ];
            
            const randomPos = positions[Math.floor(Math.random() * positions.length)];
            jumpScareGhost.style.top = randomPos.top;
            jumpScareGhost.style.left = randomPos.left;
            
            // Random animation duration (8-15 seconds)
            const randomDuration = 8 + Math.random() * 7;
            jumpScareGhost.style.animationDuration = `${randomDuration}s`;
            
            // Random delay
            const randomDelay = Math.random() * 5;
            jumpScareGhost.style.animationDelay = `${randomDelay}s`;
        }
    }

    // Initialize jump scare randomization
    randomizeJumpScare();
    
    // Re-randomize every 30-60 seconds
    setInterval(() => {
        randomizeJumpScare();
    }, 30000 + Math.random() * 30000);

    // Horror Cursor Randomization
    function randomizeCursor() {
        const body = document.body;
        const cursorClasses = ['horror-cursor-1', 'horror-cursor-2', 'horror-cursor-3', 'horror-cursor-4', 'horror-cursor-5', 'horror-cursor-6', 'horror-cursor-7', 'horror-cursor-8'];
        
        // Remove all cursor classes
        cursorClasses.forEach(cls => body.classList.remove(cls));
        
        // Add random cursor class
        const randomCursor = cursorClasses[Math.floor(Math.random() * cursorClasses.length)];
        body.classList.add(randomCursor);
        
        console.log('Changed to cursor:', randomCursor);
    }

    // Initialize cursor randomization
    randomizeCursor();
    
    // Randomly change cursor every 3-8 seconds for 0.5 seconds
    setInterval(() => {
        const body = document.body;
        const originalClasses = Array.from(body.classList).filter(cls => cls.startsWith('horror-cursor-'));
        
        // Temporarily change to a random cursor
        const cursorClasses = ['horror-cursor-1', 'horror-cursor-2', 'horror-cursor-3', 'horror-cursor-4', 'horror-cursor-5', 'horror-cursor-6', 'horror-cursor-7', 'horror-cursor-8'];
        const randomCursor = cursorClasses[Math.floor(Math.random() * cursorClasses.length)];
        
        // Remove current cursor classes
        originalClasses.forEach(cls => body.classList.remove(cls));
        
        // Add temporary cursor
        body.classList.add(randomCursor);
        
        // Revert to original after 0.5 seconds
        setTimeout(() => {
            body.classList.remove(randomCursor);
            if (originalClasses.length > 0) {
                body.classList.add(originalClasses[0]);
            }
        }, 500);
    }, 3000 + Math.random() * 5000);

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const prompt = input.value.trim();
        console.log('Form submitted with prompt:', prompt);
        
        if (!prompt) {
            console.log('Empty prompt, returning');
            return;
        }

        console.log('Starting image generation process...');
        showLoader();
        hideError();
        hideImage();

        // Play whisper sound on generate
        whisperSound.currentTime = 0;
        whisperSound.play().catch(e => console.log('Whisper sound failed:', e));

        // Start heartbeat sound
        heartbeatSound.currentTime = 0;
        heartbeatSound.play().catch(e => console.log('Heartbeat sound failed:', e));

        // Trigger screen shake
        triggerScreenShake();

        // Use the simple direct Pollinations method
        generateWithPollinations(prompt);
    });

    // Fallback function using Pollinations AI
    function generateWithPollinations(prompt) {
        console.log('Trying Pollinations AI with prompt:', prompt);
        
        // Use the simplest possible Pollinations URL - no API needed
        const encodedPrompt = encodeURIComponent(prompt);
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`;
        
        console.log('Generated image URL:', imageUrl);
        
        // Add timeout to prevent infinite loading
        let timeoutId = setTimeout(() => {
            console.log('Image loading timed out');
            showError('Image generation is taking too long. Please try again.');
            hideLoader();
            heartbeatSound.pause();
        }, 30000); // 30 second timeout
        
        // Create image element to test if URL works
        const img = new Image();
        img.onload = function() {
            console.log('Image loaded successfully from Pollinations');
            clearTimeout(timeoutId);
            displayImage(imageUrl, prompt);
            addToHistory(imageUrl, prompt);
            hideLoader();
            heartbeatSound.pause();
            
            // Trigger screen shake on success
            triggerScreenShake();
        };
        img.onerror = function() {
            console.error('Failed to load image from Pollinations URL');
            clearTimeout(timeoutId);
            showError('Failed to generate image. Please try a different prompt.');
            hideLoader();
            heartbeatSound.pause();
        };
        img.src = imageUrl;
    }

    // Fallback function using Hugging Face API
    function generateWithHuggingFace(prompt, model) {
        console.log('Trying Hugging Face API with prompt:', prompt);
        
        // Use a simple free model from Hugging Face
        const hfModel = "stabilityai/stable-diffusion-2-1";
        const apiUrl = `https://api-inference.huggingface.co/models/${hfModel}`;
        
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: {
                    num_inference_steps: 20,
                    guidance_scale: 7.5
                }
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.blob();
        })
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                ctx.drawImage(img, 0, 0);
                
                const dataUrl = canvas.toDataURL('image/png');
                displayImage(dataUrl, prompt);
                addToHistory(dataUrl, prompt);
                hideLoader();
                heartbeatSound.pause();
                URL.revokeObjectURL(url);
            };
            img.onerror = function() {
                showError('Failed to load generated image from Hugging Face');
                hideLoader();
                heartbeatSound.pause();
            };
            img.src = url;
        })
        .catch(error => {
            console.error('Hugging Face Error:', error);
            showError('All image generation methods failed. Please try again later.');
            hideLoader();
            heartbeatSound.pause();
        });
    }

    downloadBtn.addEventListener('click', function() {
        const imageUrl = generatedImage.src;
        
        // Handle both data URLs and regular URLs
        if (imageUrl.startsWith('data:')) {
            // For data URLs, create a blob and download
            fetch(imageUrl)
                .then(res => res.blob())
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `horror-ai-image-${Date.now()}.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                });
        } else {
            // For regular URLs
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = `horror-ai-image-${Date.now()}.png`;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });

    themeToggle.addEventListener('click', function() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
        
        // Trigger screen shake on theme change
        triggerScreenShake();
    });

    function showLoader() {
        loader.classList.remove('hidden');
        // Add heartbeat animation to loader text
        const loaderText = loader.querySelector('p');
        if (loaderText) {
            loaderText.classList.add('heartbeat');
        }
    }

    function hideLoader() {
        loader.classList.add('hidden');
        // Remove heartbeat animation from loader text
        const loaderText = loader.querySelector('p');
        if (loaderText) {
            loaderText.classList.remove('heartbeat');
        }
    }

    function showImage() {
        imageContainer.classList.remove('hidden');
    }

    function hideImage() {
        imageContainer.classList.add('hidden');
    }

    function displayImage(imageUrl, prompt) {
        generatedImage.src = imageUrl;
        generatedImage.alt = prompt;
        showImage();
        
        // Trigger screen shake on image display
        triggerScreenShake();
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
        
        // Trigger screen shake on error
        triggerScreenShake();
    }

    function hideError() {
        errorMessage.classList.add('hidden');
    }

    function addToHistory(imageUrl, prompt) {
        const historyItem = {
            url: imageUrl,
            prompt: prompt,
            timestamp: new Date().toISOString()
        };
        
        imageHistory.unshift(historyItem);
        if (imageHistory.length > 6) {
            imageHistory = imageHistory.slice(0, 6);
        }
        
        renderHistory();
    }

    function renderHistory() {
        historyGallery.innerHTML = '';
        
        imageHistory.forEach(item => {
            const historyElement = document.createElement('div');
            historyElement.className = 'history-item';
            historyElement.innerHTML = `
                <img src="${item.url}" alt="${item.prompt}" loading="lazy">
                <div class="history-prompt">${item.prompt.substring(0, 30)}...</div>
            `;
            
            historyElement.addEventListener('click', function() {
                displayImage(item.url, item.prompt);
                triggerScreenShake();
            });
            
            historyGallery.appendChild(historyElement);
        });
    }
});
