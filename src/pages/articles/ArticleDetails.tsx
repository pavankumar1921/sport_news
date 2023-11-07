import React,{useEffect,useState,Fragment} from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Dialog, Transition } from "@headlessui/react";

interface completeArticleDetails{
    id:number
    title:string
    summary:string
    thumbnail:string 
    sport: { id:number ; name:string}
    date:string
    content:string
}

const ArticleDetails: React.FC<{id:number}>=({id}) =>{
    const [ArticleData,setArticleData] = useState<completeArticleDetails|null>(null)
    const [isOpen,setIsOpen] = useState(false)

    const fetchCompleteArticle = async() =>{
        const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
      });
      if(!response.ok){
        throw new Error("Cannot fetch article details")
      }
      const data = await response.json();
      setArticleData(data)
    } catch (error) {
      console.log('Error fetching articles',error);
    }
}

    const openModal= () =>{
        setIsOpen(true)
    }

    const closeModal = () =>{
        setIsOpen(false)
    }
    useEffect(()=>{
        fetchCompleteArticle()
    },[id])

    return (
        <>
        <div>
            <button className="text-blue-400 hover:text-blue-600 hover:underline" type="button" onClick={openModal}>More Details</button>
        </div>
        <div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex items-center justify-center z-50"
            onClose={closeModal}
          >
            <Transition.Child
              as="div"
              className="fixed inset-0"
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            </Transition.Child>
            <Transition.Child
              as="div"
              className="relative z-10"
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-40vw h-40vh mx-auto rounded-2xl bg-teal-200 p-6 text-left align-middle shadow-xl transition-all overflow-hidden">
                {ArticleData && (
                  <>
                    <div>
                      <button
                        onClick={closeModal}
                        className="text-gray-500 hover:text-red-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="">
                      <Dialog.Title
                        as="h1"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        {ArticleData.title}
                      </Dialog.Title>
                      <h1 className="text-gray-900 text-bold py-2">{ArticleData.sport.name}</h1>
                      <div className="flex gap-4 py-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                          </svg>
                          <h2>{new Date(ArticleData.date).toLocaleDateString()}</h2>
                        </div>
                      
                      <div className="w-1/2 py-2">
                        <img
                          src={ArticleData.thumbnail}
                          className="w-40 h-40 mx-auto rounded"
                        />
                      </div>
                      <p className="text-black">{ArticleData.content}</p>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </Transition>
      </div>
        </>
        
        
    )
}

export default ArticleDetails