import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { debounce, isNull } from "lodash";
import { fetchAnime } from "../api/requests";
import Highlighter from "react-highlight-words";

const Search = () => {
  const [result, setResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef(null);

  // Invalidate Search result if no value in input
  useEffect(() => {
    if (!inputRef.current?.value && result?.length) {
      setResult([]);
    }
  }, [inputRef.current?.value]);

  const getTitles = useCallback(async (text) => {
    if (!text) return;

    const anime = await fetchAnime({ letter: text, limit: 8 });

    if (!anime.length) {
      return setResult(null);
    }

    const titles = anime.map((item) => item.title);
    setResult(titles);
  }, []);

  const getTitlesDebounce = useMemo(() => debounce(getTitles, 300), []);

  const handleChange = useCallback((e) => {
    const { value } = e.target;
    setSearchValue(value);
    if (isNull(result)) {
      setResult([]);
    }
    getTitlesDebounce(value);
  }, []);

  const handleItemClick = (value) => {
    if (!value) return;
    setSearchValue(value);
    setResult([]);
  };

  return (
    <div className="flex flex-col items-center justify-center pb-48">
      <div className="mb-8">
        <p className="uppercase md:text-8xl text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          search
        </p>
      </div>
      <div className="relative flex items-center justify-center">
        <div className="flex items-center">
          <input
            ref={inputRef}
            value={searchValue}
            type="text"
            placeholder="Search"
            className="md:w-96 w-48 border p-2 outline-none hover:border-slate-300 rounded-xl"
            onChange={handleChange}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setTimeout(() => setIsFocus(false), 100)}
          />

          {isFocus && !!result?.length && (
            <ul className="w-96 mx-auto absolute top-12 shadow-2xl z-10 bg-white">
              {result.map((name) => (
                <li
                  className="w-full hover:bg-gray-300 cursor-pointer px-2"
                  key={name}
                  onClick={() => handleItemClick(name)}
                >
                  <Highlighter searchWords={[inputRef.current?.value]} autoEscape={true} textToHighlight={name} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
