var str = window.location.href;
var url = new URL(str);
var id = url.searchParams.get("id");
console.log(id);

fetch("http://localhost:3000/api/products/" + id)
  .then((res) => res.json())
  .then(function (dataProduit) {
    let imgProduct = document.createElement("img");
    document.querySelector(".item__img").appendChild(imgProduct);
    imgProduct.src = dataProduit["imageUrl"];
    imgProduct.alt = dataProduit["altTxt"];

    let titleProduct = document.querySelector("#title");
    titleProduct.innerText = dataProduit["name"];

    let priceProduct = document.querySelector("#price");
    priceProduct.innerText = dataProduit["price"];

    let describeProduct = document.querySelector("#description");
    describeProduct.innerText = dataProduit["description"];

    for (let i in dataProduit.colors) {
      let optionColors = document.createElement("option");
      document.querySelector("#colors").appendChild(optionColors);
      optionColors.innerText = dataProduit.colors[i];
      optionColors.value = dataProduit.colors[i];
    }

    /*let selectColor = document.querySelector("#colors");
    let selectQuantity = document.querySelector("#quantity");*/

    let ajouterAuPanier = document.querySelector("#addToCart");

    ajouterAuPanier.addEventListener("click", (e) => {
      e.preventDefault;
      let selectColor = document.querySelector("#colors");
      let selectQuantity = document.querySelector("#quantity");

      let selectColorValue = selectColor.value;
      let selectQuantityValue = Number(selectQuantity.value);
     /* console.log(selectColorValue);
      console.log(selectQuantityValue); */
      let tabLocalStorage = [];
      
      if (
        selectColorValue != "" &&
        selectQuantityValue > 0 &&
        selectQuantityValue <= 100
      ) {
        let newPanier = {
          addNewColor: selectColorValue,
          addNewQuantity: selectQuantityValue,
          addIdProduct: dataProduit._id,
        };

        /*if (localStorage.getItem("product") !== null) {
          tabLocalStorage = JSON.parse(localStorage).getItem("product");
        }*/

        if (localStorage.getItem("product") !== null) {
          tabLocalStorage = JSON.parse(localStorage.getItem("product"));
        }

        // Comparaison entre deux tableaux (doublons)
        // Commande du même produit, comparaison avant remplacement des valeurs sans réajouter *
        let tabAPI = tabLocalStorage.find((x) => {
          return (
            x.addIdProduct === newPanier.addIdProduct &&
            x.addNewColor === newPanier.addNewColor
          );
        });


        // Remplacement de valeurs dans le panier sur le même produit *
        if (tabAPI) {
          let totalQuantity =
            //newPanier.addNewQuantity + tabLocalStorage.addNewQuantity;
            newPanier.addNewQuantity + tabAPI.addNewQuantity;
          // Mise à jour du LocalStorage en quantité
          if (totalQuantity <= 100) {
            //tabLocalStorage.addNewQuantity = tabAPI + newPanier.addNewQuantity;
            tabAPI.addNewQuantity =
              tabAPI.addNewQuantity + newPanier.addNewQuantity;
            localStorage.setItem("product", JSON.stringify(tabLocalStorage));
              alert(
                "Vous avez mis à jour la quantité de ce produit dans le panier."
              ); 
          } else {
            alert("Veuillez entrez une quantité inférieur à 100.");
          }

        } else {
          // on ajoute le nouveau produit dans le panier
          // dès lors si on ajoute le nouveau produit dans le tableau, on met à jour le produit dans le local storage
          alert("Un nouveau produit a été ajouté au panier");
          tabLocalStorage.push(newPanier); // Ajoute un ou plusieurs éléments dans le panier et retourne la nouvelle taille
          //localStorage.setItem("products", JSON.stringify(tabLocalStorage));
          localStorage.setItem("product", JSON.stringify(tabLocalStorage));
        } 
    } 
    }); 
  })  

  .catch(function (error) {
    alert("erreur de récupération des données");
    error;
  });
