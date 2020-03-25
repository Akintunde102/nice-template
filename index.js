
const domainName = "example.org"
const splitBy = { upcoming: 'upcoming-events', past: 'past-events' };
const eventTypes = {
  meetup: `MeetUp`, leap: `Leap`, recruiting: `Recruiting Mission`, vanHackathon: `VanHackathon`, premium: `Premium-only Webinar`, open: `Open Webinar`
}
const eventsData = [
  {
    title: " Leap Canada", when: "April 14 - 15, 2020", location: "Toronto, Canada", deadline: "04/24/2020", type: eventTypes.leap, category: "upcoming-events", image: "http://www.freeimageslive.com/galleries/nature/weather/preview/maple_leaves_autumn_00184.jpg"
  }, {
    title: "Front-endeers Meetup", when: "January 20 - 22, 2020", location: "Vancouver, Canada", deadline: "04/24/2020", type: eventTypes.meetup, category: "past-events", image: "https://vanhackblobstorageprod.blob.core.windows.net/img/events/thumbnail/64cce68b-8adc-4bcf-8a4f-6bba37d2d83d.jpg"
  }, {
    title: "Corona Hack-to-Cure", when: "August 25 - 26, 2020", location: "Boston, Texas", deadline: "04/24/2020", type: eventTypes.vanHackathon, category: "upcoming-events", image: "http://www.freeimageslive.com/galleries/nature/weather/preview/mobile_sculpture_1011838.jpg"
  }, {
    title: "Recruitment Fair", when: "December 10 - 11, 2019", location: "Vancouver, Canada", deadline: "04/24/2020", type: eventTypes.recruiting, category: "past-events",  image: "http://www.freeimageslive.com/galleries/nature/weather/preview/maple_leaves_autumn_00184.jpg"
  },
  {
    title: "Berlin Tech Fair", when: "August 25, 2020", location: "Berlin, Germany", deadline: "04/24/2020", type: eventTypes.premium, category: "upcoming-events",  image: "http://www.freeimageslive.com/galleries/workplace/office/preview/laptop.jpg"
  }, {
    title: "Open Tech Fair, Montreal", when: "April 25, 2020", location: "Vancouver, Canada", deadline: "04/24/2020", type: eventTypes.open, category: "upcoming-events", image: "http://www.freeimageslive.com/galleries/nature/weather/preview/maple_leaves_autumn_00184.jpg"
  },
  {
    title: "Leap London", when: "April 25 - 26, 2019", location: "London, United Kingdom", deadline: "04/24/2020", type: eventTypes.leap, category: "past-events",  image: "http://www.freeimageslive.com/galleries/buildings/london/preview/big_ben.jpg"
  }, {
    title: "Yearly Tech Switch", when: "August 25, 2020", location: "Oakland, California", deadline: "04/24/2020", type: eventTypes.vanHackathon, category: "upcoming-events",  image: "http://www.freeimageslive.com/galleries/transtech/informationtechnology/preview/power_button.jpg"
  },
  {
    title: "Leap Connecticut", when: "April 25 - 26, 2019", location: "Connecticut, USA", deadline: "04/24/2020", type: eventTypes.leap, category: "past-events",  image: "http://www.freeimageslive.com/galleries/buildings/bestofbritish/preview/crumpled_unionjack.jpg"
  }
];

// The Templated html for Each Event Card
const eventHtmlModel = `<div class="grid-item">
<div class="event-cards {{highlight}} {{make-relative}}">
{{premium}}
    <div class="event-cards__thumb">
        <img src="{{image}}"
            alt="{{title}}" />
    </div>
    <div class="event-cards__content">
        <header class="content__header">
            <div class="row-wrapper">
                <h2 class="recipe-title">{{title}}</h2>
            </div>
        </header>
        <div class="description">
            <div> <strong>Date:</strong> {{when}}</div>
            <div><strong>Location:</strong> {{location}}</div>
            <div><strong>Deadline:</strong> {{deadline}}</div>
            <a href="#" class="tag {{crimson}}">{{type}}</a>
        </div>
        <div class="footer__button">
        {{apply}}
            <div class="content__btn">
                <button onClick=document.getElementById("{{dropdownid}}").classList.toggle("show"); href="#" class="dropbtn paintedbtn">Share</button>
                <div id="{{dropdownid}}" class="dropdown-content share-links">
                    <a
                        href="https://www.linkedin.com/shareArticle?mini=true&url=http://${domainName}">LinkedIn</a>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${domainName}">Facebook</a>
                    <a href="https://twitter.com/share?url=${domainName}">Twitter</a>
                </div>
            </div>
        </div>
        <div class="left-align">
            <a href="#">See Details</a>
        </div>
    </div>
</div>
</div>`;

const applyWithCallToActionHtml = `<div class="content__btn tooltip"><a href="#" class="paintedbtn">Apply</a><span class="tooltiptext">This event is for Premium Members Only <br><a href="#">Click here</a> to know more</span></div>`;

const applyWithoutCallToActionHtml = `<div class="content__btn tooltip"><a href="#" class="paintedbtn">Apply</a></div>`;

const premiumRibbonHtml = `<div class="ribbon ribbon-top-right"><span>premium</span></div>`;

// Lay Events In DOM
layEvents();


window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// Hoisted Functions Being Used 
function replaceValues(str, mappedValues) {
  const re = new RegExp(Object.keys(mappedValues).join("|"), "gi");
  return str.replace(re, function (matched) {
    return mappedValues[matched.toLowerCase()];
  });
}

function layEvents() {
  for (let i = 0; i < eventsData.length; i++) {
    const { title, when, location, deadline, type, category, image } = eventsData[i];
    const uniquedropDownId = `dropdown${i}`;
    let eventWithValues = replaceValues(eventHtmlModel, {
      "{{title}}": title,
      "{{image}}": image,
      "{{when}}": when,
      "{{location}}": location,
      "{{deadline}}": deadline,
      "{{type}}": type,
      "{{category}}": category,
      "{{dropdownid}}": uniquedropDownId,
      ...(
        [eventTypes.leap, eventTypes.recruiting, eventTypes.vanHackathon].indexOf(type) > -1 ?
          { "{{highlight}}": "highlight", "{{crimson}}": "crimson"} : { "{{highlight}}": "", "{{crimson}}": "gray" }
      ),
      ...(
        category === 'upcoming-events' ? 
        [eventTypes.premium].indexOf(type) > -1 ?
          { "{{apply}}": applyWithCallToActionHtml, "{{premium}}": premiumRibbonHtml, "{{make-relative}}": "make-relative"} : { "{{apply}}": applyWithoutCallToActionHtml,  "{{premium}}": "", "{{make-relative}}": "" } : { "{{apply}}": "", "{{premium}}": "", "{{make-relative}}": "" }
      ),
    });
    let node;
    if (category === splitBy.past) {
      node = document.getElementById(splitBy.past);
    }
    if (category === splitBy.upcoming) {
      node = document.getElementById(splitBy.upcoming);
    }
    if (node) {
      node.insertAdjacentHTML('beforeend', eventWithValues);
    }
  }
}