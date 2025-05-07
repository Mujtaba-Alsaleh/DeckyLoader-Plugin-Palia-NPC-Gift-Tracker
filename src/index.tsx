import {
  PanelSection,
  PanelSectionRow,
  staticClasses,
  ToggleField,
  showModal,
  Focusable,
  DialogButton,
  Field,
  Navigation
} from "@decky/ui";
import {
  addEventListener,
  removeEventListener,
  callable,
  definePlugin,
  toaster,
  fetchNoCors
  // routerHook
} from "@decky/api"
import { useCallback, useEffect, useState } from "react";
import { FaShip } from "react-icons/fa";

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
import logo from '../assets/logo.png'
import naio from '../assets/naio.png'
import najuma from '../assets/najuma.png'
import reth from '../assets/reth.png'
import sifuu from '../assets/sifuu.png'
import subira from '../assets/subira.png'
import tamala from '../assets/tamala.png'
import tau from '../assets/tau.png'
import tish from '../assets/tish.png'
import zeki from '../assets/zeki.png'
import yes from '../assets/yes.png'
import no from '../assets/no.png'
import reset from '../assets/reset.png'
import search from '../assets/search.png'
import save from '../assets/save.png'

import NPCButtonList from './NPCButtonList'; // Import the NPCButtonList component
import ConfirmEditModal from "./ConfirmModal";

// This function calls the python function "start_timer", which takes in no arguments and returns nothing.
// It starts a (python) timer which eventually emits the event 'timer_event'

// Define the shape of NPC data (you can customize as needed)
type NpcData = {
  name: string;
  weekly_gifts: string[];
  weekly_gifts_given: boolean[];
  daily_gift_given: boolean;
};

const GetNPC = callable<[string], NpcData>("get_npc");
const SaveData = callable<NpcData|any>("save_data")
const CheckModalEntry = callable<any,string>("check_modal_if_exists")

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
  logo : logo,
  naio : naio,
  najuma : najuma,
  reth : reth,
  sifuu : sifuu,
  subira : subira,
  tamala : tamala,
  tau : tau,
  tish : tish,
  zeki : zeki,
  yes : yes,
  no : no,
  reset : reset,
  search : search,
  save : save
};

const getNPCImage = (name: string): string | undefined => {
  return npcImages[name];
};



function Content() {
  const [npcResult, setNpcResult] = useState<NpcData | null>(null);

  const [giftInputs, setGiftInputs] = useState(["", "", "", ""]);
  const [giftToggles, setGiftToggles] = useState<boolean[]>([false, false, false, false]);
  const [daily_gift_given,setDailyGiven] = useState(false)
  const [npcButtonsVisible, setNpcButtonsVisible] = useState(false);
  const [wikiValidList, setWikiValidList] = useState<boolean[]>([]);
  const [legendExplanation, setLegendExplanation] = useState("");


  const onClickGetNPC = async (npcname:string) => {
    try {
      const data = await GetNPC(npcname);
      setNpcResult(data);
      setGiftInputs(data.weekly_gifts)
      setGiftToggles(data.weekly_gifts_given)
      setDailyGiven(data.daily_gift_given)
    } catch (error) {
      console.error("Failed to get NPC data:", error);
    }
  };

// Sync checkbox toggles when NPC data changes
  useEffect(() => {
    if (npcResult) {
      setGiftToggles([...npcResult.weekly_gifts_given]);
      setWikiValidList(Array(npcResult.weekly_gifts.length).fill(true)); // Assume valid until checked
    }
  }, [npcResult]);

  // 2. Check for modal cache on plugin load
  useEffect(() => {
  const checkModalCache = async () => {
    const result = await CheckModalEntry()
    onClickGetNPC(result)
  };

  checkModalCache();
}, []);
  
  const onClickSaveNPCData = () => {
    if (!npcResult) return;
  
    const updatedData = {
      name: npcResult.name,
      weekly_gifts: giftInputs,
      weekly_gifts_given: giftToggles,
      daily_gift_given: daily_gift_given,
    };
  
    console.log("Data to save:", updatedData);
    SaveData(updatedData);
  };

  const OnClickResetNPCData = () =>
  {
    setGiftInputs(["","","",""]);
    setGiftToggles([false,false,false,false]);
    setDailyGiven(false);
  };

  const navLink = async (gift:string,index:number) => {
    const url = `https://palia.wiki.gg/wiki/${gift
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("_")}`;

    // Navigation.CloseSideMenus();
    // Navigation.NavigateToExternalWeb(url);

    const result = await checkWikiPage(url);


    if(result)
    {
      Navigation.CloseSideMenus();
      Navigation.NavigateToExternalWeb(url);
    }
    else
    {
      //Disable the button until item name changes to stop spam (user input wrong item name or misspelled).
      setWikiValidList(prev => {
        const updated = [...prev];
        updated[index] = result;
        return updated;
      });
    }
  };

  const checkWikiPage = useCallback(async (url: string): Promise<boolean> => {
    try {
      const res = await fetchNoCors(url, { method: "GET" });
  
      // Check HTTP status
      if (!res.ok) return false;
      
      const body = await res.text();
    // Look for Wiki's ".noarticletext" class in body. it only shows if the gift/item is not found within the provided url.
    return !body.includes(".noarticletext");
    } catch (err) {
      console.error("Wiki page check failed:", err);
      return false;
    }
  }, []);

  const OnClickLegendExplanation = (sender:string)=> 
  {
    switch(sender)
    {
      case "search":
          setLegendExplanation("open wiki page with gift/item information e.g how, where or when to find it. button disabled? item name not set yet or last search attempt result is 'not found'. check the spelling then try again. You could try 'Potato' or 'Golden Salmon')")
          break;
          case "reset":
          setLegendExplanation("Clear all inputs and toggle switchs off (It will not autosave)")
          break;
      case "save":
          setLegendExplanation("Save data for current NPC")
          break;
      case "":
        break;
    }
  }

  return (

      <PanelSection title="Select NPC to show progress data">
      {/* Include the NPCButtonList and pass the onClick handler */}
      <NPCButtonList onNpcButtonClick={onClickGetNPC}
        npcButtonsVisible={npcButtonsVisible}
        setNpcButtonsVisible={setNpcButtonsVisible} />
      {npcResult && (
      <PanelSectionRow>
        <div>
          <img src={getNPCImage(npcResult.name.toLowerCase())} /><br />
          NPC Name: {npcResult.name}<br />
          Weekly Gifts:<br />

          {/* ---- NPC DATA SHOW AREA ----  */}
          {giftInputs.map((gift, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <label>NPC Gift {index + 1}:</label>
            
            <Field bottomSeparator="none" icon={null}label= {null} childrenLayout= {undefined} inlineWrap= "keep-inline" padding= "none" spacingBetweenLabelAndChild= "none" childrenContainerWidth= "max">
            <Focusable style={{display:"flex"}}>
            <div style={{
                      display: 'flex',
                      fontSize: '1.5em',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '.5em'
                  }}>
              <DialogButton
                style={{
                padding: '10px',
                fontSize: '14px',
                      }}
                onClick={async () => {
                  onClickSaveNPCData();
                  showModal(
                    <ConfirmEditModal
                      npcName={npcResult.name}
                      giftIndex={index}
                      closeModal={() => {}}
                    />
                  );
                }}
              >
                {gift || "Set Gift"}
              </DialogButton>
              <label style={  {                  
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px',
                      maxWidth: '40px',
                      minWidth: 'auto',
                      marginLeft: '.5em'}}>
                        
                
              <ToggleField
                checked={giftToggles[index]}
                onChange={() => {
                  const updated = [...giftToggles];
                  updated[index] = !updated[index];
                  setGiftToggles(updated);
                }}/>
              
              <DialogButton disabled={!npcResult || npcButtonsVisible || !gift || !wikiValidList[index]} onClick={async ()=>navLink(gift,index)} style={{display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px',
                      maxHeight: '40px',
                      maxWidth: '40px',
                      minWidth: 'auto',
                      marginLeft: '.5em'}}>
                      <img style={{ width: "25px", height: "25px" }} src={getNPCImage("search")} />
              </DialogButton>

                </label>
            </div></Focusable></Field>
          </div>
        ))}
          <ToggleField label="Given a gift today?" checked={daily_gift_given} onChange={() => setDailyGiven(prev => !prev)}/>
          </div>
      </PanelSectionRow> 
      )}
          {/* ---- END HERE ---- */}

      <PanelSectionRow>
        <Field bottomSeparator="none" icon={null}label= {null} childrenLayout= {undefined} inlineWrap= "keep-inline" padding= "none" spacingBetweenLabelAndChild= "none" childrenContainerWidth= "max">
          <Focusable style={{display:"flex"}}>
            <div style={{display: 'flex',fontSize: '1.5em',justifyContent: 'center',alignItems: 'center',marginRight: '.5em'}}>
                    
                    <DialogButton disabled={!npcResult || npcButtonsVisible} onClick={onClickSaveNPCData} style= {{padding: '10px',fontSize: '14px',}}>
                    Save NPC Data <img style={{ width: "15px", height: "15px" }} src={getNPCImage("save")} />
                    </DialogButton>
                    
                    <DialogButton disabled={!npcResult || npcButtonsVisible} onClick={OnClickResetNPCData} style={{display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px',
                      maxHeight: '40px',
                      maxWidth: '40px',
                      minWidth: 'auto',
                      marginLeft: '.5em'}}>
                        <img style={{ width: "25px", height: "25px" }} src={getNPCImage("reset")} />
                    </DialogButton>
            </div>
          </Focusable>
        </Field>
      </PanelSectionRow>
      
            {/* ---- Notes/help section ---- */}
      <PanelSection title="About/Legends">
            <PanelSectionRow>
              <label style={{display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.8em"}}>{legendExplanation || "Click a button to see what it does."}</label>
      <Field bottomSeparator="none" icon={null}label= {null} childrenLayout= {undefined} inlineWrap= "keep-inline" padding= "none" spacingBetweenLabelAndChild= "none" childrenContainerWidth= "max">
          <Focusable style={{display:"flex"}}>
            <div style={{display: 'flex',fontSize: '1.5em',justifyContent: 'center',alignItems: 'center',marginRight: '.5em'}}>
              
            <DialogButton disabled={npcButtonsVisible} onClick={()=>OnClickLegendExplanation("search")} style={{display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px',
                      maxHeight: '40px',
                      maxWidth: '40px',
                      minWidth: 'auto',
                      marginLeft: '.5em'}}>
                        <img style={{ width: "25px", height: "25px" }} src={getNPCImage("search")} />
            </DialogButton>
            <DialogButton disabled={npcButtonsVisible} onClick={()=>OnClickLegendExplanation("reset")} style={{display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px',
                      maxHeight: '40px',
                      maxWidth: '40px',
                      minWidth: 'auto',
                      marginLeft: '.5em'}}>
                        <img style={{ width: "25px", height: "25px" }} src={getNPCImage("reset")} />
            </DialogButton>
            <DialogButton disabled={npcButtonsVisible} onClick={()=>OnClickLegendExplanation("save")} style={{display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '10px',
                      maxHeight: '40px',
                      maxWidth: '40px',
                      minWidth: 'auto',
                      marginLeft: '.5em'}}>
                        <img style={{ width: "25px", height: "25px" }} src={getNPCImage("save")} />
            </DialogButton>
              
            </div>
          </Focusable>
        </Field>

      </PanelSectionRow>
      </PanelSection>


    </PanelSection>
  );
};




export default definePlugin(() => {
  console.log("Template plugin initializing, this is called once on frontend startup")

  // serverApi.routerHook.addRoute("/decky-plugin-test", DeckyPluginRouterTest, {
  //   exact: true,
  // });


  // Add an event listener to the "timer_event" event from the backend
  const listener = addEventListener<[
    test1: string,
    test2: boolean,
    test3: number
  ]>("timer_event", (test1, test2, test3) => {
    console.log("Template got timer_event with:", test1, test2, test3)
    toaster.toast({
      title: "template got timer_event",
      body: `${test1}, ${test2}, ${test3}`
    });
  });

  const LoadedJsonFile = addEventListener<[
    t : string,
    b : string
  ]>("Loaded_Json",(t,b) => {
    console.log("Json file loading: ",t,b)
    toaster.toast({
      title:t,
      body:b
      });
  } ); 

  const NPClistener = addEventListener<[
    name: string,
    gift1: string,
    gift2: string,
    gift3: string,
    gift4: string,
    dailygift: boolean
  ]>("NPC_event", (name, gift1, gift2, gift3, gift4, dailygift) => {
    console.log("Sent event to get:", name,gift1, gift2, gift3, gift4, dailygift)
    toaster.toast({
      title: "got",
      body: `${name}, ${gift1}, ${gift2}, ${gift3}, ${gift4}, ${dailygift}`
    });
  });



  return {
    // The name shown in various decky menus
    name: "Palia NPC Weekly Gifts Tracker",
    // The element displayed at the top of your plugin's menu
    titleView: <div className={staticClasses.Title}>Palia NPC Weekly Gifts Tracker</div>,
    // The content of your plugin's menu
    content: <Content />,
    // The icon displayed in the plugin list
    icon: <FaShip />,
    


    // The function triggered when your plugin unloads
    onDismount() {
      console.log("Unloading")
      removeEventListener("timer_event", listener);
      removeEventListener("NPC_event",NPClistener);
      removeEventListener("Loaded_Json",LoadedJsonFile);
      // serverApi.routerHook.removeRoute("/decky-plugin-test");
    },
  };
});
