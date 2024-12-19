const url = "https://pokeapi.co/api/v2/pokemon/";

async function getPkmnData(pkmnNames) {
  try {
    const result = await Promise.all(
      pkmnNames.map(pkmn => fetch(`${url}${pkmn}`).then(response => response.json()))
    );
    return result;
  } catch (error) {
    console.error("Problem fetching Pkmn data: " + error);
    return [];
  }
}

export default getPkmnData;