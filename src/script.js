var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
window.onload = function () {
    initButtonListener();
};
function initButtonListener() {
    var button = document.getElementById('generateButton');
    button.addEventListener('click', function (event) {
        event.preventDefault();
        generateTable();
    });
}
function generateTable() {
    var parent1Input = document.getElementById('parent1');
    var parent2Input = document.getElementById('parent2');
    var resultContainer = document.getElementById('resultContainer');
    var parent1 = parent1Input.value.trim();
    var parent2 = parent2Input.value.trim();
    if (parent1 === '' || parent2 === '') {
        alert('Bitte beiede Eltern eingeben');
        return;
    }
    if (parent1.length !== parent2.length) {
        alert('Genomlängen der Eltern müssen gleich sein');
        return;
    }
    if (parent1.length % 2 !== 0 || parent2.length % 2 !== 0) {
        alert('Genomlängen der Eltern müssen gerade sein');
        return;
    }
    var parent1Combinations = getCombinations(parent1);
    var parent2Combinations = getCombinations(parent2);
    console.log(parent1Combinations);
    console.log(parent2Combinations);
    var table = '<table><tr><th></th>';
    parent2Combinations.forEach(function (allele) { return table += "<th>".concat(allele, "</th>"); });
    table += '</tr>';
    parent1Combinations.forEach(function (parent1Allele) {
        table += "<tr><th>".concat(parent1Allele, "</th>");
        parent2Combinations.forEach(function (parent2Allele) {
            table += '<td>';
            var parent1AlleleSplited = parent1Allele.split('');
            var parent2AlleleSplited = parent2Allele.split('');
            for (var i = 0; i < parent1AlleleSplited.length; i++) {
                table += getAlleleCombination(parent1AlleleSplited[i], parent2AlleleSplited[i]);
            }
            table += '</td>';
        });
        table += '</tr>';
    });
    table += '</table>';
    resultContainer.innerHTML = table;
}
function getCombinations(alleles) {
    if (alleles.length === 0)
        return [""];
    var firstPair = alleles.slice(0, 2);
    var restCombinations = getCombinations(alleles.slice(2));
    return __spreadArray(__spreadArray([], restCombinations.map(function (combination) { return firstPair[0] + combination; }), true), restCombinations.map(function (combination) { return firstPair[1] + combination; }), true);
}
function getAlleleCombination(parent1, parent2) {
    if (getPrettierCombinationsCheckBoxVaule()) {
        return getAlleleCombinationSorted(parent1, parent2);
    }
    return "".concat(parent1).concat(parent2);
}
function getAlleleCombinationSorted(parent1, parent2) {
    var alleles = [parent1, parent2];
    alleles.sort();
    return alleles.join('');
}
function getPrettierCombinationsCheckBoxVaule() {
    console.log(getPrettierCombinationsCheckBox().checked);
    return getPrettierCombinationsCheckBox().checked;
}
var prettierCombinations;
function getPrettierCombinationsCheckBox() {
    if (prettierCombinations)
        return prettierCombinations;
    prettierCombinations = document.getElementById('prettierCombinations');
    return prettierCombinations;
}
