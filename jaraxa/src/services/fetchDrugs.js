function constructQueryString(searchData) {
  let queryParts = [];

  if (searchData.OTC !== undefined) {
    const drugType = searchData.OTC
      ? "HUMAN OTC DRUG"
      : "HUMAN PRESCRIPTION DRUG";
    queryParts.push(`openfda.product_type:"${drugType}"`);
  }

  if (searchData.id) {
    queryParts.push(`set_id:${searchData.id}`);
  }

  if (searchData.manufacturer) {
    queryParts.push(`openfda.manufacturer_name:"${searchData.manufacturer}"`);
  }

  if (searchData.genericName) {
    queryParts.push(`openfda.generic_name:"${searchData.genericName}"`);
  }

  if (searchData.substanceName) {
    queryParts.push(`openfda.substance_name:"${searchData.substanceName}"`);
  }

  return queryParts.join("+AND+");
}
// created to fetch the needed data easily
export const fetchDrugs = async (searchData, limit = 12, skip = 0) => {
  // return null if searchData is void
  if (
    !searchData.substanceName &&
    !searchData.genericName &&
    !searchData.manufacturer &&
    !searchData.id
  )
    return;

  try {
    // build of the query with the search parts
    let queryString = constructQueryString(searchData);
    const response = await fetch(
      `https://api.fda.gov/drug/label.json?search=${queryString}&limit=${limit}&skip=${skip}`
    );
    const drug = await response.json();
    if (drug.error) {
      throw new Error(drug.error.message || "Unknown error");
    }

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    return drug;
  } catch (error) {
    throw new Error(error.message || "Error searching Drugs");
  }
};
