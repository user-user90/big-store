import globalApis from "@/app/_Utils/globalApis";
import Link from "next/link";

async function Footer1() {
  let footerItem = [];
  try {
    const res = await globalApis.getFooter();
    footerItem = res?.data?.data;
    console.log("footer", footerItem);
  } catch (error) {}
  return (
    <section className="overflow-x-hidden border-t border-gray-300 ">
      {/* ## GLOBAL DIV */}
      <div className="container flex flex-col md:flex-row gap-5 md:gap-10 pt-4">
        {/* ## LOGO */}
        <div>
          <Link className="font-bold" href={"/"}>BIGSTORE</Link>
        </div>
        {/* ## MAPING ITEMS */}
        <div className="space-y-3">
          {/* ## HOME */}
          <Link href={"/"} className="text-md md:text-sm hover:border-b ">Home</Link>
          {/* ## Map */}
          {footerItem?.map((item) => (
            <div key={item?.documentId} className="mt-3">
              <Link href={`/details/${item?.slug}`} className={`my-6 md:text-sm hover:border-b hover:text-black text-gray-600`} >{item?.title}</Link>
            </div>
          ))}
        </div>
      </div>
      {/* ## FOOTER 2 */}
      <div className="border-t border-gray-300 mt-12 ">
        <h2 className="container  text-md md:text-sm text-gray-600 py-6 ">© 2023-2026 ACME, Inc. All rights reserved.<span className="mx-2">|</span>View the source</h2>
      </div>
    </section>
  );
}

export default Footer1;
