import React, {useState} from 'react';
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";


export default function PaginationControlled() {
 
 // const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
  //  setPage(value);
  };

  return (
    <div>
    <MDBRow>
    <MDBCol>
      <MDBPagination className="mb-5">
        <MDBPageItem>
          <MDBPageNav aria-label="Previous">
            <span aria-hidden="true">Previous</span>
          </MDBPageNav>
        </MDBPageItem>
        <MDBPageItem>
          <MDBPageNav>
            1
          </MDBPageNav>
        </MDBPageItem>
        <MDBPageItem>
          <MDBPageNav>2</MDBPageNav>
        </MDBPageItem>
        <MDBPageItem>
          <MDBPageNav>3</MDBPageNav>
        </MDBPageItem>
        <MDBPageItem>
          <MDBPageNav aria-label="Previous">
            <span aria-hidden="true">Next</span>
          </MDBPageNav>
        </MDBPageItem>
      </MDBPagination>
    </MDBCol>
  </MDBRow>
    </div>
  );
}
