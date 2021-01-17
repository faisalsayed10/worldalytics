export const getSpecificCountry = async (id) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
  const country = res.json();
  return country;
};

export const getCountryBorders = async (country, setBorders) => {
  const borders = await Promise.all(
    country.borders.map((border) => getSpecificCountry(border))
  );

  setBorders(borders);
};

export const orderBy = (countries, value, direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }
  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return countries;
};

export const searchCountries = (countries, keyword) => {
  return countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );
};
