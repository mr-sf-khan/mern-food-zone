import Styled, { styled } from "styled-components";
import { useEffect, useState } from "react";
import SearchResult from "./component/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterData, setfilterData] = useState(null);
  const [selectedBtn, setselectedBtn] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setLoading(false);
        setfilterData(json);
      } catch (error) {
        setError("unable to fetch data");
      }
    };

    fetchData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;

    console.log(searchValue);

    if (searchValue === "") {
      setfilterData(null);
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setfilterData(filter);
  };

  const filterFood = (type) => {
    if (type === "all") {
      setfilterData(data);
      setselectedBtn("all");
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setfilterData(filter);
    setselectedBtn(type);
  };

  const filterBtns = [
    { name: "All", type: "all" },
    { name: "Breakfast", type: "breakfast" },
    { name: "Lunch", type: "lunch" },
    { name: "Dinner", type: "dinner" },
  ];

  if (error) return <div>{error}</div>;
  if (Loading) return <div>Loading...</div>;

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/logo.png" alt="logo" />
          </div>
          <div className="search">
            <input onChange={searchFood} type="text" placeholder="search..." />
          </div>
        </TopContainer>
        <Filter>
          {filterBtns.map((value) => (
            <Button
              isSelected={selectedBtn === value.type}
              key={value.name}
              onClick={() => filterFood(value.type)}>
              {value.name}
            </Button>
          ))}
        </Filter>
      </Container>
      <SearchResult data={filterData} />
    </>
  );
};

export default App;

export const Container = Styled.div`
max-width: 1200px;
margin: 0 auto;
`;
const TopContainer = Styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 16px;
min-height: 140px;

.search{
  input{
    padding: 18px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    border: 2px solid red;
    color: white ;
    background-color: transparent;
    outline: none;
  }
}
  @media(0 < width < 600px){
    flex-direction: column;
    gap: 20px;
`;
const Filter = Styled.div`
display: flex;
justify-content: center;
gap: 25px ;
padding: 30px;

`;
export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? "darkred" : "#ff4343")};
  color: white;
  padding: 10px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  &:hover {
    background: darkred;
  }
`;
