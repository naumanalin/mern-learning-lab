import React from "react";

function Cards({ item }) {
  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-92 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border flex flex-col h-full">
          <figure className="h-40 overflow-hidden" style={{minHeight:"350px"}}>
            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
          </figure>
          <div className="card-body flex flex-col justify-between h-full">
            <div>
              <h2 className="card-title">
                {item.name}
                <div className="badge badge-secondary">{item.category}</div>
              </h2>
              <p>{item.title}</p>
            </div>
            <div className="card-actions justify-between mt-auto">
              <div className="badge badge-outline">${item.price}</div>
              <div className="cursor-pointer px-2 py-1 rounded-full border-[2px] hover:bg-pink-500 hover:text-white duration-200">
                Buy Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
