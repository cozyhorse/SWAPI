// const createOrUpdate = (element, label, value) => {
//     let item = document.createElement("li")
//     //loop through child nodes in "element" to find label
//     for (const node of element) {
//         if(node.tagName === "LI" && node.textContent.includes(label)){
//             item = node;
//             console.log(node);
//             break;
//         }
        
//     }
//     if(item){
//         item.textContent = `${label}: ${value}`
//     } else {
//         item.createElement("li");
//         item.textContent = `${label}: ${value}`
//         element.append(item)
//     }

// }


// //testing
// const getHomePlanet = async () => {
//   const response = await fetch(`https://swapi.dev/api/people/?page=${pagenumber}`)
//   const data = await response.json()
//   characterlist.innerHTML = "";
//   console.log(data);
//   for (const [index, item] of data.results.entries()) {
//     const button = document.createElement("button")
//     button.textContent = item.name
//     button.addEventListener("click", () => {
//      getCharacter(index + 1)
//      //getPlanet(index + 1)

//     });

//     const listNames = document.createElement("li")
//     listNames.classList.add("character-li");
//     listNames.append(button);
//     characterlist.append(listNames)
     
//  }

// }


//Old get planet function
// const getPlanet = async (planetIndex) => {
//     const response = await fetch(`https://swapi.dev/api/planets/`);
//     const data = await response.json();
//     console.log("planets", data.results);
//     planetname.textContent = `${data.results[planetIndex - 1].name}`;

//       createOrUpdate(planetinfo,"Rotation Period",data.results[planetIndex - 1].rotation_period);
//       createOrUpdate(planetinfo,"Orbital Period",data.results[planetIndex - 1].orbital_period);
//       createOrUpdate(planetinfo,"Diameter",data.results[planetIndex - 1].diameter);
//       createOrUpdate(planetinfo,"Climate",data.results[planetIndex - 1].climate);
//       createOrUpdate(planetinfo,"Gravity",data.results[planetIndex - 1].gravity);
//       createOrUpdate(planetinfo,"Terrain",data.results[planetIndex - 1].terrain);

// }


//Old append function.
// const appendDetails = (element, label, value ) => {
//     const item = document.createElement("li")
//     item.textContent = `${label}: ${value}`
//     element.append(item)
// }