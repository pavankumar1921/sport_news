import React,{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTeams } from "../../context/teams/action"; 
import { API_ENDPOINT } from "../../config/constants";
import { Dialog,Transition } from "@headlessui/react";
import { Fragment } from "react";

interface PreferencesState {
  choice: {id:string; name:string}[]
}

const Preferences = () => {
  const navigate = useNavigate();

  const [preferences, setPreferences] = useState<PreferencesState>({
    choice: [],
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
    const { name, checked } = event.target;
    const selectedItem = {
      id: event.target.id,
      name: event.target.name,
    };
  
    setPreferences((prevSelectedPreferences) => {
      if (checked) {
        return {
          ...prevSelectedPreferences,
          choice: [...prevSelectedPreferences.choice, selectedItem],
        };
      } else {
        return {
          ...prevSelectedPreferences,
          choice: prevSelectedPreferences.choice.filter(
            (item) => item.id !== selectedItem.id
          ),
        };
      }
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
          userPreferences: preferences,
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
    window.location.reload();
  };
  

  return (
    <>
  <button
    type="button"
    onClick={openModal}
    className="rounded-full bg-white p-1 text-gray-400 hover:text-blue-600"
    id="preferences"
  >
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
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden bg-purple-600 text-white p-6 text-left align-middle shadow-xl transition-all rounded-lg">
              <Dialog.Title
                as="h3"
                className="text-xl font-bold text-white leading-6 text-gray-900 p-2 text-center"
              >
                Choose Favorites
              </Dialog.Title>
              <p className="mb-3 text-xl font-bold text-red-500">Sports</p>
              <div className="flex flex-wrap gap-4">
                {sportsData.map((sport: any) => (
                    <div key={sport.id}>
                        <input
                            type="checkbox"
                            name={sport.name}
                            id={sport.id}
                            data-category="sports"
                            onChange={handleModalInputChange}
                            checked={preferences.choice.some(
                            (item) => item.id === sport.id
                            )}
                        />
                        <span className="font-bold"> {sport.name}</span>
                    </div>
                ))}
              </div>
              <p className="mb-3 text-xl font-bold text-red-500">Teams</p>
              <div className="flex flex-wrap gap-4">
              {teamsData.map((team: any) => (
                <div key={team.id}>
                    <input
                    type="checkbox"
                    name={team.name}
                    id={team.id}
                    data-category="teams"
                    onChange={handleModalInputChange}
                    checked={preferences.choice.some(
                        (item) => item.id === team.id
                    )}
                    />
                    <span className="font-bold"> {team.name}</span>
                </div>
                ))}
              </div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={handleSavePreferences}
                >
                  Save
                </button>
                <button
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
