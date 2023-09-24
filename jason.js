"use strict";

 

//1) Déclaration des variables

let morts = [];//morts.length est un compteur
let fin = false;
let nbVictime;
let tabNoms = ["Martin", "Manon", "Yvan", "Anissa", "Lily", "Anthony", "Eve"];
let tabCara = ["sportif", "intello", "populaire", "fan de Percy Jackson", "cuisiner amateur", "danceur étoile"];
let attaque;
let tabVictime = [0, 0, 0];
let victime="mort";
 

//2) Création des Classes

class Tueur{//On définit le tueur selon ses 2 caractéristiques : son nom et ses pv

    constructor(nom, vie){

        this.nom = nom;

        this.vie = vie;

    }

}

class Perso{//On définit la classe Perso selon l'énoncé

    constructor(nom, cara, probaMort, probaDeg, probaMortDeg, tab){

        this.nom = nom;

        this.cara = cara;

        this.probaMort = probaMort;

        this.probaDeg = probaDeg;

        this.probaMortDeg = probaMortDeg;

        this.tab = tab;//on crée un tableau qui servivra pour les probabilités d'attaque

    }

}

 

//3) Création des Fonctions

function listeSurvivants(tabPersos){//pour afficher les personnages de la liste

    for(let i = 0;i<tabPersos.length;i++)

    if(tabPersos[i]!="mort"){

        console.log(tabPersos[i].nom+" "+tabPersos[i].cara);

    }

    console.log("");

}

function alea(min, max){

    /**

     * Math.floor prend l'entier inférieur ou égal à un nombre

     * Math.random donne un résultat aléatoire entre 0 et 1(exclus)

     * En multipliant par (max-min) on obtient un résultat entre 0 et (max-min+1)(exclus) donc entre (max-min)inclus

     * En ajoutant min on obtient un résultat entre min et max

     */

    let nbAlea = Math.floor(Math.random()*(max-min+1)+min);

    return nbAlea;

}

function creerPerso(){//cette fonction va me permettre de créer un personnage aléatoirement

    let nbNom = alea(0,tabNoms.length-1);

    let nbCara = alea(0,tabCara.length-1);

    let nbA = alea(0,10);

    let nbB = alea(0,10-nbA);

    let nbC = 10 - nbA - nbB;

    //les 3 nombres sont choisis aléatoirement et ils sont liés de sorte à ce que la somme vaut 10

    let tab = [];

    for(let i = 0;i<nbA;i++){

        tab.push(1);

    }

    for(let i = 0;i<nbB;i++){

        tab.push(2);

    }

    for(let i = 0;i<nbC;i++){

        tab.push(3);

    }

    ////ce tableau est créé en fonction des probas Mort, Deg et MortDeg. Ce tableau contient un nombre de 1=probaMort, de 2=probaDeg et de 3=probaMortDeg

    //Il a donc 10 cases dont la proportion de 1, 2 et 3 dépend des probabilitiés précédentes

    let perso = new Perso (tabNoms[nbNom], tabCara[nbCara], nbA, nbB, nbC, tab);

    return perso;

}

 

//4) Création de tous les personnages

let tabPersos = [creerPerso(), creerPerso(), creerPerso(), creerPerso(), creerPerso()]

let killer = new Tueur ("Jason", 100);

 

//5) Programme Principal

console.log("L'équipe est composée de : ");

listeSurvivants(tabPersos);

console.log(killer);

console.log("");

while(fin == false){

    while(victime=="mort"){

        nbVictime = alea(0, tabPersos.length-1)

        victime = tabPersos[nbVictime];

    }

    attaque = victime.tab[alea(0,victime.tab.length-1)];//1->Mort 2->Deg 3->Mort+Deg

    if(attaque == 1){

        console.log(victime.nom+" est mort au combat...");

        morts.push(victime);

        tabPersos[nbVictime]="mort";

        victime="mort";

        console.log("L'équipe est composée de : ");

        listeSurvivants(tabPersos);

    }else if(attaque==2){

        console.log(victime.nom+" a esquivé et infligé 10 dégâts au tueur !");

        killer.vie-=10;

        console.log("Il reste "+killer.vie+" pv au tueur");

        victime="mort";

        console.log("L'équipe est composée de : ");

        listeSurvivants(tabPersos);

    }else{

        console.log(victime.nom+" s'est sacrifié et a infligé 15 dégâts au tueur !");

        killer.vie-=15;

        console.log("Il reste "+killer.vie+" pv au tueur");

        morts.push(victime);

        tabPersos[nbVictime]="mort";

        victime="mort";

        console.log("L'équipe est composée de : ");

        listeSurvivants(tabPersos);

    }

    if(killer.vie<=0){

        console.log("Les survivants ont gagné mais RIP à : ");

        listeSurvivants(morts);

        fin = true;

    }else if(morts.length == 5){

        console.log("L'équipe est morte, Jason a gagné...");

        fin = true;

    }else{

        fin = false;

    }

}