import React, { useEffect, useState } from 'react';
import BotCollection from './components/BotCollection';
import YourBotArmy from './components/YourBotArmy';
import BotSpecs from './components/BotSpecs';
import './App.css';

function App() {
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('name'); // Default to sorting by name
  const [selectedClass, setSelectedClass] = useState('');

  // Fetch bots from db.json
  useEffect(() => {
    fetch('http://localhost:8001/bots')
      .then(res => res.json())
      .then(data => {
        setBots(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch bots');
        setLoading(false);
      });
  }, []);

  // Sort the bots
  const sortedBots = [...bots].sort((a, b) => {
    if (sortOption === 'health') {
      return b.health - a.health;
    }
    if (sortOption === 'damage') {
      return b.damage - a.damage;
    }
    return a.name.localeCompare(b.name);
  });

  // Filter bots by class
  const filteredBots = selectedClass
    ? sortedBots.filter((bot) => bot.bot_class === selectedClass)
    : sortedBots;

  // Add to army
  function handleBotClick(bot) {
    if (!army.find(b => b.id === bot.id) && !army.find(b => b.bot_class === bot.bot_class)) {
      setArmy([...army, bot]);
    } else {
      alert('You can only enlist one bot from each class!');
    }
  }

  // Remove from army
  function handleRemoveBot(bot) {
    if (window.confirm('Are you sure you want to discharge this bot?')) {
      setArmy(army.filter(b => b.id !== bot.id));
    }
  }

  // Show bot specs
  function handleSelectBot(bot) {
    setSelectedBot(bot);
  }

  // Back from specs
  function handleBack() {
    setSelectedBot(null);
  }

  // Handle sort option change
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Handle class filter
  const handleClassFilter = (className) => {
    setSelectedClass(className);
  };

  useEffect(() => {
    const savedArmy = JSON.parse(localStorage.getItem('army')) || [];
    setArmy(savedArmy);
  }, []);

  useEffect(() => {
    localStorage.setItem('army', JSON.stringify(army));
  }, [army]);

  return (
    <div className="App">
      <h1>🤖 Bot Battlr</h1>

      {loading ? (
        <p>Loading bots...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div>
            <select onChange={handleSortChange}>
              <option value="name">Sort by Name</option>
              <option value="health">Sort by Health</option>
              <option value="damage">Sort by Damage</option>
            </select>

            <button onClick={() => handleClassFilter('Medic')}>Medic</button>
            <button onClick={() => handleClassFilter('Assault')}>Assault</button>
            <button onClick={() => handleClassFilter('Tank')}>Tank</button>
          </div>

          {selectedBot ? (
            <BotSpecs bot={selectedBot} handleBack={handleBack} handleAddToArmy={handleBotClick} />
          ) : (
            <>
              <YourBotArmy army={army} handleRemove={handleRemoveBot} />
              <BotCollection bots={filteredBots} handleBotClick={handleSelectBot} />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
