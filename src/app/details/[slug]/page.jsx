import globalApis from "@/app/_Utils/globalApis";

async function PageDetails({ params }) {
  const slug = params?.slug;
  const upperCase = slug?.toUpperCase();

  let infoDetails = [];

  try {
    const res = await globalApis.getFooterDetails(upperCase);
    infoDetails = res?.data?.data || [];
  } catch (error) {
    console.error("Error fetching footer details:", error);
  }

  return (
    <section className=" pb-20 mb-20 ">
      <div className="mx-6 md:mx-32 ">

        {infoDetails?.map((item, index) => (
          <div key={index} className="max-w-4xl mx-auto">

            {/*  TITLE */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 mt-16 leading-tight">
              {item?.title}
            </h1>

            {/*  DESCRIPTION */}
            <div className="space-y-3">
              {item?.description?.map((block, id) => (
                <div key={id}>
                  {block?.children?.map((child, i) => (
                    <p
                      key={i}
                      className="text-lg text-gray-700 leading-relaxed hover:text-gray-900 transition-colors duration-300"
                    >
                      {child?.text}
                    </p>
                  ))}
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

export default PageDetails;
