import { Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { WeightStatsPage } from './components/WeightStatsPage';
import { TrainingPage } from './components/TrainingPage/TrainingPage';
import './App.css'
import { useWeightEntries } from './hooks/useWeightEntries';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { WorkoutEntry } from './types';

const STORAGE_KEY = 'workoutEntries';

function App() {
    const { entries, setEntries } = useWeightEntries();
    const [workouts, setWorkouts] = useLocalStorage<WorkoutEntry[]>(STORAGE_KEY, []);

    return (
        <Routes>
            <Route 
                index 
                element={<HomePage workouts={workouts} entries={entries} setEntries={setEntries} />} />
            <Route 
                path="/weight-stats" 
                element={<WeightStatsPage entries={entries} />} />
            <Route 
                path="/training/:date"
                element={<TrainingPage workouts={workouts} setWorkouts={setWorkouts} />} />
        </Routes>

    )
}

export default App
