import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  background: ${({ primary, disabled }) => disabled ? '#999' : primary ? '#FA824C' : '#fff'};
  padding: 14px 24px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${({ disabled }) => disabled ? '#999' : '#FA824C'};
`;