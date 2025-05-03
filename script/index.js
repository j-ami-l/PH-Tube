const showLoader =()=>{
    document.getElementById("loader").classList.remove("hidden")
    document.getElementById("video-container").classList.add("hidden")
}


const hideLoader = () =>{
    document.getElementById("loader").classList.add("hidden")
    document.getElementById("video-container").classList.remove("hidden")
}

function removeActiveClass(){
    const btnActive = document.getElementsByClassName("active");
    for(let btn of btnActive) btn.classList.remove("active");
}



const loadCatergoris = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
    .catch(err => console.log(err))
}

const loadViodes = (searchText="") => {
    showLoader();
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => {
            displayVideos(data.videos)
            removeActiveClass();
            const clickedButton = document.getElementById(`btn-all`)
            clickedButton.classList.add("active")
        })
        .catch(err => console.log(err))
}


const loadCategoryVideos = (id) => {
    showLoader();
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayVideos(data.category)
            removeActiveClass();
            const clickedButton = document.getElementById(`btn-${id}`)
            clickedButton.classList.add("active")
        })
        .catch(err => console.log(err))

}


const loadVideodetails = (videoId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    fetch(url).then(res=>res.json()).then(data=>{
        displayVideoDetails(data.video)
    })
} 




const displayVideoDetails = (video) => {
    document.getElementById("video_details").showModal();
    const detailsContainer = document.getElementById("detials-container")

    detailsContainer.innerHTML =
    `
    <div class="card bg-base-100 image-full  shadow-sm">
    <figure>
    <img class ="w-full h-[150px] object-cover"
      src="${video.thumbnail}"
      alt="Shoes" />
    </figure>
    <div class="card-body">
        <h2 class="card-title">${video.title}</h2>
        <p>${video.description}</p>
    <div class="card-actions justify-end">
      
    </div>
    </div>
    </div>
    <div class="flex items-center gap-4 ml-3 mt-5">
    <div class="avatar">
        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
            <img src="${video.authors[0].profile_picture}" />
        </div>
    </div>
    <p class="text-sm font-semibold flex items-center gap-1">${video.authors[0].profile_name}
    </div>
    `
}


// {category_id: '1001', category: 'Music'}
function displayCategories(categories) {
    //get container 
    const categoryContainer = document.getElementById("category-container")
    for (let cat of categories) {
        const categoriesContainer = document.createElement("div")
        categoriesContainer.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        categoryContainer.appendChild(categoriesContainer)
    }
}



const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container")
    videoContainer.innerHTML = "";

    if(videos.length == 0){
        hideLoader()
        videoContainer.innerHTML = `
        <div class="col-span-4 flex flex-col items-center text-center py-20 gap-4">
            <img src="./Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oopps!!Sorry,There is no content here</h2>
        </div>
        `

        return;
    }

    videos.forEach(video => {

        const videoCard = document.createElement("div")
        videoCard.innerHTML = `
        <div class="card bg-base-100 m-5 ">
            <figure class="relative">
                <img class="w-full h-[200px] object-cover"
                    src="${video.thumbnail}"
                    alt="thumblain" />
                    <span class="absolute text-white bottom-2 right-2 bg-black px-2 text-sm rounded">3hrs 56min 3sec ago</span>
            </figure>
            <div class=" flex gap-3 py-5">
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring-2 ring-offset-2">
                          <img src="${video.authors[0].profile_picture}" />
                        </div>
                      </div>
                </div>
                <div class="intro">
                    <h2 class="text-sm font-semibold">${video.title}</h2>
                    <p class="text-sm text-gray-400 flex items-center gap-1">${video.authors[0].profile_name}
                    <img id="verified-icon" class="w-5 h-5 ${video.authors[0].verified == true ? `block`:`hidden`} " src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">
                    </p>
                    <p class="text-sm text-gray-400 ">${video.others.views} views</p>
                </div>
            </div>
            <button onclick="loadVideodetails('${video.video_id}')" class="btn btn-block">Show Details</button>
        </div>
        `

        videoContainer.appendChild(videoCard)
    });
    hideLoader()
}

document.getElementById("search-input").addEventListener("keyup", (event)=>{
    const input = event.target.value;
    loadViodes(input)
})


loadCatergoris()
