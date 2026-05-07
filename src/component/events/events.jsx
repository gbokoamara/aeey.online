import { ChevronRight, X } from "lucide-react";
import ImageFull from "../../utils/Image";
import { eventsAds } from "../../data/payment";
import { dateUi } from "../../helper/date";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../../hooks/useEvent";
import { useEffect } from "react";
import AutoSlide from "../../utils/autoSlide";
import { AutoScroll } from "../../utils/autoScroll";

export const Events = () => {
  const { events, getAllActiveEvents } = useEvent();

  useEffect(() => {
    getAllActiveEvents();
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <div className="  w-screen md:w-3xl  p-2 rounded gap-2">
      <AutoSlide interval={10000} >
        {events.length > 0 &&
          events?.map((event, index) => 
          {
            const description = event.description
            const shouldScroll = description?.length > 80;

            return (
            <div
              key={index}
              className="bg-slate-100   rounded shrink-0 grid grid-cols-6 relative pr-6 shadow"
            >
              {/* Texte */}
              <div className=" col-span-4 text-left p-2 flex flex-col justify-between">
                <div>
                  <h1 className="font-semibold text-sm">{event.title}</h1>
                  { shouldScroll ?
                   (<AutoScroll  speed={10} height={36}>
                  <p className="text-[12px] text-gray-600 ">
                    {event.description}
                  </p>
                  </AutoScroll>) :
                   (<p className="text-[12px] text-gray-600 line-clamp-2"> {event.description}</p>)
                   }
                </div>

                <p className="text-[11px] text-gray-500">
                  {dateUi(event.date)}
                </p>
              </div>

              {/* Image */}
              <div className="h-full col-span-2 p-2 flex items-center justify-center">
                <ImageFull
                  src={event.image}
                  className="h-full object-contain"
                />
              </div>

              {/* Actions (FULL HEIGHT) */}
              <div className="absolute top-0 right-0 h-full flex flex-col justify-between py-2 pr-1">
                <button className="hover:text-red-500">
                  <X size={16} />
                </button>

                <button
                  className="hover:text-blue-500"
                  onClick={() => navigate(`/event/${event.id}`)}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            )
          }
          )}
      </AutoSlide>
      </div>
    </>
  );
};
