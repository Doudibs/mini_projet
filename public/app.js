const API_URL = "/api/projects";
const projectContainer = document.getElementById("projetsContainer");

const nomProjtElement = document.getElementById("nomProjet");
const descriptionProjetElement = document.getElementById("descriptionProjet");
const projetFormElment = document.getElementById("projetForm");

async function chargerProjets() {
  const res = await fetch(`${API_URL}/get_all`);
  const projets = await res.json();
  console.log(projets);
  projectContainer.innerHTML = "";
  projets.forEach((projet) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <h3>${projet.nom}</h3>
        <p>${projet.descriprion} </p>
        <small> Créé le ${new Date(
          projet.createdAt
        ).toLocaleDateString()}</small>
        <button onClick="supprimerProjet(${
          projet.id
        })">Supprimer le projet</button>
        `;
    projectContainer.appendChild(div);
  });
}

async function supprimerProjet(id) {
  await fetch(`${API_URL}/delete_project/${id}`, { method: "DELETE" });
  chargerProjets();
}

async function ajouterProjet(e) {
    e.preventDefault();
  const nomProjet = nomProjtElement.value;
  const descriptionProjet = descriptionProjetElement.value;
 
 const res = await fetch(`${API_URL}/create_project`, {
   method: "POST",
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify({
     nom: nomProjet,
     description: descriptionProjet
   }),
 });

 projetFormElment.reset();
  chargerProjets()
}

projetFormElment.addEventListener("submit", ajouterProjet)
chargerProjets();
