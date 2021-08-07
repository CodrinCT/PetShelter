      const form = document.getElementById('search_form') 
       form.addEventListener("submit", async (event) => {
       let profileId = 0;
        //prevent the form to change the page by going to it's action attribute
        event.preventDefault();

        //the fetch method
        const input = document.getElementById("search").value;
        const result_div = document.getElementById("search_result_div");
        result_div.querySelectorAll("*").forEach((n) => n.remove());
        const result = await fetch(`/pets-search/${input}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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


      const petPhoto = document.getElementsByClassName('photoDiv')
      petPhoto.forEach(photo=>{
        photo.addEventListener('click', async()=>{
          const photoId = photo.id;
          const result = await fetch(`/pet-search/petprofile`,{
            method:"POST",
            headers: {
             "Content-Type" : "application/json",
            },
            body: JSON.stringify({
              photoId
            }),
          }).then(res=>{
            res.json()
          }).then((data)=>{

          });
        })
      })