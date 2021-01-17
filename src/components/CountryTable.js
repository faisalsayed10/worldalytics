import { useState } from "react";

import styles from "../styles/Components.module.css";
import Link from "next/link";
import SortArrow from "./SortArrow";
import { orderBy } from "../util/utils"

const CountryTable = ({ countries }) => {
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();

  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else setDirection(null);
  };

  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>
        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection("name")}
        >
          <div>Name</div>
          {value === "name" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>Population</div>
          {value === "population" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_area}
          onClick={() => setValueAndDirection("area")}
        >
          <div>
            Area (km<sup style={{ fontSize: "0.5rem" }}>2</sup>)
          </div>
          {value === "area" && <SortArrow direction={direction} />}
        </button>
      </div>

      {orderedCountries.map((country) => (
        <Link key={country.alpha3Code} href={`/country/${country.alpha3Code}`}>
          <div className={styles.row}>
            <div className={styles.flag}>
              <img src={country.flag} alt={country.name} />
            </div>
            <div className={styles.name}>{country.name}</div>
            <div className={styles.population}>{country.population}</div>
            <div className={styles.area}>{country.area || 0}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CountryTable;
