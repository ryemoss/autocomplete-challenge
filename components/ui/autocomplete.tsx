import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import useClickOutside from "@/hooks/useClickOutside";
import { Identifier } from "@/lib/types/identifiers";

interface AutocompleteInputProps {
  className: string;
  value: string;
  suggestions: Identifier[];
  onChange: (val: string) => void;
  onBlur?: () => void;
}

const identifierRegex = /[a-zA-Z0-9_\.]/;
const CHAR_WIDTH = 7.7;

const AutocompleteInput = ({
  suggestions,
  className,
  value,
  onChange,
  onBlur,
}: AutocompleteInputProps) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const [isFocused, setIsFocused] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Identifier[]>([]);
  const [dropdownPos, setDropdownPos] = useState({ x: 0, y: 0 });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(autocompleteRef, closeAutocomplete);

  // Update suggestions based on current word
  useEffect(() => {
    if (inputRef.current == null) return;
    setIsFocused(true);
    const { ...word } = getWordPositions(inputRef.current);

    const token = inputValue.substring(word.start, word.end);
    const suggestionList =
      token.length > 0
        ? suggestions.filter(
            (s) => s.code.toLowerCase().includes(token.toLowerCase()) && s.code != token
          )
        : [];

    const caretX = (inputRef.current.selectionStart || 0) * CHAR_WIDTH;
    setDropdownPos({ x: caretX, y: 0 });
    setFilteredSuggestions(suggestionList);
  }, [inputValue]);

  // Autocomplete suggestion with Tab
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && isFocused && filteredSuggestions.length) {
      e.preventDefault();
      if (inputRef.current == null) return;
      const { ...word } = getWordPositions(inputRef.current);

      const newString =
        inputValue.substring(0, word.start) +
        filteredSuggestions[0].code +
        inputValue.substring(word.end);

      setInputValue(newString);
      onChange(newString);
      setFilteredSuggestions([]);
      repositionCaret(word.start, filteredSuggestions[0].code);
    }
  };

  // Replace the current word with the selected dropdown suggestion
  const handleSuggestionClick = (suggestion: Identifier) => {
    if (inputRef.current == null) return;
    const { ...word } = getWordPositions(inputRef.current);

    const newString =
      inputValue.substring(0, word.start) +
      suggestion.code +
      inputValue.substring(word.end);

    inputRef.current.focus();
    setInputValue(newString);
    onChange(newString);
    repositionCaret(word.start, suggestion.code);
  };

  // Get the start and end positions of the current word
  function getWordPositions(ref: HTMLInputElement) {
    const cursorPos = ref.selectionStart || 0;

    let wordStart = cursorPos - 1;
    let wordEnd = cursorPos;
    while (wordStart >= 0 && identifierRegex.test(inputValue[wordStart])) {
      wordStart--;
    }
    wordStart++;
    while (
      wordEnd < inputValue.length &&
      identifierRegex.test(inputValue[wordEnd])
    ) {
      wordEnd++;
    }
    return { start: wordStart, end: wordEnd };
  }

  function repositionCaret(wordStart: number, newWord: string) {
    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.selectionStart = inputRef.current.selectionEnd =
          wordStart + newWord.length;
      }
      setFilteredSuggestions([]);
    });
  }

  function closeAutocomplete() {
    setIsFocused(false);
  }

  return (
    <div className={cn("relative", className)}>
      <Input
        ref={inputRef}
        className="font-mono"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          onChange(e.target.value);
        }}
        onFocus={() => setIsFocused(true)}
        onKeyDown={handleKeyDown}
        onBlur={() => onBlur?.()}
      />

      {isFocused && filteredSuggestions.length > 0 && (
        <div
          ref={autocompleteRef}
          style={{ left: dropdownPos.x }}
          className="dropdown absolute z-10 bg-white border mt-1 min-w-[120px] max-h-[240px] max-w-[240px] overflow-y-auto overflow-x-hidden shadow"
        >
          <ul className="text-xs font-mono">
            {filteredSuggestions.map((suggestion, idx) => {
              const color = (() => {
                switch (suggestion.type) {
                  case "variable": return 'text-indigo-500';
                  case "constant": return 'text-orange-500';
                  case "function": return 'text-purple-500';
                  case "customVariable": return 'text-emerald-700';
                }
              })();

              return (
                <li
                  key={idx}
                  className={cn("px-2 py-1 cursor-pointer hover:bg-gray-100", color)}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.code}
                </li>
              )}
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;
