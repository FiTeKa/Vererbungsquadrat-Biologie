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
        alert('Please enter both parents');
        return;
    }
    if (parent1.length !== parent2.length) {
        alert('Both parents must have the same length');
        return;
    }
    if (parent1.length % 2 !== 0 || parent2.length % 2 !== 0) {
        alert('Both parents must have an even length');
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
            table += "<td>".concat((parent1Allele + parent2Allele), "</td>");
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
