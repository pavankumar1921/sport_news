import React,{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTeams } from "../../context/teams/action"; 
import { API_ENDPOINT } from "../../config/constants";
import { Dialog,Transition } from "@headlessui/react";
import { Fragment } from "react";

interface PreferencesState {
  choice: {id:string; name:string;category:string}[],
}

const Preferences = () => {
  const navigate = useNavigate();

  const [preferences, setPreferences] = useState<PreferencesState>({
    choice: [] ,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [sportsData, setSportsData] = useState<any[]>([]);
  const [teamsData, setTeamsData] = useState<any[]>([]);

  useEffect(()=>{
    const fetchSportsData = async() =>{
        const response = await fetch(`${API_ENDPOINT}/sports`,{
            method: "GET"
        })
        const data = await response.json()
        setSportsData(data.sports)
    }
    const fetchTeamsData = async() =>{
        const response = await fetch(`${API_ENDPOINT}/teams`,{
            method: "GET"
        })
        const data = await response.json()
        setTeamsData(data)
    }
    fetchSportsData()
    fetchTeamsData()
},[])

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleModalInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name,checked } = event.target;
    const category = event.target.getAttribute("data-category") as "sports" | "teams";
    const selectedItem = {
      id: event.target.id,
      name: event.target.name,
    };
    setPreferences((prevPref) => {
      const selectedItem = {
        id: event.target.id,
        name: event.target.name,
        category,
      };
  
      let updatedChoices = checked
      ? [...prevPref.choice.filter(item => item.id !== selectedItem.id), selectedItem]
      : prevPref.choice.filter(item => item.id !== selectedItem.id);
      return {
        choice: updatedChoices,
      };
    });
  };
  
  const handleSavePreferences = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          preferences: preferences,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save preferences");
      }
  
      const responseData = await response.json();
      console.log("User Preferences are:", responseData);
      closeModal();
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
    navigate("/homepage");
  };
  

  return (
    <>
  <button
    type="button"
    onClick={openModal}
    className="rounded-full bg-white p-1 text-gray-400 hover:text-blue-600"
    id="preferences"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  </button>
  <div className="p-4 m-2 absolute right-0">
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm"
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="flex min-h-screen items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden bg-white text-white p-6 text-left align-middle shadow-xl transition-all rounded-lg">
              <Dialog.Title
                as="h3"
                className="text-xl font-bold text-black leading-6 text-black p-2 text-center"
              >
                Choose Favorites
              </Dialog.Title>
              <p className="mb-3 text-xl font-bold text-black">Sports</p>
              <div className="flex flex-wrap gap-4">
                {sportsData.map((sport: any) => (
                    <div key={sport.id}>
                        <input
                            type="checkbox"
                            name={sport.name}
                            id={sport.id}
                            data-category="sports"
                            onChange={handleModalInputChange}
                        />
                        <span className="font-bold text-black"> {sport.name}</span>
                    </div>
                ))}
              </div>
              <p className="mb-3 text-xl font-bold text-black">Teams</p>
              <div className="flex flex-wrap gap-4">
              {teamsData.map((team: any) => (
                <div key={team.id}>
                    <input
                    type="checkbox"
                    name={team.name}
                    id={team.id}
                    data-category="teams"
                    onChange={handleModalInputChange}
                    />
                    <span className="font-bold text-black"> {team.name}</span>
                </div>
                ))}
              </div>
              <div className="flex justify-center gap-2">
                <button
                className="text-black border border-black p-1 rounded"
                  onClick={handleSavePreferences}
                >
                  Save
                </button>
                <button
                className="text-black border border-black p-1 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  </div>
</>

  );
};

export default Preferences;
