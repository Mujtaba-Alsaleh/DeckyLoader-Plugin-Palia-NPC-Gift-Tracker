import os
import json
import decky # type: ignore
from typing import Dict

class Plugin:
    def __init__(self):
        self.data_file = "npc_gifts.json"
        self.data_path = self.ensure_json_exists()
        self.gift_data = {}
        self.cachedNPC = ""
    
    def get_data_path(self):
        """Return DECKY-compliant data path."""
        #xdg_data_home = os.environ.get("XDG_DATA_HOME",os.path.expanduser("~/.local/share"))
        app_data_dir = os.path.join(decky.DECKY_PLUGIN_SETTINGS_DIR, "PaliaNPC")
        os.makedirs(app_data_dir, exist_ok=True)
        return os.path.join(app_data_dir, self.data_file)
    
    def ensure_json_exists(self):
        """Ensure the JSON data file exists at writable path."""
        dest = self.get_data_path()
        if not os.path.exists(dest):
            self.loadDefaults(dest)
        return dest

    async def _main(self):
        decky.logger.info("NPC Tracker initialized!")
        pass

    async def _unload(self):
        decky.logger.info("NPC Tracker unloaded!")
        pass

    async def _uninstall(self):
        decky.logger.info("NPC Tracker uninstalled!")
        pass
    
    async def get_npc(self,name:str) -> Dict:
        with open(self.data_path, "r") as f:
            data = json.load(f)
            #decky.logger.info(f"found {f}")

        for npc in data:
            if npc["name"].lower() == name.lower():
                self.cachedNPC = name.lower()
                decky.emit("Loaded_Json","Loading Saved Data:","Successfull")
                return npc

        return {"name": "Please Enter valid NPC name", "weekly_gifts": ["", "", "", ""], "weekly_gifts_given":[False,False,False,False],"daily_gift_given":False}
    
    async def save_data(self,npc_data:dict):
        if not self.cachedNPC or self.cachedNPC == "":
            pass
        try:
            if not os.path.exists(self.data_path):
                raise FileNotFoundError(f"{self.data_path} not found")

            with open(self.data_path, "r") as f:
                data = json.load(f)

            # Replace the matching NPC entry
            updated = False
            for npc in data:
                if npc.get("name") == npc_data.get("name"):
                    npc["weekly_gifts"] = npc_data.get("weekly_gifts", ["", "", "", ""])
                    npc["weekly_gifts_given"] = npc_data.get("weekly_gifts_given", [False, False, False, False])
                    npc["daily_gift_given"] = npc_data.get("daily_gift_given", False)
                    updated = True
                    break

            if not updated:
                data.append(npc_data)

            with open(self.data_path, "w") as f:
                json.dump(data, f, indent=2)

            decky.emit("Loaded_Json","Saving Data:","Successfull")
            return {"success": True, "message": "NPC data saved"}
        except Exception as e:
            decky.logger.error(f"Error saving NPC data: {e}")
            return {"success": False, "error": str(e)}

    async def save_modal_entry(self,npc_name,gift_index,gift_value):
        with open(self.data_path, "r") as f:
            data = json.load(f)
        modal_entry = {
            "name": "modal",
            "weekly_gifts": [
                npc_name,
                gift_value,
                str(gift_index),
                ""
            ],
            "weekly_gifts_given": [False, False, False, False],
            "daily_gift_given": True
        }
        
        # Remove old modal entry if exists
        data = [entry for entry in data if entry.get("name") != "modal"]
        
        # Add new modal entry
        data.append(modal_entry)
        # Save back to file
        with open(self.data_path, "w") as f:
            json.dump(data, f, indent=2)

    async def check_modal_if_exists(self):
        if not os.path.exists(self.data_path):
            return

        with open(self.data_path, "r") as f:
            data = json.load(f)

        modal_entry = next((npc for npc in data if npc["name"] == "modal"), None)
        if not modal_entry or not modal_entry["daily_gift_given"]:
            return  # Nothing to apply

        target_npc_name = modal_entry["weekly_gifts"][0]
        new_gift_value = modal_entry["weekly_gifts"][1]
        gift_index_str = modal_entry["weekly_gifts"][2]

        try:
            gift_index = int(gift_index_str)
        except ValueError:
            print("Invalid index in modal entry.")
            return

        # Find the actual NPC and update the gift
        for npc in data:
            if npc["name"] == target_npc_name:
                npc["weekly_gifts"][gift_index] = new_gift_value
                break

        # Reset the modal entry flag
        modal_entry["daily_gift_given"] = False

        with open(self.data_path, "w") as f:
            json.dump(data, f, indent=2)
        
        return target_npc_name
    

    def loadDefaults(self,path):
        self.npcs = []
        default_npcs = [
                    {"name": "Auni", "gifts": ["","","",""]},
                    {"name": "Ashura", "gifts": ["","","",""]},
                    {"name": "Badruu", "gifts": ["","","",""]},
                    {"name": "Caleri", "gifts": ["","","",""]},
                    {"name": "Delaila", "gifts": ["","","",""]},
                    {"name": "Einar", "gifts": ["","","",""]},
                    {"name": "Eshe", "gifts": ["","","",""]},
                    {"name": "Eynore", "gifts": ["","","",""]},
                    {"name": "Hassian", "gifts": ["","","",""]},
                    {"name": "Hekla", "gifts": ["","","",""]},
                    {"name": "Jina", "gifts": ["","","",""]},
                    {"name": "Jemmie", "gifts": ["","","",""]},
                    {"name": "Kenyatta", "gifts": ["","","",""]},
                    {"name": "Kenli", "gifts": ["","","",""]},
                    {"name": "Najuma", "gifts": ["","","",""]},
                    {"name": "Nai'o", "gifts": ["","","",""]},
                    {"name": "Reth", "gifts": ["","","",""]},
                    {"name": "Sifuu", "gifts": ["","","",""]},
                    {"name": "Subira", "gifts": ["","","",""]},
                    {"name": "Tish", "gifts": ["","","",""]},
                    {"name": "Tamala", "gifts": ["","","",""]},
                    {"name": "Tau", "gifts": ["","","",""]},
                    {"name": "Ulkir", "gifts": ["","","",""]},
                    {"name": "Vajra", "gifts": ["","","",""]},
                    {"name": "Zeki", "gifts": ["","","",""]},
                    {"name": "Jel", "gifts": ["","","",""]},
                    {"name": "modal", "gifts": ["","","",""]}
                ]
                
        for npc in default_npcs:
            self.npcs.append({
                "name": npc["name"],
                "weekly_gifts": npc["gifts"],
                "weekly_gifts_given": [False, False, False, False],
                "daily_gift_given": False
                })
        try:
            file = path
            with open(file, 'w') as f:
                json.dump(self.npcs, f, indent=2)
            
            decky.emit("Loaded_Json","Save Data Created","Filled save with Default values")
        except Exception as e:
            decky.logger.info("Error", f"Failed to save data: {str(e)}")
        

