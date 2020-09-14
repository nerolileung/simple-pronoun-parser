function Set(subject,object,possAd,possP,reflexive,plural){
    this.they = subject;
    this.them = object;
    this.their = possAd;
    this.theirs = possP;
    this.themself = reflexive;
    this.plural = plural;
}

sets = [];

// defaults: he, she, they (singular), ze, they (plural)
sets.push(new Set("he","him","his","his","himself",false));
sets.push(new Set("she","her","her","hers","herself",false));
sets.push(new Set("they","them","their","theirs","themself",true));
sets.push(new Set("ze","hir","hir","hirs","hirself",false));
sets.push(new Set("they","them","their","theirs","themselves",true));

defaultSet = sets[3];

function setTemplate(index){
    oldIndex = sets.indexOf(defaultSet);
    document.getElementById("template"+oldIndex).classList.remove("selected");

    defaultSet = sets[index];
    document.getElementById("template"+index).classList.add("selected");

    document.getElementById("quick1").value = defaultSet.they;
    document.getElementById("quick2").value = defaultSet.them;
    document.getElementById("quick3").value = defaultSet.their;
    document.getElementById("quick4").value = defaultSet.theirs;
    document.getElementById("quick5").value = defaultSet.themself;
    if (defaultSet.plural) document.getElementById("quick6").innerText = "are";
    else document.getElementById("quick6").innerText = "is";
}

function setPlural(){
    value = document.getElementById("quick6").innerText;
    value === "are" ? value = "is" : value = "are";
    document.getElementById("quick6").innerText = value;
}

function addPronouns(){
    
}