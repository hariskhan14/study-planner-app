import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { HomePage } from './pages/HomePage';
import { PrayerPage } from './pages/PrayerPage';
import { TodoPage } from './pages/TodoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/prayers" element={<PrayerPage />} />
          <Route path="/todos" element={<TodoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
