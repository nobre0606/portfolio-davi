const botao = document.getElementById("botao")
const dropdown = document.getElementById("dropdown")

botao.onclick = (e) =>{
    e.stopPropagation();
    dropdown.classList.toggle("ativo");
    
};

document.addEventListener("click", (e) => {
    if(!botao.contains(e.target) && !dropdown.contains(e.target)){
        dropdown.classList.remove("ativo")
    }
})