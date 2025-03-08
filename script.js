document.addEventListener("DOMContentLoaded", function() {
    console.log("Script chargé et DOM prêt !");

    // Fonction pour ajouter un item
    const addButton = document.getElementById("add-button");
    addButton.addEventListener("click", function() {
        console.log("Ajouter un item cliqué");
        const newItemText = prompt("Entrez le nom de l'item :");
        if (newItemText) {
            const newItem = document.createElement("li");
            newItem.classList.add("item");
            newItem.innerHTML = `
                ${newItemText} 
                <button class="delete-button">Supprimer</button> 
                <button class="rename-button">Renommer</button> 
                <button class="add-subitem">Ajouter un sous-item</button>
            `;
            document.getElementById("nav").appendChild(newItem);
            saveItems(); // Sauvegarder après ajout
        }
    });

    // Fonction pour gérer tous les clics sur les items
    document.getElementById("nav").addEventListener("click", function(event) {
        // Supprimer un item
        if (event.target.classList.contains("delete-button")) {
            console.log("Supprimer un item cliqué");
            const item = event.target.closest("li");
            item.remove();
            saveItems(); // Sauvegarder après suppression
        }

        // Renommer un item
        if (event.target.classList.contains("rename-button")) {
            console.log("Renommer un item cliqué");
            const item = event.target.closest("li");
            const newName = prompt("Entrez le nouveau nom de l'item :");
            if (newName) {
                item.firstChild.textContent = newName;
                saveItems(); // Sauvegarder après renommage
            }
        }

        // Ajouter un sous-item
        if (event.target.classList.contains("add-subitem")) {
            console.log("Ajouter un sous-item cliqué");
            const parentItem = event.target.closest("li");
            const subItemText = prompt("Entrez le sous-item :");
            if (subItemText) {
                const subItem = document.createElement("li");
                subItem.textContent = subItemText;
                const sublist = document.createElement("ul");
                sublist.appendChild(subItem);
                parentItem.appendChild(sublist);
                saveItems(); // Sauvegarder après ajout de sous-item
            }
        }
    });

    // Fonction de recherche dans les items
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", function() {
        const query = searchInput.value.toLowerCase();
        const items = document.querySelectorAll("#nav li");
        items.forEach(item => {
            const itemText = item.textContent.toLowerCase();
            if (itemText.includes(query)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    });

    // Sauvegarde des items dans le stockage local
    function saveItems() {
        const items = [];
        document.querySelectorAll("#nav li").forEach(item => {
            items.push(item.textContent.trim());
        });
        localStorage.setItem("items", JSON.stringify(items));
    }

    // Charger les items depuis le stockage local
    function loadItems() {
        const savedItems = JSON.parse(localStorage.getItem("items"));
        if (savedItems) {
            const nav = document.getElementById("nav");
            savedItems.forEach(itemText => {
                const li = document.createElement("li");
                li.innerHTML = `
                    ${itemText} 
                    <button class="delete-button">Supprimer</button> 
                    <button class="rename-button">Renommer</button> 
                    <button class="add-subitem">Ajouter un sous-item</button>
                `;
                nav.appendChild(li);
            });
        }
    }

    // Charger les items au démarrage
    loadItems();
});