import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { Search } from "./Icons";
import Avatar from "react-avatar";
import ReactPaginate from 'react-paginate';

const Section = styled.div.attrs(() => ({
  className: `bg-gray-100 w-full py-10`
}))``;

const Container = styled.div.attrs(() => ({
  className: `container mx-auto space-y-4`
}))``;

const Title = styled.div.attrs(() => ({
  className: `text-lg bg-gray-100 font-semibold text-gray-500 pb-4`
}))``;

const TableWrapper = styled.div.attrs(() => ({
  className: `bg-white rounded-md flex flex-col py-4`
}))``;

const TableHeadWrapper = styled.div.attrs(() => ({
  className: `grid grid-cols-5 gap-4 text-gray-500 justify-between w-full text-sm px-4`
}))``;

const Divider = styled.hr.attrs(() => ({
  className: `border-t-2 mt-2 mx-2 border-gray-300`
}))``;

const TableHead = styled.div.attrs(() => ({
  className: `flex justify-center`
}))``;

const TableBodyWrapper = styled.div.attrs(() => ({
  className: `flex flex-col space-y-4 text-sm justify-between text-gray-700 border-b-sm pt-2 px-4`
}))``;

const TableBodyRow = styled.div.attrs(() => ({
  className: `grid grid-cols-5 gap-4`
}))``;

const TableBody = styled.div.attrs(props => ({
  className: `flex ${props.start ? ('justify-start') : ('justify-center')}`
}))``;

const SearchWrapper = styled.div.attrs(() => ({
  className: `flex w-full justify-end items-center`
}))``;

const SearchBar = styled.input.attrs(() => ({
  className: `border-2 h-10 bg-white w-1/3 rounded-lg text-sm px-2 focus:outline-none w-full block shadow-inner`
}))``;

const PaginationSection = styled.div.attrs(() => ({
  className: `w-full bg-white flex justify-between py-4`
}))``;

const Pagination = styled(ReactPaginate).attrs(() => ({
  className: `flex border-2 rounded-lg space-x-4 py-2 px-4 text-sm text-gray-500`
}))`
  .active {
    border-bottom: 2px solid blue;
    height: 20px;
    font-weight: bold;
  }
`;

const PageSelect = styled.select.attrs(() => ({
  className: `border-2 rounded-md text-sm bg-white text-gray-500`
}))``;

export default function Table(props) {
  const { product, title, noSearch } = props;
  const [productName, setProductName] = useState('');
  const [data, setData] = useState(product);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    handleFilter();
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };


  const handleFilter = () => {
    if (productName) {
      const newProduct = product.filter(function(search) {
        return search.title.toLowerCase().includes(productName.toLowerCase());
      });

      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(newProduct.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(newProduct.length / itemsPerPage));
    } else {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(data.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(data.length / itemsPerPage));
    }
  };

  return (
    <Section>
      <Container>
        <Title>
          {title}
        </Title>
        {!noSearch && (
          <SearchWrapper>
            <SearchBar
              type="input"
              name="search"
              placeholder="Search by product name"
              onChange={e => setProductName(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleFilter();
                }
              }}
            />
            <Search className="absolute right-8"/>
          </SearchWrapper>
        )}
        <TableWrapper>
          <TableHeadWrapper>
            <TableHead>
              Product Name
            </TableHead>
            <TableHead>
              Product Code
            </TableHead>
            <TableHead>
              Category
            </TableHead>
            <TableHead>
              Description
            </TableHead>
            <TableHead>
              Tags
            </TableHead>
          </TableHeadWrapper>
          <Divider/>
          <TableBodyWrapper>
            {
              currentItems?.map((item, index) => {
                return (
                  <div key={index}>
                    <TableBodyRow>
                      <TableBody start>
                        <div className="flex flex-row space-x-2">
                          <Avatar
                            size="30"
                            round={true}
                            color="#bfdbfe"
                            fgColor="#1d4fd8"
                            name={item.title}
                          />
                          <div className="pt-1">
                            {item.title}
                          </div>
                        </div>
                      </TableBody>
                      <TableBody>
                        {item.id}
                      </TableBody>
                      <TableBody>
                        {item.category}
                      </TableBody>
                      <TableBody>
                        {item.description}
                      </TableBody>
                      <TableBody className="flex-col">
                        {
                          item.tags?.map((tag, i) => {
                            return (
                              <div key={i} className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-blue-400 rounded-full">

                                </div>
                                <div>
                                  {tag}
                                </div>
                              </div>
                            )
                          })
                        }
                      </TableBody>
                    </TableBodyRow>
                    <Divider className="-mx-2"/>
                  </div>
                )
              })
            }
          </TableBodyWrapper>
          <PaginationSection>
            <Pagination
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={itemsPerPage}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
              activeClassName={"active"}
            />
            <div className="flex space-x-4 items-center">
              <div className="text-sm text-blue-700">
                Show
              </div>
              <PageSelect
                value={itemsPerPage}
                onChange={e => setItemsPerPage(e.target.value)}
              >
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="32">32</option>
                <option value="64">64</option>
              </PageSelect>
            </div>
          </PaginationSection>
        </TableWrapper>
      </Container>
    </Section>
  );
};
