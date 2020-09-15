function Set(subject,object,possAd,possP,reflexive,plural){
    this.they = subject;
    this.them = object;
    this.their = possAd;
    this.theirs = possP;
    this.themself = reflexive;
    this.plural = plural;
}

sets = [];
setDisplay = document.getElementById("sectionSets").style.display;

// defaults: he, she, they (singular), ze, they (plural)
sets.push(new Set("he","him","his","his","himself",false));
sets.push(new Set("she","her","her","hers","herself",false));
sets.push(new Set("they","them","their","theirs","themself",true));
sets.push(new Set("ze","hir","hir","hirs","hirself",false));
sets.push(new Set("they","them","their","theirs","themselves",true));

defaultSet = sets[2];

//adding pronoun sets + related functions
function setTemplate(index){
    oldIndex = sets.indexOf(defaultSet);
    document.getElementById("template"+oldIndex).classList.remove("selected");

    defaultSet = sets[index];
    document.getElementById("template"+index).classList.add("selected");

    document.getElementById("entry1").value = defaultSet.they;
    document.getElementById("entry2").value = defaultSet.them;
    document.getElementById("entry3").value = defaultSet.their;
    document.getElementById("entry4").value = defaultSet.theirs;
    document.getElementById("entry5").value = defaultSet.themself;
    if (defaultSet.plural) document.getElementById("entry6").innerText = "are";
    else document.getElementById("entry6").innerText = "is";

    setExamples();
}

function setPlural(){
    value = document.getElementById("entry6").innerText;
    value === "are" ? value = "is" : value = "are";
    document.getElementById("entry6").innerText = value;
}

function setExamples(){
    they = document.getElementById("entry1").value;
    They = they.charAt(0).toUpperCase() + they.slice(1);

    document.getElementById("example1").innerText = They;
    for (i = 2; i < 7; i++){
        value = "";
        if (i < 6) value = document.getElementById("entry"+i).value;
        else value = document.getElementById("entry"+i).innerText;
        document.getElementById("example"+i).innerText = value;
    }
}

function addPronouns(){
    values = [];
    for (i = 1; i < 7; i++){
        value = "";
        if (i < 6) value = document.getElementById("entry"+i).value;
        else {
            value = (document.getElementById("entry"+i).innerText != "is");
        }
        values[i-1] = value;
    }
    tempSet = new Set(values[0],values[1],values[2],values[3],values[4],values[5]);
    // make sure this set doesn't already exist
    exists = false;
    index = sets.length;
    for (i = 0; i < sets.length; i++){
        if ((sets[i].they == tempSet.they)&&(sets[i].them == tempSet.them)&&(sets[i].their == tempSet.their)&&(sets[i].theirs == tempSet.theirs)&&(sets[i].themself == tempSet.themself)&&(sets[i].plural == tempSet.plural)){
            exists = true;
            index = i;
            break;
        }
    }
    if (!exists){
        sets.push(tempSet);

        if (setDisplay===""){
            setDisplay="block";
            document.getElementById("sectionSets").style.display = "block";
        }

        setButton = '<span class="templateOpt" id="template'+index+'" onclick="setTemplate('+index+')">'+tempSet.they+'/'+tempSet.them+'</span>';
        document.getElementById("addedSets").innerHTML += setButton;
    }
    setTemplate(index);
}

function pageCollapse(id){
    element = document.getElementById(id);
    if (element.style.display === "none"){
        element.style.display = "block";
        document.getElementById(id+"Arrow").innerHTML = "&uarr;";
    }
    else {
        element.style.display = "none";
        document.getElementById(id+"Arrow").innerHTML = "&darr;";
    }
}

//actual parser
function parse(){
    input = document.getElementById("parseIn").value;
    output = "";
    for (i = 0; i < input.length; i++){
        if (input[i] === "[" && input[i-1] != "\\"){
            // find  the ]
            for (j = i+1; j < input.length; j++){
                if (input[j] === "]") break;
            }
            command = input.slice(i+1,j);
            
            // is it a pronoun?
            switch (command.toLowerCase()){
                case "they":
                case "them":
                case "their":
                case "theirs":
                case "themself":
                    output += insertPronoun(command);
                    break;
                default:
                    output += insertWord(command);
                    break;
            }

            i = j;
        }
        else {
            output += input[i];
        }
    }
    document.getElementById("parseOut").value = output;
}

function pluralise(text){
    text += "s";
    return text;
}

function singularise(text){
    text = text.slice(0,text.length-1);
    return text;
}

function insertPronoun(text){
    switch (text.toLowerCase()){
        case "they":
            output = defaultSet.they;
            break;
        case "them":
            output = defaultSet.them;
            break;
        case "their":
            output = defaultSet.their;
            break;
        case "theirs":
            output = defaultSet.theirs;
            break;
        case "themself":
            output = defaultSet.themself;
            break;
    }
    // limited case sensitivity; lower, upper, title
    titleText = text[0].toUpperCase() + text.slice(1).toLowerCase();
    if (text === text.toUpperCase()) output = output.toUpperCase();
    else if (text === titleText) output = output[0].toUpperCase() + output.slice(1);

    return output;
}

function insertWord(text){
    // is there more than one parameter?
    bar1 = -1;
    bar2 = -1;
    for (i = 0; i < text.length; i++){
        if (text[i] === "|"){
            if (bar1 > -1) bar2 = i;
            else bar1 = i;
        }
    }

    // only one parameter
    if (bar1 === -1) {
        //cba to detect whether it's already plural/singular
        if (defaultSet.plural) text = pluralise(text);
        else text = singularise(text);
    }
    else if (bar2 === -1){
        // [singular|plural]
        if (defaultSet.plural) text = command.slice(bar1+1);
        else text = text.slice(0,bar1);
    }
    else {
        // [he|she|they]
        switch (defaultSet){
            case sets[0]:
                text = text.slice(0,bar1);
                break;
            case sets[1]:
                text = text.slice(bar1+1,bar2);
                break;
            default:
                text = text.slice(bar2+1);
                break;
        }
    }

    return text;
}