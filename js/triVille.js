let csvFile;
let listVille = [];
let nbPermutation = 0;
let nbComparaison = 0;

document.querySelector("#read-button").addEventListener('click', function () {
    csvFile = document.querySelector("#file-input").files[0];
    let reader = new FileReader();
    reader.addEventListener('load', function (e) {
        // récupération de la liste des villes
        listVille = getArrayCsv(e.target.result);

        // Calcul de la distance des villes par rapport à Grenoble
        listVille.forEach(ville => {
            ville.distanceFromGrenoble = distanceFromGrenoble(ville);
        });
        // Tri
        const algo = $("#algo-select").val();
        nbPermutation = 0;
        nbComparaison = 0;
        sort(algo);

        // Affichage 
        displayListVille()
    });
    reader.readAsText(csvFile)
})

/**
 * Récupére la liste des villes contenu dans le fichier csv
 * @param csv fichier csv brut
 * @returns la liste des villes mis en forme
 */
function getArrayCsv(csv) {
    let listLine = csv.split("\n")
    listVille = [];
    let isFirstLine = true;
    listLine.forEach(line => {
        if (isFirstLine || line === '') {
            isFirstLine = false;
        } else {
            let listColumn = line.split(";");
            listVille.push(
                new Ville(
                    listColumn[8],
                    listColumn[9],
                    listColumn[11],
                    listColumn[12],
                    listColumn[13],
                    0
                )
            );
        }
    });
    return listVille;
}

/**
 * Calcul de la distance entre Grenoble et une ville donnée
 * @param ville ville
 * @returns la distance qui sépare la ville de Grenoble
 */
function distanceFromGrenoble(ville) {
    // latitude et longitude de Grenoble
    const lat1 = 45.188529;
    const lon1 = 5.724524;
    const lat2 = ville.latitude;
    const lon2 = ville.longitude;

    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
 
    return d;
}

/**
 * Retourne vrai si la ville i est plus proche de Grenoble
 * par rapport à j
 * @param {*} i distance de la ville i
 * @param {*} j distance de la ville j
 * @return vrai si la ville i est plus proche
 */
function isLess(i, j) {
    if (i.distanceFromGrenoble < j.distanceFromGrenoble) {
        return true;
    }
   
    
}

/**
 * interverti la ville i avec la ville j dans la liste des villes
 * @param {*} i 
 * @param {*} j 
 */
 function swap(tab, i, j) {
    [tab[i], tab[j]] = [tab[j], tab[i]];
    nbPermutation++;
}


function sort(type) {
    switch (type) {
        case 'insert':
            insertsort(listVille);
            break;
        case 'select':
            selectionsort(listVille);
            break;
        case 'bubble':
            bubblesort(listVille);
            break;
        case 'shell':
            shellsort(listVille);
            break;
        case 'merge':
            mergesort(listVille);
            break;
        case 'heap':
            heapsort(listVille);
            break;
        case 'quick':
            quicksort(listVille);
            break;
    }
}

function insertsort(T) {
    function tri_insertion (T) {
        let n = T.length;
        for (let i=1; i < n; i++) {
            let temp = T[i].distanceFromGrenoble;
            let j = i-1;
            while (j >= 0 && T[j].distanceFromGrenoble > temp) {
               
                T[j+1].distanceFromGrenoble = T[j].distanceFromGrenoble;
                j = j - 1;
            }
            T[j+1].distanceFromGrenoble = temp;    
    }
    }
    tri_insertion(T)
}

function selectionsort(T) {
    function tri_selection(T){
        let n = T.length;
        for (let i=0; i < n; i++) {
            let min = i;
            for (let j=i+1; j < n; j++) {
                if(T[j].distanceFromGrenoble < T[min].distanceFromGrenoble) {
                    min=j;
                }
            }
            swap(T, i, min);
        }
    }
    
    tri_selection(T);
}

function bubblesort(tab) {
    function sort(tab) {
        let changed = true;
    
        while (changed) {
            changed = false;
            for (let i = 0; i < tab.length - 1; i++) {
    
                if (tab[i].distanceFromGrenoble > tab[i + 1].distanceFromGrenoble) {
                    swap(tab, tab[i], tab[i+1]);
                    changed = true;
                }
            }
        }
    }
    
    sort(tab);
}

function shellsort() {
    console.log("shellsort - implement me !");
}

function mergesort(T) {
    function tri_fusion(T) {
        let n = T.length;
        if (n <= 1) {
            return T;
        }
        else {
            // coupe les tableaux en deux (après avoir déterminé le médian)
            let middle = Math.floor(n / 2);
            let leftT = T.slice(0, middle);
            let rightT = T.slice(middle, n);
            // continue de couper de façon récursive
            return fusion(
                tri_fusion(leftT),
                tri_fusion(rightT)
            );
        };
    }
    
    // fonction récursive qui lie les tableaux pré-triés. 
    
    function fusion(left, right) {
      
       
        // vérifie si les deux sous-tableaux sont vides
            // cas si left est vide
            if(left.length === 0) {
                return right;
            }
            // cas si right est vide
            else if(right.length === 0) {
                return left;
            }
            // trouve valeur min
            else if(left[0].distanceFromGrenoble <= right[0].distanceFromGrenoble) {
            //concatène en les plaçant du bon côté
                        return [left[0].distanceFromGrenoble].concat(fusion(left.slice(1, left.length), right));
                }else {
                    return [right[0]].distanceFromGrenoble.concat(fusion(left, right.slice(1, right.length)));
        }
       
    }
    
    tri_fusion(T);
}


function heapsort() {
    console.log("heapsort - implement me !");
}

function quicksort(tab) {
    function triRapide (tab, first, last) {
        let pivot;
        if(first < last){
    // choisit le dernier comme pivot
            pivot =  last;
            pivot = part(tab, first , last, pivot);
            triRapide(tab,first, pivot -1);
            triRapide(tab, pivot + 1, last);
        }
        return tab;
    }
    
    function part(tab, first, last, pivot){
        swap(tab, pivot, last);
        let j=first;
            for (i = first; i < last; i++) {
                if(tab[i].distanceFromGrenoble <= tab[last].distanceFromGrenoble) {
                    swap(tab, i, j);
                    j = j+1;
                }
            }
        swap(tab, last,j);
        return j;
    }
    triRapide(tab, 0, tab.length -1);
}

/** MODEL */

class Ville {
    constructor(nom_commune, codes_postaux, latitude, longitude, dist, distanceFromGrenoble) {
        this.nom_commune = nom_commune;
        this.codes_postaux = codes_postaux;
        this.latitude = latitude;
        this.longitude = longitude;
        this.dist = dist;
        this.distanceFromGrenoble = distanceFromGrenoble;
    }
}

/** AFFICHAGE */
function displayPermutation(nbPermutation) {
    document.getElementById('permutation').innerHTML = nbPermutation + ' permutations';
}

function displayListVille() {
    document.getElementById("navp").innerHTML = "";
    displayPermutation(nbPermutation);
    let mainList = document.getElementById("navp");
    for (var i = 0; i < listVille.length; i++) {
        let item = listVille[i];
        let elem = document.createElement("li");
        elem.innerHTML = item.nom_commune + " - \t" + Math.round(item.distanceFromGrenoble * 100) / 100 + ' m';
        mainList.appendChild(elem);
    }
}
