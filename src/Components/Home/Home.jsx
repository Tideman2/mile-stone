//gh

import Display1 from '../Displays/Display1';
import DisplaySongs from '../Displays/DisplaySongs';
import { useState, useContext } from 'react';
import { MusicContext } from '../contexts/Provider';


export default function Home({}) {
    let {sharedData, setShearedData} = useContext(MusicContext)

 //To handle different views
   switch(sharedData.display) {
    case `hero`:
        return <Display1/>;
    case `displaySongs`:
        return <DisplaySongs/>;
    default: 
       return <p>Pls relaod the page</p>
   }
}