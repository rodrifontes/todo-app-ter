import styled from "styled-components/native";

import { Platform, StatusBar } from "react-native";

const isAndroid = Platform.OS === 'android';

export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : 0};
  flex: 1;
`;

export const TaskEmptyContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 0.5;
  gap: 8px;
`;

export const CenteredContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 0.5;
`;

export const TaskEmptyImage = styled.Image`
  width: 150px;
  height: 150px;
`;