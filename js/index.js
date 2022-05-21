var inputs = document.querySelectorAll('input')
var siteNameInput = document.querySelector('#siteName');
var siteLinkInput = document.querySelector('#siteLink');
var addBtn = document.querySelector('#addBtn')

var sitesBody = document.querySelector('#body')

var currentIndex = 0
var sitesContainer = [];


// Retrieve Functionality
if(JSON.parse(localStorage.getItem("sites"))!= null){
    sitesContainer = JSON.parse(localStorage.getItem("sites"));
    displaySite()
}else{
    sitesContainer = [];
}


addBtn.addEventListener("click",function(){
    if(addBtn.innerHTML=="Add website"){
        createSite()
        displaySite()
        resetForm()
    }else if(addBtn.innerHTML=="Update website"){
        sitesContainer[currentIndex].siteName = siteNameInput.value;
        sitesContainer[currentIndex].siteLink = siteLinkInput.value;
        localStorage.setItem("sites",JSON.stringify(sitesContainer))
        displaySite()
        resetForm()
        addBtn.innerHTML = "Add website"
    }
})


// Create Functionality
function createSite(){
    var site = {
        siteName : siteNameInput.value ,
        siteLink : siteLinkInput.value
    }

    sitesContainer.push(site)
    localStorage.setItem("sites",JSON.stringify(sitesContainer))
}


// Display Functionality
function displaySite(){
    var siteContent = ``;
    for (var i = 0; i < sitesContainer.length; i++) {
        siteContent += `
        <div class="row justify-content-between my-3">
            <h2 class="col-md-5">${sitesContainer[i].siteName}</h2>
            <div class="col-md-7">
                <a href = ${sitesContainer[i].siteLink} class="btn btn-primary px-3" target = "_blank">Visit</a>
                <button onclick="deleteSite(${i})" class="btn btn-danger px-3">Delete</button>
                <button onclick="updateSite(${i})" class="btn btn-outline-primary px-3">Update</button>
            </div>
        </div>
        `
    }
    sitesBody.innerHTML = siteContent 
}

// Delete Functionality
function deleteSite(index)
{
    sitesContainer.splice(index,1);
    displaySite();
    localStorage.setItem("sites",JSON.stringify(sitesContainer));
}


// Search Functionality
function searchSite(searchText){
    var siteContent = ``;
    for (var i = 0; i < sitesContainer.length; i++) {
        if(sitesContainer[i].siteName.toLowerCase().includes(searchText.toLowerCase())){

            siteContent += `
            <div class="w-75 d-flex justify-content-between my-3">
                <h2>${sitesContainer[i].siteName}</h2>
                <div>
                    <a href = ${sitesContainer[i].siteLink} class="btn btn-primary px-3" target = "_blank">Visit</a>
                    <button onclick="deleteSite(${i})" class="btn btn-danger px-3">Delete</button>
                    <button onclick="updateSite(${i})" class="btn btn-outline-primary px-3">Update</button>
                </div>
            </div>
            `
        }
    }
    sitesBody.innerHTML = siteContent 
}


// Update Functionality
function updateSite(index){
    currentIndex = index
    siteNameInput.value = sitesContainer[currentIndex].siteName
    siteLinkInput.value = sitesContainer[currentIndex].siteLink
    addBtn.innerHTML = "Update website"
}

// reset Functionality
function resetForm(){
    for(i=0;i<inputs.length;i++){
        inputs[i].value = ""
    }
}