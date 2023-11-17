// @ts-nocheck
import LotCard from "./AlllotCard";
import CatalogueReport from "../../reuseable/CatalogueReport";
function AllLot({
  catalog,
  set_all_lot,
  statusSELECTED,
  set_sell_data,
  sell_data,
}) {
  const sumColumns = () => {
    const sums = {
        Total_pkg: 0,
      Net_weight: 0,
      Total_kg: 0,
      Grand_total: 0,
      Offer_price: 0,
      Gross_weight: 0,
    };

    for (const item of sell_data) {
        sums.Total_pkg += parseFloat(item.Package);
      sums.Net_weight += parseFloat(item.Net_weight);
      sums.Total_kg += parseFloat(item.Total_kg);
      sums.Grand_total += parseFloat(item.Grand_total);
      sums.Offer_price += parseFloat(item.Offer_price);
      sums.Gross_weight += parseFloat(item.Gross_weight);
    }

    return sums;
  };

  const columnSums = sumColumns();
// console.log(sell_data);

  return (
    <div className="mt-12">
      <div className="shadow-md w-[80vw] mx-auto bg-white rounded-lg h-fit">
        <div className="py-3 px-6 border-b border-dashed">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-semibold tracking-tight text-slate-900">
              Report
            </h4>
           {/* < CatalogueReport data={sell_data}/> */}
          </div>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Lot{" "}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Invoice
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Broker
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Factory
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                        Warehouse
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                      >
                      Grade
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                      >
                        Pkg
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                      >
                        N.Weight
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                      >
                        Gross Total
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                      >
                        Offer price
                      </th>
                     
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                      >
                        Season
                      </th>
                     
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                      >
                        Category
                      </th>
                      {/* <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Current bidder</th> */}
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                      >
                        Price max
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {catalog.map((content) => {
                      return (
                        <LotCard
                          data={content}
                          statusSELECTED={statusSELECTED}
                          set_sell_data={set_sell_data}
                          sell_data={sell_data}
                        />
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
                        colSpan={6}
                      >
                        Total
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {columnSums.Total_pkg.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {columnSums.Net_weight.toFixed(2)}
                      </td>
                 
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {columnSums.Grand_total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                     
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                       
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllLot;
