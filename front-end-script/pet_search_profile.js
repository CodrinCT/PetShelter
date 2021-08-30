
window.addEventListener('load',()=>{
    const profileDiv = document.getElementById('profile_div');
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const petID = urlParams.get('petId');
    console.log(petID);
})