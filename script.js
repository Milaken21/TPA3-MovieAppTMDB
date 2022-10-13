const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4fa74fe5b12c27161bb024697ba820c7&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=4fa74fe5b12c27161bb024697ba820c7&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies){
    main.innerHTML = ''

    movies.forEach((movie) => {
        const {title, release_date, poster_path, vote_average, overview} = movie

        const moviesElement = document.createElement('div')
        moviesElement.classList.add('movie')

        moviesElement.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <div>
                    <h3>${title}</h3>
                    <p>${release_date}</p>
                </div>
                <div> <span class="${getClassByRate(vote_average)}">${vote_average}</span></div>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `
        main.appendChild(moviesElement)
    })
}

function getClassByRate(vote){
    if(vote >=8){
        return 'green'
    }else if (vote >=5){
        return 'orange'
    }else {
        return 'red'
    }
}
form.addEventListener('submit' ,(e) => {
    e.preventDefault()

    const searchValue = search.value

    if(searchValue && searchValue !== ''){
        getMovies(SEARCH_API + searchValue)

        searchValue = ''
    } else{
        window.location.reload()
    }
})