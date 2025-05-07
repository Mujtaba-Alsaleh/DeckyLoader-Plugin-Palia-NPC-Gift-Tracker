import { ButtonItem, PanelSectionRow } from '@decky/ui'; // Adjust imports if needed
import { useState } from 'react';

import ashura from '../assets/ashura.png'
import auni from '../assets/auni.png'
import badruu from '../assets/badruu.png'
import caleri from '../assets/caleri.png'
import chayne from '../assets/chayne.png'
import delaila from '../assets/delaila.png'
import einar from '../assets/einar.png'
import elouisa from '../assets/elouisa.png'
import eshe from '../assets/eshe.png'
import hassian from '../assets/hassian.png'
import hekla from '../assets/hekla.png'
import hodari from '../assets/hodari.png'
import jel from '../assets/jel.png'
import jina from '../assets/jina.png'
import kenli from '../assets/kenli.png'
import kenyatta from '../assets/kenyatta.png'
import naio from '../assets/naio.png'
import najuma from '../assets/najuma.png'
import reth from '../assets/reth.png'
import sifuu from '../assets/sifuu.png'
import subira from '../assets/subira.png'
import tamala from '../assets/tamala.png'
import tau from '../assets/tau.png'
import tish from '../assets/tish.png'
import zeki from '../assets/zeki.png'




const npcImages: { [key: string]: string } = {
    ashura : ashura,
    auni : auni,
    badruu : badruu,
    caleri : caleri,
    chayne : chayne,
    delaila : delaila,
    einar : einar,
    elouisa : elouisa,
    eshe : eshe,
    hassian : hassian,
    hekla : hekla,
    hodari : hodari,
    jel : jel,
    jina : jina,
    kenli : kenli,
    kenyatta : kenyatta,
    naio : naio,
    najuma : najuma,
    reth : reth,
    sifuu : sifuu,
    subira : subira,
    tamala : tamala,
    tau : tau,
    tish : tish,
    zeki : zeki
  };
  
  const getNPCImage = (name: string): string | undefined => {
    return npcImages[name.toLowerCase()];
  };

// Define the type for props
interface NPCButtonListProps {
    npcButtonsVisible: boolean;
    setNpcButtonsVisible: (value: boolean) => void;
  onNpcButtonClick: (npcName: string) => void;
}

const NPCButtonList: React.FC<NPCButtonListProps> = ({ onNpcButtonClick, npcButtonsVisible, setNpcButtonsVisible }) => {
  
  
    //const [npcButtonsVisible, setNpcButtonsVisible] = useState(false);

  const NPCList = ['Ashura','Auni','Badruu','Caleri','Chayne','Delaila','Einar','Elouisa','Eshe','Hassian','Hekla','Hodari','Jel','Jina','Kenli','Kenyatta','Naio','Najuma','Reth','Sifuu','Subira','Tamala','Tau','Tish','Zeki']
  
  const handleNpcButtonClick = (npcName: string) => {
    // Call the parent handler to handle the backend logic
    onNpcButtonClick(npcName);
    
    // Hide the NPC buttons after one is clicked
    setNpcButtonsVisible(false);
  };

  return (
    <>
      <PanelSectionRow>
        <ButtonItem layout='below' onClick={() => setNpcButtonsVisible(!npcButtonsVisible)}>
          {npcButtonsVisible ? 'Hide NPC List' : 'Show NPC List'}
        </ButtonItem>
      </PanelSectionRow>

      {/* Show NPC buttons if visible */}
      {npcButtonsVisible && (
        <PanelSectionRow>
          {NPCList.map((npcName, index) => (
            <ButtonItem key={index} layout='below' onClick={() => handleNpcButtonClick(npcName)}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                src={getNPCImage(npcName)}
                alt={npcName}
                style={{ width: '40px', height: '40px', marginRight: '20px' }}/>
                <span>{npcName}</span>
            </div>
            </ButtonItem>
          ))}
        </PanelSectionRow>
      )}
    </>
  );
};

export default NPCButtonList;
