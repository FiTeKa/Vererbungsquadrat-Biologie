window.onload = () => {
    initButtonListener();
}

function initButtonListener() {
    const button = document.getElementById('generateButton') as HTMLButtonElement;
    button.addEventListener('click', (event) => {
        event.preventDefault();

        generateTable();
    });
}

function generateTable(){
    const parent1Input = document.getElementById('parent1') as HTMLInputElement;
    const parent2Input = document.getElementById('parent2') as HTMLInputElement;

    const resultContainer = document.getElementById('resultContainer') as HTMLDivElement;

    const parent1 = parent1Input.value.trim();
    const parent2 = parent2Input.value.trim();

    if(parent1 === '' || parent2 === ''){
        alert('Bitte beiede Eltern eingeben');
        return;
    }

    if(parent1.length !== parent2.length){
        alert('Genomlängen der Eltern müssen gleich sein');
        return;
    }

    if(parent1.length % 2 !== 0 || parent2.length % 2 !== 0){
        alert('Genomlängen der Eltern müssen gerade sein');
        return;
    }

    const parent1Combinations = getCombinations(parent1);
    const parent2Combinations = getCombinations(parent2);

    console.log(parent1Combinations);
    console.log(parent2Combinations);

    let table = '<table><tr><th></th>';
    parent2Combinations.forEach((allele) => table += `<th>${allele}</th>`);
    table += '</tr>';

    parent1Combinations.forEach((parent1Allele) => {
        table += `<tr><th>${parent1Allele}</th>`;
        parent2Combinations.forEach((parent2Allele) => {
            table += '<td>'
            
            let parent1AlleleSplited = parent1Allele.split('');
            let parent2AlleleSplited = parent2Allele.split('');

            for(let i = 0; i < parent1AlleleSplited.length; i++){
                table += `${parent1AlleleSplited[i]}${parent2AlleleSplited[i]} `;
            }
            
            table += '</td>';
        });
        table += '</tr>';
    });

    table += '</table>';
    resultContainer.innerHTML = table;
}

function getCombinations(alleles: string): string[] {
    if(alleles.length === 0) return [""];
    const firstPair = alleles.slice(0, 2);
    const restCombinations = getCombinations(alleles.slice(2));
    return [
        ...restCombinations.map((combination) => firstPair[0] + combination),
        ...restCombinations.map((combination) => firstPair[1] + combination)
    ];
}