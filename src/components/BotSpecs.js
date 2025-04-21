import React from 'react';

function BotSpecs({ bot, handleBack, handleAddToArmy }) {
  return (
    <div className="bot-specs">
      <h2>{bot.name}</h2>
      <img src={bot.avatar_url} alt={bot.name} />
      <p><strong>Catchphrase:</strong> {bot.catchphrase}</p>
      <p><strong>Class:</strong> {bot.bot_class}</p>
      <p><strong>Health:</strong> {bot.health}</p>
      <p><strong>Damage:</strong> {bot.damage}</p>
      <p><strong>Armor:</strong> {bot.armor}</p>

      <button onClick={() => handleAddToArmy(bot)}>Add to Army</button>
      <button onClick={handleBack}>Back</button>
    </div>
  );
}

export default BotSpecs;
