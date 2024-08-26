import React from "react";
import styled from "styled-components";
import { autoData } from "../constants/autoData";
import { AutoWordSuggestionsProps } from "../models/AutoWordSuggestionsProps";

const AutoWordSuggestions: React.FC<AutoWordSuggestionsProps> = ({
  searchTerm,
  onSelectSuggestion,
}) => {
  const filteredSuggestions = autoData.filter((word) =>
    word.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  if (!searchTerm || filteredSuggestions.length === 0) {
    return null;
  }

  return (
    <SuggestionsContainer>
      {filteredSuggestions.map((word, index) => (
        <SuggestionItem key={index} onClick={() => onSelectSuggestion(word)}>
          {word}
        </SuggestionItem>
      ))}
    </SuggestionsContainer>
  );
};

export default AutoWordSuggestions;

const SuggestionsContainer = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  gap: 10px;
  overflow-x: auto;
  background-color: #fff;
  border: 1px solid #ccc;
  border-bottom: none;
  border-radius: 10px 10px 0px 0px;
`;

const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;
  background: #fff;
  &:hover {
    background-color: #f0f0f0;
  }
`;
