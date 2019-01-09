function Save2CSV(form) { // Função para gerar o CSV
    var name; // Nome do arquivo
    var str = ""; // Conteudo final formatado
    var flds = form.elements; // Selecao de todos os itens de formulario
    var csvFld = null; // Elemento que recebera os dados finais
    for (fx = 0; fx < flds.length; fx++) { // 'For' para passar por todos os itens do formulario
        var fld = flds[fx]; // Array de formularios
        var fldName = fld.getAttribute("name"); // Selecao do 'name' de cada item
        var fldValue = fld.value; // Valor de cada item
        if ((fld.type == "radio") || (fld.type == "checkbox")) { // Verifica se é um checkbox ou radio button e escreve o valor, caso seja ativado
            if (!fld.checked) {
                fld.value = "não";
            }
            else {
                fld.value = "sim";
            }
        }

        if (fld.type == "button") { continue; }
        if (fld.type == "submit") { continue; }
        if (fld.name == "cpf") { continue; }
        if (fld.name == "Nome do usuário") {
            name = fld.value;
        }
        if (fld.getAttribute("name") == "message") {
            csvFld = fld;
            continue;
        }

        if (fld.type == "radio") {
            str += fld.getAttribute("id") + "," + fld.value + "\n";
        }
        else {
            str += fld.getAttribute("name") + "," + fld.value + "\n";
        }
    }
    str = str.replace(/,$/, "");
    if (csvFld != null) {
        csvFld.value = str;
    }
    //download(this.form['cpf'].value, this.form['message'].value);
    download(name, str);
    return false;
}

function download(filename, text) {
    var d = new Date(); // Variavel de data
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', year + "_" + month + "_" + day + "_" + filename + ".csv");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}