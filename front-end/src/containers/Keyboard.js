import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import Like from "../components/Like.js"
import { useState } from 'react'





export default function Keyboard (props) {  
 
const firstNote = MidiNumbers.fromNote("c3");
const lastNote = MidiNumbers.fromNote("f5");
const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: firstNote,
  lastNote: lastNote,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
});


        return (
          <div >
            <Piano
              noteRange={{ first: firstNote, last: lastNote }}
              playNote={(midiNumber) => {
                // Play a given note - see notes below
               
    
              }}
              stopNote={(midiNumber) => {
                // Stop playing a given note - see notes below
              }}
              width={1000}
              keyboardShortcuts={keyboardShortcuts}
            />
            <div className="music-player">
              <Like activity={'keyboard'}/>
            </div>
          </div>
        );
}