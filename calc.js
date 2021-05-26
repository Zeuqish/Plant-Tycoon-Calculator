var flowers = [['Anthurium', 17], ['Aureus', 13], ['Baccatus', 21], ['Blazing', 11], ['Bluestar', 4], ['Citrus', 16], ['Daisy', 2], ['Fabled', 9], ['Fourpetal', 12], ['Fragrant', 10], ['Jalapa', 8], ['Lilia', 20], ['Mela', 15], ['Mystic', 5], ['Nox', 3], ['Painted', 1], ['Rosaceae', 6], ['Spotted', 0], ['Tahitian', 19], ['Tilia', 22], ['Venomous', 14], ['Venus', 18], ['Viola', 7]];
var foliage = [['Ananas', 7], ['Astera', 4], ['Ball Cactus', 16], ['Bamboo', 11], ['Fanleaf', 9], ['Fern', 6], ['Glaber', 17], ['Gladiatus', 5], ['Grass', 2], ['Lemonbush', 10], ['Maple', 12], ['Maranta', 8], ['Multiflora', 21], ['Orchid', 3], ['Pear Cactus', 15], ['Pipe Cactus', 14], ['Pitcher', 19], ['Rare Oak', 13], ['Reptans', 0], ['Ridgeball', 22], ['Scandens', 1], ['Tigerfern', 18], ['Weeper', 20]];
var flowernames = ["Spotted", "Painted", "Daisy", "Nox", "Bluestar", "Mystic", "Rosaceae", "Viola", "Jalapa", "Fabled", "Fragrant", "Blazing", "Fourpetal", "Aureus", "Venomous", "Mela", "Citrus", "Anthurium", "Venus", "Tahitian", "Lilia", "Baccatus", "Tilia"]
var foliagenames = ["Reptans", "Scandens", "Grass", "Orchid", "Astera", "Gladiatus", "Fern", "Ananas", "Maranta", "Fanleaf", "Lemonbush", "Bamboo", "Maple", "Rare Oak", "Pipe Cactus", "Pear Cactus", "Ball Cactus", "Glaber", "Tigerfern", "Pitcher", "Weeper", "Multiflora", "Ridgeball"]

function join(val1,val2,arr) {
    var x = document.getElementById(val1).value, 
    y = document.getElementById(val2).value;

    if (x > y){
        var temp = y;
        y = x;
        x = temp;
    } 
	if (x == y) {
        return arr[x];
    } else {
        return arr[Math.ceil(y/2 + x*0.5)];
    }
}

function search(input) {
	var val = parseInt(input);
	var minimum = Math.max(0,(2*val-23)); 
	//input values >11 (or half of the number of flowers/foliage)  would not start at 0, but from 1 onwards.
	//2*val-23 = (val-11)+(val-12). val-11 is checking for val > 11. val-12 is added to correct for the fact that flower/foliage values occur in batches of two (i.e. 0,1,1,2,2,3,3...)
	var potentials = [[val,val]];
	for (var i = minimum; i <= val-1; i++){
		if (i == minimum && minimum != 0){
			potentials.push([i,(val*2)-(i+1)]);
		} else {
			potentials.push([i,(val*2)-i]);
			potentials.push([i,(val*2)-(i+1)]);
		}

	}
	return potentials
}

function setup(){
	var plant_details = document.querySelectorAll(".input_flower");
	for (var i = 0; i < 6; i++){
		plant_details[i].addEventListener("change",pollinate);
		}

    for (var j = 0; j < 6; j+=2){
		for (var i = 0; i < 23; i++){
			plant_details[j].options[i] = new Option(flowers[i][0],flowers[i][1],false,false);
			plant_details[j+1].options[i] = new Option(foliage[i][0],foliage[i][1],false,false);
		}
    }
	
	pollinate();
}

function search_dom(){
	var plant = [document.getElementById("search_input_flow").value, document.getElementById("search_input_fol").value];
	var flower_result = [search(plant[0]),search(plant[1])];
	console.log(flower_result);
	var output_table = document.getElementById("searchres");
	var output_table_len = output_table.rows.length - 1;
	var max_result_len = Math.max(flower_result[0].length,flower_result[1].length);
	
	for (var i = output_table_len; i > 0; i-=1){
		output_table.deleteRow(i);
	}
	name_change();
	for (var k = 0; k < max_result_len+1; k++){
		var i = k+1;
		var row = output_table.insertRow(i);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		if (k < flower_result[0].length){
			cell1.innerHTML = flowernames[flower_result[0][i-1][0]] + " x " + flowernames[flower_result[0][i-1][1]];
		}
		if (k < flower_result[1].length){
			cell2.innerHTML = foliagenames[flower_result[1][i-1][0]] + " x " + foliagenames[flower_result[1][i-1][1]];
		}
	}
	
}

function name_change(){
	var out1 = document.getElementById("searchflow");
    var out2 = document.getElementById("searchfol");
	out1.innerHTML = flowernames[document.getElementById("search_input_flow").value];
	out2.innerHTML = foliagenames[document.getElementById("search_input_fol").value];
	
}

function pollinate(){
	var out1 = document.getElementById("out1");
    var out2 = document.getElementById("out2");
	var output = [join("plant1_flow","plant2_flow",flowernames), join("plant1_fol","plant2_fol",foliagenames)];
	out1.innerHTML = output[0];
	out2.innerHTML = output[1];
}
