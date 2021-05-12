(function(){
    // let bouton = document.getElementById("bout_nouvelles")
    let nouvelles = document.querySelector(".nouvelles section")
    let annonce = document.getElementById('annonce')
    window.addEventListener('load', function() {
        monAjax(monObjJS.URLDomaine + '/wp-json/wp/v2/posts?categorie=33&per_page=2', nouvelles)
        monAjax(monObjJS.URLDomaine + '/wp-json/wp/v2/posts?categorie=35&per_page=2', annonce)
    })
    function monAjax(requete, elmDom)
    {
       let maRequete = new XMLHttpRequest();
       console.log(maRequete)
       maRequete.open('GET', requete);
       maRequete.onload = function () {
           console.log(maRequete)
           if (maRequete.status >= 200 && maRequete.status < 400) {
               let data = JSON.parse(maRequete.responseText);
               let chaine = ''
               for (const elm of data) {
                   chaine += '<h2>' + elm.title.rendered + '</h2>'
                   chaine += elm.content.rendered

               }
               elmDom.innerHTML = chaine;
            }
           
            else {
               console.log('La connexion est faite mais il y a une erreur')
           }
       }
       maRequete.onerror = function () {
           console.log("erreur de connexion");
       }
       maRequete.send()
    }

    // Ajoute d'annonce

    bouton_ajout = document.getElementById('bout-rapide')
    bouton_ajout.addEventListener('mousedown', function(){
        console.log('ajout')
        let = monArticle = {
            "title": document.querySelector('.admin-rapid [name="title"]').value,
            "content": document.querySelector('.admin-rapid [name="content"]').value,
            "status" : "publish",
            "categories" : [35]

        }
        console.log(JSON.stringify(monArticle))
        let creerArticle = new XMLHttpRequest()
        creerArticle.open("POST", monObjJS.URLDomaine + '/wp-json/wp/v2/posts')
        creerArticle.setRequestHeader("X-WP-Nonce", monObjJS.nonce)
         creerArticle.setRequestHeader("Content-type", "application/json;charset=UTF8-8")
        creerArticle.send(JSON.stringify(monArticle)) // transmettre la requête au serveur
        creerArticle.onreadystatechange = function() {
            if(creerArticle.readyState == 4) {
                if (creerArticle.status == 201){
                    document.querySelector('.admin-rapid [name="title"]').value = ''
                    document.querySelector('.admin-rapid [name="content"]').value = ''
                }
                else {
                    alert ('erreur réessayez')
                }
            }
        }
    })
}())