const loadCatergoris = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(err => console.log(err))
}

const loadViodes = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(err => console.log(err))
}

const loadMusicVideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
        .then(data => {
            const videoContainer2 = document.getElementById("video-container")
            videoContainer2.innerHTML= "";
            data.videos.forEach(video =>{
                if(video.category_id === "1001") displayMusicVideo(video);
            })
        })
        .catch(err => console.log(err))
}

// {category_id: '1001', category: 'Music'}
function displayCategories(categories) {
    //get container 
    const categoryContainer = document.getElementById("category-container")
    for (let cat of categories) {
        const categoriesContainer = document.createElement("div")
        if(cat.category === "Music")
        categoriesContainer.innerHTML = `
        <button onclick = "loadMusicVideos()" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        categoryContainer.appendChild(categoriesContainer)
    }
}

const displayMusicVideo = (video) =>{
    
    const videoContainer2 = document.getElementById("video-container")
    const videoCard = document.createElement("div")
        videoCard.innerHTML = `
        <div class="card bg-base-100 ">
            <figure class="relative">
                <img class="w-full h-[200px] object-cover"
                    src="${video.thumbnail}"
                    alt="Shoes" />
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
                    <h2 class="text-sm font-semibold">Colors of the Wind</h2>
                    <p class="text-sm text-gray-400 flex items-center gap-1">${video.authors[0].profile_name}
                        <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">
                    </p>
                    <p class="text-sm text-gray-400 ">${video.others.views} views</p>
                </div>
            </div>
        </div>
        `

        videoContainer2.appendChild(videoCard)
}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container")
    videoContainer.innerHTML = ""
    videos.forEach(video => {

        const videoCard = document.createElement("div")
        videoCard.innerHTML = `
        <div class="card bg-base-100 ">
            <figure class="relative">
                <img class="w-full h-[200px] object-cover"
                    src="${video.thumbnail}"
                    alt="Shoes" />
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
                    <h2 class="text-sm font-semibold">Colors of the Wind</h2>
                    <p class="text-sm text-gray-400 flex items-center gap-1">${video.authors[0].profile_name}
                        <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">
                    </p>
                    <p class="text-sm text-gray-400 ">${video.others.views} views</p>
                </div>
            </div>
        </div>
        `

        videoContainer.appendChild(videoCard)
    });
}




loadCatergoris()
