const numSection = document.querySelector(".num-section");
const nums = document.querySelectorAll(".num");
let started = false;
const arrowSection = document.querySelector(".back-to-top");
const arrowUp = document.querySelector(".arrowUp");
const commentSection = document.querySelector(".comment-section");
const pagesDiv = document.querySelector(".pages-div");
const opacityDiv = document.querySelector(".opacity-div");
const mobileIcon = document.querySelector(".mobile-icon");
const mobileNav = document.querySelector(".mobile-nav");
const xBtn = document.querySelector(".xbtn");
const header = document.querySelector("header");

const comments = [
[{
    comment: "“Marine Detail Specialists installed SeaDek on our 35 foot Bayliner, in the cockpit and on our extended swim step. They did a wonderful job and were very professional. We wanted it done before a big boating trip we had scheduled, and Jeff went above and beyond getting it done for us. And we love the SeaDek product itself. It feels great to walk on, has great traction and does not get hot. We would use Marine Detail Specialists again in a heartbeat!”",
    person: "David and Linda Hagen",
    place: "35' Bayliner Sunbridge",
},
{
    comment: "“This is the 2nd year that Jeff has detailed our boat. The additional work Jeff completed was a complete surprise, he is extremely capable, conscience and a great guy.”",
    person: "Derek and Karen Riley",
    place: "Selene 55",
},
{
    comment: "“The look is amazing, the feel is terrific, especially barefoot, and I think it enhanced the value of Mirakai. Highly recommend product, service and I think Jeff is an honest, committed, organized local business owner; which I support and appreciate in this day and age.”",
    person: "Malcolm Glover",
    place: "34' Sabre",
}],
[{
    comment: "“Your guys do great work.  A real pleasure.  I’ve given your number to my meticulous brother in law who has a 58 ft Offshore and no doubt he’ll be setting up some service in the next year.  Thanks again for the fine work.”",
    person: "Bruce Lovell",
    place: "39' Bayliner",
},
{
    comment: "“Keep up the great work, you do an outstanding job. Your care and concern regarding my boat is very important to me, as it is to most boaters, you ‘get it’.”",
    person: "Dave Harold",
    place: "Tollycraft",
},
{
    comment: "“We’ve been regular customers of Marine Detail Specialists since 2012 when we bought our first boat.  We take great pride in our boat’s appearance; we have an annual maintenance contract with Jeff and we like the simplicity of knowing that someone is proactively taking care of our boat. “",
    person: "Jon & Debbie Galbraith",
    place: "Shelter Bay",
}],
[{
    comment: "“I want to sincerely thank you and your team for your successful efforts in refreshing out paint finish on <b>ASTARA</b>. Your team was hard working, and particularly to have aboard.”",
    person: "Captain Ken Bracewell",
    place: "Astara",
},
{
    comment: "“Our boat looks brand new.  You have brought it back to perfect condition!  We signed up for the maintanence program  Thanks!”",
    person: "Ann & Doug Barduhn",
    place: "37' Bayliner",
},]
];

window.onscroll = function (){
    if(window.scrollY < arrowSection.offsetTop){
        arrowUp.addEventListener("click", scrollToTop);
    }

    if(window.scrollY >= arrowSection.offsetTop){
        arrowUp.style = "opacity : 100%; z-index : 6";
    }
    else{
        arrowUp.style = "opacity : 0%; z-index : -1";
    }

    if(window.scrollY >= numSection.offsetTop && started == false){
        nums.forEach(num => startCount(num));
        started = true;
    }
    if(window.innerWidth <= 1000){
        if(window.scrollY > 0){
            header.style.height = "60px";
        }
        else{
            header.style.height = "74px";
        }
    }
}

window.onresize = function (){
    if(window.innerWidth >= 1018){
        header.style.height = "100px";
    }
    if(window.innerWidth <= 1018){
        if(window.scrollY > 0){
            header.style.height = "60px";
        }
        else{
            header.style.height = "74px";
        }
    }
}

window.onload = function (){
    arrowUp.addEventListener("click", scrollToTop);

    if(window.scrollY >= numSection.offsetTop && started == false){
        nums.forEach(num => startCount(num));
        started = true;
    }
}

function startCount(el){
    let result = 0;
    let counter = setInterval(function(){
        result += +el.dataset.speed;
        let content = result;
        if(result > 999){
            content = result.toString();
            let firstContent = content.slice(0,-3);
            let lastContent = content.slice(-3);
            content = firstContent+","+lastContent;
        }
        el.textContent = content;
        if(el.textContent == el.dataset.goal){
            clearInterval(counter);
        }
    }, el.dataset.time);
}

function scrollToTop(){
    scrollTo({
       top: 0,
       behavior:"smooth"
    })
    arrowUp.removeEventListener("click", scrollToTop); 
}

pagesDiv.innerHTML = `<i class="fa-solid fa-arrow-left-long previous" onclick="previousPage()" style="display:none"></i>`;
comments.forEach((comment , i) => {
    pagesDiv.innerHTML += `<a class="page" href="">${i+1}</a>`;
});
pagesDiv.innerHTML += `<i class="fa-solid fa-arrow-right-long next" onclick="nextPage()"></i>`;

const pages = document.querySelectorAll(".page");
pages[0].classList.add("active");
pages.forEach( page => {
    page.onclick = function(e){
        e.preventDefault();
        pages.forEach(page => page.classList.remove("active"));
        this.classList.add("active");
        showComments();
        if(this.innerText == 1){
            document.querySelector(".previous").style.display = "none";
        }
        else{
            document.querySelector(".previous").style.display = "inline-block";
        }

        if(this.innerText == comments.length){
            document.querySelector(".next").style.display = "none";
        }
        else{
            document.querySelector(".next").style.display = "inline-block";
        }
    }
});

function showComments(){
    commentSection.innerHTML = "";
    pages.forEach((page, p) =>{
        if(page.classList.contains("active")){
            comments[p].forEach(comment => {
                commentSection.innerHTML +=`<div class="comment">${comment.comment}<p class="name">${comment.person}</p><span class="place">${comment.place}</span></div>`;
            });
        }
    });
};
showComments();

function previousPage(){
    pages.forEach((page, i) =>{
        if(page.classList.contains("active")){
            page.classList.remove("active");
            pages[i-1].classList.add("active");
            showComments();
            if(i == 1){
                document.querySelector(".previous").style.display = "none";
            }
            if(i == comments.length-1){
                document.querySelector(".next").style.display = "inline-block";
            }
        }
    });
};

function nextPage(){
    for(let i = 0; i < pages.length; i++){
        if(pages[i].classList.contains("active")){
            pages[i].classList.remove("active");
            pages[i+1].classList.add("active");
            showComments();
            if(i == comments.length-2){
                document.querySelector(".next").style.display = "none";
            }
            if(i == 0){
                document.querySelector(".previous").style.display = "inline-block";
            }
            break;
        }
    }
};

mobileIcon.addEventListener("click", function(){
    mobileNav.style.right = "0px";
    opacityDiv.style.width = "100%";
    opacityDiv.style.opacity = "45%";
});

function navOut(){
    mobileNav.style.right = "-330px";
    opacityDiv.style.opacity = "0%";
    setTimeout(()=>{
        opacityDiv.style.width = "0";
    },150);
};

xBtn.addEventListener("click", navOut);
opacityDiv.addEventListener("click", navOut);
