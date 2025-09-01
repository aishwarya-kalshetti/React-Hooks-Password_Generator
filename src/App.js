
import { useCallback, useEffect, useState, useRef } from 'react';
import './App.css';

function App() {

  const [length, setLength]=useState(8);

  const [numberAllowed, setNumberAllowed]=useState(false);

  const [charAllowed, setCharAllowed]=useState(false);

  const [password, setPassword]=useState("");

  //useRef hook
  const passwordRef=useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+="0123456789";
    if(charAllowed) str+="!@#$%^&*()_+";
    
    for(let i=1;i<=length;i++){
       let char=Math.floor(Math.random()*str.length+1);
       pass+=str.charAt(char);
       
    }
    setPassword(pass);

  },[length,numberAllowed,charAllowed,setPassword]);

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)},[password])

  useEffect(()=>{passwordGenerator()},[length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div>
        <input type="text" value={password} placeholder='password' 
        readOnly
        ref={passwordRef}/>
      </div>
      <button onClick={copyPasswordToClipboard}>copy</button>

      <div>
        <div>
          <input type="range" min={6} max={100} value={length}
          onChange={(e)=>{setLength(e.target.value)}}/>
          <label>Length: {length}</label>
        </div>
        <div>
          <input
          type="checkbox" defaultChecked={numberAllowed} 
          id="numberInput"
          onChange={()=>{
             setNumberAllowed((prev)=> !prev);
          }}
          />
          <label htmlFor='numberInput'>Number</label>
        </div>
        <div>
          <input
          type="checkbox" defaultChecked={charAllowed} 
          id="characterInput"
          onChange={()=>{
             setCharAllowed((prev)=> !prev);
          }}
          />
          <label htmlFor='characterInput'>Character</label>
        </div>

      </div>
    </div>
  );
}

export default App;
