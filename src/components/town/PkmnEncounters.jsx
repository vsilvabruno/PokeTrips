import PropTypes from 'prop-types';

PkmnEncounters.propTypes = {
  props: PropTypes.object,
  images: PropTypes.object,
  pkmnData: PropTypes.array,
};

function PkmnEncounters({ props, pkmnData }) {
  // "Pkmn encounters" component rendering
  return (
    <>
      <div className="encounters-container">
        {/* Title section with background image and title text */}
        <div className="title">
          <img className="bg" src={props.images.photo_2} alt="Town Photo" />
          <h3>
            <i className="fa-solid fa-paw" /> Some Pokemon I Found
          </h3>
        </div>

        {/* Pkmn encounters list section */}
        <div className="pkmn">
          {pkmnData
          // Sort Pokémon data alphabetically by name
          .sort((a, b) => a.name.localeCompare(b.name))
          // Iterate over each Pokémon and render their details
          .map((pkmn, index) => {
            const pkmnUrl = `https://bulbapedia.bulbagarden.net/wiki/${pkmn.name}`;
            const formattedId = String(pkmn.id).padStart(3, '0');

            return (
              <div key={index}>
                <a href={pkmnUrl} target="_blank" rel="noopener noreferrer">
                  <img 
                    src={pkmn.sprites.other["official-artwork"].front_default} 
                    alt={pkmn.name} 
                  />
                  <h3>#{formattedId}</h3>
                  <h3>{pkmn.name}</h3>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PkmnEncounters;