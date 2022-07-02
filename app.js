const navSlide = () => 
{
    const tab = document.querySelector('.tab');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    tab.addEventListener('click', () => 
    {
        // Toggle navigation
        nav.classList.toggle('nav-active'); 
        
        // Link animation 
        navLinks.forEach((link, index) => 
        {
            if (link.style.animation)
            {
                link.style.animation = '';
            }
            else 
            {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        // Tab animation
        tab.classList.toggle('toggle');
    });
}

navSlide();