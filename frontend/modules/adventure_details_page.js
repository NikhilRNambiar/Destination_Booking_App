import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const queryParam=new URLSearchParams(search);
  const adventureId=queryParam.get('adventure');
  return adventureId;



  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  const backendEndpoint=config.backendEndpoint;
  try{
    const response=await fetch(`${backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    const adventures=await response.json();
    return adventures;
  }
  catch(error){
    return null;
  }


  // Place holder for functionality to work in the Stubs
}
//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const heading=document.getElementById("adventure-name");
  heading.textContent=adventure.name;
  heading.className="ps-3";
  const advSub=document.getElementById("adventure-subtitle");
  advSub.textContent=adventure.subtitle;
  advSub.className="ps-3";
  const image=document.getElementById("photo-gallery");
  adventure.images.forEach((adv)=>{
  const imgDiv=document.createElement('div');
  const img=document.createElement('img');
  img.src=adv;
  img.alt=adventure.name;
  img.className="activity-card-image px-3";
  imgDiv.appendChild(img);
  image.appendChild(imgDiv);  
  });

  const advDet=document.getElementById("adventure-content");
  advDet.textContent=adventure.content;
  advDet.className="p-3";



}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photoGallery = document.getElementById("photo-gallery");
  photoGallery.textContent = "";

  const carousel = document.createElement('div');
  carousel.id = "carouselExampleIndicators";
  carousel.className = "carousel slide";
  carousel.setAttribute("data-bs-ride", "carousel");

  const carouselInner = document.createElement('div');
  carouselInner.className = "carousel-inner";

  images.forEach((imgURL, index) => {
    const carouselItem = document.createElement('div');
    carouselItem.className = "carousel-item";

    if (index === 0) {
      carouselItem.classList.add("active");  
    }

    const imgDiv = document.createElement('img');
    imgDiv.src = imgURL;
    imgDiv.alt = `slide${index + 1}`;
    imgDiv.className = "activity-card-image d-block w-100 px-3";

    carouselItem.appendChild(imgDiv);
    carouselInner.appendChild(carouselItem);
  });

  carousel.appendChild(carouselInner);

  // Previous button
  const prevButton = document.createElement('button');
  prevButton.className="carousel-control-prev";
  prevButton.setAttribute("type", "button");
  prevButton.setAttribute("data-bs-target", "#carouselExampleIndicators");
  prevButton.setAttribute("data-bs-slide", "prev");

  const prevIcon = document.createElement('span');
  prevIcon.className = "carousel-control-prev-icon";
  prevIcon.setAttribute("aria-hidden", "true");

  const prevText = document.createElement('span');
  prevText.textContent = "Previous";
  prevText.className = "visually-hidden";

  prevButton.appendChild(prevIcon);
  prevButton.appendChild(prevText);
  carousel.appendChild(prevButton);

  // Next button
  const nextButton = document.createElement('button');
  nextButton.className = "carousel-control-next";
  nextButton.setAttribute("type", "button");
  nextButton.setAttribute("data-bs-target", "#carouselExampleIndicators");
  nextButton.setAttribute("data-bs-slide", "next");

  const nextIcon = document.createElement('span');
  nextIcon.className = "carousel-control-next-icon";
  nextIcon.setAttribute("aria-hidden", "true");

  const nextText = document.createElement('span');
  nextText.textContent = "Next";
  nextText.className = "visually-hidden";

  nextButton.appendChild(nextIcon);
  nextButton.appendChild(nextText);
  carousel.appendChild(nextButton);


  const carouselIndicator=document.createElement('div');
  carouselIndicator.className="carousel-indicators";
  images.forEach((_,index)=>{
    const indicator=document.createElement('button');
    indicator.setAttribute("type","button");
    indicator.setAttribute("data-bs-target","#carouselExampleIndicators");
    indicator.setAttribute("data-bs-slide-to",`${index}`);

    if (index === 0) {
      indicator.classList.add("active");
      indicator.setAttribute("aria-current", "true");
    }
    indicator.setAttribute("aria-label",`slide ${index+1}`);

    carouselIndicator.appendChild(indicator);

  })

  carousel.appendChild(carouselIndicator);
  // Append the carousel to the photo-gallery
  photoGallery.appendChild(carousel);
}
  

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const soldOut=document.getElementById('reservation-panel-sold-out');
  const available=document.getElementById('reservation-panel-available');
  const costPerHead=document.getElementById('reservation-person-cost');
  if(adventure.available){
    soldOut.style.display="none";
    available.style.display="block";
    costPerHead.textContent=adventure.costPerHead;
  }
  
  else{
    soldOut.style.display="block";
    available.style.display="none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const cost=adventure.costPerHead;
  const total=cost*persons;
  console.log(total);
  const totalSpace=document.getElementById("reservation-cost");
  totalSpace.textContent=total;



}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form=document.getElementById("myForm");
  form.addEventListener('submit',async(event)=>{
    event.preventDefault();
    let url=config.backendEndpoint+"/reservations/new";

    let formEle=form.elements;

    let bodyString=JSON.stringify({
      name:formEle["name"].value,
      date:formEle["date"].value,
      person:formEle["person"].value,
      adventure:adventure.id,

    });

    try{
      let res= await fetch(url,{
        method:"POST",
        body:bodyString,
        headers:{
          "Content-type":"application/json",
        },
      });
    

    if(res.ok){
      alert("Success!");
      window.location.reload();
    }
    else{
      let data=await res.json();
      alert(`Failed!-${data.message}`);
    }
  }
    catch(err){
      alert("Failed-fetch call resulted in failure");
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById('reserved-banner').style.display="block";
  }
  else{
    document.getElementById('reserved-banner').style.display="none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
