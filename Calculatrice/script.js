const textCalcul = document.getElementsByClassName("calcul");
const buttons = document.querySelectorAll(".button");

let memoire = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.classList.contains("number") || button.classList.contains("method")) {
            memoire += button.innerHTML;
            textCalcul[0].innerHTML = memoire; 
        } else if (button.classList.contains("del")) {
            memoire = memoire.slice(0, -1);
            textCalcul[0].innerHTML = memoire;
        } else if (button.classList.contains("ac")) {
            memoire = "";
            textCalcul[0].innerHTML = "";
        } else if (button.classList.contains("entrer")) {
            try {
                let result = eval(memoire.replace(/x/g, '*'));
                textCalcul[0].innerHTML = result;
                memoire = result.toString();
            } catch (Error) {
                textCalcul[0].innerHTML = "Error";
                memoire = "";
            }
        }
    });
});