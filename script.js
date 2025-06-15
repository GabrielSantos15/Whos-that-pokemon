const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const containerPokemon = document.querySelector("#containerPokemon");
const urlApi = "https://pokeapi.co/api/v2/";

let nomePokemon

async function consultar(url) {
  const response = await fetch(url);

  if (response.ok) {
    return await response.json();


  } else {
    alert("Parece que algo deu errado");
  }
}

async function sortear() {
  const randomId = Math.floor(Math.random() * 1025) + 1;
  const pokemon = await consultar(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
  nomePokemon = pokemon.name
  console.log(nomePokemon)
  mostrar(pokemon)
}

function mostrar(pokemon){
  document.querySelector('canvas').style.filter = "brightness(0)"

  const img = new Image();
  img.src = pokemon.sprites.front_default;
  img.onload = () => {
    setTimeout(()=>{
      mensagem("Quem é esse pokémon ?")
      ctx.clearRect(0,0,canvas.width,canvas.height)
      ctx.drawImage(img, 0,0, 500, 500)
    },2000)
  }
}

function verificar(resp){
  if(resp == nomePokemon){
    mensagem('Acertou, era o ' + nomePokemon)
  }else{
    mensagem('Errou, era o ' + nomePokemon)
  }
  document.querySelector('canvas').style.filter = "brightness(1)"
}
sortear()

function mensagem(text){
  document.querySelector('#msg').innerHTML = text;
}

document.querySelector('#verificarForm').addEventListener("submit",(event)=>{
  event.preventDefault()
  const resp = document.querySelector('#inputTexto').value
  document.querySelector('#inputTexto').value = ''
  verificar(resp)
})

