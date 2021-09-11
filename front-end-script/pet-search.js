      const form = document.getElementById('search_form')
      const category_div = document.getElementById('category_div')
       form.addEventListener("submit", async (event) => {
        event.preventDefault();
       let profileId = 0;
        //prevent the form to change the page by going to it's action attribute

        //the fetch method
        const petCategory = document.getElementById("category").value;
        const petAge = document.getElementById("age").value;
        const petWeight = document.getElementById("weight").value;
        const petHealth = document.getElementById("health").value;

        const result_div = document.getElementById("search_result_div");
        result_div.querySelectorAll("*").forEach((n) => n.remove());
        const result = await fetch('/pets-search', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            petCategory,
            petAge,
            petWeight,
            petHealth
          })
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
            data.forEach((element) => {
              //make id for petProfile div
              profileId++;

              //create elements
              const petCategory = document.createElement("p");
              const petName = document.createElement("p");
              const petAge = document.createElement("p");
              const petWeight = document.createElement("p");
              const petHealth = document.createElement("p");
              const petDinstinctiveFeatures = document.createElement("p");
              const petPhoto =  document.createElement("img")
              const petProfile = document.createElement("div");
              const photoDiv = document.createElement("div");
              const infoDiv = document.createElement("div");

              // insert data
              petCategory.innerHTML = `<strong>Category:</strong> ${element.petCategory}`;
              petName.innerHTML = `<strong>Name:</strong> ${element.petName}`;
              if(element.petAge == 1){
              petAge.innerHTML = `<strong>Age:</strong> ${element.petAge} year old`;
              }else if(element.petAge < 1){
              petAge.innerHTML = `<strong>Age:</strong> under and 1 year `;
              }else{
              petAge.innerHTML = `<strong>Age:</strong> ${element.petAge} years old`;
              }
              petWeight.innerHTML = `<strong>Weight:</strong> ${element.petWeight} Kg`;
              petHealth.innerHTML = `<strong>Health:</strong> ${element.petHealth}`;
              petDinstinctiveFeatures.innerHTML = `<strong>Distinctive Features:</strong> ${element.petDistinctiveFeatures}`;
              petPhoto.src = element.petPhoto;
              petPhoto.alt = 'pet image'

              // assign classes
              petCategory.className = "petCategory";
              petName.className = "petName";
              petAge.className = "petAge";
              petWeight.className = "petWeight";
              petHealth.className = "petHealth";
              petDinstinctiveFeatures.className = "petDinstinctiveFeatures";
              petProfile.className = "petProfile";
              petPhoto.className = "petPhoto";
              photoDiv.className = "photoDiv";
              infoDiv.className = "infoDiv";

              //assgn id
              petProfile.id = profileId;
              petPhoto.id = 'photo'+profileId;
              //  petCategory,
              //     petName,
              //     petAge,
              //     petWeight,
              //     petHealth,
              //     petDinstinctiveFeatures,

              //add event listener to the pet photo
          petPhoto.addEventListener('click', async()=>{
            const petId = element._id;
           window.location.href=`/petprofile/${petId}`;
        })
              // append the elements
              infoDiv.appendChild(petCategory);
              infoDiv.appendChild(petName);
              infoDiv.appendChild(petAge);
              infoDiv.appendChild(petWeight);
              infoDiv.appendChild(petHealth);
              infoDiv.appendChild(petDinstinctiveFeatures);
              photoDiv.appendChild(petPhoto);
              petProfile.appendChild(photoDiv);
              petProfile.appendChild(infoDiv);
              result_div.appendChild(petProfile);
              console.log(result_div);
            });
          })
          .catch((e) => {
            console.error(e);
          });
      });

      // category_div.addEventListener('click',()=>{
      //  const children =  category_div.children
      // //  children.forEach((child)=>{
      // //    child.hidden = false;
      // //  })
      //  console.log(children);
      // })