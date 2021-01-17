import { useState } from "react";
import CountryTable from "../components/CountryTable";
import Layout from "../components/Layout";
import SearchInput from "../components/SearchInput";
import styles from "../styles/Pages.module.css";
import { searchCountries } from "../util/utils";

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState();

  const filteredCountries = keyword ? searchCountries(countries, keyword) : countries;

  const onInputChange = e => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase())
  }

  return (
    <Layout>
      <div className={styles.counts}>Found {countries.length} countries</div>
      <SearchInput
        placeholder="Filter by Name, Region or SubRegion"
        onChange={onInputChange}
      />
      <CountryTable countries={filteredCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();
  return {
    props: {
      countries,
    },
  };
};
