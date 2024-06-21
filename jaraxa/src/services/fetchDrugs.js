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
export const fetchDrugs = async (searchData) => {
  //coment en caso de que la busqueda esté vacia return nul
  if (
    !searchData.substanceName &&
    !searchData.genericName &&
    !searchData.manufacturer &&
    !searchData.id
  )
    return;

  try {
    let queryString = constructQueryString(searchData);
    const response = await fetch(
      `https://api.fda.gov/drug/label.json?search=${queryString}&limit=12`
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
