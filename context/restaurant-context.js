import { createContext, useContext, useEffect, useState } from "react";
import { RestuarantAPI } from "../data/RestaurantAPI";
export const RestuarantContext = createContext(null);

export const RestaurantProvider = ({ children }) => {
  const [menuList, setMenuList] = useState([]);
  const [filters, setFilters] = useState({
    checkBox: [],
    searchText: "",
    sortBy: null,
  });

  useEffect(() => {
    getRestaurantsData();
  }, []);
  async function getRestaurantsData() {
    try {
      const data = await RestuarantAPI("https://example.com/api/menu");
      setMenuList(data?.data?.menu);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchText = (searchTextValue) => {
    setFilters({ ...filters, searchText: searchTextValue });
  };

  const handleCheckboxFilters = (event) => {
    event.target.checked
      ? setFilters({
          ...filters,
          checkBox: [...filters.checkBox, event.target.value],
        })
      : setFilters({
          ...filters,
          checkBox: filters.checkBox.filter(
            (item) => item !== event.target.value
          ),
        });
  };

  const handleSortBy = (sortByValue) => {
    setFilters({ ...filters, sortBy: sortByValue });
  };

  // Filter data on search text value
  const searchedFilterData =
    filters?.searchText?.length > 0
      ? menuList.filter(({ name }) =>
          name.toLowerCase().includes(filters.searchText.toLocaleLowerCase())
        )
      : menuList;

  // Filter data on checkbox value
  const checkBoxFilterData =
    filters?.checkBox?.length > 0
      ? searchedFilterData.filter((item) =>
          filters.checkBox.every((type) => item[type])
        )
      : searchedFilterData;

  // Sort data
  const sortedFilterData =
    filters?.sort !== null
      ? checkBoxFilterData.sort((a, b) =>
          filters.sortBy === "low_to_high"
            ? a.price - b.price
            : b.price - a.price
        )
      : checkBoxFilterData;
  return (
    <RestuarantContext.Provider
      value={{
        menuList,
        handleSearchText,
        handleCheckboxFilters,
        handleSortBy,
        sortedFilterData,
      }}>
      {children}
    </RestuarantContext.Provider>
  );
};

export const useRestuarant = () => useContext(RestuarantContext);
