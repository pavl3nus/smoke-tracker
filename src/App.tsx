import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppShell, Group, Text, NavLink, AspectRatio } from '@mantine/core';
import { IconHome, IconHistory, IconPlus, IconBulb } from '@tabler/icons-react';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import AddPage from './pages/AddPage';
import TipsPage from './pages/TipsPage';
import ThemeSwitcher from './components/ThemeSwitcher';

function App() {
  return (
    <Router>
      <AppShell
        padding="md"
        navbar={{
          width: 200,
          breakpoint: 'sm',
        }}
        header={{
          height: 60,
        }}
      >
        <AppShell.Header p="xs">
          <Group justify="space-between">
            <AspectRatio maw={40} darkHidden>
              <img src='../public/logo.png'/> 
            </AspectRatio>
            <AspectRatio maw={40} lightHidden>
              <img src='../public/logo-dark.png'/> 
            </AspectRatio>
            <Text size="xl" fw={700}>
              SmokeTracker
            </Text>
            <ThemeSwitcher/>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p="xs">
          <AppShell.Section grow mt="md">
            <NavLink 
              component={Link}
              to="/"
              label="Главная"
              leftSection={<IconHome size="1rem" />}
            />
            <NavLink 
              component={Link}
              to="/Tips"
              label="Советы"
              leftSection={<IconBulb size="1rem" />}
            />
            <NavLink 
              component={Link}
              to="/history"
              label="История"
              leftSection={<IconHistory size="1rem" />}
            />
            <NavLink 
              component={Link}
              to="/add"
              label="Добавить запись"
              leftSection={<IconPlus size="1rem" />}
            />
          </AppShell.Section>
        </AppShell.Navbar>

        <AppShell.Main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/Tips" element={<TipsPage />} />
          </Routes>
        </AppShell.Main>
      </AppShell>
    </Router>
  );
}

export default App;