
import React, { useState, useEffect } from 'react';
import Image from "../components/image"
import Parser from 'html-react-parser'
import Inventory from "../components/inventory"
import { Link } from "gatsby"

function Page({ pageContext }) {

  const [item, setItem] = useState('');
  const [del, setDel] = useState(null);

  function handleInventory() {
      setItem(pageContext.item);
    }
    function handleDelete() {
      setItem("delete")
      setDel(pageContext.item);
    }


return (
  <div className="grid-container">
    <div className="grid-chapter">
      <div className="text">
        {Parser(pageContext.content)}
        <blockquote>{Parser(pageContext.excerpt)}
         <div className="inv-img"><Image imgName={pageContext.inventoryImg}/></div>
        <div className="btn-row">
        <button className="btn btn-outline-success" onClick={handleInventory}>Ja </button>
        <button className="btn btn-outline-danger" onClick={handleDelete}>Nee </button>
        </div>
        </blockquote>
          {pageContext.text2 ? pageContext.text2 : null}
      </div>
        {pageContext.vraag ? <p className="question">{pageContext.vraag}</p> : null}
      <div className="link">
        <Link to={pageContext.link1} className="btn btn-outline-default">{pageContext.vraag1}</Link>
        {pageContext.link2 ? <Link to={pageContext.link2} className="btn btn-outline-warning">{pageContext.vraag2}</Link> : null }
      </div>
    </div>
    <Inventory background={pageContext.image} inventory={item} delete={del} />
  </div>
  );
}
export default Page
