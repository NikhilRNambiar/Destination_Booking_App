import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log("From init()");
  console.log(config.backendEndpoint);

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    const backendEndpoint = config.backendEndpoint;
    const response = await fetch(`${backendEndpoint}/cities`);
    let jsonRes=await response.json();
    return jsonRes;
  }catch(error){
    return null;
  }
  
  

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const cityContainer=document.createElement('div');
  cityContainer.className="col-md-3 col-6 mb-3";


  const imgContainer=document.createElement('div');
  imgContainer.className="tile";


  const img=document.createElement('img');
  img.src=image;
  img.alt=`${city}Image`;
  img.className="tile img-fluid";

  const nameContainer=document.createElement('div');
  nameContainer.className="tile-text";

  const cityName=document.createElement('h2');
  cityName.textContent=city;
  

  const des=document.createElement('p');
  des.textContent=description;
  


  
  


  const link=document.createElement('a');
  link.href=`pages/adventures/?city=${id}`;
  link.id=id;

  
  imgContainer.appendChild(img);
  nameContainer.appendChild(cityName);
  nameContainer.appendChild(des);
  imgContainer.appendChild(nameContainer);
  link.appendChild(imgContainer);
  cityContainer.appendChild(link);

  const mainDiv=document.getElementById('data');
  mainDiv.appendChild(cityContainer);


  
}


export { init, fetchCities, addCityToDOM };
