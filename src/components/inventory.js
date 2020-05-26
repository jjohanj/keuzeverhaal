import React, { useState, useEffect } from 'react';
import Image from "./image"
import BackgroundSection from "../components/menu2"

function Inventory (props) {
  // const initial = () => JSON.parse(sessionStorage.getItem("inventory")) || [];
  const [inventory, setInventory] = useState(JSON.parse(typeof window !== 'undefined' && sessionStorage.getItem("inventory")) || []);

  useEffect(
  () => {
    // if (componentDidUpdate & (x or y changed))
    if (props.inventory === "delete" )
    {
      setInventory(inventory.filter(e => e !== props.delete));
    }
    else  if (props.inventory != null && inventory.includes(props.inventory) != true) {
      setInventory([...inventory, props.inventory]);
    }
  },
  [props.inventory]
);
if (props.inventory != null ){
  typeof window !== 'undefined' &&  sessionStorage.setItem('inventory', JSON.stringify(inventory))
}
var i = 1
const post = inventory.map(item => {

  if ( item != null) {
  return (
  <li key={i++}>
    <Image imgName={`${item}.png`}/>
  </li>
)
}
else {
  return (
    null  )
}
});

  return (

    <div className="grid-menu">
    <BackgroundSection background={props.background}/>
    <div className="img-container">
      <ul className="inventory">
      {post}
      </ul>
    </div>
    </div>
  )
}

export default Inventory
