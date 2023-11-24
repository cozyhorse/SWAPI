const characterlist = document.querySelector("#character-list");
const detailsname = document.querySelector("#details-name");
const detailsinfo = document.querySelector("#details-info");
const planetname = document.querySelector("#planet-name");
const planetinfo = document.querySelector("#planet-info");
const prevBtn = document.querySelector(".prevbtn");
const nextBtn = document.querySelector(".nextbtn");
const page = document.querySelector(".page");
const characterloader = document.querySelector(".loader--characters");
const infoLoader = document.querySelector(".info--loader");
const planetLoader = document.querySelector(".planet--loader");
const loaderdiv = document.createElement("div")
const buttons = document.querySelectorAll(".characterbtn")

let pagenumber = 1


//Print Character List
const getCharacterList = async () => {
  //fetch people/page=1
  const response = await fetch(
    `https://swapi.dev/api/people/?page=${pagenumber}`
  );
  const data = await response.json();
  console.log("List to print", data.results);

  //Using for...of loop to iterate over the key-value pairs in data.results array.
  //key is the index of the array and item is the element at the index
  for (const [index, item] of data.results.entries()) {
    pageDisableCheck()
    //create a button element
    const button = document.createElement("button");
    //set button element name to name found in array (data.results) with item.name and add class characterbtn
    button.textContent = item.name;
    button.classList.add("characterbtn");

    //Set EventListner on created buttons
    button.addEventListener("click", (event) => {

      const activeBtn = document.querySelector(".characterbtn.active");
      //Check if there is an button with class "active" and remove it
      if (activeBtn) {
        activeBtn.classList.remove("active");
      }
      //add class "active" to current target/clicked element
      event.currentTarget.classList.add("active");

      //Empty lists and add loaders
      planetinfo.innerHTML = "";
      detailsinfo.innerHTML = "";
      detailsname.innerHTML = "";
      planetname.innerHTML = "";
      planetLoader.classList.add("loader");
      infoLoader.classList.add("loader");

      //Click on the
      getCharacter(index);

    });

    //Remove loader-class if characterlist have content
    if (characterlist) {
      characterloader.classList.remove("loader");
      loaderdiv.classList.remove("loader");
    }

    //Create elements and append to list
    const listNames = document.createElement("li");
    listNames.classList.add("character-li");
    listNames.append(button);
    characterlist.append(listNames);
  }
}


//Fetch and print character infos function
const getCharacter = async (charIndex) => {
  //hämtar samma sida som i listan över karaktärer
    const response = await fetch(`https://swapi.dev/api/people/?page=${pagenumber}`)
    const data = await response.json()
    console.log("Character Data", data.results);

    if(detailsinfo){
      infoLoader.classList.remove("loader")
    }

    detailsname.textContent = data.results[charIndex].name
        //printing info based on the index of the data.results array
        createOrUpdate(detailsinfo, "Height", data.results[charIndex].height )
        createOrUpdate(detailsinfo, "Mass", data.results[charIndex].mass )
        createOrUpdate(detailsinfo, "Hair Color", data.results[charIndex].hair_color )
        createOrUpdate(detailsinfo, "Skin Color", data.results[charIndex].skin_color )
        createOrUpdate(detailsinfo, "Eye Color", data.results[charIndex].eye_color )
        createOrUpdate(detailsinfo, "Birth Year", data.results[charIndex].birth_year )
        createOrUpdate(detailsinfo, "Gender", data.results[charIndex].gender )



    //fetch clicked characters homeworld
    const getHomeworld = await fetch(data.results[charIndex].homeworld)//Or species, vehicles, ect..
    const worldData = await getHomeworld.json()
    console.log("World array/info to print", worldData);

    //remove class loader if planetinfo has content
    if(planetinfo){
      planetLoader.classList.remove("loader")
    }
    planetname.textContent = worldData?.name
        //printing info based on the index of the worldData array
        createOrUpdate(planetinfo,"Rotation Period",worldData?.rotation_period);
        createOrUpdate(planetinfo,"Orbital Period",worldData?.orbital_period);
        createOrUpdate(planetinfo,"Diameter",worldData?.diameter);
        createOrUpdate(planetinfo,"Climate",worldData?.climate);
        createOrUpdate(planetinfo,"Gravity",worldData?.gravity);
        createOrUpdate(planetinfo,"Terrain",worldData?.terrain);

        
}

//next page button
nextBtn.addEventListener("click", async () => {
  characterlist.innerHTML = "";
  //add loader
  loaderdiv.classList.add("loader");
  loaderdiv.classList.add("loader--characters");
  characterlist.append(loaderdiv);

  pagenumber++;
  const nextpage = await fetch(`https://swapi.dev/api/people/?page=${pagenumber}`);
  const nextPageData = await nextpage.json();
  console.log("next page is", nextPageData);
  console.log("pagenumber", pagenumber);
  getCharacterList();

  page.textContent = pagenumber;
  pageDisableCheck();
});

//Prev page button
prevBtn.addEventListener("click", async () => {
  characterlist.innerHTML = "";
  //add loader
  loaderdiv.classList.add("loader");
  loaderdiv.classList.add("loader--characters");
  characterlist.append(loaderdiv);

  pagenumber--;
  const prevPage = await fetch(`https://swapi.dev/api/people/?page=${pagenumber}`);
  const prevPageData = await prevPage.json();
  console.log("Prev page is", prevPageData);
  console.log("pagenumber", pagenumber);
  getCharacterList();
  page.textContent = pagenumber;
  pageDisableCheck();
});

//Disable button at page 1 or page 8
//finns en bugg här, går fortfarande att trycka på pilen efter den är disabled
const pageDisableCheck = () => {
  const next = document.querySelector(".next");
  const prev = document.querySelector(".prev");
  if(pagenumber === 1){
    prev.disabled = true
  }

  if(pagenumber === 8){
    next.disabled = true
  }

  if(pagenumber < 8){
    next.disabled = false
  }

  if(pagenumber > 1){
    prev.disabled = false
  }
}



//Current append and update function (ul, label, content)
const createOrUpdate = (element, label, value) => {
  let item = document.createElement("li");
  // Loop through child nodes in "element" to find an existing list item with the same label
  for (const node of element.childNodes) {
     // Check if the node is a list item (LI) and if its text content includes label
    if (node.tagName === "LI" && node.textContent.includes(label)) {
      // If a matching list item is found, use it instead of creating a new one
      item = node;
      console.log("Node", node);
      break;
    }
  }

  // Check if an item was found or created
  if (item) {
    // Update the text content of the list item with the new label and value
    item.textContent = `${label}: ${value}`;
    element.append(item);
  }
};


//getHomePlanet();
getCharacterList();

