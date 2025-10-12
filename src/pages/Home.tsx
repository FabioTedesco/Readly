import SearchBar from "../components/Searchbar";

const onSearch = () => console.log("sto cercando");

const Home = () => {
  return (
    <div>
      {/* Contenuto principale */}
      <main className="flex-grow bg-gray-50">
        <div className="p-6 text-center text-gray-700">
          <SearchBar onSearch={onSearch} />
        </div>
      </main>
    </div>
  );
};

export default Home;
