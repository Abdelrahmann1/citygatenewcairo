// Premium Real Estate Landing Page JavaScript
const urlParams = new URLSearchParams(window.location.search);
const urlProject = urlParams.get('project');

function setSheetAndOpen(sheet) {

    // document.getElementById('displayedProject').textContent = projectInput.value;
    // if (projectInput.value == "mnhd all") {
    //     document.getElementById('modal-title').style.display = 'none';
    // } else {
    //     console.log(
    //         projectInput
    //     );

    //     document.getElementById('modal-title').style.display = 'block';
    // }
    // Open modal
    const exampleModal = document.getElementById('staticBackdrop');
    const modal = bootstrap.Modal.getInstance(exampleModal) || new bootstrap.Modal(exampleModal);
    modal.show();
}
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function() {
        setSheetAndOpen('Crysta Mountain View In house');
    }, 7000); 
});
// Preloader
// window.addEventListener('load', function() {
//     const preloader = document.querySelector('.preloader');
//         preloader.classList.add('hidden');
// });

// Navbar scroll effect
// window.addEventListener('scroll', function() {
//     const navbar = document.getElementById('navbar');
//     if (window.scrollY > 100) {
//         navbar.classList.add('scrolled');
//     } else {
//         navbar.classList.remove('scrolled');
//     }
// });

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Scroll to top button
// const scrollTopBtn = document.getElementById('scrollTop');

// window.addEventListener('scroll', function() {
//     if (window.scrollY > 300) {
//         scrollTopBtn.classList.add('show');
//     } else {
//         scrollTopBtn.classList.remove('show');
//     }
// });


async function handleSubmit(e, sheet) {
    e.preventDefault();
    const form = e.target; // The form element
    const name = form.name.value.trim(); // Assuming your input has name="name"
    const phone = form.phone.value.trim(); // Assuming your input has name="phone"
    if (form.project) {
        const project = form.project.value.trim(); // Assuming your input has name="phone"
        if (project != "none") {
            sheet = project;
        }else{
            console.log("none");
            
        }
    }else{
        console.log("errorall");
        
    }
    // // Validate inputs
    if (!name || !phone) {
      showAlert("الرجاء إدخال الاسم ورقم الهاتف.", "warning");
      return;
    }
    // const preloader = document.querySelector('.preloader');
    // preloader.classList.remove('hidden');
    console.log(name, phone,sheet);
    
    // Show progress bar
    const progressContainer = document.getElementById("preloader");
    progressContainer.classList.remove("d-none");
  
    try {
      const response = await fetch('../submit-sheet.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          name: name,
          phone: phone,
          compound: sheet
        })
      });
  
      const result = await response.json();
      if (result.success) {
        name.value = "";
        phone.value = "";
          window.location.href = '../thank-you.html';
      preloader.classList.add('d-none');

      } else {
        throw new Error(result.error || "Submission failed");
        preloader.classList.add('d-none');

      }
    } catch (error) {
      console.error("Error:", error);
      preloader.classList.add('d-none');
      showAlert("حدث خطأ، برجاء المحاولة مرة أخرى.", "danger");
    } finally {
      preloader.classList.add('d-none');

    }
  }
  function showAlert(message, type) {
    const alertContainer = document.getElementById("alertContainer");
  
    // Clear any existing alerts
    while (alertContainer.firstChild) {
      alertContainer.firstChild.remove();
    }
  
    if (!message || !type) return;
  
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type} alert-dismissible fade`;
    alertDiv.role = "alert";
    alertDiv.innerHTML = `
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      ${message}
    `;
  
    alertContainer.appendChild(alertDiv);
  
    // Trigger reflow to enable transition
    void alertDiv.offsetWidth;
  
    // Trigger fade-in
    alertDiv.classList.add("show");
  
    // Auto-close after 10 seconds
    const AUTO_CLOSE_DELAY = 10000;
    // This runs AFTER the fade-out animation completes
    if (type === "success") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setTimeout(() => {
      const bsAlert = bootstrap.Alert.getOrCreateInstance(alertDiv);
      bsAlert.close(); // Starts fade-out
    }, AUTO_CLOSE_DELAY);
  
    // ✅ Listen for when Bootstrap finishes removing the alert
    
  
  }
  let current;
  function animateValue(id, start, end, duration) {
    let obj = document.getElementById(id);
    let range = end - start;
    let minTimer = 50;
    let stepTime = Math.max(Math.floor(duration / range), minTimer);
    let startTime = new Date().getTime();
    let endTime = startTime + duration;
    let timer;

    function run() {
      let now = new Date().getTime();
      let remaining = Math.max((endTime - now) / duration, 0);
      let value = Math.round(end - (remaining * range));
      if (obj) {
        obj.textContent = value;
        if (value == end) {
          clearInterval(timer);
        }
      }
    }

    timer = setInterval(run, stepTime);
    run();
  }

  // Call the function when the page loads
  document.addEventListener("DOMContentLoaded", function() {
    animateValue("installment", 0, 10, 2000);  // 8 سنوات تقسيط
    animateValue("downpayment", 0, 5, 2000); // 10% مقدم
    animateValue("delivery", 0, 4, 2000);     // 3 سنوات للتسليم
    if (current) {
      
      document.getElementById("downpayment").textContent = current + "%";
    }

  });