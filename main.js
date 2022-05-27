const API_URL_RANDOM ="https://api.thedogapi.com/v1/images/search?limit=3";
  const API_KEY = '1bd963f6-7c48-4aef-aaf7-3009b2f907ae';
const API_URL_FAVORITES ="https://api.thedogapi.com/v1/favourites";
const API_URL_FAVORITES_DELETE = (id) =>`https://api.thedogapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD ="https://api.thedogapi.com/v1/images/upload";


const spanError = document.getElementById("error");
const button = document.getElementById("btn-mas");
button.addEventListener("click", () => {
  loadRandom();
});

async function loadRandom () {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log("perrinos:");
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

    btn1.onclick = () => saveFavorites(data[0].id);
    btn2.onclick = () => saveFavorites(data[1].id);
    btn3.onclick = () => saveFavorites(data[2].id);
  }
};

async function loadFavorites ()  {
  const res = await fetch(API_URL_FAVORITES,{
      method: 'GET',
      headers:{
        'X-API-KEY' : '1bd963f6-7c48-4aef-aaf7-3009b2f907ae'
      }
  });
  const data = await res.json();

  console.log("favorites:");
  console.log(data);

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    const section = document.getElementById("perritosFavoritos");  
    section.innerHTML = "";
    // const h2 = document.createElement("h2");
    // const h2Text = document.createTextNode("Perritos favoritos");
    // h2.appendChild(h2Text);
    // section.appendChild(h2);

    data.forEach((perro) => {
     
      const article = document.createElement("article");
      const img = document.createElement("img");
      const btn = document.createElement("button");
      const btnText = document.createTextNode("Sacar de favoritos");
      
      btn.onclick = () => deleteFavorite(perro.id);
      btn.appendChild(btnText);
      img.src = perro.image.url;
      img.classList.add("imgFav");
      article.appendChild(img);
      article.appendChild(btn);
      article.classList.add("articleFav");
      section.appendChild(article);
    });
  }
};

async function saveFavorites(id) {
  const res = await fetch(API_URL_FAVORITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "1bd963f6-7c48-4aef-aaf7-3009b2f907ae"
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log("PERRITO GUARDADO");
    loadFavorites();
  }
}

async function deleteFavorite(id) {
  const res = await fetch(API_URL_FAVORITES_DELETE(id), {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "1bd963f6-7c48-4aef-aaf7-3009b2f907ae"
      }
  });
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    console.log("Perrito eliminado");
    loadFavorites();
  }
}

async function uploadFoto(){

    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    console.log(formData.get('file'));

    const res = await fetch(API_URL_UPLOAD,{
        method: 'POST',
        headers:{
            // "Content-Type" : 'multipart/formdata',
            "X-API-KEY":"1bd963f6-7c48-4aef-aaf7-3009b2f907ae"
        },
        body: formData,
    })
    const data = await res.json();
    if (res.status !== 200) {
        spanError.innerHTML = `Hubo un error al subir perrito: ${res.status} ${data.message}`
    }
    else {
        console.log("Foto de perro cargada :)");
        console.log({ data });
        console.log(data.url);
        saveFavorites(data.id) //para agregar el michi cargado a favoritos.

}
}
loadRandom();
loadFavorites();
