// styled
import styled from "styled-components";

export const H3 = styled.h3``;

export const H5 = styled.h5``;

export const Row = styled.section`
  display: flex;
  flex-direction: row;
  min-height: 100%;
  height: auto;
  max-width: 1200px;
  text-align: left;
  justify-content: space-between;
  margin: 10px;
`;

export const MainContentWrapper = styled(Row)`
  justify-content: space-around;
`;

export const Col = styled.section`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

export const Title = styled.h2`
  font-size: 14px;
  font-weight: 600;
`;


export const ContentWrapper = styled.div`
  padding: 8px;
`;

export const SideBarView = styled.header`
  background-color: #f1f1f1;
  margin-bottom: 20px;
  padding: 20px;
  color: #000;
`;


export const RangeInput = styled.input``;

export const Divider = styled.div`
  display: block;
  height: 1px;
  background-color: #ccc;
`;

export const MainContentView = styled.section`
  min-height: 98px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SmallFont = styled.small`
  font-size: 8px;
  display: block;
`;

export const Button = styled.button``;
export const Select = styled.select`
  height:40px;
  width:100px;
`;
export const Option = styled.option``;
