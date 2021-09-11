
// window.addEventListener('load',()=>{
//     const profile_div = document.getElementById('profile_div')
//     const profile_photo = document.createElement('img')
//     const profile_info_div = document.createElement('div')
//     const addopt_btn = document.createElement('button')
//     const petName = document.createElement('p')
//     const petAge = document.createElement('p')
//     const petWeight=document.createElement('p')
//     const petCategory=document.createElement('p')
//     const petHealth=document.createElement('p')
//     const urlArr = window.location.toString().split('/')
//     try{
//      fetch(`/pets-search/petprofile/${urlArr[5]}`,{
//         method:'POST',
//         headers:{
//             "Content-Type": "application/json"
//         },
//     })
//     .then((res)=>{
//         return res.json()
//     }).then((result)=>{
//         if (result) {
//       //  add data to element
//     petName.innerHTML= `Name: ${result.petName}`
//     if(result.petAge > 1){
//     petAge.innerHTML= `Age: ${result.petAge} years old`
//     }else if(result.petAge == 1){
//     petAge.innerHTML= `Age: ${result.petAge} year old`
//     }else if(result.petAge < 1){
//     petAge.innerHTML= `Age: under 1 year`
//     }
//     petWeight.innerHTML = `Weight: ${result.petWeight}`
//     petHealth.innerHTML = `Health: ${result.petHealth}`
//     petCategory.innerHTML = `Category: ${result.petCategory}`
//     profile_photo.src = result.petPhoto
//     addopt_btn.innerText = 'Adopt'

//     //add class/id to elements
//     petName.className = 'petname'
//     petAge.className = 'petage'
//     petCategory.className = 'petcategory'
//     petWeight.className = 'petweight'
//     petHealth.className = 'pethealth'
//     profile_info_div.className = 'profile_info_div' 
//     addopt_btn.id = 'adopt_btn'
//     profile_photo.className = 'profile_photo'

//     // append elements
//     profile_info_div.appendChild(petName)
//     profile_info_div.appendChild(petAge)
//     profile_info_div.appendChild(petCategory)
//     profile_info_div.appendChild(petWeight)
//     profile_info_div.appendChild(petHealth)
//     profile_div.appendChild(profile_photo)
//     profile_div.appendChild(profile_info_div)
//     profile_div.appendChild(addopt_btn)
//     }
//     })
//     }catch(e){
//         console.log(e);
//     }
// })

const adoptBtn = document.getElementById('adopt_btn');
const adopt = document.getElementById('adopt');
adoptBtn.addEventListener('click',()=>{
    const form = document.getElementById('form');
    form.style.visibility='visible'
})

adopt.addEventListener('click',(event)=>{
    event.preventDefault()
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const form = document.getElementById('form')
   const urlArr =  window.location.toString().split('/')
   const petId = urlArr[4];
   console.log(urlArr);
    fetch(`/petprofile/${urlArr[4]}`,{
        method:'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            date,
            petId
        })
    }).then((res)=>{
    if(res.status==200){

        const response = document.createElement('p')
        response.innerHTML = 'The adoption form has been saved successfully !'
        response.id = 'response'
        form.appendChild(response)
    }else{
        throw Error('An error has accoured, please try again later')
    }
}).catch((err)=>{
      const response = document.createElement('p')
        response.innerHTML = err
        response.id = 'response'
        form.appendChild(response)
    })
})