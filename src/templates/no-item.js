
import React, { useState, useEffect } from 'react';
import Image from "../components/image"
import Parser from 'html-react-parser'
import Inventory from "../components/inventory"
import { Link } from "gatsby"

function Page({ pageContext }) {

return (
  <div className="grid-container">
    <div className="grid-chapter">
      <div className="text">
        <p>{Parser(pageContext.content)}</p>
      </div>
        {pageContext.vraag ? <div className="question">{pageContext.vraag}</div> : null}
        <div className="link">
          <Link to={pageContext.link1} className="btn btn-outline-default">{pageContext.vraag1}</Link>
          {pageContext.link2 ? <Link to={pageContext.link2} className="btn btn-warning">{pageContext.vraag2}</Link> : null }
        </div>
      </div>
    <Inventory background={pageContext.image} />
  </div>
  );
}

export default Page
