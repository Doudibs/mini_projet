const API_URL = "/api/projects";
const projetsContainer = document.getElementById("projetsContainer");
const projetForm = document.getElementById("projetForm");
const nomProjet = document.getElementById("nomProjet");
const descriptionProjet = document.getElementById("descriptionProjet");

async function chargerProjets() {
  const res = await fetch(`${API_URL}/get_all`);
  const projets = await res.json();
  console.log(projets);

  projetsContainer.innerHTML = "";

  for (const projet of projets) {
    const resTaches = await fetch(`${API_URL}/${projet.id}/taches/get_taches`);
    const taches = await resTaches.json();

    console.log("La liste des taches  : ", taches);

    const div = document.createElement("div");
    div.className = "projet-card";

    div.innerHTML = `
      <h3>${projet.nom}</h3>
      <p>${projet.description || ""}</p>
      <small>Créé le ${new Date(projet.createdAt).toLocaleDateString()}</small>
      <button onclick="supprimerProjet(${projet.id})">Supprimer</button>
      <h4>Taches : </h4>
      <ul> 
      ${taches
        .map(
          (tch) => `
        <li>${tch.titre} - ${tch.statut} <button onClick="supprimerTache(${projet.id},${tch.id})"> Supprimer la tache </button></li>
        
        `
        )
        .join("")}
      
      </ul>

      <form onsubmit="ajouterTache(event, ${projet.id})">  
        <input name="titre" placeholder="Nouvelle Tache" required/>
        <button type="submit">Ajouter la tache</button>
      </form>

    `;

    projetsContainer.appendChild(div);
  }
}

async function ajouterProjet(e) {
  e.preventDefault();

  const res = await fetch(`${API_URL}/create_project`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nom: nomProjet.value,
      description: descriptionProjet.value,
    }),
  });

  const erreurDiv = document.getElementById("erreurProjet");

  if (res.status == 400) {
    const data = await res.json();
    if (data.errors && Array.isArray(data.errors)) {
      const messages = data.errors.map((err) => `- ${err.msg}`).join("</br>");
      erreurDiv.innerHTML = messages;
    } else {
      erreurDiv.innerHTML = "Erreur inattendur lors de la creation du projet";
    }
  } else {
    erreurDiv.innerHTML = "";
    projetForm.reset();
    chargerProjets();
  }
}

async function supprimerProjet(id) {
  await fetch(`${API_URL}/delete_project/${id}`, { method: "DELETE" });
  chargerProjets();
}

async function supprimerTache(projectId, tacheId) {
  await fetch(`${API_URL}/${projectId}/taches/delete_tache/${tacheId}`, {
    method: "DELETE",
  });

  chargerProjets();
}

async function ajouterTache(e, projectId) {
  e.preventDefault();
  const titre = e.target.titre.value;

  await fetch(`${API_URL}/${projectId}/taches/create_tache`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titre }),
  });
  chargerProjets();
}

// Initialisation
projetForm.addEventListener("submit", ajouterProjet);
chargerProjets();
