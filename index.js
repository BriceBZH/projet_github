/*********** Bouton Recherche ************/

/*****************************************/
const container = document.querySelector('.container');

function recherche() {
  const inputRec = document.createElement("input");
  inputRec.name = "pseudo";
  inputRec.className = "inputRec";
  const buttonRec = document.createElement("button");
  buttonRec.textContent = "Rechercher";
  buttonRec.className = "buttonRec";
  const divRec = document.createElement("div");
  divRec.appendChild(inputRec);
  divRec.appendChild(buttonRec);
  container.appendChild(divRec);
}

function messageErreur(error) {
  if(error === 404) {
    const div = document.querySelector('div');
    const pError = document.createElement("p");
    pError.className = "error";
    pError.textContent = "Lien non trouvé";
    div.appendChild(pError);
  }
}

function calcJours(dateCreation) {
  const dateNow = new Date();
  const dateCreate = new Date(dateCreation);
  const dif = dateNow.getTime() - dateCreate.getTime();
  const joursDiv = Math.round(dif / (1000 * 3600 * 24));
  return joursDiv;
}

function dateFr(dateCreate) {
  const dateFrench = new Date(dateCreate);
  return dateFrench.toLocaleDateString("fr");
}

function cacherRepos() {
  const articleRepos = document.querySelector('.articleRepos');
  const test = document.querySelector('.articleRepos.visible');
  if(test) {
    articleRepos.classList.remove("visible");
  } else {
    articleRepos.classList.add("visible");
  }
}

function displayRepos(data) {
  console.log(data.length);
  const section = document.createElement("section");
  section.className = "section";
  const article = document.querySelector('.articlePage');
  article.appendChild(section);
  const sectionRepos = document.querySelector(".section");
  const imgLess = document.createElement("img");
  imgLess.src = "imgs/symbole-negatif.png";
  imgLess.className = "imgLess";
  imgLess.alt = "Voir moins/plus";
  sectionRepos.appendChild(imgLess);
  const articleRepos = document.createElement("article");
  articleRepos.className = "articleRepos";
  sectionRepos.appendChild(articleRepos);
  /***** affichage repos ****/
  for(let i = 0; i<data.length; i++) {
    const h3Repos = document.createElement("h3");
    h3Repos.textContent = data[i].name;
    const pUrlRepos = document.createElement("p");
    const urlRepos = document.createElement("a");
    urlRepos.href = data[i].html_url;
    urlRepos.target = "_blank";
    urlRepos.textContent = data[i].html_url;
    pUrlRepos.textContent = "Url : ";
    pUrlRepos.appendChild(urlRepos);
    const createRepos = document.createElement("p");
    createRepos.textContent = "Date création : "+dateFr(data[i].created_at);
    const lastMajRepos = document.createElement("p");
    lastMajRepos.textContent = "Dernière MAJ : "+dateFr(data[i].pushed_at);
    articleRepos.appendChild(h3Repos);
    articleRepos.appendChild(pUrlRepos);
    articleRepos.appendChild(createRepos);
    articleRepos.appendChild(lastMajRepos);
  }
  imgLess.addEventListener('click', cacherRepos);
}

function displayData(data) {
  let article = "";
  if(document.querySelector('.articlePage') === null) {
    article = document.createElement("article");
  } else {
    article = document.querySelector('.articlePage');
  }
  article.className = "articlePage";
  container.appendChild(article);
  clear();
  // IMG
  const pImg = document.createElement("p");
  const img = document.createElement("img");
  img.src = data.avatar_url;
  img.alt = "avatar";
  pImg.appendChild(img);
  // AUTRES
  const h2Pseudo = document.createElement("h2");
  h2Pseudo.textContent = data.login;
  h2Pseudo.className = "pseudo";
  const pCreate = document.createElement("p");
  pCreate.textContent = "Utilisateur créé le "+dateFr(data.created_at)+", il y a "+calcJours(data.created_at)+" jours";
  const pRepos = document.createElement("p");
  pRepos.textContent = "Nombre de repos : "+data.public_repos; 
  const a = document.createElement("a");
  a.textContent = "Voir";
  a.className = "aGit";
  a.href = data.html_url;
  a.target = "_blank";
  article.appendChild(pImg);
  article.appendChild(h2Pseudo);
  article.appendChild(pCreate);
  article.appendChild(pRepos);
  article.appendChild(a);
  console.log(data);
  funcFetch(displayRepos, data.repos_url);
}

function clear() {
  const articlePage = document.querySelector('.articlePage');
  articlePage.innerHTML = '';
}

function funcFetch(affichage, url) {
  fetch(url).then(function (response) {
    if (response.ok) {
      response.json().then(affichage)
    } else {
      messageErreur(response.status);
    }
  });
}

recherche();

const button = document.querySelector('.buttonRec');
button.addEventListener('click', function() {
  const input = document.querySelector('.inputRec');
  const apiUrl = "https://api.github.com/users/"+input.value;
  funcFetch(displayData, apiUrl);
});

const imgLess = document.querySelector('.imgLess');
