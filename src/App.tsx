import { useState } from 'react';
import './App.css';
import { createTheme, Stack, ThemeProvider } from '@mui/material';
import PasswordInput from './component/Password-Input';
import Calendar from './component/Calendar';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
// https://www.figma.com/file/x49NU1L7erl84etcdV3zHw/Untitled?node-id=0%3A1


function App() {
  const [password, setPassword] = useState<string>('');
  const [date, setDate] = useState<string>('');

  return (
    <ThemeProvider theme={darkTheme}>
      <Stack height={'100vh'} width={'100vw'} bgcolor={'#181818'} justifyContent={'center'} alignItems={'center'} direction={'row'} spacing={8}>
        <PasswordInput title='Password' password={password} setPassword={setPassword} />
        <Calendar title='Brithday' value={date} setValue={setDate} />
      </Stack>
    </ThemeProvider>
  );
}

export default App;
