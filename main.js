
const API_URL_RANDOM ="https://api.thedogapi.com/v1/images/search?limit=3&api_key=1bd963f6-7c48-4aef-aaf7-3009b2f907ae";
const API_URL_FAVORITES = "https://api.thedogapi.com/v1/favourites?api_key=1bd963f6-7c48-4aef-aaf7-3009b2f907ae";


const spanError= document.getElementById("error");
const button = document.getElementById("btn-mas");
button.addEventListener("click", () => {
    loadRandom();
  });

const loadRandom = async () => {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();

  if(res.status !== 200){
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  }else{
      console.log("perrinos:")
      console.log(data);
  const img1 = document.getElementById("img1");
  const img2 = document.getElementById("img2");
  const img3 = document.getElementById("img3");
  const btn1 = document.getElementById("btn1");
  const btn2 = document.getElementById("btn2");
  const btn3 = document.getElementById("btn3");

  img1.src = data[0].url;
  img2.src = data[1].url;
  img3.src = data[2].url;

  btn1.onclick = ()=> saveFavorites(data[0].id);
  btn2.onclick = ()=> saveFavorites(data[1].id);
  btn3.onclick = ()=> saveFavorites(data[2].id);
};
}

loadRandom();


const loadFavorites = async () => {
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();
    
    console.log('favorites:');
    console.log(data);

    if(res.status !==200){
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    }else{
        data.forEach(perro => {
            const section = document.getElementById("perritosFavoritos");
            const article = document.createElement('article');
            const img =document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Sacar de favoritos');

            btn.appendChild(btnText);
            img.src = perro.image.url;
            img.classList.add('imgFav');
            article.appendChild(img);
            article.appendChild(btn);
            article.classList.add('articleFav');
            section.appendChild(article);
        })
    }
};

loadFavorites();

async function saveFavorites(id){
    const res = await fetch(API_URL_FAVORITES,{
        method: "POST",
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            image_id: id
        })
    })
    const data = await res.json();
    console.log('saved:')
    console.log(res);
    
    if(res.status !==200){
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    }
}
