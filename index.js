//CONTROLER
require("dotenv").config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, "/public/css")));
app.set('view engine', 'ejs');
let pokedex = [
    {
        id: 1,
        nome: 'Butterfree',
        tipo: "Inseto",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/012.png",
        descricao: "Na batalha, ele bate as asas em grande velocidade para liberar poeira altamente tóxica no ar.",
        altura: "86 cm",
        peso: "20 kg",
        categoria: "Butterfly",
        habilidade: "Compoud eyes",
    },

    {
        id: 2,
        nome: 'Blastoise',
        tipo: "Água",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png",
        descricao: "Ele esmaga seu inimigo sob seu corpo pesado para causar desmaios. Em uma pitada, ele se retirará dentro de sua concha.",
        altura: "123 cm",
        peso: "74 kg",
        categoria: "Shellfish",
        habilidade: "Torrent",
    },

    {
        id: 3,
        nome: 'Charmeleon',
        tipo: "Fogo",
        imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png",
        descricao: "Tem uma natureza bárbara. Na batalha, ele chicoteia sua cauda de fogo e corta com garras afiadas.",
        altura: "140 cm",
        peso: "67 kg",
        categoria: "Flame",
        habilidade: "Blaze",
    },
];

let pokemon = undefined;

// ROTA PRINCIPAL
app.get("/", (req, res) => {
    res.render('index', { pokedex, pokemon });
});

// ROTA CADASTRO
app.get("/cadastro", (req, res) => {
    res.render('cadastro', { pokedex, pokemon });
});

// NOVO POKEMON
app.post("/new", (req, res) => {
    const pokemon = req.body
    pokemon.id = pokedex.length + 1
    pokedex.push(pokemon)
    res.redirect('/')
});

// Edição pokemon
app.get("/edit/:id", (req, res) => {
    const id = +req.params.id;
    pokemon = pokedex.find((pokemon) => pokemon.id === id);
    res.redirect("/cadastro");
});

app.post("/update/:id", (req, res) => {
    const id = +req.params.id - 1;
    const newPokemon = req.body;
    newPokemon.id = id + 1;
    pokedex[id] = newPokemon;
    pokemon = undefined;
    res.redirect("/");
});

// DELETE
app.get("/delete/:id", (req, res) => {
    const id = +req.params.id - 1;
    delete pokedex[id];
    res.redirect("/");
});


app.listen(port, () => console.log(`listening on http://localhost:${port}`));

