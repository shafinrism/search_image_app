
const access_key = `ZjUJFyOkra77urP-E4tYm49j_CijzpyRGIjw0cfr378`

const form_element = document.querySelector("form")
const input_element = document.getElementById("search_input")
const search_results = document.querySelector(".search_results")
const show_more_btn = document.getElementById("show_more_btn")

let input_data = ""
let  page = 1;

async function search_images(){

  input_data = input_element.value
  
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${input_data}&client_id=${access_key}`


  const response = await fetch(url)
  const data = await response.json()
  const results = data.results

  if(page===1){
    search_results.innerHTML = ""
  }

  results.map((result) =>{
    const image_wraper = document.createElement("div")
    image_wraper.classList.add("search_result")
    const image = document.createElement("img")
    image.src = result.urls.small
    image.alt = result.alt_description
    const image_link = document.createElement('a')
    image_link.href = result.links.html
    image_link.target = "_blank"
    image_link.textContent = result.alt_description

    image_wraper.appendChild(image)
    image_wraper.appendChild(image_link)
    search_results.appendChild(image_wraper)
    
  })
  page++

  if(page > 1){
    show_more_btn.style.display = 'block'
    
  }

}

form_element.addEventListener("submit",(event)=>{
    event.preventDefault()
    page = 1
    search_images()
    
})

show_more_btn.addEventListener("click",()=>{
  
  search_images()
})

