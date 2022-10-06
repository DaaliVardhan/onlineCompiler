function submit(editor,lang){
    let script=ace.edit("editor").getValue();
    let input= $("#input").val();
    let language = document.getElementById("lang").value;
    let program = {
      script: script,
      lang: language,
      stdin: input,
    };
    $.ajax({
      url: "/",
      method: "post",

      data: program,

      success: (result) => {
        $("#output").val(result["output"]);
        // $("#input").val("");
      },
    });
}

$(document).on({
  ajaxStart: function(){
      $("body").addClass("loading"); 
  },
  ajaxStop: function(){ 
      $("body").removeClass("loading"); 
  }    
});



$(document).ready((e) => {
    $(".run").click(() => submit());
    $(document).keydown((e) => {
      if(e.ctrlKey && e.keyCode==13){
        submit();
      }  
    })
    
    let arr = ["python", "java", "c_cpp", "rust"];
    for (let a of arr) {
      if (!localStorage.getItem(a)) {
        let sample = "";
        if (a == "python") {
          sample = "# Code Here";
        }
        if (a == "java") {
          sample =
            "\npublic class Main{\n\tpublic static void main(String args[]){\n\t\t// Code Here;\n\t}\n}\n";
        }
        if (a == "c_cpp") {
          sample =
            "\n#include <iostream>\n\nint main() {\n\tstd::cout << 'Hello World!';\n\treturn 0;\n}";
        }
        if (a == "rust") {
          sample = "\nfn main(){\n\t //Code Here\n}";
        }
        localStorage.setItem(a, sample);
      }
    }

    let editor = ace.edit("editor");

    editor.session.setMode("ace/mode/python");

    editor.setTheme(`ace/theme/xcode`);

    $("#theme").change((e) => {
      let theme = document.getElementById("theme");
      let bgcolor = theme.value == "monokai" ? "#272822" : "#FFFFFF";
      let color = theme.value == "xcode" ? "black" : "white";

      document.querySelectorAll("textarea").forEach((item) => {
        item.style.backgroundColor = bgcolor;
        item.style.color = color;
      });
      editor.setTheme(`ace/theme/${theme.value}`);
    });
    editor.setValue(localStorage.getItem("python"));
    $("#lang").attr("data-lang", "python");

    $("#lang").change((e) => {
      let lang = document.getElementById("lang").value;
      let prev = document.getElementById("lang").getAttribute("data-lang");

      let code = editor.getValue();

      localStorage.setItem(prev, code);
      document.getElementById("lang").setAttribute("data-lang", lang);
      editor.session.setMode(`ace/mode/${lang}`);
      editor.setValue(localStorage.getItem(lang));
      editor.clearSelection();
    });
  });