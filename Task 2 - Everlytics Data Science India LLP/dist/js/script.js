const request = () => {
    fetch("./data.json", { method: "get" }).then(response => { return response.json(); }).then(data => {
        if (data.length == 0) {
            console.warn(`[WARN] No Data Found in the JSON File`);
            if (confirm("No data found. Do you want to try again?")) {
                request();
            }
            return;
        }
        let tablehead = document.getElementById("tablehead");
        tablehead.innerHTML = '';
        let keys = Object.keys(data[0]);
        // Append the header row dynamically depending on the data
        for (let i in keys) {
            if (data[0][keys[i]] instanceof Object) {
                let innerkeys = Object.keys(data[0][keys[i]]);
                for (let j in innerkeys) {
                    let th = document.createElement("th");
                    th.innerHTML = `${keys[i]}_${innerkeys[j]}`;
                    tablehead.appendChild(th);
                }
            }
            else {
                let th = document.createElement("th");
                th.innerHTML = keys[i];
                tablehead.appendChild(th);
            }
        }
        // Appending the data rows dynamically depending on the data
        document.querySelector("#table_body").innerHTML = '';
        for (let i in data) {
            let tr = document.createElement("tr");
            for (let j in keys) {
                if (data[i][keys[j]] instanceof Object) {
                    let innerkeys = Object.keys(data[i][keys[j]]);
                    for (let k in innerkeys) {
                        let td = document.createElement("td");
                        td.innerHTML = data[i][keys[j]][innerkeys[k]];
                        tr.appendChild(td);
                    }
                }
                else {
                    let td = document.createElement("td");
                    td.innerHTML = data[i][keys[j]];
                    tr.appendChild(td);
                }
            }
            document.querySelector("#table_body").appendChild(tr);
        }
    }).catch(error => {
        console.error(`[ERROR] Data parsing returned an error: ${error}`);
        alert("Error: " + error);
    });
    setTimeout(request, 5000);
};
request();
