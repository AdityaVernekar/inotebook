
import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const s1 = {
        "name": "adi",
        "description": "3a",
    }
    const [state, setstate] = useState(s1);
    const update = ()=>{
       
       setTimeout(()=>{
        setstate({
            "name": "padi",
            "description": "9a",
        })
       },1000)
       
      
    }
    return(
        <NoteContext.Provider value={{state,update}}>
        {props.children}
    </NoteContext.Provider>
    )
    
}


export default NoteState;