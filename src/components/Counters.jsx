import { useState, useEffect } from 'react';
import Counter from './Counter.jsx'

export default () => {
  const [tmpEffectsData, setTMPEffectsData] = useState({});
  const [years, setYears] = useState(0);
  
  const loadData = async () => {
    const response = await fetch('https://api.github.com/repos/Luca3317/TMPEffects');
    const data = await response.json();

    setTMPEffectsData(data)

    var ageDifMs = Date.now() - Date.parse(data.created_at);
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    setYears(Math.abs(ageDate.getUTCFullYear() - 1970));
  }
  
  useEffect(() => {
    loadData();
  }, [])
  
  return (
      <div className="container">
        <h2 className="mb-16 text-6xl">GitHub counters</h2>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4">
          <Counter count={tmpEffectsData.stargazers_count} title="Stars" sub="On GitHub" />
          <Counter count={tmpEffectsData.subscribers_count} title="Watching" sub="The Project" />
          <Counter count={tmpEffectsData.forks} title="Forks" sub="On GitHub" />
          <Counter count={years} title="Years" sub="Since launch" />
        </div>
      </div>  
  );
}
