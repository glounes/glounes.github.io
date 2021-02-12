export function loadData(f){
    var fileUpload = document.getElementById("fileUpload");

    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
                var rows = e.target.result.split("\n");
                return f(rows);
            }
            reader.readAsText(fileUpload.files[0]);
        }
    }
}
