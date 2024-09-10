const gallery = document.querySelector(".gallery")
const conteneurCategories = document.getElementById("conteneurCategories")
const modaleHtml = document.body.appendChild(document.createElement("div"))
const urlWorks = "http://localhost:5678/api/works"
const urlCategories = "http://localhost:5678/api/categories"
let works 
let categories
let premiereModale = 0
let inputFile 
let Titre
const svgBin = `
<svg width="9" height="11" viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg" class="svgBin">
    <path d="M2.71607 0.35558C2.82455 0.136607 3.04754 0 3.29063 0H5.70938C5.95246 0 6.17545 0.136607 6.28393 0.35558L6.42857 0.642857H8.35714C8.71272 0.642857 9 0.930134 9 1.28571C9 1.64129 8.71272 1.92857 8.35714 1.92857H0.642857C0.287277 1.92857 0 1.64129 0 1.28571C0 0.930134 0.287277 0.642857 0.642857 0.642857H2.57143L2.71607 0.35558ZM0.642857 2.57143H8.35714V9C8.35714 9.70915 7.78058 10.2857 7.07143 10.2857H1.92857C1.21942 10.2857 0.642857 9.70915 0.642857 9V2.57143ZM2.57143 3.85714C2.39464 3.85714 2.25 4.00179 2.25 4.17857V8.67857C2.25 8.85536 2.39464 9 2.57143 9C2.74821 9 2.89286 8.85536 2.89286 8.67857V4.17857C2.89286 4.00179 2.74821 3.85714 2.57143 3.85714ZM4.5 3.85714C4.32321 3.85714 4.17857 4.00179 4.17857 4.17857V8.67857C4.17857 8.85536 4.32321 9 4.5 9C4.67679 9 4.82143 8.85536 4.82143 8.67857V4.17857C4.82143 4.00179 4.67679 3.85714 4.5 3.85714ZM6.42857 3.85714C6.25179 3.85714 6.10714 4.00179 6.10714 4.17857V8.67857C6.10714 8.85536 6.25179 9 6.42857 9C6.60536 9 6.75 8.85536 6.75 8.67857V4.17857C6.75 4.00179 6.60536 3.85714 6.42857 3.85714Z" fill="white"/>
</svg>`
const svgImg = `
<svg width="70" height="61" viewBox="0 0 70 61" fill="none" xmlns="http://www.w3.org/2000/svg" class="zoneInputBeforePreview">
<path d="M60.5517 6.88793C61.7228 6.88793 62.681 7.84612 62.681 9.01724V51.5768L62.0156 50.7118L43.9165 27.2894C43.3176 26.5042 42.3727 26.0517 41.3879 26.0517C40.4031 26.0517 39.4715 26.5042 38.8594 27.2894L27.8136 41.5824L23.7546 35.8998C23.1557 35.0614 22.1975 34.569 21.1595 34.569C20.1214 34.569 19.1632 35.0614 18.5644 35.9131L7.91783 50.8183L7.31896 51.6434V51.6034V9.01724C7.31896 7.84612 8.27715 6.88793 9.44827 6.88793H60.5517ZM9.44827 0.5C4.75048 0.5 0.93103 4.31945 0.93103 9.01724V51.6034C0.93103 56.3012 4.75048 60.1207 9.44827 60.1207H60.5517C65.2495 60.1207 69.069 56.3012 69.069 51.6034V9.01724C69.069 4.31945 65.2495 0.5 60.5517 0.5H9.44827ZM20.0948 26.0517C20.9337 26.0517 21.7644 25.8865 22.5394 25.5655C23.3144 25.2444 24.0186 24.7739 24.6118 24.1807C25.2049 23.5876 25.6755 22.8834 25.9965 22.1083C26.3175 21.3333 26.4828 20.5027 26.4828 19.6638C26.4828 18.8249 26.3175 17.9943 25.9965 17.2192C25.6755 16.4442 25.2049 15.74 24.6118 15.1468C24.0186 14.5537 23.3144 14.0831 22.5394 13.7621C21.7644 13.4411 20.9337 13.2759 20.0948 13.2759C19.2559 13.2759 18.4253 13.4411 17.6503 13.7621C16.8752 14.0831 16.171 14.5537 15.5779 15.1468C14.9847 15.74 14.5142 16.4442 14.1931 17.2192C13.8721 17.9943 13.7069 18.8249 13.7069 19.6638C13.7069 20.5027 13.8721 21.3333 14.1931 22.1083C14.5142 22.8834 14.9847 23.5876 15.5779 24.1807C16.171 24.7739 16.8752 25.2444 17.6503 25.5655C18.4253 25.8865 19.2559 26.0517 20.0948 26.0517Z" fill="#B9C5CC"/>
</svg>

`
const svgX = `
<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="xmark">
<path d="M11.6546 2.05106C12.1235 1.58214 12.1235 0.820611 11.6546 0.351691C11.1856 -0.11723 10.4241 -0.11723 9.95519 0.351691L6.005 4.30563L2.05106 0.355442C1.58214 -0.113479 0.820611 -0.113479 0.351691 0.355442C-0.11723 0.824363 -0.11723 1.58589 0.351691 2.05481L4.30563 6.005L0.355442 9.95894C-0.113479 10.4279 -0.113479 11.1894 0.355442 11.6583C0.824363 12.1272 1.58589 12.1272 2.05481 11.6583L6.005 7.70437L9.95894 11.6546C10.4279 12.1235 11.1894 12.1235 11.6583 11.6546C12.1272 11.1856 12.1272 10.4241 11.6583 9.95519L7.70437 6.005L11.6546 2.05106Z" fill="black"/>
</svg>

`
const svgArrow = `
<svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow hidden">
<path d="M0.439478 7.94458C-0.146493 8.53055 -0.146493 9.48217 0.439478 10.0681L7.9399 17.5686C8.52587 18.1545 9.47748 18.1545 10.0635 17.5686C10.6494 16.9826 10.6494 16.031 10.0635 15.445L5.11786 10.5041H19.4999C20.3297 10.5041 21 9.83375 21 9.00402C21 8.17428 20.3297 7.50393 19.4999 7.50393H5.12255L10.0588 2.56303C10.6447 1.97706 10.6447 1.02545 10.0588 0.439478C9.47279 -0.146493 8.52118 -0.146493 7.93521 0.439478L0.43479 7.9399L0.439478 7.94458Z" fill="black"/>
</svg>

`

let messageErreur 
let boutonValider

testerSessionStorage()

/******************* vérifier si sessionStorage possède le token d'autentification ******************/

async function testerSessionStorage(){

    works = await setTableauWorks()

    categories = await setTableauCategories()

    ajouterWorksGallerie()

    

    if (sessionStorage.getItem('auth token')) {
        
        ajouterLogOut()

        afficherModeEdition()

        lancerLaModale()
        
    }
    else {

            ajouterCategories()

            filterCategories()
            
    
    }
    
    
}

/******************* Extraire les travaux et les catégories de la base de donnée ******************/


async function setTableauWorks(){
    const fetchResponseWorks = await fetch(urlWorks)
    return fetchResponseWorks.json()
}

async function setTableauCategories(){
    const fetchResponseCategories = await fetch(urlCategories)
    return fetchResponseCategories.json()
}

/******************* Ajouter les travaux et les filtres de categories en mode invité ******************/

function ajouterWorksGallerie() {

    gallery.innerHTML = ""
    for (const i of works) {
        gallery.innerHTML += 
        `<figure class="contenuRemplacé"><img src="${i.imageUrl}" alt="${i.title}"</figure>
        <figcaption>${i.title}</figcaption>`
    }

}

function ajouterCategories() {
    conteneurCategories.innerHTML += 
    `<h2 class="categories" id="Tous">Tous</h2>`
    for (const i of categories) {
        conteneurCategories.innerHTML += 
        `<h2 class="categories" id="${i.name}">${i.name}</h2>`
    }
}

function filterCategories() {
    document.getElementById("Tous").addEventListener("click", async () => { /* on réinitialise la valeur de works quand Tous est séléctionné */

        works = await setTableauWorks()

        ajouterWorksGallerie()
    })

    categories.forEach(category => {
        document.getElementById(category.name).addEventListener("click", async () => { /* on filtre les works pour qu'il ne reste que les works dont le nom est le même que la catégorie séléctionnée */

            works = await setTableauWorks()

            works = works.filter(work => work.category.name === category.name)

            ajouterWorksGallerie()
        })

    })

}

/******************* afficher Logout au lieu de Login, le header: "mode édition" et l'encart modifier ******************/

function ajouterLogOut() {
    const login = document.getElementById("login")

    login.textContent = "logout"

    login.href = ''

    login.addEventListener("click", ()=>{
        sessionStorage.clear()
        location.reload()
    })
}

function afficherModeEdition() {
    const modeEdition = document.querySelector(".modeEdition")
    modeEdition.classList.remove("displayNone")
    modeEdition.classList.add("displayFlex")
}

function lancerLaModale(){

    ajouterEncartModifier()

    ecouterEncartModifier()
}

function ajouterEncartModifier() {
    
    document.querySelector(".conteneurh2Modifier").innerHTML += `
    <div class="encartModifier">
    	<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" class="penToSquare black">
		<path d="M14.0229 2.18576L14.3939 2.55679C14.6821 2.84503 14.6821 3.31113 14.3939 3.5963L13.5016 4.49169L12.0879 3.07808L12.9803 2.18576C13.2685 1.89751 13.7346 1.89751 14.0198 2.18576H14.0229ZM6.93332 8.23578L11.0484 4.11759L12.4621 5.53121L8.34387 9.64633C8.25494 9.73525 8.14455 9.79964 8.02496 9.83337L6.23111 10.3455L6.7432 8.55162C6.77693 8.43203 6.84133 8.32164 6.93025 8.23271L6.93332 8.23578ZM11.9408 1.14625L5.89074 7.1932C5.62397 7.45998 5.43078 7.78808 5.32959 8.14685L4.4526 11.2133C4.379 11.4708 4.44953 11.7468 4.63965 11.9369C4.82977 12.127 5.10574 12.1976 5.36332 12.124L8.42973 11.247C8.79156 11.1427 9.11967 10.9495 9.38338 10.6858L15.4334 4.63888C16.2951 3.77722 16.2951 2.37894 15.4334 1.51728L15.0624 1.14625C14.2007 0.284585 12.8024 0.284585 11.9408 1.14625ZM3.19844 2.34214C1.70816 2.34214 0.5 3.55031 0.5 5.04058V13.3812C0.5 14.8715 1.70816 16.0796 3.19844 16.0796H11.5391C13.0293 16.0796 14.2375 14.8715 14.2375 13.3812V9.94683C14.2375 9.539 13.9094 9.21089 13.5016 9.21089C13.0937 9.21089 12.7656 9.539 12.7656 9.94683V13.3812C12.7656 14.0589 12.2167 14.6078 11.5391 14.6078H3.19844C2.52076 14.6078 1.97188 14.0589 1.97188 13.3812V5.04058C1.97188 4.36291 2.52076 3.81402 3.19844 3.81402H6.63281C7.04065 3.81402 7.36875 3.48591 7.36875 3.07808C7.36875 2.67025 7.04065 2.34214 6.63281 2.34214H3.19844Z" fill="white"/>
		</svg>
    <p>modifier</p>
    </div>
    `
}

/******************* créer la modale si l'on clique sur "modifier" ******************/

function ecouterEncartModifier() {

    document.querySelector(".encartModifier").addEventListener("click", ()=> {

        if (premiereModale==0) {

            créerLaModale()

            modaleAffichage1()

            premiereModale++

            return premiereModale

        }
        else {

            modaleHtml.setAttribute("aria-hidden","false")
            
        }
    })
}

function créerLaModale() {

    modaleHtml.setAttribute("class","modale")
    modaleHtml.setAttribute("aria-modal","true")
    modaleHtml.setAttribute("aria-hidden","false")

}

/******************* affichage 1 de la modale ******************/

function modaleAffichage1() {

    modaleHtml.innerHTML = `
        <div class="modal-wrapper">
        <div class="arrowXmark">
        ${svgArrow}
        ${svgX}
        </div>
        <h3 class="titreWrapper">Galerie photo</h3>
        <div class="photosContainer"></div>
        <div class="categories ajouterPhoto mettreEnVert" id="AjouterPhoto">Ajouter une photo</div>       
        </div>
    `

    ajouterWorksModale()

    ecouterAffichage1()

    ecouterSuppressionWorks()
}

async function ajouterWorksModale() {

    const photosContainer = document.querySelector(".photosContainer")

    photosContainer.innerHTML =''

    for (const i of works) {

        const workId = i.id

        photosContainer.innerHTML += 
            `
            <div class="containerPhotoBin" id="box-${workId}">
            <img src="${i.imageUrl}" class="imgModale">
            <div class="binContainer" id="${workId}">
            ${svgBin}
            </div>
            </div>
            `
    }
}

function ecouterAffichage1() {
    
    document.querySelector(".xmark").addEventListener("click", ()=> {
        modaleHtml.setAttribute("aria-hidden","true")
    })

    window.onclick = (event) => {
        if (event.target == modaleHtml) {
            modaleHtml.setAttribute("aria-hidden","true")
        }
    }

    document.getElementById("AjouterPhoto").addEventListener("click", ()=> {
        modaleAffichage2()
    })
}

/******************* supprimer les travaux dans l'affichage 1 et réinitialiser l'affichage de la gallerie et de la modale ******************/

function ecouterSuppressionWorks() {
    document.querySelectorAll(".binContainer").forEach(container =>{
        container.addEventListener("click", async()=>{

            await removeWork(container.id++)

            ajouterWorksGallerie()

            modaleAffichage1()
        })
    })
}

async function removeWork(element){
    await fetch(`http://localhost:5678/api/works/${element}`, {
        method:'DELETE',
        headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('auth token')}`
    }
    })

    works = await setTableauWorks()
}

/******************* affichage 2 de la modale ******************/

async function modaleAffichage2() {
    
    categories = await setTableauCategories()

    modaleHtml.innerHTML = `
    <div class="modal-wrapper">

    <div class="arrowXmark">

        <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="arrow">
        <path d="M0.439478 7.94458C-0.146493 8.53055 -0.146493 9.48217 0.439478 10.0681L7.9399 17.5686C8.52587 18.1545 9.47748 18.1545 10.0635 17.5686C10.6494 16.9826 10.6494 16.031 10.0635 15.445L5.11786 10.5041H19.4999C20.3297 10.5041 21 9.83375 21 9.00402C21 8.17428 20.3297 7.50393 19.4999 7.50393H5.12255L10.0588 2.56303C10.6447 1.97706 10.6447 1.02545 10.0588 0.439478C9.47279 -0.146493 8.52118 -0.146493 7.93521 0.439478L0.43479 7.9399L0.439478 7.94458Z" fill="black"/>
        </svg>
        ${svgX}
    
    </div>

    <h3 class="titreWrapper">Ajout photo</h3>

    <form action="#" method="post" class="menuAjouter">

        <div class="zoneInput">

            ${svgImg}
            <label for="inputFile" id="labelInputFile" class="inputFile zoneInputBeforePreview" >+ Ajouter photo</label>
            <input type="file" class="inputFile zoneInputBeforePreview" id="inputFile" accept="image/jpeg, image/png">
            <span class="zoneInputBeforePreview">jpg, png : 4mo max</span>

        </div>

        <label for="Titre">Titre</label>
        <input type="text" id="Titre">

        <label for="Categorie">Catégorie</label>
        <select id="Categorie">
        </select>

        <div  class="messageErreur"></div>

    </form>

    <div id="validerAjout" class="ajouterPhoto mettreEnGris">Valider</div>
    </div>
    
    `
    messageErreur = document.querySelector(".messageErreur")

    messageErreur.innerHTML = ""
    
    boutonValider = document.getElementById("validerAjout")

    ajouterOptionsCategories() /* met les options de catégories dans un menu déroulant */

    vérifierTailleImage() /* vérifie que l'image entrée n'excede pas 4mo */

    ecouterInputFile() /* vérifie si une image est entrée et ouvre sa prévisualisation */

    ecouterTitre() /* vérifie si un titre est entré */

    ecouterAjoutWorks() /* Vérifie si le formulaire est complet avant de poster */
    
    ecouterAffichage2() /* rend la flèche et la croix cliquables */
}

async function ajouterOptionsCategories() {

    const categorieMenu = document.getElementById("Categorie")

    for (const i of categories) {

        const option = document.createElement('option')

        option.value = i.id

        option.textContent = i.name

        categorieMenu.appendChild(option)

    }
}

function vérifierTailleImage() {
    const image = document.getElementById("inputFile")
    image.addEventListener('change', ()=>{
        const file = image.files[0]
        const maxSize = 4 * 1024 * 1024

        if (file && file.size > maxSize) {

            messageErreur.classList.add("rouge")
            messageErreur.innerHTML = "Fichier trop volumineux"
            image.value = ""
        }
    })
}

function ecouterInputFile() {

    const zoneInput = document.querySelector(".zoneInput")

    const boutonFiles = document.getElementById("inputFile")


    boutonFiles.addEventListener("change", ()=>{

        testerFormComplete()

        if (boutonFiles.files[0]) {

            document.querySelectorAll(".zoneInputBeforePreview").forEach(element => {
                element.classList.add("displayNone");
            })

            const img = document.createElement('img')

            img.setAttribute('id', "imagePreview")

            zoneInput.appendChild(img)

            const url = URL.createObjectURL(boutonFiles.files[0])

            document.getElementById("imagePreview").setAttribute('src', url)
        }
    })
}

function ecouterTitre() {
    document.getElementById("Titre").addEventListener("change", ()=>{
        testerFormComplete()
    })
}

function ecouterAjoutWorks() {

    const btnValider = document.getElementById("validerAjout")

    btnValider.addEventListener("click", async()=>{

        inputFile = document.getElementById("inputFile").files[0]
        
        Titre = document.getElementById("Titre").value
        
        const categorie = document.getElementById("Categorie").value

        if (inputFile && Titre) {

            await posterImage(inputFile, Titre, categorie)

            ajouterWorksGallerie()

            modaleAffichage2()

            messageErreur.innerHTML = "Votre image à été ajoutée"

            messageErreur.classList.add("vert")


        }
        else if (inputFile){
            messageErreur.classList.add("rouge")
            messageErreur.innerHTML = "Veuillez renseigner un titre"
        }
        else if (Titre) {
            messageErreur.classList.add("rouge")
            messageErreur.innerHTML = "Veuillez entrer une image"
        }
        else {
            messageErreur.classList.add("rouge")
            messageErreur.innerHTML = "Veuillez entrer un titre et une image"
        }

    })
}

function ecouterAffichage2() {
    document.querySelector(".xmark").addEventListener("click", ()=> {
        modaleHtml.setAttribute("aria-hidden","true")
    })

    document.querySelector(".arrow").addEventListener("click", ()=>{
        modaleAffichage1()
    })
}

 async function posterImage(inputFile, Titre, categorie) {

    const formData = new FormData()

    formData.append('title', Titre)
    formData.append('category', categorie)
    formData.append('image', inputFile)

    await fetch(urlWorks, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('auth token')}`
        },
        body: formData
    })

    works = await setTableauWorks()

}

function testerFormComplete() {

    inputFile = document.getElementById("inputFile").files[0]
        
    Titre = document.getElementById("Titre").value

    if (inputFile && Titre) {

        boutonValider.classList.add("mettreEnVert")
        boutonValider.classList.add("categories")
    }
}