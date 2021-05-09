const searchfrorm = document.querySelector('form');
const searchresultdiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchqueary = "";
const appid = 'd57b76d7';
const appkey = 'd34045f6299005bb03873752abcf1594';


searchfrorm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchqueary = e.target.querySelector('input').value;
    fetchAPI();
})

async function fetchAPI(){
    const url = `https://api.edamam.com/search?q=${searchqueary}&app_id=${appid}&app_key=${appkey}&to=20`;
    const response = await fetch(url);
    const data= await response.json();
    generatehtml(data.hits);
}
function generatehtml(results){
    let generatedhtml ='';
    results.map(result =>{
        generatedhtml +=
        `
        <div class="item">
            <img src="${result.recipe.image}" alt="">
            <div class="flex-container">
                <h1 class="title">${result.recipe.label}</h1>
                <a href="${result.recipe.url}" targrt="_blank" class="view-button">View Recipe</a>
            </div>
            <p class="item-data">Calories:${result.recipe.calories.toFixed(2)}</p>
            <p class="item-data">Dishtype:${result.recipe.mealType}</p>
            <p class="item-data">HealthLable:${result.recipe.healthLabels}</p>
        </div>
        `
        console.log(result);
    })
    searchresultdiv.innerHTML = generatedhtml;
}


// cursor
const cursor = document.querySelector(".cursor");

window.addEventListener("mousemove", (e) => {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
  cursor.setAttribute("data-fromTop", cursor.offsetTop - scrollY);
  // console.log(e)
});
window.addEventListener("scroll", () => {
  const fromTop = cursor.getAttribute("data-fromTop");
  cursor.style.top = scrollY + parseInt(fromTop) + "px";
  console.log(scrollY);
});
window.addEventListener("click", () => {
  if (cursor.classList.contains("click")) {
    cursor.classList.remove("click");
    void cursor.offsetWidth; // trigger a DOM reflow
    cursor.classList.add("click");
  } else {
    cursor.classList.add("click");
  }
});
