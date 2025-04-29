import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  background: ${(props) => props.primary ? '#FA824C' : '#fff'};
  padding: 14px 24px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #FA824C;
`;