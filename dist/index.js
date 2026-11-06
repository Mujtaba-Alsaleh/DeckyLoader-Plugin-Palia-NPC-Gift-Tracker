// Decky Loader will pass this api in, it's versioned to allow for backwards compatibility.
// @ts-ignore

// Prevents it from being duplicated in output.
const manifest = {"name":"Palia NPC Weekly Gifts Tracker","author":"OMA","flags":["debug","_root"],"api_version":1,"publish":{"tags":["Quests","root"],"description":"Palia NPC Weekly Gifts Tracker","image":"https://opengraph.githubassets.com/1/Mujtaba-Alsaleh/DeckyLoader-Plugin-Palia-NPC-Gift-Tracker"}};
const API_VERSION = 2;
const internalAPIConnection = window.__DECKY_SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_deckyLoaderAPIInit;
// Initialize
if (!internalAPIConnection) {
    throw new Error('[@decky/api]: Failed to connect to the loader as as the loader API was not initialized. This is likely a bug in Decky Loader.');
}
// Version 1 throws on version mismatch so we have to account for that here.
let api;
try {
    api = internalAPIConnection.connect(API_VERSION, manifest.name);
}
catch {
    api = internalAPIConnection.connect(1, manifest.name);
    console.warn(`[@decky/api] Requested API version ${API_VERSION} but the running loader only supports version 1. Some features may not work.`);
}
if (api._version != API_VERSION) {
    console.warn(`[@decky/api] Requested API version ${API_VERSION} but the running loader only supports version ${api._version}. Some features may not work.`);
}
const callable = api.callable;
const addEventListener = api.addEventListener;
const removeEventListener = api.removeEventListener;
const toaster = api.toaster;
const fetchNoCors = api.fetchNoCors;
const definePlugin = (fn) => {
    return (...args) => {
        // TODO: Maybe wrap this
        return fn(...args);
    };
};

var DefaultContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined
};
var IconContext = SP_REACT.createContext && /*#__PURE__*/SP_REACT.createContext(DefaultContext);

var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function Tree2Element(tree) {
  return tree && tree.map((node, i) => /*#__PURE__*/SP_REACT.createElement(node.tag, _objectSpread({
    key: i
  }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
  return props => /*#__PURE__*/SP_REACT.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr)
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  var elem = conf => {
    var {
        attr,
        size,
        title
      } = props,
      svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return /*#__PURE__*/SP_REACT.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className: className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /*#__PURE__*/SP_REACT.createElement("title", null, title), props.children);
  };
  return IconContext !== undefined ? /*#__PURE__*/SP_REACT.createElement(IconContext.Consumer, null, conf => elem(conf)) : elem(DefaultContext);
}

// THIS FILE IS AUTO GENERATED
function FaShip (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 640 512"},"child":[{"tag":"path","attr":{"d":"M496.616 372.639l70.012-70.012c16.899-16.9 9.942-45.771-12.836-53.092L512 236.102V96c0-17.673-14.327-32-32-32h-64V24c0-13.255-10.745-24-24-24H248c-13.255 0-24 10.745-24 24v40h-64c-17.673 0-32 14.327-32 32v140.102l-41.792 13.433c-22.753 7.313-29.754 36.173-12.836 53.092l70.012 70.012C125.828 416.287 85.587 448 24 448c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24 61.023 0 107.499-20.61 143.258-59.396C181.677 487.432 216.021 512 256 512h128c39.979 0 74.323-24.568 88.742-59.396C508.495 491.384 554.968 512 616 512c13.255 0 24-10.745 24-24v-16c0-13.255-10.745-24-24-24-60.817 0-101.542-31.001-119.384-75.361zM192 128h256v87.531l-118.208-37.995a31.995 31.995 0 0 0-19.584 0L192 215.531V128z"},"child":[]}]})(props);
}

var ashura = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/ashura-775cd974.png';

var auni = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/auni-35adda07.png';

var badruu = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/badruu-a5969bd5.png';

var caleri = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/caleri-f2144781.png';

var chayne = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/chayne-5529d2cd.png';

var delaila = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/delaila-f2b1cd20.png';

var einar = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/einar-0136c901.png';

var elouisa = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/elouisa-9aca0caf.png';

var eshe = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/eshe-59041a14.png';

var hassian = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/hassian-9bf6cb2b.png';

var hekla = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/hekla-d61176c6.png';

var hodari = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/hodari-bba043e5.png';

var jel = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/jel-adf9595e.png';

var jina = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/jina-87e44dc5.png';

var kenli = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/kenli-8cfe35e8.png';

var kenyatta = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/kenyatta-a2bfc72a.png';

var logo = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/logo-676a1e03.png';

var naio = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/naio-4e33da02.png';

var najuma = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/najuma-d4b3120c.png';

var reth = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/reth-6f2c3209.png';

var sifuu = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/sifuu-49761108.png';

var subira = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/subira-754e686a.png';

var tamala = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/tamala-18f75ef2.png';

var tau = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/tau-392e8662.png';

var tish = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/tish-a4e70275.png';

var zeki = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/zeki-ec48c4dc.png';

var yes = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/yes-7b9df018.png';

var no = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/no-e2fb4ed0.png';

var reset = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/reset-4261c78e.png';

var search = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/search-bc284ee7.png';

var save = 'http://127.0.0.1:1337/plugins/Palia NPC Weekly Gifts Tracker/assets/save-278a9dc3.png';

// Adjust imports if needed
const npcImages$1 = {
    ashura: ashura,
    auni: auni,
    badruu: badruu,
    caleri: caleri,
    chayne: chayne,
    delaila: delaila,
    einar: einar,
    elouisa: elouisa,
    eshe: eshe,
    hassian: hassian,
    hekla: hekla,
    hodari: hodari,
    jel: jel,
    jina: jina,
    kenli: kenli,
    kenyatta: kenyatta,
    naio: naio,
    najuma: najuma,
    reth: reth,
    sifuu: sifuu,
    subira: subira,
    tamala: tamala,
    tau: tau,
    tish: tish,
    zeki: zeki
};
const getNPCImage$1 = (name) => {
    return npcImages$1[name.toLowerCase()];
};
const NPCButtonList = ({ onNpcButtonClick, npcButtonsVisible, setNpcButtonsVisible }) => {
    //const [npcButtonsVisible, setNpcButtonsVisible] = useState(false);
    const NPCList = ['Ashura', 'Auni', 'Badruu', 'Caleri', 'Chayne', 'Delaila', 'Einar', 'Elouisa', 'Eshe', 'Hassian', 'Hekla', 'Hodari', 'Jel', 'Jina', 'Kenli', 'Kenyatta', 'Naio', 'Najuma', 'Reth', 'Sifuu', 'Subira', 'Tamala', 'Tau', 'Tish', 'Zeki'];
    const handleNpcButtonClick = (npcName) => {
        // Call the parent handler to handle the backend logic
        onNpcButtonClick(npcName);
        // Hide the NPC buttons after one is clicked
        setNpcButtonsVisible(false);
    };
    return (window.SP_REACT.createElement(window.SP_REACT.Fragment, null,
        window.SP_REACT.createElement(DFL.PanelSectionRow, null,
            window.SP_REACT.createElement(DFL.ButtonItem, { layout: 'below', onClick: () => setNpcButtonsVisible(!npcButtonsVisible) }, npcButtonsVisible ? 'Hide NPC List' : 'Show NPC List')),
        npcButtonsVisible && (window.SP_REACT.createElement(DFL.PanelSectionRow, null, NPCList.map((npcName, index) => (window.SP_REACT.createElement(DFL.ButtonItem, { key: index, layout: 'below', onClick: () => handleNpcButtonClick(npcName) },
            window.SP_REACT.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                window.SP_REACT.createElement("img", { src: getNPCImage$1(npcName), alt: npcName, style: { width: '40px', height: '40px', marginRight: '20px' } }),
                window.SP_REACT.createElement("span", null, npcName)))))))));
};

// ConfirmTestModal.tsx


const SaveModalData = callable("save_modal_entry");
const ConfirmEditModal = ({ npcName, giftIndex, closeModal }) => {
    const [inputValue, setInputValue] = SP_REACT.useState("");
    const handleConfirm = async () => {
        //onConfirm(inputValue);  // send value back
        await SaveModalData(npcName, giftIndex, inputValue);
        closeModal(); // Close the modal
    };
    return (window.SP_REACT.createElement(DFL.ConfirmModal, { strTitle: "Editing Gift", strDescription: `Enter new gift for ${npcName}, slot ${giftIndex + 1}`, strOKButtonText: "Save", onCancel: closeModal, onOK: handleConfirm },
        window.SP_REACT.createElement(DFL.TextField, { label: "Insert new gift name", value: inputValue, onChange: (e) => setInputValue(e.target.value) })));
};

const GetNPC = callable("get_npc");
const SaveData = callable("save_data");
const CheckModalEntry = callable("check_modal_if_exists");
const npcImages = {
    ashura: ashura,
    auni: auni,
    badruu: badruu,
    caleri: caleri,
    chayne: chayne,
    delaila: delaila,
    einar: einar,
    elouisa: elouisa,
    eshe: eshe,
    hassian: hassian,
    hekla: hekla,
    hodari: hodari,
    jel: jel,
    jina: jina,
    kenli: kenli,
    kenyatta: kenyatta,
    logo: logo,
    naio: naio,
    najuma: najuma,
    reth: reth,
    sifuu: sifuu,
    subira: subira,
    tamala: tamala,
    tau: tau,
    tish: tish,
    zeki: zeki,
    yes: yes,
    no: no,
    reset: reset,
    search: search,
    save: save
};
const getNPCImage = (name) => {
    return npcImages[name];
};
function Content() {
    const [npcResult, setNpcResult] = SP_REACT.useState(null);
    const [giftInputs, setGiftInputs] = SP_REACT.useState(["", "", "", ""]);
    const [giftToggles, setGiftToggles] = SP_REACT.useState([false, false, false, false]);
    const [daily_gift_given, setDailyGiven] = SP_REACT.useState(false);
    const [npcButtonsVisible, setNpcButtonsVisible] = SP_REACT.useState(false);
    const [wikiValidList, setWikiValidList] = SP_REACT.useState([]);
    const [legendExplanation, setLegendExplanation] = SP_REACT.useState("");
    const onClickGetNPC = async (npcname) => {
        try {
            const data = await GetNPC(npcname);
            setNpcResult(data);
            setGiftInputs(data.weekly_gifts);
            setGiftToggles(data.weekly_gifts_given);
            setDailyGiven(data.daily_gift_given);
        }
        catch (error) {
            console.error("Failed to get NPC data:", error);
        }
    };
    // Sync checkbox toggles when NPC data changes
    SP_REACT.useEffect(() => {
        if (npcResult) {
            setGiftToggles([...npcResult.weekly_gifts_given]);
            setWikiValidList(Array(npcResult.weekly_gifts.length).fill(true)); // Assume valid until checked
        }
    }, [npcResult]);
    // 2. Check for modal cache on plugin load
    SP_REACT.useEffect(() => {
        const checkModalCache = async () => {
            const result = await CheckModalEntry();
            onClickGetNPC(result);
        };
        checkModalCache();
    }, []);
    const onClickSaveNPCData = () => {
        if (!npcResult)
            return;
        const updatedData = {
            name: npcResult.name,
            weekly_gifts: giftInputs,
            weekly_gifts_given: giftToggles,
            daily_gift_given: daily_gift_given,
        };
        console.log("Data to save:", updatedData);
        SaveData(updatedData);
    };
    const OnClickResetNPCData = () => {
        setGiftInputs(["", "", "", ""]);
        setGiftToggles([false, false, false, false]);
        setDailyGiven(false);
    };
    const navLink = async (gift, index) => {
        const url = `https://palia.wiki.gg/wiki/${gift
            .trim()
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join("_")}`;
        // Navigation.CloseSideMenus();
        // Navigation.NavigateToExternalWeb(url);
        const result = await checkWikiPage(url);
        if (result) {
            DFL.Navigation.CloseSideMenus();
            DFL.Navigation.NavigateToExternalWeb(url);
        }
        else {
            //Disable the button until item name changes to stop spam (user input wrong item name or misspelled).
            setWikiValidList(prev => {
                const updated = [...prev];
                updated[index] = result;
                return updated;
            });
        }
    };
    const checkWikiPage = SP_REACT.useCallback(async (url) => {
        try {
            const res = await fetchNoCors(url, { method: "GET" });
            // Check HTTP status
            if (!res.ok)
                return false;
            const body = await res.text();
            // Look for Wiki's ".noarticletext" class in body. it only shows if the gift/item is not found within the provided url.
            return !body.includes(".noarticletext");
        }
        catch (err) {
            console.error("Wiki page check failed:", err);
            return false;
        }
    }, []);
    const OnClickLegendExplanation = (sender) => {
        switch (sender) {
            case "search":
                setLegendExplanation("open wiki page with gift/item information e.g how, where or when to find it. button disabled? item name not set yet or last search attempt result is 'not found'. check the spelling then try again. You could try 'Potato' or 'Golden Salmon')");
                break;
            case "reset":
                setLegendExplanation("Clear all inputs and toggle switchs off (It will not autosave)");
                break;
            case "save":
                setLegendExplanation("Save data for current NPC");
                break;
        }
    };
    return (window.SP_REACT.createElement(DFL.PanelSection, { title: "Select NPC to show progress data" },
        window.SP_REACT.createElement(NPCButtonList, { onNpcButtonClick: onClickGetNPC, npcButtonsVisible: npcButtonsVisible, setNpcButtonsVisible: setNpcButtonsVisible }),
        npcResult && (window.SP_REACT.createElement(DFL.PanelSectionRow, null,
            window.SP_REACT.createElement("div", null,
                window.SP_REACT.createElement("img", { src: getNPCImage(npcResult.name.toLowerCase()) }),
                window.SP_REACT.createElement("br", null),
                "NPC Name: ",
                npcResult.name,
                window.SP_REACT.createElement("br", null),
                "Weekly Gifts:",
                window.SP_REACT.createElement("br", null),
                giftInputs.map((gift, index) => (window.SP_REACT.createElement("div", { key: index, style: { marginBottom: "10px" } },
                    window.SP_REACT.createElement("label", null,
                        "NPC Gift ",
                        index + 1,
                        ":"),
                    window.SP_REACT.createElement(DFL.Field, { bottomSeparator: "none", icon: null, label: null, childrenLayout: undefined, inlineWrap: "keep-inline", padding: "none", spacingBetweenLabelAndChild: "none", childrenContainerWidth: "max" },
                        window.SP_REACT.createElement(DFL.Focusable, { style: { display: "flex" } },
                            window.SP_REACT.createElement("div", { style: {
                                    display: 'flex',
                                    fontSize: '1.5em',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: '.5em'
                                } },
                                window.SP_REACT.createElement(DFL.DialogButton, { style: {
                                        padding: '10px',
                                        fontSize: '14px',
                                    }, onClick: async () => {
                                        onClickSaveNPCData();
                                        DFL.showModal(window.SP_REACT.createElement(ConfirmEditModal, { npcName: npcResult.name, giftIndex: index, closeModal: () => { } }));
                                    } }, gift || "Set Gift"),
                                window.SP_REACT.createElement("label", { style: {
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: '10px',
                                        maxWidth: '40px',
                                        minWidth: 'auto',
                                        marginLeft: '.5em'
                                    } },
                                    window.SP_REACT.createElement(DFL.ToggleField, { checked: giftToggles[index], onChange: () => {
                                            const updated = [...giftToggles];
                                            updated[index] = !updated[index];
                                            setGiftToggles(updated);
                                        } }),
                                    window.SP_REACT.createElement(DFL.DialogButton, { disabled: !npcResult || npcButtonsVisible || !gift || !wikiValidList[index], onClick: async () => navLink(gift, index), style: { display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: '10px',
                                            maxHeight: '40px',
                                            maxWidth: '40px',
                                            minWidth: 'auto',
                                            marginLeft: '.5em' } },
                                        window.SP_REACT.createElement("img", { style: { width: "25px", height: "25px" }, src: getNPCImage("search") }))))))))),
                window.SP_REACT.createElement(DFL.ToggleField, { label: "Given a gift today?", checked: daily_gift_given, onChange: () => setDailyGiven(prev => !prev) })))),
        window.SP_REACT.createElement(DFL.PanelSectionRow, null,
            window.SP_REACT.createElement(DFL.Field, { bottomSeparator: "none", icon: null, label: null, childrenLayout: undefined, inlineWrap: "keep-inline", padding: "none", spacingBetweenLabelAndChild: "none", childrenContainerWidth: "max" },
                window.SP_REACT.createElement(DFL.Focusable, { style: { display: "flex" } },
                    window.SP_REACT.createElement("div", { style: { display: 'flex', fontSize: '1.5em', justifyContent: 'center', alignItems: 'center', marginRight: '.5em' } },
                        window.SP_REACT.createElement(DFL.DialogButton, { disabled: !npcResult || npcButtonsVisible, onClick: onClickSaveNPCData, style: { padding: '10px', fontSize: '14px', } },
                            "Save NPC Data ",
                            window.SP_REACT.createElement("img", { style: { width: "15px", height: "15px" }, src: getNPCImage("save") })),
                        window.SP_REACT.createElement(DFL.DialogButton, { disabled: !npcResult || npcButtonsVisible, onClick: OnClickResetNPCData, style: { display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '10px',
                                maxHeight: '40px',
                                maxWidth: '40px',
                                minWidth: 'auto',
                                marginLeft: '.5em' } },
                            window.SP_REACT.createElement("img", { style: { width: "25px", height: "25px" }, src: getNPCImage("reset") })))))),
        window.SP_REACT.createElement(DFL.PanelSection, { title: "About/Legends" },
            window.SP_REACT.createElement(DFL.PanelSectionRow, null,
                window.SP_REACT.createElement("label", { style: { display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8em" } }, legendExplanation || "Click a button to see what it does."),
                window.SP_REACT.createElement(DFL.Field, { bottomSeparator: "none", icon: null, label: null, childrenLayout: undefined, inlineWrap: "keep-inline", padding: "none", spacingBetweenLabelAndChild: "none", childrenContainerWidth: "max" },
                    window.SP_REACT.createElement(DFL.Focusable, { style: { display: "flex" } },
                        window.SP_REACT.createElement("div", { style: { display: 'flex', fontSize: '1.5em', justifyContent: 'center', alignItems: 'center', marginRight: '.5em' } },
                            window.SP_REACT.createElement(DFL.DialogButton, { disabled: npcButtonsVisible, onClick: () => OnClickLegendExplanation("search"), style: { display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '10px',
                                    maxHeight: '40px',
                                    maxWidth: '40px',
                                    minWidth: 'auto',
                                    marginLeft: '.5em' } },
                                window.SP_REACT.createElement("img", { style: { width: "25px", height: "25px" }, src: getNPCImage("search") })),
                            window.SP_REACT.createElement(DFL.DialogButton, { disabled: npcButtonsVisible, onClick: () => OnClickLegendExplanation("reset"), style: { display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '10px',
                                    maxHeight: '40px',
                                    maxWidth: '40px',
                                    minWidth: 'auto',
                                    marginLeft: '.5em' } },
                                window.SP_REACT.createElement("img", { style: { width: "25px", height: "25px" }, src: getNPCImage("reset") })),
                            window.SP_REACT.createElement(DFL.DialogButton, { disabled: npcButtonsVisible, onClick: () => OnClickLegendExplanation("save"), style: { display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '10px',
                                    maxHeight: '40px',
                                    maxWidth: '40px',
                                    minWidth: 'auto',
                                    marginLeft: '.5em' } },
                                window.SP_REACT.createElement("img", { style: { width: "25px", height: "25px" }, src: getNPCImage("save") })))))))));
}
var index = definePlugin(() => {
    console.log("Template plugin initializing, this is called once on frontend startup");
    // serverApi.routerHook.addRoute("/decky-plugin-test", DeckyPluginRouterTest, {
    //   exact: true,
    // });
    // Add an event listener to the "timer_event" event from the backend
    const listener = addEventListener("timer_event", (test1, test2, test3) => {
        console.log("Template got timer_event with:", test1, test2, test3);
        toaster.toast({
            title: "template got timer_event",
            body: `${test1}, ${test2}, ${test3}`
        });
    });
    const LoadedJsonFile = addEventListener("Loaded_Json", (t, b) => {
        console.log("Json file loading: ", t, b);
        toaster.toast({
            title: t,
            body: b
        });
    });
    const NPClistener = addEventListener("NPC_event", (name, gift1, gift2, gift3, gift4, dailygift) => {
        console.log("Sent event to get:", name, gift1, gift2, gift3, gift4, dailygift);
        toaster.toast({
            title: "got",
            body: `${name}, ${gift1}, ${gift2}, ${gift3}, ${gift4}, ${dailygift}`
        });
    });
    return {
        // The name shown in various decky menus
        name: "Palia NPC Weekly Gifts Tracker",
        // The element displayed at the top of your plugin's menu
        titleView: window.SP_REACT.createElement("div", { className: DFL.staticClasses.Title }, "Palia NPC Weekly Gifts Tracker"),
        // The content of your plugin's menu
        content: window.SP_REACT.createElement(Content, null),
        // The icon displayed in the plugin list
        icon: window.SP_REACT.createElement(FaShip, null),
        // The function triggered when your plugin unloads
        onDismount() {
            console.log("Unloading");
            removeEventListener("timer_event", listener);
            removeEventListener("NPC_event", NPClistener);
            removeEventListener("Loaded_Json", LoadedJsonFile);
            // serverApi.routerHook.removeRoute("/decky-plugin-test");
        },
    };
});

export { index as default };
//# sourceMappingURL=index.js.map
