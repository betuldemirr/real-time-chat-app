import React from "react";
import styled from "styled-components";
import { AutoWordSuggestionsProps } from "../models/AutoWordSuggestionsProps";

const AutoWordSuggestions: React.FC<AutoWordSuggestionsProps> = ({
  suggestions,
  onSelectSuggestion,
}) => {
  return (
    <SuggestionsContainer>
      {suggestions.map((suggestion, index) => (
        <SuggestionItem
          key={index}
          onClick={() => onSelectSuggestion(suggestion)}
        >
          {suggestion}
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
  border: none;
`;

const SuggestionItem = styled.li`
  padding: 10px;
  cursor: pointer;
  background: #fff;
  &:hover {
    font-weight: 600;
  }
`;
