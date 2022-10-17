/*============== SHOW MENU ==============*/
const  navMenu = document.getElementById('nav-menu'),
       navToggle = document.getElementById('nav-toggle'),
       navClose = document.getElementById('nav-close')
// MENU SHOW
if(navToggle){
    navToggle.addEventListener('click',function(){
        navMenu.classList.add('show-menu')
    })
}
// MENU HIDDEN
if(navClose){
    navClose.addEventListener('click',function(){
        navMenu.classList.remove('show-menu')
    })
}



/*============== REMOVE MENU MOBILE ==============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = function() {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}

navLink.forEach(function(n){
    n.addEventListener('click', linkAction)
})




/*============== CHANGE BACKGROUND HEADER ==============*/
const scrollHeader = function(){
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('bg-header') : header.classList.remove('bg-header')
}

window.addEventListener('scroll',scrollHeader)





/*============== SCROLL SECTIONS ACTIVE LINK ==============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = function(){
    const scrollY = window.pageYOffset

    sections.forEach(function(current){
        const sectionHeight = current.offsetHeight,
              setctionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        if(scrollY > setctionTop && scrollY <= setctionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }
    })
}

window.addEventListener('scroll',scrollActive)




/*============== SHOW SCROLL UP ==============*/
const scrollUp = function(){
    const scrollUp = document.getElementById('scroll-up')
    //當 scroll 高於 350 viewpoint height, add show-scroll 的class
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll')
}

window.addEventListener('scroll',scrollUp)



/*============== SCROLL REVEAL ANIMATION ==============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal(`.home__data, .footer__container, .footer__group`)
sr.reveal(`.home__img`, {delay: 700, origin: 'bottom'})
sr.reveal(`.logos__img, .program__card, .pricing__card`, {interval: 100})
sr.reveal(`.choose__img, .calculate__content`, {origin: 'left'})
sr.reveal(`.choose__content, .calculate-img`, {origin: 'right'})



/*============== CALCULATE JS ==============*/
const calculateForm = document.getElementById('calculate-form'),
      calculatCm = document.getElementById('calculate-cm'),
      calculateKg = document.getElementById('calculate-kg'),
      calculateMessage = document.getElementById('calculate-message')

const calculateBmi = function(e){
    e.preventDefault()

    // Check if the fields have a value
    if(calculatCm.value === '' || calculateKg.value === ''){
        // Add and remove color
        calculateMessage.classList.remove('color-green')
        calculateMessage.classList.add('color-red')

        // Show message
        calculateMessage.textContent = 'Fill in the Height and Weight 👨‍💻'

        // Remove message three seconds
        setTimeout(function(){
            calculateMessage.textContent = ''
        }, 3000)
    }else{
        // BMI Formula
        const cm = calculatCm.value / 100,
              kg = calculateKg.value,
              bmi = Math.round(kg / (cm*cm))
        
        // Show your health status
        if(bmi < 18.5){
            // Add color and display message
            calculateMessage.classList.add('color-green')
            calculateMessage.textContent = `Your BMI is ${bmi} and you are skinny 😔`
        }else if(bmi < 25){
            calculateMessage.classList.add('color-green')
            calculateMessage.textContent = `Your BMI is ${bmi} and you are healthy 🥳`
            
        }else{
            calculateMessage.classList.add('color-green')
            calculateMessage.textContent = `Your BMI is ${bmi} and you are overweight 😔`
        }

        // To clear the input field
        calculatCm.value = ''
        calculateKg.value = ''

        // Remove message four seconds
        setTimeout(function(){
            calculateMessage.textContent = ''
        }, 4000)
    }
}

calculateForm.addEventListener('submit',calculateBmi)




/*============== FOOTER EMAIL JS ==============*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message'),
      contactUser = document.getElementById('contact-user')

const sendEmail = function(e){
    e.preventDefault()
    // Check if the field has a value
    if(contactUser.value === ''){
        // Add and remove color
        contactMessage.classList.remove('color-green')
        contactMessage.classList.add('color-red')
        // Show message
        contactMessage.textContent = 'You must enter your email ☝️'
        // Remove message three seconds
        setTimeout(function(){
            contactMessage.textContent = ''
        }, 3000)
    }else{
        // serviceID - templateID - #form - publicKey
        emailjs.sendForm('melodych14992027', 'template_t66y1xe', '#contact-form', 'VlVHWVJULvfJMPrvo')
        .then(function(){
            // Show message and add color
            contactMessage.classList.add('color-green')
            contactMessage.textContent = 'You registered successfully 💪'
            // Remove message after three seconds
            setTimeout(function(){
                contactMessage.textContent = ''
            }, 3000)
        }, function(error){
            // Mail sending error
            alert('OOPS! SOMETHING HAS FAILED...', error)
        })
    // To clear the input field
    contactUser.value = ''
    }
}

contactForm.addEventListener('submit',sendEmail)