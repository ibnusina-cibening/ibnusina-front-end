import React, { useState, useEffect, useContext } from 'react';
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

export default function App() {
  const [thm, setTheme] = useState (themes.dark)
  // console.log(thm);
  const myTheme = thm === themes.dark?themes.light:themes.dark;
  const message = myTheme === themes.dark? "aku tombol putih": "aku berubah hitam";
  return (
    <ThemeContext.Provider value={thm}>
      <Toolbar onClick = {()=>setTheme(myTheme)} message={message}/>
    </ThemeContext.Provider>
  );
}

function Toolbar({onClick, message}:{onClick:any,message:string}) {
  // console.log(props.onClick);
  return (
    <div>
      <ThemedButton onClick ={onClick} message={message}/>
    </div>
  );
}

function ThemedButton({onClick, message}:{onClick:any, message:string}) {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }} onClick={onClick}>
      {message}
    </button>
  );
}


// https://reactjs.org/docs/faq-functions.html
// https://dmitripavlutin.com/react-context-and-usecontext/
// https://stackoverflow.com/questions/55726886/react-hook-send-data-from-child-to-parent-component