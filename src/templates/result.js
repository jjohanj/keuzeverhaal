import React, { useState, useEffect } from 'react';
import Image from "../components/image"
import Parser from 'html-react-parser'
import Inventory from "../components/inventory"
import { Link } from "gatsby"


function IndexPage( {pageContext}) {
  const initial = () => typeof window !== 'undefined' && JSON.parse(sessionStorage.getItem("inventory"));
  const [items, setItems] = useState(initial);

  const [item, setItem] = useState('');
  const [del, setDel] = useState(null);

  function handleInventory() {
      setItem(pageContext.item);
    }
    function handleDelete() {
      setItem("delete")
      setDel(pageContext.item);
    }
    console.log(pageContext.remove);
    useEffect(() => {
      if (pageContext.remove == "true")
  // Update the document title using the browser API
    handleDelete();
},[]);

return (
  <div className="grid-container">
    <div className="grid-chapter result">
      <div className="text">
      {Parser(pageContext.content)}
         <blockquote>
         {(() => {
           if (typeof window !== 'undefined' && items.includes(pageContext.item)) {
             return (
               <>
                {Parser(pageContext.choice1)}
               </>
             )
           } else {
             return (
               <>
               {Parser(pageContext.choice2)}
               </>
             )
           }
         })()}
         </blockquote>
           {pageContext.text2 ? pageContext.text2 : null}
      </div>
        {pageContext.vraag ? <div className="question">{pageContext.vraag}</div> : null}
      <div className="link">
      <Link to={pageContext.link1} className="btn btn-outline-default">{pageContext.vraag1}</Link>
      {pageContext.link2 ? <Link to={pageContext.link2} className="btn btn-outline-warning">{pageContext.vraag2}</Link> : null }
        </div>
    </div>
    <Inventory background={pageContext.image} inventory={item} delete={del} />
  </div>
  );
}

export default IndexPage
