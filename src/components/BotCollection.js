import React from 'react';
import BotCard from './BotCard';

function BotCollection({ bots, handleBotClick }) {
  return (
    <div className="bot-collection">
      <h2>All Bots</h2>
      {bots.map((bot) => (
        <BotCard key={bot.id} bot={bot} handleClick={handleBotClick} />
      ))}
    </div>
  );
}

export default BotCollection;
