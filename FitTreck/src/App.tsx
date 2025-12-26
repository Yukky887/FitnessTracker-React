import { Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { WeightStatsPage } from './components/WeightStatsPage';
import { TrainingPage } from './components/TrainingPage';
import './App.css'
import { useWeightEntries } from './hooks/useWeightEntries';

function App() {
    const { entries, setEntries } = useWeightEntries();

    return (
        <Routes>
            <Route 
                index 
                element={<HomePage entries={entries} setEntries={setEntries} />} />
            <Route 
                path="/weight-stats" 
                element={<WeightStatsPage entries={entries} />} />
            <Route 
                path="/training"
                element={<TrainingPage />} />
        </Routes>

    )
}

export default App
