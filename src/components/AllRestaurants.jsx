import Filters from "./Filters";

export default function AllRestaurants({ title, filterData }) {
  return (
    <>
      <section className="w-[75%]  mx-auto ">
        {title && filterData ? (
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-2xl font-bold text-nowrap ">
                {title?.card?.card?.title}
              </p>
            </div>
            <div>
              <Filters filterData={filterData} />
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </section>
    </>
  );
}
