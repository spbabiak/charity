const menuIcon = document.querySelector('.icon_burger_wrapper')
const menu = document.querySelector('.nav_header_mobile')
const closeIcon = document.querySelector('header .icon_cross_wrapper')
const carouselSlider = document.querySelector('.carousel')
const slider = document.querySelector('.slider')

menuIcon.onclick = () => {
    menu.style.transform = 'translateY(0)'
    menu.style.transition = 'transform 1s'
}

closeIcon.onclick = () => {
    menu.style.transform = 'translateY(-490px)'
    menu.style.transition = 'transform 1s'
}

// Slider with fade effect slide show

if(carouselSlider) {
    let currentSlideIndex = 0
    let lastSlideIndex = slider.children.length - 1
    let intervalID = 0

    function resetSlides() {
        for(let i = 0; i < slider.children.length; i++) {
            slider.children[i].style.opacity = 0
            slider.children[i].style.zIndex = 0
        }
    }

    function startShow() {
        intervalID = setInterval(() => {
            resetSlides()
            currentSlideIndex = currentSlideIndex < lastSlideIndex ? ++currentSlideIndex : 0
            slider.children[currentSlideIndex].style.opacity = 1
            slider.children[currentSlideIndex].style.zIndex = 1   
        }, 6000)
    }

    startShow()

    carouselSlider.onmouseover = () => {
        clearInterval(intervalID)
    }

    carouselSlider.onmouseout = () => {
        startShow()
    }
}

/* Form -------------------------------------------------------------------------------------------------------------------------------*/

const form = document.querySelector('#main_form')
if(form) {
	// Form fields validation
	const errorName = document.querySelector('.error_name')
	const errorEmail = document.querySelector('.error_email')
    const errorMsg = document.querySelector('.error_msg')

	function sendData() {
    const XHR = new XMLHttpRequest()

    // Bind the FormData object and the form element
    const FD = new FormData( form )

    var name = FD.get('name')
    var email = FD.get('email')
    var msg = FD.get('message')

    // Define what happens on successful data submission
    XHR.addEventListener( "load", function(event) {
      alert( event.target.responseText )
    });

    // Define what happens in case of error
    XHR.addEventListener( "error", function( event ) {
      alert( 'Oops! Something went wrong.' )
    });

    var errorCounter = 0;
		var nameFormat = /^[a-zA-Z\s]*$/
		var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        var msgFormat = /^[a-zA-Z0-9?$@#()'!,+\-=_:.&€£*%\s]+$/

		if(name == '') {
			++errorCounter;
            errorName.style.color = 'red'
			errorName.innerHTML = 'This field is required'
		} else if(name.match(nameFormat)) {
			errorName.style.color = 'green'
			errorName.innerHTML = '✓ Valid'
		} else {
			++errorCounter;
            errorName.style.color = 'red'
			errorName.innerHTML = 'Only letters and spaces allowed'	
		}

		if(email == '') {
			++errorCounter;
            errorEmail.style.color = 'red'
			errorEmail.innerHTML = 'This field is required'
		} else if(email.match(mailFormat)) {
			errorEmail.style.color = 'green'
			errorEmail.innerHTML = '✓ Valid'
		} else {
			++errorCounter;
            errorEmail.style.color = 'red'
			errorEmail.innerHTML = 'Invalid email format'	
		}

        if(msg == '') {
			++errorCounter;
            errorMsg.style.color = 'red'
			errorMsg.innerHTML = 'This field is required'
		} else if(msg.match(msgFormat)) {
			errorMsg.style.color = 'green'
			errorMsg.innerHTML = '✓ Valid'
		} else {
			++errorCounter;
            errorMsg.style.color = 'red'
			errorMsg.innerHTML = 'Invalid message format'	
		}

		if(errorCounter == 0) {
            // Set up our request
            XHR.open( "POST", "FormDataHandler.php" )

            // The data sent is what the user provided in the form
            XHR.send( FD )
        }
	}

	form.addEventListener('submit', event => {
		event.preventDefault()
		sendData()
	})
}

/* Form END ------------------------------------------------------------------------------------------------*/

const donationList = document.querySelector('.donation_list')
const donationItems = donationList.querySelectorAll('.donation_item')
const donationItemsArray = Array.from(donationItems)

donationItemsArray.forEach(item => {
    let donationItemChecked = 0
    item.onclick = () => {
        if(donationItemChecked === 0) {
            item.style.border = '5px solid #338EEE'
            item.style.margin = (window.innerWidth < 768) ? 0 : '-4px'
            item.querySelector('label').style.color = '#338EEE'
            item.querySelector('input').value = 1
            donationItemChecked = 1
        }else {
            item.removeAttribute('style')
            item.querySelector('label').removeAttribute('style')
            item.querySelector('input').value = 0 
            donationItemChecked = 0
        }
    }
})

const donationAmount = document.querySelector('.donation_amount_wrapper .amount')
var donationAmountFormat = /^[\d.]+$/
donationAmount.onfocus = (e) => {
    if(e.target.value === '0.00') e.target.value = ''
}

donationAmount.onblur = (e) => {
    if(e.target.value === '') {
        e.target.value = '0.00'
    }
}

donationAmount.oninput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
}