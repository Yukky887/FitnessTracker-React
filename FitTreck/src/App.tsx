import { Routes, Route } from 'react-router-dom';
import { HomePage } from './HomePage';
import { WeightStatsPage } from './WeightStatsPage';
import { useState } from 'react';
import type { WeightEntry } from './types';
import './App.css'

const STORAGE_KEY = 'weightEntries';

function App() {
    const [entries, setEntries] = useState<WeightEntry[]>(() => {
            const stored = localStorage.getItem(STORAGE_KEY);
    
            if (!stored) {
                return [];
            }
    
            try {
                return JSON.parse(stored) as WeightEntry[];
            } catch {
                return [];
            }
        });

    return (
        <Routes>
            <Route index element={<HomePage entries={entries} setEntries={setEntries} />} />
            <Route path="/weight-stats" element={<WeightStatsPage entries={entries} />} />            
        </Routes>

    )
}

export default App
