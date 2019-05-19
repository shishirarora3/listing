// styled
import styled from "styled-components";

export const H3 = styled.h1`
font-size: 30px;
`;

export const H5 = styled.h5``;

export const Row = styled.section`
  display: flex;
  flex-direction: row;
  min-height: 100%;
  height: auto;
  max-width: 1200px;
  text-align: left;
  justify-content: space-between;
  align-items: flex-start;
`;

export const MainContentWrapper = styled(Row)`
  justify-content: space-around;
  flex-grow: 8;
  width: 75%;
`;


export const Col = styled.section`
  display: flex;
  flex-direction: column;
`;
export const BodyContentWrapper = styled(Row)`
  justify-content: space-around;
  width:100vw;
`;

export const Title = styled.h2`
  font-size: 14px;
  font-weight: 600;
`;


export const ContentWrapper = styled.div`
  padding: 10px 0;
`;

export const SideBarView = styled.div`
  background-color: #738d10;
  margin-bottom: 20px;
  padding: 20px;
  color: #000;
  width: 25%;
`;


export const RangeInput = styled.input`
cursor: pointer;
`;

export const Divider = styled.div`
  display: block;
  height: 1px;
  background-color: #ccc;
`;

export const MainContentView = styled.section`
  min-height: 100vh;
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SmallFont = styled.small`
  font-size: 10px;
  display: block;
`;

export const Button = styled.button``;
export const Select = styled.select`
  height:30px;
  width:100px;
`;
export const Option = styled.option``;
