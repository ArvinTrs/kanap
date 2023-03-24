

function affichageProduits(){
    fetch('http://localhost:3000/api/products')
        .then(res => res.json())
        .then (function(data){
            for (let produit in data) {
    
                let a = document.createElement("a");
                document.querySelector(".items").appendChild(a);
                a.href = `./product.html?id=${data[produit]._id}`;
                
                let article = document.createElement("article");
                a.appendChild(article);
                
                let img = document.createElement("img");
                article.appendChild(img);
                img.src = data[produit].imageUrl;
                img.alt = data[produit].altTxt;
                
                let h3 = document.createElement("h3"); 
                article.appendChild(h3); 
                h3.className = "productName"; 
                h3.innerText = data[produit].name; 
                
                let p = document.createElement("p"); 
                article.appendChild(p); 
                p.className = "productDescription"; 
                p.innerText = data[produit].description; 
                };
            })
        .catch(function(error){
            let erreur = document.getElementById("items");
            erreur.innerText = "Une erreur s'est produite";
        });       
};

affichageProduits();



