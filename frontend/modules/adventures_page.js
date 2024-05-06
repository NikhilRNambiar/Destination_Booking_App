
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const queryParams = new URLSearchParams(search);
  const city=queryParams.get('city');
  return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  const backendEndpoind=config.backendEndpoint;
  try{
    const response=await fetch(`${backendEndpoind}/adventures?city=${city}`);
    const adventures=await response.json();
    return adventures;
  }
  catch(error){
    return null;
  }
  




}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  
  adventures.forEach(adventure =>{
    const divContainer=document.createElement('div');
    divContainer.className="col-md-3 col-6 mb-3 position-relative";

    const card=document.createElement('div');
    card.className="card activity-card";

    const advImage=document.createElement('img');
    advImage.src=adventure.image;
    advImage.alt=`image of ${adventure.category}`;
    advImage.className="card-img-top img-fluid";

    const conDiv=document.createElement('div');
    conDiv.className="card-body w-100";

    const nameDiv=document.createElement('div');
    nameDiv.className="d-flex justify-content-between";
    const name=document.createElement('h5');
    name.textContent=adventure.name;

    const cost=document.createElement('p')
    cost.textContent=`₹${adventure.costPerHead}`;

    const durDiv=document.createElement('div');
    durDiv.className="d-flex justify-content-between";
    const duration=document.createElement('h5');
    duration.textContent="Duration";

    const durHour=document.createElement('p');
    durHour.textContent=`${adventure.duration} hours`;

    const link=document.createElement('a');
    link.href=`detail/?adventure=${adventure.id}`;
    link.id=adventure.id;
    console.log(`detail/?adventure=${adventure.id}`);
    


    const banner=document.createElement('div');
    banner.className="category-banner";

    const bannerEl=document.createElement('p');
    bannerEl.textContent=adventure.category;

    durDiv.appendChild(duration);
    durDiv.appendChild(durHour);

    nameDiv.appendChild(name);
    nameDiv.appendChild(cost);

    conDiv.appendChild(nameDiv);
    conDiv.appendChild(durDiv);

    banner.appendChild(bannerEl);

    card.appendChild(advImage);
    card.appendChild(conDiv);
    

    link.appendChild(card);

    divContainer.appendChild(banner);
    divContainer.appendChild(link);

    const adventureContainer=document.getElementById('data');
    adventureContainer.appendChild(divContainer);




  })
  


}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filteredList=list.filter((key)=>key.duration>low && key.duration<=high);
  return filteredList;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const filteredList=list.filter((adventure)=>categoryList.includes(adventure.category));
  return filteredList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList=[];
  if(filters["duration"] && filters["category"].length>0){
    let choice=filters["duration"].split("-");
    filteredList=filterByDuration(list,
      parseInt(choice[0]),
      parseInt(choice[1]));
    filteredList=filterByCategory(filteredList,filters["category"]);

  }  

  else if(filters["duration"]){
    let choice=filters['duration'].split("-");
    filteredList=filterByDuration(list,
      parseInt(choice[0]),
      parseInt(choice[1]));
  }

  else if(filters["category"].length>0){
    filteredList=filterByCategory(list,filters["category"]);
  }

  else{
    filteredList=list;
  }

  // Place holder for functionality to work in the Stubs
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(localStorage.getItem("filters"));


  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("duration-select").value=filters.duration;
  filters["category"].forEach((key)=>{
    let ele=document.createElement("div");
    ele.className="category-filter";
    ele.innerHTML=`
                <div>${key}</div>
                `;
    document.getElementById("category-list").appendChild(ele);
  });

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
