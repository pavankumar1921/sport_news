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
            <button type="button" onClick={openModal}>More Details</button>
        </div>
        <div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10 items-center justify-center" onClose={closeModal}>
                    <Transition.Child 
                        as="div"
                        className="fixed inset-0"
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                            <div className="inset-0 flex " />
                            <div className="absolute inset-0 bg-black bg-opacity-70">
                            <Dialog.Panel className="w-[80vw] h-[60vh] mx-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all  overflow-hidden">
                                {ArticleData && (
                                    <>
                                        <div>
                                        <button onClick={closeModal} className="text-gray-500 hover:text-red-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                        </div>
                                        <div className="">
                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                {ArticleData.title}
                                            </Dialog.Title>
                                            <h2 >{ArticleData.sport.name}</h2>
                                            <h2>{new Date(ArticleData.date).toLocaleDateString()}</h2>
                                            <div className="w-1/2">
                                            <img src={ArticleData.thumbnail} className="w-40 h-40 mx-auto rounded"/>
                                            </div>
                                            
                                            
                                            <p>{ArticleData.content}</p>
                                        </div>

                                    </>
                                )}
                            </Dialog.Panel>
                            </div>
                            
                    </Transition.Child>
                </Dialog>
            </Transition>
        </div>
        </>
        
        
    )
}

export default ArticleDetails