import { AiOutlineClose } from "react-icons/ai"
import { useContext } from "react";
import { ChatContext } from "./ChatContext";
import "../index.css";
import"../App.css"



const Sidebar = ({ 
    classNames, fontSizeFirst, fontSize,
    positionIcon, viewport
}) => {

    const {
        loading,
        open,
        setOpen
    } = useContext(ChatContext)
    
    return(
      <>
        <div
          className={classNames}
        >
          {open && (
          <>
            <AiOutlineClose
              fontSize={fontSize} 
              className={`absolute cursor-pointer right-3 top-4 text-white transition duration-300 ease-in-out"}`}
              onClick={() => setOpen(!open)}
            />
            <div className="flex gap-x-4 items-center ml-2">
              <h1
                className={`fontStyle text-white font-medium text-xl font-serif ${
                  !open && "scale-0"
                }`}
              >
                SETTINGS
              </h1>
            </div>
            <div className={`flex flex-col justify-center p-2 hover:bg-light-white text-gray-300 text-sm items-start gap-y-10 gap-x-4 mt-10`}>
              <h3 className='text-white font-bold font-serif'>Settings</h3>
              <h3 className='text-white font-bold font-serif'>Settings</h3>
              <h3 className='text-white font-bold font-serif'>Settings</h3>
              <h3 className='text-white font-bold font-serif'>Settings</h3>
              <h3 className='text-white font-bold font-serif'>Settings</h3>
              <h3 className='text-white font-bold font-serif'>Settings</h3>
              <h3 className='text-white font-bold font-serif'>Settings</h3>
              <h3 className='text-white font-bold font-serif'>Settings</h3>
              <h3 className='text-white font-bold font-serif'>Settings</h3>
              <h3 className='text-white font-bold font-serif'>Settings</h3>
            </div>

          </>
          )}
        </div>
      </>
    );
}


export default Sidebar;